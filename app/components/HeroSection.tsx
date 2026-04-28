
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-[#020617] text-white overflow-x-hidden flex flex-col items-center py-10 md:py-20">
      
      {/* --- FON EFFEKTLARI --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
      </div>

      {/* --- ASOSIY QISM (HERO) --- */}
      <main className="relative z-10 w-full max-w-7xl px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Chap tomon: Matnlar */}
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-amber-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base">
              Onlayn rezyume tuzuvchisi
            </h4>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Rezyumeni ko&apos;rib chiqish uchun <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 bg-clip-text text-transparent">
                atigi 5 soniya
              </span> vaqt ketadi.
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Rezyume yozish hech qachon bunchalik oson bo&apos;lmagan. Hozir bepul sinab ko&apos;ring va bir necha daqiqa ichida professional rezyumeni yarating.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <Link href={"/dashboard/shablon"} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-600 text-black font-black py-4 px-8 md:py-5 md:px-10 rounded-2xl shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)] hover:scale-105 transition-transform active:scale-95 text-lg">
                  Rezyumeni yarating
                </button>
              </Link>

              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-500 text-sm italic whitespace-nowrap">Bugun 20,530 ta rezyume yaratildi</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* O'ng tomon: Rezyume Preview */}
        <motion.div 
          className="flex-1 relative w-full max-w-[320px] sm:max-w-[450px] lg:max-w-[500px] order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Orqa fon bezagi */}
          <div className="absolute inset-0 bg-amber-500/20 blur-[60px] md:blur-[80px] -rotate-12 rounded-3xl"></div>
          
          {/* Rezyume Qog'ozi */}
          <div className="relative bg-white text-slate-800 p-5 md:p-8 shadow-2xl rounded-sm min-h-[400px] md:min-h-[600px] flex flex-col gap-4 md:gap-6 transform lg:rotate-3 hover:rotate-0 transition-transform duration-500 scale-[0.9] sm:scale-100">
            <div className="flex justify-between items-start border-b pb-4 md:pb-6">
              <div>
                <h2 className="text-xl md:text-3xl font-bold uppercase tracking-tighter">Ism Familiya</h2>
                <p className="text-blue-600 text-xs md:text-sm font-semibold">Mutaxassislik</p>
              </div>
              <div className="text-[8px] md:text-[10px] text-right text-gray-400">
                Manzil, Shahar<br/>+998 90 123 45 67
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8 h-full">
              <div className="col-span-1 border-r pr-2 md:pr-4">
                <h3 className="text-[10px] md:text-[12px] font-bold border-b mb-2">Ko&apos;nikmalar</h3>
                <ul className="text-[8px] md:text-[10px] space-y-1">
                  <li>Rahbarlik</li>
                  <li>Vaqt menejmenti</li>
                  <li>Moliyaviy tahlil</li>
                </ul>
              </div>
              <div className="col-span-2">
                <h3 className="text-[10px] md:text-[12px] font-bold border-b mb-2">Haqida</h3>
                <p className="text-[8px] md:text-[10px] leading-relaxed italic">
                  Yuqori motivatsiyaga ega mutaxassis...
                </p>
                <h3 className="text-[10px] md:text-[12px] font-bold border-b mt-3 md:mt-4 mb-2">Tajriba</h3>
                <div className="text-[8px] md:text-[9px]">
                  <p className="font-bold text-black">Menejer, Kompaniya</p>
                  <p className="text-gray-400 mb-1">2016 - 2020</p>
                  <ul className="list-disc ml-3 space-y-1">
                    <li>Sotuvlarni 17% ga oshirdi.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HeroSection;
