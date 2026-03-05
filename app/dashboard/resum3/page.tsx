"use client";

import { useResume } from "../ResumeContext";

const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='150' height='150' fill='%23374151'/%3E%3Ccircle cx='75' cy='55' r='28' fill='%234b5563'/%3E%3Cellipse cx='75' cy='130' rx='45' ry='35' fill='%234b5563'/%3E%3C/svg%3E`;

const i18n = {
  en: { contact: "Contact", skills: "Expertise", languages: "Language", projects: "Projects", awards: "Awards", about: "About", experience: "Experience", education: "Education", references: "References", present: "Present", phone: "Phone", email: "Email", address: "Address", jobTitle: "Specialization:" },
  uz: { contact: "Aloqa", skills: "Ko'nikmalar", languages: "Tillar", projects: "Loyihalar", awards: "Mukofotlar", about: "Haqimda", experience: "Ish Tajribasi", education: "Ta'lim", references: "Tavsiyalar", present: "Hozir", phone: "Telefon", email: "Email", address: "Manzil", jobTitle: "Mutaxassislik:" },
  ru: { contact: "Контакты", skills: "Навыки", languages: "Языки", projects: "Проекты", awards: "Награды", about: "Обо мне", experience: "Опыт", education: "Образование", references: "Рекомендации", present: "Сейчас", phone: "Телефон", email: "Email", address: "Адрес", jobTitle: "Специализация:" },
};

export default function Template3() {
  const { data, language } = useResume();
  const t = i18n[language];

  const skillList = data.skills
    ? data.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div
      className="w-[210mm] min-h-[297mm] bg-white mx-auto flex overflow-hidden shadow-2xl"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      {/* ── DARK SIDEBAR ── */}
      <div className="w-[32%] bg-[#323b4c] text-white flex flex-col gap-5 p-7">

        {/* Photo */}
        <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white/10 mx-auto">
          <img src={data.photo || PLACEHOLDER} alt="profile" className="w-full h-full object-cover" />
        </div>

        {/* Contact */}
        <section>
          <h3 className="font-black tracking-[0.2em] uppercase border-b border-white/20 pb-1.5 mb-2.5 text-gray-300" style={{ fontSize: "12px" }}>{t.contact}</h3>
          <div className="space-y-2.5">
            {data.phone && (
              <div>
                <p className="uppercase text-gray-500 font-bold" style={{ fontSize: "9px" }}>{t.phone}</p>
                <p className="text-white/90" style={{ fontSize: "12px" }}>{data.phone}</p>
              </div>
            )}
            {data.email && (
              <div>
                <p className="uppercase text-gray-500 font-bold" style={{ fontSize: "9px" }}>{t.email}</p>
                <p className="text-white/90" style={{ fontSize: "12px" }}>{data.email}</p>
              </div>
            )}
            {data.address && (
              <div>
                <p className="uppercase text-gray-500 font-bold" style={{ fontSize: "9px" }}>{t.address}</p>
                <p className="text-white/90" style={{ fontSize: "12px" }}>{data.address}</p>
              </div>
            )}
            {data.linkedin && (
              <div>
                <p className="uppercase text-gray-500 font-bold" style={{ fontSize: "9px" }}>LinkedIn</p>
                <p className="text-white/90 break-all" style={{ fontSize: "12px" }}>{data.linkedin}</p>
              </div>
            )}
            {data.github && (
              <div>
                <p className="uppercase text-gray-500 font-bold" style={{ fontSize: "9px" }}>GitHub</p>
                <p className="text-white/90 break-all" style={{ fontSize: "12px" }}>{data.github}</p>
              </div>
            )}
          </div>
        </section>

        {/* Skills */}
        {skillList.length > 0 && (
          <section>
            <h3 className="font-black tracking-[0.2em] uppercase border-b border-white/20 pb-1.5 mb-2.5 text-gray-300" style={{ fontSize: "12px" }}>{t.skills}</h3>
            <ul className="space-y-1.5">
              {skillList.map((s, i) => (
                <li key={i} className="text-white/80 flex items-center gap-2" style={{ fontSize: "12px" }}>
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full shrink-0" />{s}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Languages */}
        {data.languages?.length > 0 && (
          <section>
            <h3 className="font-black tracking-[0.2em] uppercase border-b border-white/20 pb-1.5 mb-2.5 text-gray-300" style={{ fontSize: "12px" }}>{t.languages}</h3>
            <div className="space-y-1.5">
              {data.languages.map((l, i) => (
                <div key={i} className="flex justify-between" style={{ fontSize: "12px" }}>
                  <span className="text-white/80">{l.name}</span>
                  <span className="text-gray-400">{l.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {data.awards?.length > 0 && (
          <section>
            <h3 className="font-black tracking-[0.2em] uppercase border-b border-white/20 pb-1.5 mb-2.5 text-gray-300" style={{ fontSize: "12px" }}>{t.awards}</h3>
            <div className="space-y-2.5">
              {data.awards.map((a, i) => (
                <div key={i}>
                  <p className="text-gray-500" style={{ fontSize: "10px" }}>{a.year}</p>
                  <p className="text-white font-semibold leading-snug" style={{ fontSize: "12px" }}>{a.title}</p>
                  <p className="text-gray-400" style={{ fontSize: "11px" }}>{a.org}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <section>
            <h3 className="font-black tracking-[0.2em] uppercase border-b border-white/20 pb-1.5 mb-2.5 text-gray-300" style={{ fontSize: "12px" }}>{t.projects}</h3>
            <div className="space-y-2.5">
              {data.projects.map((p, i) => (
                <div key={i}>
                  <p className="font-bold text-white" style={{ fontSize: "12px" }}>{p.name}</p>
                  {p.description && <p className="text-white/60 leading-relaxed" style={{ fontSize: "11px" }}>{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 p-8 flex flex-col gap-5">

        {/* Header */}
        <header>
          <h1 className="font-bold text-[#323b4c] tracking-tight leading-none" style={{ fontSize: "28px" }}>
            {data.fullName || "Full Name"}
          </h1>
          <p className="text-gray-400 mt-1 tracking-widest uppercase" style={{ fontSize: "13px" }}>
            {t.jobTitle} {data.title || ""}
          </p>
          <div className="w-12 h-0.5 bg-[#323b4c] mt-3" />
        </header>

        {/* About */}
        {data.summary && (
          <section>
            <h2 className="font-black uppercase tracking-[0.2em] text-[#323b4c] border-b border-gray-100 pb-1.5 mb-2" style={{ fontSize: "12px" }}>{t.about}</h2>
            <p className="text-gray-500 leading-relaxed" style={{ fontSize: "12px" }}>{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experiences?.length > 0 && (
          <section>
            <h2 className="font-black uppercase tracking-[0.2em] text-[#323b4c] border-b border-gray-100 pb-1.5 mb-3" style={{ fontSize: "12px" }}>{t.experience}</h2>
            <div className="space-y-3.5">
              {data.experiences.map((exp, i) => (
                <div key={i} className="flex gap-4">
                  <div className="font-bold text-gray-300 w-16 pt-0.5 shrink-0 leading-snug" style={{ fontSize: "11px" }}>
                    {exp.start}<br />{exp.current ? t.present : exp.end}
                  </div>
                  <div className="flex-1 border-l border-gray-100 pl-4">
                    <p className="font-bold text-[#323b4c]" style={{ fontSize: "14px" }}>{exp.role}</p>
                    <p className="text-gray-500" style={{ fontSize: "12px" }}>{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
                    {exp.description && <p className="text-gray-400 mt-1 leading-relaxed" style={{ fontSize: "11px" }}>{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.educations?.length > 0 && (
          <section>
            <h2 className="font-black uppercase tracking-[0.2em] text-[#323b4c] border-b border-gray-100 pb-1.5 mb-3" style={{ fontSize: "12px" }}>{t.education}</h2>
            <div className="space-y-3.5">
              {data.educations.map((edu, i) => (
                <div key={i} className="flex gap-4">
                  <div className="font-bold text-gray-300 w-16 pt-0.5 shrink-0 leading-snug" style={{ fontSize: "11px" }}>
                    {edu.start}<br />{edu.end}
                  </div>
                  <div className="flex-1 border-l border-gray-100 pl-4">
                    <p className="font-bold text-[#323b4c]" style={{ fontSize: "14px" }}>{edu.degree}</p>
                    <p className="text-gray-500" style={{ fontSize: "12px" }}>{edu.institution}</p>
                    {edu.field && <p className="text-gray-400" style={{ fontSize: "11px" }}>{edu.field}</p>}
                    {edu.gpa && <p className="text-gray-400" style={{ fontSize: "11px" }}>GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <section>
            <h2 className="font-black uppercase tracking-[0.2em] text-[#323b4c] border-b border-gray-100 pb-1.5 mb-3" style={{ fontSize: "12px" }}>{t.projects}</h2>
            <div className="space-y-3">
              {data.projects.map((p, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-[#323b4c]" style={{ fontSize: "14px" }}>{p.name}</p>
                    {p.tech && (
                      <span className="text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded" style={{ fontSize: "10px" }}>{p.tech}</span>
                    )}
                  </div>
                  {p.description && <p className="text-gray-400 mt-0.5 leading-relaxed" style={{ fontSize: "11px" }}>{p.description}</p>}
                  <div className="flex gap-3 mt-0.5">
                    {p.demo && <p className="text-blue-400" style={{ fontSize: "11px" }}>{p.demo}</p>}
                    {p.github && <p className="text-gray-400" style={{ fontSize: "11px" }}>{p.github}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skillList.length > 0 && (
          <section>
            <h2 className="font-black uppercase tracking-[0.2em] text-[#323b4c] border-b border-gray-100 pb-1.5 mb-2" style={{ fontSize: "12px" }}>{t.skills}</h2>
            <div className="flex flex-wrap gap-1.5">
              {skillList.map((s, i) => (
                <span key={i} className="px-2.5 py-0.5 bg-gray-50 border border-gray-100 rounded text-gray-600" style={{ fontSize: "11px" }}>{s}</span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages?.length > 0 && (
          <section>
            <h2 className="font-black uppercase tracking-[0.2em] text-[#323b4c] border-b border-gray-100 pb-1.5 mb-2" style={{ fontSize: "12px" }}>{t.languages}</h2>
            <div className="flex flex-wrap gap-4">
              {data.languages.map((l, i) => (
                <div key={i}>
                  <span className="font-bold text-[#323b4c]" style={{ fontSize: "13px" }}>{l.name}</span>
                  {l.level && <span className="text-gray-400 ml-1" style={{ fontSize: "12px" }}>— {l.level}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {data.awards?.length > 0 && (
          <section>
            <h2 className="font-black uppercase tracking-[0.2em] text-[#323b4c] border-b border-gray-100 pb-1.5 mb-2" style={{ fontSize: "12px" }}>{t.awards}</h2>
            <div className="space-y-2">
              {data.awards.map((a, i) => (
                <div key={i} className="flex gap-4">
                  <div className="font-bold text-gray-300 w-16 pt-0.5 shrink-0" style={{ fontSize: "11px" }}>{a.year}</div>
                  <div className="flex-1 border-l border-gray-100 pl-4">
                    <p className="font-bold text-[#323b4c]" style={{ fontSize: "14px" }}>{a.title}</p>
                    <p className="text-gray-500" style={{ fontSize: "12px" }}>{a.org}</p>
                    {a.description && <p className="text-gray-400 mt-0.5" style={{ fontSize: "11px" }}>{a.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {data.references?.length > 0 && (
          <section>
            <h2 className="font-black uppercase tracking-[0.2em] text-[#323b4c] border-b border-gray-100 pb-1.5 mb-2" style={{ fontSize: "12px" }}>{t.references}</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.references.map((ref, i) => (
                <div key={i} className="text-gray-600">
                  <p className="font-bold text-[#323b4c]" style={{ fontSize: "14px" }}>{ref.name}</p>
                  <p className="text-gray-500 font-semibold" style={{ fontSize: "12px" }}>{ref.role}</p>
                  {ref.phone && <p style={{ fontSize: "11px" }}>{ref.phone}</p>}
                  {ref.email && <p className="text-gray-400" style={{ fontSize: "11px" }}>{ref.email}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}