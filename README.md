# CV Analyzer 📄✨

Yapay zeka destekli CV analizi ve değerlendirme platformu. PDF formatındaki CV'leri iş tanımlarıyla karşılaştırarak uyumluluk skorları hesaplayan modern web uygulaması.

## ✨ Özellikler

- 📄 **PDF CV Yükleme**: Sürükle-bırak veya dosya seçici ile kolay CV yükleme
- 🤖 **AI Destekli Analiz**: Ollama LLM kullanarak akıllı CV değerlendirmesi
- 📊 **Uyumluluk Skoru**: İş tanımına göre CV'nin uygunluk oranını hesaplama
- 🎨 **Modern UI/UX**: Tailwind CSS ile responsive ve şık tasarım
- ⚡ **Hızlı İşleme**: Next.js ve Turbopack ile optimize edilmiş performans
- 🔄 **Gerçek Zamanlı**: Anlık sonuçlar ve kullanıcı geri bildirimleri

## 🛠️ Teknoloji Stack

- **Frontend**: Next.js 15.3.5 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Tailwind Typography
- **AI/ML**: LangChain, Ollama LLM
- **PDF İşleme**: PDF-Parse
- **Paket Yöneticisi**: PNPM
- **Kod Kalitesi**: ESLint

## 🚀 Kurulum

### Önkoşullar

- Node.js 18+ 
- PNPM
- [Ollama](https://ollama.ai/) (LLM için)

### Adımlar

1. **Projeyi klonlayın**
   ```bash
   git clone https://github.com/kullaniciadi/cv-analyzer.git
   cd cv-analyzer
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   pnpm install
   ```

3. **Ollama'yı başlatın**
   ```bash
   pnpm run llm-start
   # veya direkt olarak
   ollama serve
   ```

4. **Geliştirme sunucusunu başlatın**
   ```bash
   pnpm run dev
   ```

5. **Uygulamayı açın**
   
   Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

## 📋 Kullanım

1. **CV Yükleme**: PDF formatında CV'nizi sürükleyip bırakın veya dosya seçici ile yükleyin
2. **İş Tanımı**: Analiz etmek istediğiniz iş pozisyonunun tanımını girin
3. **Analiz**: "CV'yi Analiz Et" butonuna tıklayarak AI destekli analizi başlatın
4. **Sonuç**: Uyumluluk skorunuzu ve detayları görüntüleyin

## 🏗️ Proje Yapısı

```
cv-analyzer/
├── app/                    # Next.js App Router
│   ├── api/
│   │   └── analyze/        # CV analiz API endpoint'i
│   ├── layout.tsx          # Ana layout
│   └── page.tsx            # Ana sayfa
├── components/             # React bileşenleri
│   ├── CVUpload.tsx        # CV yükleme komponenti
│   └── JobDescription.tsx  # İş tanımı komponenti
├── styles/                 # CSS dosyaları
│   └── globals.css
└── public/                 # Statik dosyalar
```

## 🔧 Mevcut Komutlar

```bash
# Geliştirme sunucusunu başlat (Turbopack ile)
pnpm run dev

# Production build
pnpm run build

# Production sunucusunu başlat
pnpm run start

# ESLint kontrolü
pnpm run lint

# Ollama LLM servisini başlat
pnpm run llm-start
```

## 🌟 Gelecek Özellikler

- [ ] Çoklu dil desteği
- [ ] CV şablonları ve önerileri
- [ ] Detaylı analiz raporları
- [ ] Kullanıcı hesapları ve geçmiş
- [ ] API entegrasyonları (LinkedIn, Indeed)
- [ ] Mobil uygulama

## 🤝 Katkıda Bulunma

1. Bu repo'yu fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Ollama](https://ollama.ai/) - Yerel LLM desteği
- [LangChain](https://langchain.com/) - AI uygulama framework'ü
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
