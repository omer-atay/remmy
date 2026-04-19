import { Modal } from './Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import { createPortal } from 'react-dom';

export function LoginModal({ onClose, showSignupModal }: { onClose: () => void; showSignupModal: () => void }) {
  return createPortal(
    <Modal onClose={onClose}>
      <h1 className="text-neutral-content-strong font-bold text-2xl text-center leading-7">Log In</h1>

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

      <LoginForm showSignupModal={showSignupModal} />
    </Modal>,
    document.body,
  );
}
