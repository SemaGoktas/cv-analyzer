"use client";

import React, { useState } from 'react';
import CVUpload from '../components/CVUpload';
import JobDescription from '../components/JobDescription';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeCV = async () => {
    if (!selectedFile || !jobDescription) {
      setError('Lütfen CV ve iş tanımı girin');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('jobDescription', jobDescription);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Analiz başarısız');

      const data = await response.json();
      setScore(data.score);
    } catch (err) {
      setError('Analiz sırasında hata oluştu');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-indigo-700 mb-10 text-center drop-shadow-md">
        CV Analizi
        <div className="mt-3 h-1 w-20 bg-indigo-500 mx-auto rounded-full opacity-80"></div>
      </h1>
      
      <div className="w-full max-w-6xl flex flex-row gap-8">
        {/* Sol taraf: CV Yükleme */}
        <div className="lg:w-2/5 w-full bg-white shadow-2xl rounded-3xl p-6 border border-indigo-200 transition-all duration-300 hover:shadow-indigo-300">
          <CVUpload onFileSelect={setSelectedFile} />
          {selectedFile && (
            <p className="mt-4 text-sm text-gray-600">
              Seçilen dosya: <strong>{selectedFile.name}</strong>
            </p>
          )}
        </div>

        {/* Sağ taraf: İş Tanımı */}
        <div className="lg:w-3/5 w-full bg-white shadow-2xl rounded-3xl p-6 border border-purple-200 transition-all duration-300 hover:shadow-purple-300">
          <JobDescription
            jobDescription={jobDescription}
            onChange={setJobDescription}
          />
        </div>
      </div>

      {/* Analiz Butonu ve Sonuçlar */}
      <div className="mt-8 w-full max-w-6xl">
        <button
          onClick={analyzeCV}
          disabled={!selectedFile || !jobDescription || isLoading}
          className={`px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all ${
            (!selectedFile || !jobDescription || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analiz Yapılıyor...
            </span>
          ) : 'CV Analiz Et'}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {score !== null && (
          <div className="mt-6 p-6 bg-white rounded-xl shadow-md">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                {score}/100
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                score >= 70 ? "bg-green-100 text-green-800" :
                score >= 50 ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
              }`}>
                {score >= 70 ? "Yüksek Uyum" : score >= 50 ? "Orta Uyum" : "Düşük Uyum"}
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full bg-gradient-to-r from-green-500 to-blue-500" 
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}