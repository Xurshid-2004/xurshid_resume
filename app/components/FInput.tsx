"use client";

export default function FInput({
  label, type = "text", value, onChange, dark = false,
}: { label: string; type?: string; value: string; onChange: (v: string) => void; dark?: boolean }) {
  const bg = dark
    ? "bg-slate-900/60 border-slate-700 text-slate-100 focus:ring-emerald-500 focus:border-emerald-500"
    : "bg-white border-zinc-200 text-zinc-800 focus:ring-indigo-400 focus:border-indigo-400";

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className={`w-full h-11 px-3 pr-9 pt-3 border rounded-xl text-sm outline-none focus:ring-2 transition-all ${bg}`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className={`absolute right-3 top-3 w-5 h-5 flex items-center justify-center rounded-full transition-all duration-150 text-[10px] font-black shrink-0 z-20
            ${dark
              ? "bg-slate-600 hover:bg-red-500 text-slate-300 hover:text-white"
              : "bg-zinc-200 hover:bg-red-500 text-zinc-400 hover:text-white"
            }`}
          tabIndex={-1}
        >
          ✕
        </button>
      )}
    </div>
  );
}
