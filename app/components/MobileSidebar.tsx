"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import SidebarContent from "./SidebarContent";

interface MobileSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  data: any;
  setData: any;
  t: any;
  handlePhoto: any;
  setDExperience: any;
  setDEducation: any;
  setDProject: any;
  setDSkills: any;
  setDLanguages: any;
  setDAwards: any;
  setDReferences: any;
  handlePDF: any;
  language: any;
  setLanguage: any;
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
      <div className="relative w-80 bg-slate-900 flex flex-col overflow-y-auto p-5 shadow-2xl">
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
          language={language}
          setLanguage={setLanguage}
        />
      </div>
    </motion.aside>
  );
};

export default MobileSidebar;