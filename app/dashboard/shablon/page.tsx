"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TEMPLATES = [
  {
    id: 1,
    title: "Modern Professional",
    description: "Qora sidebar, amber accent",
    image: "/resum.png",
    href: "/dashboard/resum",
    color: "from-amber-500 to-orange-500",
    badge: "🏆",
    preview: {
      sidebar: "#1e2535",
      accent: "#f59e0b",
      text: "#1e2535",
    },
  },
  {
    id: 2,
    title: "Angular Executive",
    description: "Diagonal header, klassik stil",
    image: "/resum2.png",
    href: "/dashboard/resum2",
    color: "from-slate-500 to-zinc-500",
    badge: "💼",
    preview: {
      sidebar: "#e2e8f0",
      accent: "#1e293b",
      text: "#1e293b",
    },
  },
  {
    id: 3,
    title: "Dark Sidebar Pro",
    description: "Zamonaviy va minimalist",
    image: "/resum3.png",
    href: "/dashboard/resum3",
    color: "from-blue-500 to-indigo-500",
    badge: "✨",
    preview: {
      sidebar: "#323b4c",
      accent: "#323b4c",
      text: "#323b4c",
    },
  },
];

export default function ShablonPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const handleSelect = (href: string, id: number) => {
    setSelected(id);
    localStorage.setItem("selectedTemplate", href);
    setTimeout(() => router.push("/dashboard"), 400);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto  sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className="text-center mb-14">
           
          <p className="text-slate-400 text-lg mt-4 max-w-xl mx-auto">
            Professional rezyumengiz uchun eng mos dizaynni tanlang va bir necha daqiqada tayyor qiling.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              onMouseEnter={() => setHovered(tpl.id)}
              onMouseLeave={() => setHovered(null)}
              className={`
                group relative bg-slate-900/50 backdrop-blur rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer
                ${selected === tpl.id ? "border-emerald-500 shadow-2xl shadow-emerald-500/20 scale-[1.02]" : "border-slate-800 hover:border-slate-600 hover:scale-[1.01]"}
              `}
              onClick={() => handleSelect(tpl.href, tpl.id)}
            >
              {/* Template Visual Preview */}
              <div className="aspect-[3/4] relative overflow-hidden bg-slate-800">
                {/* Mini Resume Preview */}
                <div className="absolute inset-2 rounded-lg overflow-hidden shadow-xl flex" style={{ fontSize: "4px" }}>
                  <div className="w-1/3 h-full" style={{ background: tpl.preview.sidebar }} />
                  <div className="flex-1 bg-white p-1.5">
                    <div className="h-3 rounded mb-1" style={{ background: tpl.preview.accent, opacity: 0.9 }} />
                    <div className="space-y-0.5">
                      {[80, 65, 90, 70, 55, 75, 60].map((w, i) => (
                        <div key={i} className="rounded-sm bg-gray-200" style={{ height: "2px", width: `${w}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-base border border-white/20">
                  {tpl.badge}
                </div>

                {/* Selected indicator */}
                {selected === tpl.id && (
                  <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-xl font-black shadow-xl shadow-emerald-500/50">
                      ✓
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base font-black text-white">{tpl.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{tpl.description}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tpl.color} mt-1.5 shrink-0`} />
                </div>

                <button
                  className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95
                    ${selected === tpl.id
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                      : `bg-gradient-to-r ${tpl.color} text-white opacity-80 group-hover:opacity-100`
                    }`}
                >
                  {selected === tpl.id ? "✓ Tanlandi — Davom etish..." : "Tanlash"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            Shablon tanlangandan so'ng ma'lumotlaringizni kiritib, PDF shaklida yuklab olasiz
          </p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 mt-4 text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors">
            Ma'lumotlarni kiritishga o'tish →
          </Link>
        </div>
      </div>
    </div>
  );
}