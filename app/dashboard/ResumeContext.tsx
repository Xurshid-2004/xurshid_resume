"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type Language = "uz" | "ru" | "en";

export type ResumeData = {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  photo: string;
  address: string;

  projects: {
    name: string;
    demo: string;
    github: string;
    description: string;
    tech: string;
  }[];

  educations: {
    institution: string;
    degree: string;
    field: string;
    start: string;
    end: string;
    description: string;
    gpa: string;
  }[];

  experiences: {
    company: string;
    role: string;
    location: string;
    start: string;
    end: string;
    description: string;
    current: boolean;
  }[];

  skills: string;
  languages: { name: string; level: string }[];

  awards: { title: string; org: string; year: string; description: string }[];
  references: { name: string; role: string; phone: string; email: string }[];
};

type ResumeContextType = {
  data: ResumeData;
  setData: Dispatch<SetStateAction<ResumeData>>;
  language: Language;
  setLanguage: (lang: Language) => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const initialData: ResumeData = {
  fullName: "",
  title: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  summary: "",
  photo: "",
  address: "",

  projects: [],
  educations: [],
  experiences: [],
  skills: "",
  languages: [],
  awards: [],
  references: [],
};

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ResumeData>(initialData);
  const [language, setLanguageState] = useState<Language>("en");
  const setLanguage = (lang: Language) => setLanguageState(lang);

  return (
    <ResumeContext.Provider value={{ data, setData, language, setLanguage }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
};