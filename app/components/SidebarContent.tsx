"use client";

import FInput from "./FInput";
import FTextarea from "./FTextarea";
import SectionCard from "./SectionCard";
import Link from "next/link";
import type { Dispatch, SetStateAction, ChangeEvent } from "react";
import type { Language, ResumeData } from "../dashboard/ResumeContext";

type Labels = Record<string, string>;

interface SidebarContentProps {
  data: ResumeData;
  setData: Dispatch<SetStateAction<ResumeData>>;
  t: Labels;
  handlePhoto: (e: ChangeEvent<HTMLInputElement>) => void;
  setDExperience: Dispatch<SetStateAction<boolean>>;
  setDEducation: Dispatch<SetStateAction<boolean>>;
  setDProject: Dispatch<SetStateAction<boolean>>;
  setDSkills: Dispatch<SetStateAction<boolean>>;
  setDLanguages: Dispatch<SetStateAction<boolean>>;
  setDAwards: Dispatch<SetStateAction<boolean>>;
  setDReferences: Dispatch<SetStateAction<boolean>>;
  handlePDF: () => void;
  handleSaveImage: () => void;
  exporting: "pdf" | "image" | null;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function SidebarContent({
  data,
  setData,
  t,
  handlePhoto,
  setDExperience,
  setDEducation,
  setDProject,
  setDSkills,
  setDLanguages,
  setDAwards,
  setDReferences,
  handlePDF,
  handleSaveImage,
  exporting,
  language,
  setLanguage,
}: SidebarContentProps) {

  const setField = (key: string) => (v: string) =>
    setData((prev) => ({ ...prev, [key]: v }));

  const expTags = data.experiences?.map((e) => e.company) || [];
  const eduTags = data.educations?.map((e) => e.institution) || [];
  const projTags = data.projects?.map((p) => p.name) || [];
  const langTags = data.languages?.map((l) => l.name) || [];
  const awardTags = data.awards?.map((a) => a.title) || [];
  const refTags = data.references?.map((r) => r.name) || [];

  const skillTags = data.skills
    ? data.skills.split(",").slice(0, 3).map((s: string) => s.trim())
    : [];

  return (
    <div className="flex flex-col gap-5 px-5 pt-5 pb-8">

      {/* BACK TO TEMPLATES BUTTON */}
      <Link href="/">
        <button className="w-full h-9 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 rounded-xl text-sm font-bold transition-all active:scale-95 text-slate-300 border border-slate-700">
          {t.backToTemplates}
        </button>
      </Link>

      {/* TITLE AND LANGUAGE SWITCH */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent">
            {t.createResume}
          </h2>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-0.5">{t.enterInfo}</p>
        </div>
        <div className="flex bg-slate-800 rounded-xl border border-slate-700 p-1">
          {(["uz", "ru", "en"] as Language[]).map((langKey) => (
            <button
              key={langKey}
              onClick={() => setLanguage(langKey)}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                language === langKey
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {langKey.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* PHOTO */}
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          {t.profilePhoto}
        </p>

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700 shrink-0">
            {data.photo ? (
              <img
                src={data.photo}
                alt="photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 text-xl">
                👤
              </div>
            )}
          </div>

          <label className="flex-1 cursor-pointer">
            <div className="h-10 border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl flex items-center justify-center text-slate-500 hover:text-emerald-400 text-xs transition-all font-medium">
              📷 {t.uploadPhoto}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* BASIC INFO */}
      <div className="space-y-3.5">
        <FInput dark label={t.fullName} value={data.fullName} onChange={setField("fullName")} />
        <FInput dark label={t.jobTitle} value={data.title} onChange={setField("title")} />
        <FInput dark label={t.address} value={data.address} onChange={setField("address")} />

        <div className="grid grid-cols-2 gap-3">
          <FInput dark label={t.email} type="email" value={data.email} onChange={setField("email")} />
          <FInput dark label={t.phone} value={data.phone} onChange={setField("phone")} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FInput dark label={t.linkedin} value={data.linkedin} onChange={setField("linkedin")} />
          <FInput dark label={t.github} value={data.github} onChange={setField("github")} />
        </div>

        <FTextarea
          dark
          label={t.summary}
          value={data.summary}
          onChange={setField("summary")}
          rows={3}
        />
      </div>

      <div className="border-t border-slate-800" />

      {/* SECTION CARDS */}
      <div className="space-y-2.5">
        <SectionCard title={t.experience} tags={expTags.length ? expTags : ["Add experience..."]} onAdd={() => setDExperience(true)} color="amber" />
        <SectionCard title={t.education} tags={eduTags.length ? eduTags : ["Add education..."]} onAdd={() => setDEducation(true)} color="purple" />
        <SectionCard title={t.projects} tags={projTags.length ? projTags : ["Add project..."]} onAdd={() => setDProject(true)} color="blue" />
        <SectionCard title={t.skills} tags={skillTags.length ? skillTags : ["Add skills..."]} onAdd={() => setDSkills(true)} color="emerald" />
        <SectionCard title={t.languages} tags={langTags.length ? langTags : ["Add language..."]} onAdd={() => setDLanguages(true)} color="emerald" />
        <SectionCard title={t.awards} tags={awardTags.length ? awardTags : ["Add award..."]} onAdd={() => setDAwards(true)} color="rose" />
        <SectionCard title={t.references} tags={refTags.length ? refTags : ["Add reference..."]} onAdd={() => setDReferences(true)} color="blue" />
      </div>

      {/* DOWNLOAD */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={handleSaveImage}
          disabled={exporting !== null}
          className="py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-400 hover:to-cyan-500 disabled:opacity-70 disabled:cursor-not-allowed font-bold text-white shadow-lg text-sm transition-all active:scale-95"
        >
          🖼️ {exporting === "image" ? t.generatingImage : t.saveImage}
        </button>
        <button
          onClick={handlePDF}
          disabled={exporting !== null}
          className="py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-70 disabled:cursor-not-allowed font-bold text-white shadow-lg text-sm transition-all active:scale-95"
        >
          📄 {exporting === "pdf" ? t.generatingPdf : t.download}
        </button>
      </div>

    </div>
  );
}
