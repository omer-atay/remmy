import { ScrollLock } from '../ScrollLock/ScrollLock';
import { X } from 'lucide-react';
import { type ReactNode } from 'react';
import { Backdrop } from '../Backdrop/Backdrop';

export function Modal({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  return (
    <div className="flex justify-center items-center py-0 sm:py-20 size-full fixed inset-0 z-1001">
      <Backdrop onClick={onClose} />

      <div className="flex flex-col size-full max-h-full sm:w-lg sm:h-fit px-2 sm:px-7 pb-7 pt-18 mx-auto relative z-1001 bg-neutral-background-strong sm:rounded-2xl">
        <button
          className="flex justify-center items-center size-8 absolute right-6 top-6 text-secondary-onBackground bg-secondary-background hover:bg-secondary-background-hover active:bg-secondary-background-selected rounded-full"
          onClick={onClose}
          type="button"
          title="Close modal"
        >
          <X size={20} />
          <span className="sr-only">Close modal</span>
        </button>

        <div className="text-sm text-neutral-content overflow-auto scrollbar-thin scrollbar-neutral-border">
          {children}
        </div>
        <ScrollLock />
      </div>
    </div>
  );
}
