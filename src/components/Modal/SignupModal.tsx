import { createPortal } from 'react-dom';
import { Modal } from './Modal';
import { SignupForm } from '../SignupForm.tsx/SignupForm';

export function SignupModal({ onClose, showLoginModal }: { onClose: () => void; showLoginModal: () => void }) {
  return createPortal(
    <Modal onClose={onClose}>
      <h1 className="text-neutral-content-strong font-bold text-2xl text-center leading-7">Sign Up</h1>

      <p className="leading-5 text-center mt-2 mb-4">
        By continuing, you agree to Lemmy's{' '}
        <a className="text-primary hover:underline" target="_blank" href="https://legal.lemmy.world/tos/">
          Terms of Service
        </a>{' '}
        and{' '}
        <a className="text-primary hover:underline" target="_blank" href="https://legal.lemmy.world/privacy-policy/">
          Privacy Policy
        </a>
        .
      </p>

      <SignupForm showLoginModal={showLoginModal} />
    </Modal>,
    document.body,
  );
}
