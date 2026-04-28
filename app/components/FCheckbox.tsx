"use client";

export default function FCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded accent-indigo-500" />
      <span className="text-xs text-zinc-600">{label}</span>
    </label>
  );
}
