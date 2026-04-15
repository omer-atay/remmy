import { ScrollLock } from '../ScrollLock/ScrollLock';
import { X } from 'lucide-react';
import { type ReactNode } from 'react';
import { Backdrop } from '../Backdrop/Backdrop';

export function Modal({ closeModal, children }: { closeModal: () => void; children: ReactNode }) {
  return (
    <div className="flex justify-center items-center size-full fixed inset-0 z-1001">
      <Backdrop onClick={closeModal} />

      <div className="flex clex-col w-lg h-fit px-7 pb-7 pt-14 mx-auto relative z-1001 bg-neutral-background-strong rounded-2xl">
        <button
          className="flex justify-center items-center size-8 absolute right-6 top-6 text-secondary-onBackground bg-secondary-background hover:bg-secondary-background-hover active:bg-secondary-background-selected rounded-full"
          onClick={closeModal}
          type="button"
        >
          <X size={20} />
        </button>

        <div className="text-sm text-neutral-content">{children}</div>
        <ScrollLock />
      </div>
    </div>
  );
}
