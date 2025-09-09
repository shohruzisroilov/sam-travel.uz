"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    destinations: 'Destinations',
    contact: 'Contact',
    tours: 'Tours',
    hotels: 'Hotels',
    reports: 'Reports',
    
    // Home Page
    heroTitle: 'Discover Amazing Destinations',
    heroSubtitle: 'Experience unforgettable journeys with our expert travel guides',
    exploreButton: 'Explore Destinations',
    popularDestinations: 'Popular Destinations',
    previousTours: 'Previous Tours',
    featuredHotels: 'Featured Hotels',
    travelReports: 'Travel Reports',
    viewAll: 'View All',
    bookNow: 'Book Now',
    readMore: 'Read More',
    whyChooseUs: 'Why Choose Us',
    expertGuides: 'Expert Guides',
    expertGuidesDesc: 'Professional local guides with deep knowledge',
    bestPrices: 'Best Prices',
    bestPricesDesc: 'Competitive pricing with no hidden fees',
    safeTravel: 'Safe Travel',
    safeTravelDesc: '24/7 support and safety guaranteed',
    
    // About Page
    aboutTitle: 'About Our Travel Agency',
    aboutDescription: 'We are passionate travel experts dedicated to creating unforgettable experiences for our clients. With over 10 years of experience in the travel industry, we specialize in crafting personalized journeys that showcase the beauty and culture of amazing destinations.',
    companyLicenses: 'Company Licenses',
    managementStructure: 'Management Structure',
    ourTeam: 'Our Team',
    previousToursSection: 'Previous Tours',
    licenseText: 'Our company is fully licensed and certified by the Ministry of Tourism and authorized travel associations.',
    ourMission: 'Our Mission',
    missionText: 'To provide exceptional travel experiences that create lasting memories while promoting sustainable tourism and cultural understanding.',
    ourVision: 'Our Vision',
    visionText: 'To be the leading travel agency known for personalized service, expert guidance, and unforgettable adventures.',
    
    // Destinations Page
    destinationsTitle: 'Popular Destinations',
    destinationsSubtitle: 'Explore our carefully selected travel destinations',
    
    // Contact Page
    contactTitle: 'Get in Touch',
    contactSubtitle: 'Ready to start your adventure? Contact us today!',
    mainOffice: 'Main Office',
    branchOffice: 'Branch Office',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    sendMessage: 'Send Message',
    contactInfo: 'Contact Information',
    phone: 'Phone',
    address: 'Address',
    
    // Customer Reviews
    customerReviews: 'Customer Reviews',
    whatClientsSay: 'What Our Clients Say',
    
    // Destinations
    samarkand: 'Samarkand',
    samarkandDesc: 'Ancient city with stunning Islamic architecture',
    bukhara: 'Bukhara',
    bukharaDesc: 'Historic trading post along the Silk Road',
    khiva: 'Khiva',
    khivaDesc: 'Well-preserved medieval city',
    tashkent: 'Tashkent',
    tashkentDesc: 'Modern capital with rich cultural heritage',
    paris: 'Paris',
    parisDesc: 'The city of love and lights',
    tokyo: 'Tokyo',
    tokyoDesc: 'Modern metropolis with ancient traditions',
    
    // Tours and Hotels
    duration: 'Duration',
    includes: 'Includes',
    rating: 'Rating',
    perNight: 'per night',
    
    // Footer
    footerAbout: 'Your trusted travel partner for unforgettable experiences worldwide.',
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    allRightsReserved: 'All rights reserved.',
  },
  uz: {
    // Navigation
    travel: 'Sayohat',
    home: 'Bosh sahifa',
    about: 'Biz haqimizda',
    destinations: 'Yo\'nalishlar',
    contact: 'Bog\'lanish',
    tours: 'Turlar',
    hotels: 'Mehmonxonalar',
    reports: 'Hisobotlar',
    
    // Home Page
    heroTitle: 'Ajoyib Joylarni Kashf Eting',
    heroSubtitle: 'Tajribali sayohat yo\'lboshchilarimiz bilan unutilmas sayohatlarni boshdan kechiring',
    exploreButton: 'Yo\'nalishlarni Ko\'rish',
    popularDestinations: 'Mashhur Yo\'nalishlar',
    previousTours: 'Avvalgi Turlar',
    featuredHotels: 'Tavsiya Etiladigan Mehmonxonalar',
    travelReports: 'Sayohat Hisobotlari',
    viewAll: 'Barchasini Ko\'rish',
    bookNow: 'Buyurtma Berish',
    readMore: 'Batafsil',
    whyChooseUs: 'Nega Bizni Tanlaysiz',
    expertGuides: 'Tajribali Yo\'lboshchilar',
    expertGuidesDesc: 'Chuqur bilimga ega professional mahalliy yo\'lboshchilar',
    bestPrices: 'Eng Yaxshi Narxlar',
    bestPricesDesc: 'Yashirin to\'lovlarsiz raqobatbardosh narxlar',
    safeTravel: 'Xavfsiz Sayohat',
    safeTravelDesc: '24/7 qo\'llab-quvvatlash va kafolatlangan xavfsizlik',
    
    // About Page
    aboutTitle: 'Sayohat Agentligimiz Haqida',
    aboutDescription: 'Biz mijozlarimiz uchun unutilmas tajribalar yaratishga bag\'ishlangan sayohat mutaxassislarimiz. Sayohat industriyasida 10 yildan ortiq tajribaga ega bo\'lib, biz ajoyib yo\'nalishlarning go\'zalligi va madaniyatini ko\'rsatadigan shaxsiy sayohatlar yaratishga ixtisoslashganmiz.',
    companyLicenses: 'Kompaniya Litsenziyalari',
    managementStructure: 'Boshqaruv Tuzilmasi',
    ourTeam: 'Bizning Jamoa',
    previousToursSection: 'Avvalgi Turlar',
    licenseText: 'Kompaniyamiz Turizm Vazirligi va vakolatli sayohat uyushmalaridan to\'liq litsenziya va sertifikatga ega.',
    ourMission: 'Bizning Missiyamiz',
    missionText: 'Barqaror sayohatchilik va madaniy tushunishni targ\'ib qilish bilan birga doimiy xotiralar yaratadigan ajoyib sayohat tajribalarini taqdim etish.',
    ourVision: 'Bizning Viziyamiz',
    visionText: 'Shaxsiy xizmat, tajribali yo\'lboshchilik va unutilmas sarguzashtlar bilan tanilgan yetakchi sayohat agentligi bo\'lish.',
    
    // Destinations Page
    destinationsTitle: 'Mashhur Yo\'nalishlar',
    destinationsSubtitle: 'Ehtiyotkorlik bilan tanlangan sayohat yo\'nalishlarimizni o\'rganing',
    
    // Contact Page
    contactTitle: 'Bog\'laning',
    contactSubtitle: 'Sarguzashtingizni boshlashga tayyormisiz? Bugun biz bilan bog\'laning!',
    mainOffice: 'Asosiy Ofis',
    branchOffice: 'Filial Ofis',
    name: 'Ism',
    email: 'Elektron pochta',
    message: 'Xabar',
    sendMessage: 'Xabar Yuborish',
    contactInfo: 'Aloqa Ma\'lumotlari',
    phone: 'Telefon',
    address: 'Manzil',
    
    // Customer Reviews
    customerReviews: 'Mijozlar Fikri',
    whatClientsSay: 'Mijozlarimiz Nima Deydi',
    
    // Destinations
    samarkand: 'Samarqand',
    samarkandDesc: 'Ajoyib islom me\'morchiligi bilan qadimiy shahar',
    bukhara: 'Buxoro',
    bukharaDesc: 'Ipak yo\'li bo\'ylab tarixiy savdo markazi',
    khiva: 'Xiva',
    khivaDesc: 'Yaxshi saqlanib qolgan o\'rta asr shahri',
    tashkent: 'Toshkent',
    tashkentDesc: 'Boy madaniy meros bilan zamonaviy poytaxt',
    paris: 'Parij',
    parisDesc: 'Sevgi va yorug\'lik shahri',
    tokyo: 'Tokio',
    tokyoDesc: 'Qadimiy an\'analar bilan zamonaviy metropolis',
    
    // Tours and Hotels
    duration: 'Davomiyligi',
    includes: 'Ichiga Kiradi',
    rating: 'Reyting',
    perNight: 'tuniga',
    
    // Footer
    footerAbout: 'Butun dunyo bo\'ylab unutilmas tajribalar uchun ishonchli sayohat hamkoringiz.',
    quickLinks: 'Tezkor Havolalar',
    followUs: 'Bizni Kuzatib Boring',
    allRightsReserved: 'Barcha huquqlar himoyalangan.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}