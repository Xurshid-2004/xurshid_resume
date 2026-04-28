"use client";
import { motion } from "framer-motion";
import type { Dispatch, SetStateAction, ChangeEvent } from "react";
import SidebarContent from "./SidebarContent";
import type { Language, ResumeData } from "../dashboard/ResumeContext";

type Labels = Record<string, string>;

interface MobileSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
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

const MobileSidebar = ({
  sidebarOpen,
  setSidebarOpen,
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
}: MobileSidebarProps) => {
  return (
    <motion.aside
      className="fixed inset-0 z-50 lg:hidden flex"
      initial={{ x: "-100%" }}
      animate={{ x: sidebarOpen ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setSidebarOpen(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: sidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Sidebar Content */}
      <div
        className="relative w-80 bg-slate-900 flex flex-col overflow-y-auto p-5 shadow-2xl mobile-sidebar-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`
          .mobile-sidebar-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {/* Close Button */}
       

        {/* Logo + Title */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="px-2 py-1 bg-slate-700 rounded-lg text-sm font-bold text-slate-300"
          >
            Yopish
          </button>

        {/* Sidebar Content */}
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
    </motion.aside>
  );
};

export default MobileSidebar;
