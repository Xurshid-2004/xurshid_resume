"use client";

import { ReactNode, useState, useRef, useCallback, ChangeEvent } from "react";
import { ResumeProvider, useResume } from "./ResumeContext";
import type { ResumeData } from "./ResumeContext";
import MobileSidebar from "../components/MobileSidebar";
import SidebarContent from "../components/SidebarContent";
import FInput from "../components/FInput";
import FTextarea from "../components/FTextarea";
import FCheckbox from "../components/FCheckbox";
import DrawerShell from "../components/DrawerShell";
import SaveBtn from "../components/SaveBtn";

// ── i18n labels ──────────────────────────────────────────────
const T = {
  en: {
    backToTemplates: "← Templates", createResume: "Build Resume", enterInfo: "Fill in your details",
    profilePhoto: "Profile Photo", uploadPhoto: "Upload Photo",
    fullName: "Full Name", jobTitle: "Job Title", email: "Email", phone: "Phone",
    linkedin: "LinkedIn", github: "GitHub", summary: "About You", address: "Address",
    projects: "Projects", education: "Education", experience: "Experience",
    skills: "Skills", languages: "Languages", awards: "Awards", references: "References",
    add: "+ ADD", save: "Save", download: "Download PDF", saveImage: "Save to Gallery", generatingPdf: "Generating PDF...", generatingImage: "Preparing Image...",
    projectName: "Project Name", demoLink: "Demo Link", githubLink: "GitHub Link",
    description: "Description", technologies: "Technologies",
    institution: "Institution", degree: "Degree", field: "Field of Study",
    startYear: "Start Year", endYear: "End Year", gpa: "GPA",
    company: "Company", role: "Role / Position", location: "Location",
    current: "Currently working here",
    skillsList: "Skills (comma separated)", language: "Language", level: "Proficiency",
    awardTitle: "Award Title", organization: "Organization", year: "Year",
    refName: "Name", refRole: "Role", refPhone: "Phone", refEmail: "Email",
    noTemplate: "No template selected", chooseTemplate: "Choose Template",
    additionalInfo: "Additional info, achievements...",
  },
  uz: {
    backToTemplates: "← Shablonlar", createResume: "Rezyume Yaratish", enterInfo: "Ma'lumotlarni kiriting",
    profilePhoto: "Profil Rasmi", uploadPhoto: "Rasm Yuklash",
    fullName: "To'liq Ism", jobTitle: "Mutaxassislik", email: "Email", phone: "Telefon",
    linkedin: "LinkedIn", github: "GitHub", summary: "O'zingiz Haqingizda", address: "Manzil",
    projects: "Loyihalar", education: "Ta'lim", experience: "Ish Tajribasi",
    skills: "Ko'nikmalar", languages: "Tillar", awards: "Mukofotlar", references: "Tavsiyalar",
    add: "+ QO'SHISH", save: "Saqlash", download: "PDF Yuklab Olish", saveImage: "Galereyaga Saqlash", generatingPdf: "PDF tayyorlanmoqda...", generatingImage: "Rasm tayyorlanmoqda...",
    projectName: "Loyiha Nomi", demoLink: "Demo Havola", githubLink: "GitHub Havola",
    description: "Tavsif", technologies: "Texnologiyalar",
    institution: "O'quv Muassasasi", degree: "Daraja", field: "Yo'nalish",
    startYear: "Boshlangan Yil", endYear: "Tugagan Yil", gpa: "O'rtacha Ball",
    company: "Kompaniya", role: "Lavozim", location: "Manzil",
    current: "Hozir shu yerda ishlayman",
    skillsList: "Ko'nikmalar (vergul bilan)", language: "Til", level: "Daraja",
    awardTitle: "Mukofot Nomi", organization: "Tashkilot", year: "Yil",
    refName: "Ism", refRole: "Lavozim", refPhone: "Telefon", refEmail: "Email",
    noTemplate: "Shablon tanlanmagan", chooseTemplate: "Shablon Tanlash",
    additionalInfo: "Qo'shimcha ma'lumot, yutuqlar...",
  },
  ru: {
    backToTemplates: "← Шаблоны", createResume: "Создать Резюме", enterInfo: "Заполните данные",
    profilePhoto: "Фото профиля", uploadPhoto: "Загрузить фото",
    fullName: "Полное имя", jobTitle: "Должность", email: "Email", phone: "Телефон",
    linkedin: "LinkedIn", github: "GitHub", summary: "О себе", address: "Адрес",
    projects: "Проекты", education: "Образование", experience: "Опыт работы",
    skills: "Навыки", languages: "Языки", awards: "Награды", references: "Рекомендации",
    add: "+ ДОБАВИТЬ", save: "Сохранить", download: "Скачать PDF", saveImage: "Сохранить в галерею", generatingPdf: "Создание PDF...", generatingImage: "Подготовка изображения...",
    projectName: "Название проекта", demoLink: "Demo ссылка", githubLink: "GitHub ссылка",
    description: "Описание", technologies: "Технологии",
    institution: "Учебное заведение", degree: "Степень", field: "Направление",
    startYear: "Год начала", endYear: "Год окончания", gpa: "Средний балл",
    company: "Компания", role: "Должность", location: "Местоположение",
    current: "Работаю здесь сейчас",
    skillsList: "Навыки (через запятую)", language: "Язык", level: "Уровень",
    awardTitle: "Название награды", organization: "Организация", year: "Год",
    refName: "Имя", refRole: "Должность", refPhone: "Телефон", refEmail: "Email",
    noTemplate: "Шаблон не выбран", chooseTemplate: "Выбрать шаблон",
    additionalInfo: "Дополнительная информация, достижения...",
  },
};

