"use client";

import { useResume } from "../ResumeContext";

const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23e5e7eb'/%3E%3Ccircle cx='100' cy='75' r='38' fill='%23d1d5db'/%3E%3Cellipse cx='100' cy='175' rx='60' ry='48' fill='%23d1d5db'/%3E%3C/svg%3E`;

const i18n = {
  en: { contact: "Contact", skills: "Skills", languages: "Languages", projects: "Projects", awards: "Awards", profile: "Profile", experience: "Work Experience", education: "Education", references: "References", present: "Present", jobTitle: "Specialization:" },
  uz: { contact: "Aloqa", skills: "Ko'nikmalar", languages: "Tillar", projects: "Loyihalar", awards: "Mukofotlar", profile: "Profil", experience: "Ish Tajribasi", education: "Ta'lim", references: "Tavsiyalar", present: "Hozir", jobTitle: "Mutaxassislik:" },
  ru: { contact: "Контакты", skills: "Навыки", languages: "Языки", projects: "Проекты", awards: "Награды", profile: "Профиль", experience: "Опыт работы", education: "Образование", references: "Рекомендации", present: "Сейчас", jobTitle: "Специализация:" },
};

export default function Template2() {
  const { data, language } = useResume();
  const t = i18n[language];
  const skillList = data.skills
    ? data.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div
      className="w-[210mm] min-h-[297mm] bg-white mx-auto relative overflow-hidden shadow-2xl"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      {/* Diagonal Header */}
      <div className="flex h-[72px]">
        <div className="w-[38%] bg-[#e2e8f0]" />
        <div className="flex-1 flex justify-end items-stretch overflow-hidden">
          <div className="w-8 h-full bg-[#94a3b8]" style={{ transform: "skewX(-20deg)", marginRight: "-4px" }} />
          <div className="w-8 h-full bg-[#7c6a4f]" style={{ transform: "skewX(-20deg)", marginRight: "-4px" }} />
          <div className="w-24 h-full bg-[#1e293b]" style={{ transform: "skewX(-20deg)", marginRight: "-16px" }} />
        </div>
      </div>

      {/* Body */}
      <div className="flex px-7 gap-6">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="w-[36%] -mt-10 flex flex-col gap-4 pb-10 shrink-0">
          <div className="w-full aspect-square bg-gray-200 border-4 border-white shadow-lg overflow-hidden">
            <img src={data.photo || PLACEHOLDER} alt="avatar" className="w-full h-full object-cover" />
          </div>

          {/* Contact */}
          <section>
            <h3 className="font-black uppercase tracking-[0.18em] mb-2 border-b-2 border-[#1e293b] pb-1" style={{ fontSize: "12px" }}>{t.contact}</h3>
            <div className="space-y-1.5 text-gray-600" style={{ fontSize: "12px" }}>
              {data.phone && <div><p className="text-gray-400 uppercase font-bold" style={{ fontSize: "9px" }}>Phone</p><p>📞 {data.phone}</p></div>}
              {data.email && <div><p className="text-gray-400 uppercase font-bold" style={{ fontSize: "9px" }}>Email</p><p>✉ {data.email}</p></div>}
              {data.address && <div><p className="text-gray-400 uppercase font-bold" style={{ fontSize: "9px" }}>Address</p><p>📍 {data.address}</p></div>}
              {data.linkedin && <div><p className="text-gray-400 uppercase font-bold" style={{ fontSize: "9px" }}>LinkedIn</p><p className="break-all">🔗 {data.linkedin}</p></div>}
              {data.github && <div><p className="text-gray-400 uppercase font-bold" style={{ fontSize: "9px" }}>GitHub</p><p className="break-all">💻 {data.github}</p></div>}
            </div>
          </section>

          {/* Education */}
          {data.educations?.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] mb-2 border-b-2 border-[#1e293b] pb-1" style={{ fontSize: "12px" }}>{t.education}</h3>
              <div className="space-y-3">
                {data.educations.map((edu, i) => (
                  <div key={i} className="text-gray-600" style={{ fontSize: "12px" }}>
                    <p className="font-bold text-gray-800" style={{ fontSize: "13px" }}>{edu.institution}</p>
                    <p>{edu.degree}</p>
                    {edu.field && <p className="text-gray-500">{edu.field}</p>}
                    {edu.gpa && <p className="text-gray-400">GPA: {edu.gpa}</p>}
                    <p className="text-gray-400">{edu.start}{edu.end ? ` – ${edu.end}` : ""}</p>
                    {edu.description && <p className="text-gray-400 mt-0.5 leading-relaxed">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skillList.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] mb-2 border-b-2 border-[#1e293b] pb-1" style={{ fontSize: "12px" }}>{t.skills}</h3>
              <div className="flex flex-wrap gap-1.5">
                {skillList.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#1e293b] text-white rounded" style={{ fontSize: "11px" }}>{s}</span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] mb-2 border-b-2 border-[#1e293b] pb-1" style={{ fontSize: "12px" }}>{t.languages}</h3>
              <div className="space-y-1.5">
                {data.languages.map((l, i) => (
                  <div key={i} className="flex justify-between text-gray-600" style={{ fontSize: "12px" }}>
                    <span>{l.name}</span>
                    <span className="text-[#7c6a4f] font-semibold">{l.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {data.awards?.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] mb-2 border-b-2 border-[#1e293b] pb-1" style={{ fontSize: "12px" }}>{t.awards}</h3>
              <div className="space-y-2">
                {data.awards.map((a, i) => (
                  <div key={i} className="text-gray-600">
                    <p className="text-gray-400" style={{ fontSize: "10px" }}>{a.year} · {a.org}</p>
                    <p className="font-semibold text-gray-800" style={{ fontSize: "12px" }}>{a.title}</p>
                    {a.description && <p className="text-gray-400" style={{ fontSize: "11px" }}>{a.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* ── RIGHT MAIN PANEL ── */}
        <main className="flex-1 py-3 flex flex-col gap-4">

          {/* Name + Title */}
          <div>
            <h1 className="text-[#1e293b] uppercase tracking-tight leading-tight font-black" style={{ fontSize: "30px" }}>
              {data.fullName || "Full Name"}
            </h1>
            <p className="font-bold tracking-[0.18em] uppercase text-[#7c6a4f] mt-1" style={{ fontSize: "13px" }}>
              {t.jobTitle} {data.title || ""}
            </p>
            <div className="w-10 h-[2px] bg-[#7c6a4f] mt-2" />
          </div>

          {/* Profile */}
          {data.summary && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] mb-1.5 border-b border-gray-200 pb-1" style={{ fontSize: "12px" }}>{t.profile}</h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontSize: "12px" }}>{data.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experiences?.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] mb-2 border-b border-gray-200 pb-1" style={{ fontSize: "12px" }}>{t.experience}</h3>
              <div className="space-y-3">
                {data.experiences.map((exp, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1.5 h-1.5 bg-[#1e293b] rounded-full mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <p className="font-bold uppercase text-[#1e293b]" style={{ fontSize: "13px" }}>{exp.company}</p>
                        <p className="font-bold text-gray-400 whitespace-nowrap" style={{ fontSize: "11px" }}>
                          {exp.start}{exp.end || exp.current ? ` – ${exp.current ? t.present : exp.end}` : ""}
                        </p>
                      </div>
                      <p className="italic text-gray-500" style={{ fontSize: "12px" }}>{exp.role}{exp.location ? ` · ${exp.location}` : ""}</p>
                      {exp.description && <p className="text-gray-600 mt-1 leading-relaxed" style={{ fontSize: "11px" }}>{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] mb-2 border-b border-gray-200 pb-1" style={{ fontSize: "12px" }}>{t.projects}</h3>
              <div className="space-y-2.5">
                {data.projects.map((p, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-[#1e293b]" style={{ fontSize: "13px" }}>{p.name}</p>
                      {p.tech && (
                        <span className="bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded" style={{ fontSize: "10px" }}>{p.tech}</span>
                      )}
                    </div>
                    {p.description && <p className="text-gray-600 mt-0.5 leading-relaxed" style={{ fontSize: "11px" }}>{p.description}</p>}
                    <div className="flex gap-4 mt-0.5">
                      {p.demo && <span className="text-[#7c6a4f] underline" style={{ fontSize: "11px" }}>{p.demo}</span>}
                      {p.github && <span className="text-gray-400" style={{ fontSize: "11px" }}>{p.github}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skillList.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] mb-2 border-b border-gray-200 pb-1" style={{ fontSize: "12px" }}>{t.skills}</h3>
              <div className="flex flex-wrap gap-1.5">
                {skillList.map((s, i) => (
                  <span key={i} className="px-2.5 py-0.5 bg-[#1e293b] text-white rounded" style={{ fontSize: "11px" }}>{s}</span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] mb-2 border-b border-gray-200 pb-1" style={{ fontSize: "12px" }}>{t.languages}</h3>
              <div className="flex flex-wrap gap-4">
                {data.languages.map((l, i) => (
                  <div key={i} className="border-l-2 border-[#7c6a4f] pl-2">
                    <span className="font-bold text-gray-800" style={{ fontSize: "13px" }}>{l.name}</span>
                    {l.level && <span className="text-[#7c6a4f] font-semibold ml-1.5" style={{ fontSize: "12px" }}>— {l.level}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {data.awards?.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] mb-2 border-b border-gray-200 pb-1" style={{ fontSize: "12px" }}>{t.awards}</h3>
              <div className="space-y-2">
                {data.awards.map((a, i) => (
                  <div key={i} className="flex gap-3 bg-gradient-to-r from-gray-50 to-transparent p-2 rounded border-l-2 border-[#7c6a4f]">
                    <div className="flex-1">
                      <p className="text-gray-400 font-medium" style={{ fontSize: "10px" }}>🏆 {a.year} · {a.org}</p>
                      <p className="font-semibold text-gray-800 mt-0.5" style={{ fontSize: "13px" }}>{a.title}</p>
                      {a.description && <p className="text-gray-500 mt-0.5" style={{ fontSize: "11px" }}>{a.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {data.references?.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] mb-2 border-b border-gray-200 pb-1" style={{ fontSize: "12px" }}>{t.references}</h3>
              <div className="grid grid-cols-2 gap-3">
                {data.references.map((ref, i) => (
                  <div key={i}>
                    <p className="font-bold text-[#1e293b]" style={{ fontSize: "13px" }}>{ref.name}</p>
                    <p className="text-[#7c6a4f] font-semibold" style={{ fontSize: "12px" }}>{ref.role}</p>
                    {ref.phone && <p className="text-gray-600" style={{ fontSize: "11px" }}>{ref.phone}</p>}
                    {ref.email && <p className="text-gray-400" style={{ fontSize: "11px" }}>{ref.email}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full h-3 bg-[#1e293b]" />
    </div>
  );
}