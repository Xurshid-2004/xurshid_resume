"use client";

import { ReactNode } from "react";
import { Drawer } from "vaul";
import type { CSSProperties } from "react";

export default function DrawerShell({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  return (
    <Drawer.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" />
        <Drawer.Content
          className="fixed z-50 focus:outline-none"
          style={{
            left: "clamp(4px, 2vw, 8px)",
            top: "clamp(4px, 1vh, 8px)",
            bottom: "clamp(4px, 1vh, 8px)",
            width: "clamp(300px, 90vw, 380px)",
          } as CSSProperties}
        >
          <div className="bg-white h-full w-full flex flex-col rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 shrink-0">
              <Drawer.Title className="font-black text-lg text-zinc-900">{title}</Drawer.Title>
              <button onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 font-bold transition-colors text-sm">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">{children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
