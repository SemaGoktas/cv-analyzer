import { NextResponse } from 'next/server';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Ollama } from '@langchain/ollama';

export const dynamic = 'force-dynamic';

function cleanText(text: string): string {
  const replacements: Record<string, string> = {
    '': '', '': '', '': '', '': '', '': '', '': '', '': '',
    '•': '\n-', '\t': ' ',
  };

  let cleaned = text
    .replace(/[•\t]/g, match => replacements[match] || '')
    .replace(/\s+/g, ' ')
    .replace(/(\d)\s*-\s*(\d)/g, '$1-$2') 
    .trim();

  cleaned = fixMisrecognizedI(cleaned); 

  return cleaned;
}


export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const jobDesc = formData.get('jobDescription') as string;

  if (!file || !jobDesc) {
    return NextResponse.json(
      { error: "CV dosyası ve iş tanımı gereklidir" },
      { status: 400 }
    );
  }

  try {
    const loader = new PDFLoader(file);
    const docs = await loader.load();
    const rawText = docs.map(doc => doc.pageContent).join('\n').substring(0, 5000);
    const cvText = cleanText(rawText);
    console.log("CV Metni:", cvText);

    console.log("Temizlenmiş CV Metni:", cvText);
    console.log("İş Tanımı:", jobDesc);

    const model = new Ollama({
      baseUrl: "http://localhost:11434",
      model: "llama3", 
      temperature: 0.5, 
      topP: 0.9, 
      numCtx: 4096 
    });

    const prompt = `
    ### TASK:
    Evaluate how well the CV matches the job description **technically** and return a score **between 0 and 100**.

    ### SCORING CRITERIA:
    1. Technical Skills Match (50%)
    - ${jobDesc.split(',').map(s => s.trim()).join(', ')}
    2. Experience Relevance (30%)
    3. Project/Domain Similarity (20%)

    ### GUIDELINES:
    - Score based strictly on **technical relevance**.
    - Do **not** be lenient. A perfect match is **rare**.
    - Focus on **exact** technology names.
    - Ignore soft skills or general language.

    ### CV:
    ${cvText}

    ### OUTPUT:
    - Provide ONLY a numerical score between 0-100
    `;



    console.log("Ollama Prompt:", prompt);

    const response = await model._call(prompt, {});
    console.log("Ham Ollama Yanıtı:", response);
    
    const totalScoreMatch = response.match(/Score:\s*(\d+)/);
    const score = totalScoreMatch ? parseInt(totalScoreMatch[1]) : 0;

    console.log("Ollama Skoru:", score);
    
    return NextResponse.json({ 
      score,
      details: score >= 75 ? "Yüksek Uyum" : 
               score >= 50 ? "Orta Uyum" : "Düşük Uyum",
      matchedSkills: extractMatchedSkills(cvText, jobDesc)
    });

  } catch (error) {
    console.error("Detaylı Hata:", error);
    return NextResponse.json(
      { error: "Analiz başarısız. Lütfen konsolu kontrol edin." },
      { status: 500 }
    );
  }
}

function extractMatchedSkills(cvText: string, jobDesc: string): string[] {
  const normalize = (text: string): string =>
    text.toLowerCase()
      .replace(/\(.*?\)/g, '') 
      .replace(/[^a-z0-9\.]/g, '')
      .trim();

  const jobSkills: string[] = jobDesc.split(',').map(s => normalize(s));
  const cvSkillsRaw = cvText.toLowerCase().match(/\b[a-z0-9\.\+]+\b/g) || [];
  const cvSkills: string[] = cvSkillsRaw.map(normalize);

  const matched = jobSkills.filter((skill: string) =>
    cvSkills.includes(skill) && skill.length > 2
  );

  return [...new Set(matched)];
}


function fixMisrecognizedI(text: string): string {
  return text.replace(/(\p{L}*)7(\p{L}*)/gu, (_, a, b) => `${a}i${b}`);
}
