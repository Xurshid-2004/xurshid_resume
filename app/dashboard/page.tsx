"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Template1 from "./resum/page";
import Template2 from "./resum2/page";  
import Template3 from "./resum3/page";
import { useResume } from "./ResumeContext";

export default function DashboardPage() {
  const router = useRouter();
  const { data } = useResume();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  useEffect(() => {
    // LocalStorage'dan tanlangan shablonni olish
    const stored = localStorage.getItem('selectedTemplate');
    if (stored) {
      setSelectedTemplate(stored);
    } else {
      // Agar shablon tanlanmagan bo'lsa, shablon tanlash sahifasiga o'tkazish
      router.push('/dashboard/shablon');
    }
  }, [router]);

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "/dashboard/resum":
        return <Template1 />;
      case "/dashboard/resum2":
        return <Template2 />;
      case "/dashboard/resum3":
        return <Template3 />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Shablon tanlanmagan</h2>
              <p className="text-gray-400 mb-6">Iltimos, avval shablon tanlang</p>
              <button
                onClick={() => router.push('/dashboard/shablon')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Shablon tanlash
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-6xl">
        {renderTemplate()}
      </div>
    </div>
  );
}