// ── Main Inner Layout ─────────────────────────────────────────
const InnerLayout = ({ children }: { children: ReactNode }) => {
  const { data, setData, language, setLanguage } = useResume();
  const t = T[language];
  const previewRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [exporting, setExporting] = useState<"pdf" | "image" | null>(null);

  // Drawer states
  const [dProject, setDProject] = useState(false);
  const [dEducation, setDEducation] = useState(false);
  const [dExperience, setDExperience] = useState(false);
  const [dSkills, setDSkills] = useState(false);
  const [dLanguages, setDLanguages] = useState(false);
  const [dAwards, setDAwards] = useState(false);
  const [dReferences, setDReferences] = useState(false);

  // Temp states for forms
  const [tmpProject, setTmpProject] = useState({ name: "", demo: "", github: "", description: "", tech: "" });
  const [tmpEdu, setTmpEdu] = useState({ institution: "", degree: "", field: "", start: "", end: "", description: "", gpa: "" });
  const [tmpExp, setTmpExp] = useState({ company: "", role: "", location: "", start: "", end: "", description: "", current: false });
  const [tmpLang, setTmpLang] = useState({ name: "", level: "" });
  const [tmpAward, setTmpAward] = useState({ title: "", org: "", year: "", description: "" });
  const [tmpRef, setTmpRef] = useState({ name: "", role: "", phone: "", email: "" });

  const setField = (key: keyof ResumeData) => (v: string) =>
    setData((prev) => ({ ...prev, [key]: v }));

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setData((prev) => ({ ...prev, photo: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const buildFileBaseName = useCallback(() => {
    const rawName = (data.fullName || "resume").trim().toLowerCase();
    const safeName = rawName.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "") || "resume";
    const today = new Date().toISOString().split("T")[0];
    return `${safeName}_${today}`;
  }, [data.fullName]);

  const getResumeCanvas = useCallback(async () => {
    const html2canvas = (await import("html2canvas-pro")).default;
    const element = document.querySelector("#resume-print");
    const shell = document.querySelector("#resume-preview-shell");

    if (!(element instanceof HTMLElement)) {
      throw new Error("Resume element not found");
    }

    // Temporarily remove the CSS scale transform so html2canvas captures at full size
    let savedTransform = "";
    let savedTransformOrigin = "";
    if (shell instanceof HTMLElement) {
      savedTransform = shell.style.transform;
      savedTransformOrigin = shell.style.transformOrigin;
      shell.style.transform = "none";
      shell.style.transformOrigin = "top left";
    }

    // Convert modern CSS color functions (lab/oklch/oklab/lch/color()) into rgb so
    // html2canvas-pro can parse them. Next.js production CSS optimizer emits lab(),
    // which works in the browser but breaks html2canvas. Dev mode skips this transform,
    // which is why PDF export works locally but fails on Vercel.
    const probeCtx = document.createElement("canvas").getContext("2d");
    const cssProps = [
      "color",
      "background-color",
      "border-top-color",
      "border-right-color",
      "border-bottom-color",
      "border-left-color",
      "outline-color",
      "text-decoration-color",
      "fill",
      "stroke",
    ];
    const restoreColorFns: Array<() => void> = [];
    const toRgb = (val: string): string | null => {
      if (!val || !probeCtx) return null;
      if (!/lab\(|oklab\(|oklch\(|lch\(|color\(/i.test(val)) return null;
      try {
        probeCtx.fillStyle = "#000";
        probeCtx.fillStyle = val;
        const out = probeCtx.fillStyle as string;
        return typeof out === "string" ? out : null;
      } catch {
        return null;
      }
    };
    const allEls: HTMLElement[] = [element, ...Array.from(element.querySelectorAll<HTMLElement>("*"))];
    allEls.forEach((el) => {
      const cs = getComputedStyle(el);
      cssProps.forEach((prop) => {
        const v = cs.getPropertyValue(prop);
        const rgb = toRgb(v);
        if (rgb && rgb !== v) {
          const prevValue = el.style.getPropertyValue(prop);
          const prevPriority = el.style.getPropertyPriority(prop);
          el.style.setProperty(prop, rgb, "important");
          restoreColorFns.push(() => {
            if (prevValue) el.style.setProperty(prop, prevValue, prevPriority);
            else el.style.removeProperty(prop);
          });
        }
      });
    });

    // Wait for the browser to repaint without the transform
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });
      return canvas;
    } finally {
      // Restore overridden colors
      restoreColorFns.forEach((fn) => fn());
      // Restore the scale transform
      if (shell instanceof HTMLElement) {
        shell.style.transform = savedTransform;
        shell.style.transformOrigin = savedTransformOrigin;
      }
    }
  }, []);

  const downloadBlob = useCallback((blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }, []);

  const handleSaveImage = useCallback(async () => {
    if (typeof window === "undefined") return;
    try {
      setExporting("image");
      const canvas = await getResumeCanvas();
      const fileName = `${buildFileBaseName()}.png`;

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/png", 1);
      });

      if (!blob) {
        throw new Error("Image export failed");
      }

      const file = new File([blob], fileName, { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: fileName });
      } else {
        downloadBlob(blob, fileName);
      }
    } catch (error) {
      console.error("Error saving image:", error);
      alert("Rasmni saqlashda xatolik yuz berdi. Qayta urinib ko‘ring.");
    } finally {
      setExporting(null);
    }
  }, [buildFileBaseName, downloadBlob, getResumeCanvas]);

  const handlePDF = useCallback(async () => {
    if (typeof window === "undefined") return;

    try {
      setExporting("pdf");
      const { jsPDF } = await import("jspdf");
      const canvas = await getResumeCanvas();

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210;
      const pageHeight = 297;

      // Calculate how the image fits into A4
      const imgRatio = canvas.width / canvas.height;
      const pageRatio = pageWidth / pageHeight;

      let imgWidth: number;
      let imgHeight: number;
      let xOffset = 0;
      let yOffset = 0;

      if (imgRatio > pageRatio) {
        // Image is wider than page ratio — fit to width
        imgWidth = pageWidth;
        imgHeight = pageWidth / imgRatio;
      } else {
        // Image is taller — fit to height
        imgHeight = pageHeight;
        imgWidth = pageHeight * imgRatio;
        xOffset = (pageWidth - imgWidth) / 2;
      }

      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);

      // If the image is taller than one page, add more pages
      if (imgHeight > pageHeight) {
        let heightLeft = imgHeight - pageHeight;
        while (heightLeft > 0) {
          pdf.addPage();
          yOffset = -(imgHeight - heightLeft);
          pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      }

      pdf.save(`${buildFileBaseName()}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("PDF tayyorlashda xatolik yuz berdi. Qayta urinib ko‘ring.");
    } finally {
      setExporting(null);
    }
  }, [buildFileBaseName, getResumeCanvas]);

  return (
    <>
      {/* Print Styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #resume-print, #resume-print * { visibility: visible !important; }
          #resume-print { position: fixed !important; inset: 0 !important; transform: none !important; overflow: visible !important; }
          @page { margin: 0; size: A4; }
        }
      `}</style>

      <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col lg:flex-row font-sans overflow-hidden">
        
        {/* ── MOBILE HEADER ──────────────────────────────────── */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="px-4 py-2 bg-emerald-600 rounded-lg text-sm font-bold"
          >
            ☰ Menu
          </button>
          <h2 className="text-sm font-bold text-slate-200">{t.createResume}</h2>
        </div>

        {/* ── DESKTOP SIDEBAR ─────────────────────────────────── */}
        <aside className="hidden lg:flex lg:flex-col lg:w-[420px] lg:h-screen bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 overflow-y-auto">
          <div
            className="flex-1 overflow-y-auto desktop-sidebar-scroll"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`
              .desktop-sidebar-scroll::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <SidebarContent
              data={data}
              setData={setData}
              t={t}
              handlePhoto={handlePhoto}
              setDExperience={setDExperience}
              setDEducation={setDEducation}
              setDProject={setDProject}
              setDSkills={setDSkills}
              setDLanguages={setDLanguages}
              setDAwards={setDAwards}
              setDReferences={setDReferences}
              handlePDF={handlePDF}
              handleSaveImage={handleSaveImage}
              exporting={exporting}
              language={language}
              setLanguage={setLanguage}
            />
          </div>
        </aside>

        {/* ── MOBILE SIDEBAR COMPONENT ─────────────────────────── */}
        <MobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          data={data}
          setData={setData}
          t={t}
          handlePhoto={handlePhoto}
          setDExperience={setDExperience}
          setDEducation={setDEducation}
          setDProject={setDProject}
          setDSkills={setDSkills}
          setDLanguages={setDLanguages}
          setDAwards={setDAwards}
          setDReferences={setDReferences}
          handlePDF={handlePDF}
          handleSaveImage={handleSaveImage}
          exporting={exporting}
          language={language}
          setLanguage={setLanguage}
        />

        {/* ── PREVIEW AREA ───────────────────────────────────── */}
        <main className="flex-1 bg-[#020617] overflow-y-auto min-h-0">
          <div className="flex items-start justify-start lg:justify-center p-3 sm:p-4 lg:p-8 min-h-full overflow-x-auto">
            <div
              id="resume-preview-shell"
              ref={previewRef}
              style={{
                transform: "scale(var(--resume-scale, 0.85))",
                transformOrigin: "top center",
                ["--resume-scale" as string]: "0.85",
              }}
              className="origin-top shrink-0"
            >
              <style>{`
                @media (max-width: 640px) {
                  #resume-print { --resume-scale: 0.45 !important; }
                }
                @media (min-width: 641px) and (max-width: 1024px) {
                  #resume-print { --resume-scale: 0.65 !important; }
                }
              `}</style>
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* ════════════════════════════════════════════════════════
          DRAWERS
      ════════════════════════════════════════════════════════ */}

      {/* Experience Drawer */}
      <DrawerShell open={dExperience} onClose={() => setDExperience(false)} title={t.experience}>
        <FInput label={t.company}   value={tmpExp.company}   onChange={(v) => setTmpExp((p) => ({ ...p, company: v }))} />
        <FInput label={t.role}      value={tmpExp.role}      onChange={(v) => setTmpExp((p) => ({ ...p, role: v }))} />
        <FInput label={t.location}  value={tmpExp.location}  onChange={(v) => setTmpExp((p) => ({ ...p, location: v }))} />
        <div className="grid grid-cols-2 gap-3">
          <FInput label={t.startYear} value={tmpExp.start} onChange={(v) => setTmpExp((p) => ({ ...p, start: v }))} />
          {!tmpExp.current && (
            <FInput label={t.endYear} value={tmpExp.end} onChange={(v) => setTmpExp((p) => ({ ...p, end: v }))} />
          )}
        </div>
        <FCheckbox label={t.current} checked={tmpExp.current} onChange={(v) => setTmpExp((p) => ({ ...p, current: v }))} />
        <FTextarea label={t.description} value={tmpExp.description} onChange={(v) => setTmpExp((p) => ({ ...p, description: v }))} rows={4} />
        <SaveBtn label={t.save} onClick={() => {
          if (!tmpExp.company) return;
          setData((prev) => ({ ...prev, experiences: [...(prev.experiences || []), { ...tmpExp }] }));
          setTmpExp({ company: "", role: "", location: "", start: "", end: "", description: "", current: false });
          setDExperience(false);
        }} />
        {data.experiences?.length > 0 && (  
          <div className="border-t pt-4 mt-2">
            <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Added</p>
            {data.experiences.map((exp, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-zinc-50 rounded-lg mb-2">
                <div>
                  <p className="text-xs font-bold text-zinc-800">{exp.role}</p>
                  <p className="text-[10px] text-zinc-500">{exp.company}</p>
                </div>
                <button onClick={() => setData((p) => ({ ...p, experiences: p.experiences.filter((_, j) => j !== i) }))}
                  className="text-red-400 hover:text-red-600 text-xs font-bold px-2">✕</button>
              </div>
            ))}
          </div>
        )}
      </DrawerShell>

      {/* Education Drawer */}
      <DrawerShell open={dEducation} onClose={() => setDEducation(false)} title={t.education}>
        <FInput label={t.institution} value={tmpEdu.institution} onChange={(v) => setTmpEdu((p) => ({ ...p, institution: v }))} />
        <div className="grid grid-cols-2 gap-3">
          <FInput label={t.degree} value={tmpEdu.degree} onChange={(v) => setTmpEdu((p) => ({ ...p, degree: v }))} />
          <FInput label={t.field}  value={tmpEdu.field}  onChange={(v) => setTmpEdu((p) => ({ ...p, field: v }))} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FInput label={t.startYear} value={tmpEdu.start} onChange={(v) => setTmpEdu((p) => ({ ...p, start: v }))} />
          <FInput label={t.endYear}   value={tmpEdu.end}   onChange={(v) => setTmpEdu((p) => ({ ...p, end: v }))} />
        </div>
        <FInput label={t.gpa} value={tmpEdu.gpa} onChange={(v) => setTmpEdu((p) => ({ ...p, gpa: v }))} />
        <FTextarea label={t.additionalInfo} value={tmpEdu.description} onChange={(v) => setTmpEdu((p) => ({ ...p, description: v }))} rows={3} />
        <SaveBtn label={t.save} onClick={() => {
          if (!tmpEdu.institution) return;
          setData((prev) => ({ ...prev, educations: [...(prev.educations || []), { ...tmpEdu }] }));
          setTmpEdu({ institution: "", degree: "", field: "", start: "", end: "", description: "", gpa: "" });
          setDEducation(false);
        }} />
        {data.educations?.length > 0 && (
          <div className="border-t pt-4 mt-2">
            <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Added</p>
            {data.educations.map((edu, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-zinc-50 rounded-lg mb-2">
                <div>
                  <p className="text-xs font-bold text-zinc-800">{edu.institution}</p>
                  <p className="text-[10px] text-zinc-500">{edu.degree}</p>
                </div>
                <button onClick={() => setData((p) => ({ ...p, educations: p.educations.filter((_, j) => j !== i) }))}
                  className="text-red-400 hover:text-red-600 text-xs font-bold px-2">✕</button>
              </div>
            ))}
          </div>
        )}
      </DrawerShell>

      {/* Project Drawer */}
      <DrawerShell open={dProject} onClose={() => setDProject(false)} title={t.projects}>
        <FInput label={t.projectName} value={tmpProject.name}        onChange={(v) => setTmpProject((p) => ({ ...p, name: v }))} />
        <FInput label={t.demoLink}    value={tmpProject.demo}        onChange={(v) => setTmpProject((p) => ({ ...p, demo: v }))} />
        <FInput label={t.githubLink}  value={tmpProject.github}      onChange={(v) => setTmpProject((p) => ({ ...p, github: v }))} />
        <FInput label={t.technologies} value={tmpProject.tech}       onChange={(v) => setTmpProject((p) => ({ ...p, tech: v }))} />
        <FTextarea label={t.description} value={tmpProject.description} onChange={(v) => setTmpProject((p) => ({ ...p, description: v }))} rows={3} />
        <SaveBtn label={t.save} onClick={() => {
          if (!tmpProject.name) return;
          setData((prev) => ({ ...prev, projects: [...(prev.projects || []), { ...tmpProject }] }));
          setTmpProject({ name: "", demo: "", github: "", description: "", tech: "" });
          setDProject(false);
        }} />
        {data.projects?.length > 0 && (
          <div className="border-t pt-4 mt-2">
            <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Added</p>
            {data.projects.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-zinc-50 rounded-lg mb-2">
                <p className="text-xs font-bold text-zinc-800">{p.name}</p>
                <button onClick={() => setData((prev) => ({ ...prev, projects: prev.projects.filter((_, j) => j !== i) }))}
                  className="text-red-400 hover:text-red-600 text-xs font-bold px-2">✕</button>
              </div>
            ))}
          </div>
        )}
      </DrawerShell>

      {/* Skills Drawer */}
      <DrawerShell open={dSkills} onClose={() => setDSkills(false)} title={t.skills}>
        <FTextarea label={t.skillsList} value={data.skills} onChange={setField("skills")} rows={4} />
        {data.skills && (
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Preview:</p>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.split(",").filter(s => s.trim()).map((s, i) => (
                <span key={i} className="px-3 py-1 bg-zinc-900 text-white rounded-full text-xs font-medium">{s.trim()}</span>
              ))}
            </div>
          </div>
        )}
        <SaveBtn label={t.save} onClick={() => setDSkills(false)} />
      </DrawerShell>

      {/* Languages Drawer */}
      <DrawerShell open={dLanguages} onClose={() => setDLanguages(false)} title={t.languages}>
        <div className="grid grid-cols-2 gap-3">
          <FInput label={t.language} value={tmpLang.name}  onChange={(v) => setTmpLang((p) => ({ ...p, name: v }))} />
          <FInput label={t.level}    value={tmpLang.level} onChange={(v) => setTmpLang((p) => ({ ...p, level: v }))} />
        </div>
        <SaveBtn label={t.save} onClick={() => {
          if (!tmpLang.name) return;
          setData((prev) => ({ ...prev, languages: [...(prev.languages || []), { ...tmpLang }] }));
          setTmpLang({ name: "", level: "" });
        }} />
        {data.languages?.length > 0 && (
          <div className="border-t pt-4 mt-2">
            <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Added</p>
            {data.languages.map((l, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-zinc-50 rounded-lg mb-2">
                <div>
                  <span className="text-xs font-bold text-zinc-800">{l.name}</span>
                  <span className="text-[10px] text-zinc-500 ml-2">— {l.level}</span>
                </div>
                <button onClick={() => setData((p) => ({ ...p, languages: p.languages.filter((_, j) => j !== i) }))}
                  className="text-red-400 hover:text-red-600 text-xs font-bold px-2">✕</button>
              </div>
            ))}
          </div>
        )}
        <button onClick={() => setDLanguages(false)}
          className="w-full py-2.5 border-2 border-zinc-200 rounded-xl text-zinc-600 font-bold text-sm hover:bg-zinc-50 transition-colors mt-1">
          Done
        </button>
      </DrawerShell>

      {/* Awards Drawer */}
      <DrawerShell open={dAwards} onClose={() => setDAwards(false)} title={t.awards}>
        <FInput label={t.awardTitle} value={tmpAward.title} onChange={(v) => setTmpAward((p) => ({ ...p, title: v }))} />
        <div className="grid grid-cols-2 gap-3">
          <FInput label={t.organization} value={tmpAward.org}  onChange={(v) => setTmpAward((p) => ({ ...p, org: v }))} />
          <FInput label={t.year}         value={tmpAward.year} onChange={(v) => setTmpAward((p) => ({ ...p, year: v }))} />
        </div>
        <FTextarea label={t.description} value={tmpAward.description} onChange={(v) => setTmpAward((p) => ({ ...p, description: v }))} rows={2} />
        <SaveBtn label={t.save} onClick={() => {
          if (!tmpAward.title) return;
          setData((prev) => ({ ...prev, awards: [...(prev.awards || []), { ...tmpAward }] }));
          setTmpAward({ title: "", org: "", year: "", description: "" });
          setDAwards(false);
        }} />
        {data.awards?.length > 0 && (
          <div className="border-t pt-4 mt-2">
            {data.awards.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-zinc-50 rounded-lg mb-2">
                <div>
                  <p className="text-xs font-bold text-zinc-800">{a.title}</p>
                  <p className="text-[10px] text-zinc-500">{a.org} · {a.year}</p>
                </div>
                <button onClick={() => setData((p) => ({ ...p, awards: p.awards.filter((_, j) => j !== i) }))}
                  className="text-red-400 hover:text-red-600 text-xs font-bold px-2">✕</button>
              </div>
            ))}
          </div>
        )}
      </DrawerShell>

      {/* References Drawer */}
      <DrawerShell open={dReferences} onClose={() => setDReferences(false)} title={t.references}>
        <FInput label={t.refName}  value={tmpRef.name}  onChange={(v) => setTmpRef((p) => ({ ...p, name: v }))} />
        <FInput label={t.refRole}  value={tmpRef.role}  onChange={(v) => setTmpRef((p) => ({ ...p, role: v }))} />
        <div className="grid grid-cols-2 gap-3">
          <FInput label={t.refPhone} value={tmpRef.phone} onChange={(v) => setTmpRef((p) => ({ ...p, phone: v }))} />
          <FInput label={t.refEmail} type="email" value={tmpRef.email} onChange={(v) => setTmpRef((p) => ({ ...p, email: v }))} />
        </div>
        <SaveBtn label={t.save} onClick={() => {
          if (!tmpRef.name) return;
          setData((prev) => ({ ...prev, references: [...(prev.references || []), { ...tmpRef }] }));
          setTmpRef({ name: "", role: "", phone: "", email: "" });
          setDReferences(false);
        }} />
        {data.references?.length > 0 && (
          <div className="border-t pt-4 mt-2">
            {data.references.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-zinc-50 rounded-lg mb-2">
                <div>
                  <p className="text-xs font-bold text-zinc-800">{r.name}</p>
                  <p className="text-[10px] text-zinc-500">{r.role}</p>
                </div>
                <button onClick={() => setData((p) => ({ ...p, references: p.references.filter((_, j) => j !== i) }))}
                  className="text-red-400 hover:text-red-600 text-xs font-bold px-2">✕</button>
              </div>
            ))}
          </div>
        )}
      </DrawerShell>
    </>
  );
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ResumeProvider>
      <InnerLayout>{children}</InnerLayout>
    </ResumeProvider>
  );
}
