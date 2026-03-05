"use client";

export default function SectionCard({ title, tags, onAdd, color = "emerald" }: { title: string; tags: string[]; onAdd: () => void; color?: string }) {
  const btnCls = {
    emerald: "bg-emerald-600 hover:bg-emerald-500",
    purple: "bg-purple-600 hover:bg-purple-500",
    amber: "bg-amber-600 hover:bg-amber-500",
    blue: "bg-blue-600 hover:bg-blue-500",
    rose: "bg-rose-600 hover:bg-rose-500",
  }[color] || "bg-emerald-600 hover:bg-emerald-500";

  return (
    <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800 hover:border-slate-600 transition-all">
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-sm font-bold text-slate-200">{title}</span>
        <button onClick={onAdd}
          className={`${btnCls} text-white text-[10px] font-black px-3 py-1.5 rounded-full transition-all active:scale-95`}>
          + ADD
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.slice(0, 3).map((tag, i) => (
          <span key={i} className="px-2.5 py-1 bg-slate-900 rounded-lg text-[10px] border border-slate-700 text-slate-400">{tag}</span>
        ))}
        {tags.length > 3 && (
          <span className="px-2.5 py-1 bg-slate-900 rounded-lg text-[10px] border border-slate-700 text-slate-500">+{tags.length - 3}</span>
        )}
      </div>
    </div>
  );
}
