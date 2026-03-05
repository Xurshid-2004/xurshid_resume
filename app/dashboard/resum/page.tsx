"use client";

import { useResume } from "../ResumeContext";

const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='150' height='150' fill='%231a1a2e'/%3E%3Ccircle cx='75' cy='55' r='30' fill='%232d2d4e'/%3E%3Cellipse cx='75' cy='135' rx='48' ry='38' fill='%232d2d4e'/%3E%3C/svg%3E`;

const i18n = {
  en: {
    contact: "Contact", skills: "Skills", languages: "Languages",
    projects: "Projects", awards: "Awards", about: "About Me",
    experience: "Experience", education: "Education", references: "References",
    present: "Present", demo: "Demo", github: "GitHub", phone: "Phone",
    email: "Email", address: "Address", jobTitle: "Specialization:",
  },
  uz: {
    contact: "Aloqa", skills: "Ko'nikmalar", languages: "Tillar",
    projects: "Loyihalar", awards: "Mukofotlar", about: "Men Haqimda",
    experience: "Ish Tajribasi", education: "Ta'lim", references: "Tavsiyalar",
    present: "Hozir", demo: "Demo", github: "GitHub", phone: "Telefon",
    email: "Email", address: "Manzil", jobTitle: "Mutaxassislik:",
  },
  ru: {
    contact: "Контакты", skills: "Навыки", languages: "Языки",
    projects: "Проекты", awards: "Награды", about: "Обо мне",
    experience: "Опыт работы", education: "Образование", references: "Рекомендации",
    present: "Сейчас", demo: "Демо", github: "GitHub", phone: "Телефон",
    email: "Email", address: "Адрес", jobTitle: "Специализация:",
  },
};

export default function Template1() {
  const { data, language } = useResume();
  const t = i18n[language];
  const skillList = data.skills
    ? data.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : ["Leadership", "Communication", "Problem Solving"];

  return (
    <div
      className="w-[210mm] min-h-[297mm] bg-white mx-auto flex overflow-hidden shadow-2xl"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      {/* ── LEFT SIDEBAR ── */}
      <div className="w-[34%] bg-[#1e2535] text-white flex flex-col shrink-0">
        <div className="flex flex-col items-center px-6 pt-8 pb-6 bg-[#16202e]">
          <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-amber-400/50 mb-4 shrink-0">
            <img src={data.photo || PLACEHOLDER} alt="profile" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-center text-white leading-tight tracking-wide font-black" style={{ fontSize: "19px" }}>
            {data.fullName || "Full Name"}
          </h1>
          <p className="text-amber-400 mt-1 text-center tracking-[0.12em] uppercase font-semibold" style={{ fontSize: "12px" }}>
            {t.jobTitle} {data.title || ""}
          </p>
        </div>

        <div className="flex flex-col gap-5 px-6 py-6">
          {/* Contact */}
          <section>
            <h3 className="font-black tracking-[0.2em] uppercase text-amber-400 mb-3 flex items-center gap-2" style={{ fontSize: "12px" }}>
              <span className="w-4 h-[1px] bg-amber-400 inline-block" />{t.contact}
            </h3>
            <div className="space-y-2.5 text-gray-300" style={{ fontSize: "12px" }}>
              {data.phone && (
                <div className="flex gap-2 items-start">
                  <span className="text-amber-400 mt-0.5">▸</span>
                  <div>
                    <p className="text-gray-500 uppercase font-bold" style={{ fontSize: "9px" }}>{t.phone}</p>
                    <p>{data.phone}</p>
                  </div>
                </div>
              )}
              {data.email && (
                <div className="flex gap-2 items-start">
                  <span className="text-amber-400 mt-0.5">▸</span>
                  <div>
                    <p className="text-gray-500 uppercase font-bold" style={{ fontSize: "9px" }}>{t.email}</p>
                    <p>{data.email}</p>
                  </div>
                </div>
              )}
              {data.address && (
                <div className="flex gap-2 items-start">
                  <span className="text-amber-400 mt-0.5">▸</span>
                  <div>
                    <p className="text-gray-500 uppercase font-bold" style={{ fontSize: "9px" }}>{t.address}</p>
                    <p>{data.address}</p>
                  </div>
                </div>
              )}
              {data.linkedin && (
                <div className="flex gap-2 items-start">
                  <span className="text-amber-400 mt-0.5">▸</span>
                  <div>
                    <p className="text-gray-500 uppercase font-bold" style={{ fontSize: "9px" }}>LinkedIn</p>
                    <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 break-all">{data.linkedin}</a>
                  </div>
                </div>
              )}
              {data.github && (
                <div className="flex gap-2 items-start">
                  <span className="text-amber-400 mt-0.5">▸</span>
                  <div>
                    <p className="text-gray-500 uppercase font-bold" style={{ fontSize: "9px" }}>GitHub</p>
                    <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 break-all">{data.github}</a>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          {skillList.length > 0 && (
            <section>
              <h3 className="font-black tracking-[0.2em] uppercase text-amber-400 mb-3 flex items-center gap-2" style={{ fontSize: "12px" }}>
                <span className="w-4 h-[1px] bg-amber-400 inline-block" />{t.skills}
              </h3>
              <ul className="space-y-1.5">
                {skillList.map((s, i) => (
                  <li key={i} className="text-gray-300 flex items-center gap-2" style={{ fontSize: "12px" }}>
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && (
            <section>
              <h3 className="font-black tracking-[0.2em] uppercase text-amber-400 mb-3 flex items-center gap-2" style={{ fontSize: "12px" }}>
                <span className="w-4 h-[1px] bg-amber-400 inline-block" />{t.languages}
              </h3>
              <div className="space-y-1.5">
                {data.languages.map((l, i) => (
                  <div key={i} className="flex justify-between" style={{ fontSize: "12px" }}>
                    <span className="text-gray-300">{l.name}</span>
                    <span className="text-amber-400 font-semibold">{l.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {data.awards?.length > 0 && (
            <section>
              <h3 className="font-black tracking-[0.2em] uppercase text-amber-400 mb-3 flex items-center gap-2" style={{ fontSize: "12px" }}>
                <span className="w-4 h-[1px] bg-amber-400 inline-block" />{t.awards}
              </h3>
              <div className="space-y-3">
                {data.awards.map((a, i) => (
                  <div key={i}>
                    <p className="text-gray-500" style={{ fontSize: "10px" }}>{a.year} · {a.org}</p>
                    <p className="font-semibold text-white leading-snug mt-0.5" style={{ fontSize: "12px" }}>{a.title}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section>
              <h3 className="font-black tracking-[0.2em] uppercase text-amber-400 mb-3 flex items-center gap-2" style={{ fontSize: "12px" }}>
                <span className="w-4 h-[1px] bg-amber-400 inline-block" />{t.projects}
              </h3>
              <div className="space-y-3">
                {data.projects.map((p, i) => (
                  <div key={i}>
                    <p className="font-bold text-white" style={{ fontSize: "12px" }}>{p.name}</p>
                    {p.description && <p className="text-gray-400 mt-0.5 leading-relaxed" style={{ fontSize: "11px" }}>{p.description}</p>}
                    <div className="flex gap-3 mt-1">
                      {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-amber-400 underline hover:text-amber-300" style={{ fontSize: "11px" }}>{t.demo}</a>}
                      {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-amber-400 underline hover:text-amber-300" style={{ fontSize: "11px" }}>{t.github}</a>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col">
        <div className="bg-amber-400 px-8 py-7">
          <h2 className="text-[#1e2535] uppercase tracking-tight leading-none font-black" style={{ fontSize: "36px", letterSpacing: "-0.02em" }}>
            {data.fullName || "Full Name"}
          </h2>
          <p className="text-[#1e2535]/70 mt-2 uppercase tracking-[0.18em] font-bold" style={{ fontSize: "13px" }}>
            {t.jobTitle} {data.title || ""}
          </p>
        </div>

        <div className="px-8 py-6 flex flex-col gap-5">
          {/* About */}
          {data.summary && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] text-[#1e2535] border-b-2 border-amber-400 pb-1 mb-2" style={{ fontSize: "12px" }}>
                {t.about}
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontSize: "12px" }}>{data.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experiences?.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] text-[#1e2535] border-b-2 border-amber-400 pb-1 mb-3" style={{ fontSize: "12px" }}>
                {t.experience}
              </h3>
              <div className="space-y-3.5">
                {data.experiences.map((exp, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-gray-400 w-20 shrink-0 pt-0.5 font-semibold leading-snug" style={{ fontSize: "11px" }}>
                      {exp.start}{exp.end || exp.current ? ` – ${exp.current ? t.present : exp.end}` : ""}
                    </div>
                    <div className="flex-1 border-l-2 border-amber-300 pl-3">
                      <p className="font-black text-[#1e2535]" style={{ fontSize: "14px" }}>{exp.role}</p>
                      <p className="text-amber-600 font-bold" style={{ fontSize: "12px" }}>
                        {exp.company}{exp.location ? ` · ${exp.location}` : ""}
                      </p>
                      {exp.description && (
                        <p className="text-gray-500 mt-1 leading-relaxed" style={{ fontSize: "11px" }}>{exp.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.educations?.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] text-[#1e2535] border-b-2 border-amber-400 pb-1 mb-3" style={{ fontSize: "12px" }}>
                {t.education}
              </h3>
              <div className="space-y-3.5">
                {data.educations.map((edu, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-gray-400 w-20 shrink-0 pt-0.5 font-semibold leading-snug" style={{ fontSize: "11px" }}>
                      {edu.start}{edu.end ? ` – ${edu.end}` : ""}
                    </div>
                    <div className="flex-1 border-l-2 border-amber-300 pl-3">
                      <p className="font-black text-[#1e2535]" style={{ fontSize: "14px" }}>{edu.degree}</p>
                      <p className="text-amber-600 font-bold" style={{ fontSize: "12px" }}>{edu.institution}</p>
                      {edu.field && <p className="text-gray-500" style={{ fontSize: "11px" }}>{edu.field}</p>}
                      {edu.gpa && <p className="text-gray-400" style={{ fontSize: "11px" }}>GPA: {edu.gpa}</p>}
                      {edu.description && <p className="text-gray-400 mt-1 leading-relaxed" style={{ fontSize: "11px" }}>{edu.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] text-[#1e2535] border-b-2 border-amber-400 pb-1 mb-3" style={{ fontSize: "12px" }}>
                {t.projects}
              </h3>
              <div className="space-y-3">
                {data.projects.map((p, i) => (
                  <div key={i} className="border-l-2 border-amber-300 pl-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-black text-[#1e2535]" style={{ fontSize: "14px" }}>{p.name}</p>
                      {p.tech && (
                        <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded font-semibold" style={{ fontSize: "10px" }}>
                          {p.tech}
                        </span>
                      )}
                    </div>
                    {p.description && <p className="text-gray-500 mt-0.5 leading-relaxed" style={{ fontSize: "11px" }}>{p.description}</p>}
                    <div className="flex gap-4 mt-1">
                      {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-amber-500 underline hover:text-amber-400" style={{ fontSize: "11px" }}>{p.demo}</a>}
                      {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 underline hover:text-gray-300" style={{ fontSize: "11px" }}>{p.github}</a>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skillList.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] text-[#1e2535] border-b-2 border-amber-400 pb-1 mb-3" style={{ fontSize: "12px" }}>
                {t.skills}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillList.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded font-semibold" style={{ fontSize: "11px" }}>
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] text-[#1e2535] border-b-2 border-amber-400 pb-1 mb-3" style={{ fontSize: "12px" }}>
                {t.languages}
              </h3>
              <div className="flex flex-wrap gap-5">
                {data.languages.map((l, i) => (
                  <div key={i}>
                    <span className="font-black text-[#1e2535]" style={{ fontSize: "13px" }}>{l.name}</span>
                    {l.level && <span className="text-amber-600 font-semibold ml-1.5" style={{ fontSize: "12px" }}>— {l.level}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {data.awards?.length > 0 && (
            <section>
              <h3 className="font-black uppercase tracking-[0.18em] text-[#1e2535] border-b-2 border-amber-400 pb-1 mb-3" style={{ fontSize: "12px" }}>
                {t.awards}
              </h3>
              <div className="space-y-3">
                {data.awards.map((a, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-gray-400 w-20 shrink-0 pt-0.5 font-semibold" style={{ fontSize: "11px" }}>{a.year}</div>
                    <div className="flex-1 border-l-2 border-amber-300 pl-3">
                      <p className="font-black text-[#1e2535]" style={{ fontSize: "14px" }}>{a.title}</p>
                      <p className="text-amber-600 font-semibold" style={{ fontSize: "12px" }}>{a.org}</p>
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
              <h3 className="font-black uppercase tracking-[0.18em] text-[#1e2535] border-b-2 border-amber-400 pb-1 mb-3" style={{ fontSize: "12px" }}>
                {t.references}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {data.references.map((ref, i) => (
                  <div key={i}>
                    <p className="font-black text-[#1e2535]" style={{ fontSize: "14px" }}>{ref.name}</p>
                    <p className="text-amber-600 font-semibold" style={{ fontSize: "12px" }}>{ref.role}</p>
                    {ref.phone && <p className="text-gray-600" style={{ fontSize: "11px" }}>{ref.phone}</p>}
                    {ref.email && <p className="text-gray-400" style={{ fontSize: "11px" }}>{ref.email}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}