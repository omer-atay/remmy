import { useForm, Controller } from 'react-hook-form';
import { client } from '../../client';
import { Form } from '@base-ui/react/form';
import { Field } from '@base-ui/react/field';
import { useSuspenseQuery } from '@tanstack/react-query';
import { siteQuery } from '../../queries';
import { Markdown } from '../Markdown/Markdown';
import type { Register } from 'lemmy-js-client';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useSignup } from '../../contexts/useSignupContext';

type FormValues = Register;

export function SignupForm({ showLoginModal }: { showLoginModal: () => void }) {
  const { data } = useSuspenseQuery(siteQuery);
  const { setIsSignupShown } = useSignup();

  const captchaEnabled = data.site_view.local_site.captcha_enabled;

  const { data: captcha, refetch: refetchCaptcha } = useSuspenseQuery({
    queryKey: ['captcha', captchaEnabled],
    queryFn: () => (captchaEnabled ? client.getCaptcha() : { ok: undefined }),
    staleTime: Infinity,
  });

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      password_verify: '',
      answer: '',
      captcha_answer: '',
      captcha_uuid: captcha.ok?.uuid,
    },
  });

  async function submitForm(data: FormValues) {
    const clientAnswer = await client.register(data);

    if (clientAnswer.registration_created) {
      toast('Registration successful!');
      setIsSignupShown(false);
      return;
    }

    toast.error('Something went wrong, please try again.');
    setIsSignupShown(false);
  }

  return (
    <Form
      className="flex flex-col justify-center items-center gap-5"
      aria-label="Login to Lemmy"
      onSubmit={handleSubmit(submitForm)}
    >
      <Controller
        name="username"
        control={control}
        rules={{
          required: 'Username is required.',
        }}
        render={({ field, fieldState }) => (
          <Field.Root
            name={field.name}
            invalid={fieldState.invalid}
            touched={fieldState.isTouched}
            dirty={fieldState.isDirty}
          >
            <Field.Control
              ref={field.ref}
              value={field.value}
              onBlur={field.onBlur}
              onValueChange={field.onChange}
              placeholder="Username"
              className="w-90 h-14 px-4 text-base text-neutral-content-strong bg-secondary-background hover:bg-secondary-background-hover rounded-2xl"
            />
            <Field.Error className="text-danger-content" match={!!fieldState.error}>
              {fieldState.error?.message}
            </Field.Error>
          </Field.Root>
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required.',
        }}
        render={({ field, fieldState }) => (
          <Field.Root
            name={field.name}
            invalid={fieldState.invalid}
            touched={fieldState.isTouched}
            dirty={fieldState.isDirty}
          >
            <Field.Control
              ref={field.ref}
              value={field.value}
              onBlur={field.onBlur}
              onValueChange={field.onChange}
              placeholder="Email"
              className="w-90 h-14 px-4 text-base text-neutral-content-strong bg-secondary-background hover:bg-secondary-background-hover rounded-2xl"
            />
            <Field.Error className="text-danger-content" match={!!fieldState.error}>
              {fieldState.error?.message}
            </Field.Error>
          </Field.Root>
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Password is required.',
        }}
        render={({ field, fieldState }) => (
          <Field.Root
            name={field.name}
            invalid={fieldState.invalid}
            touched={fieldState.isTouched}
            dirty={fieldState.isDirty}
          >
            <Field.Control
              ref={field.ref}
              value={field.value}
              type="password"
              onBlur={field.onBlur}
              onValueChange={field.onChange}
              placeholder="Password"
              className="w-90 h-14 px-4 text-base text-neutral-content-strong bg-secondary-background hover:bg-secondary-background-hover rounded-2xl"
            />
            <Field.Error className="text-danger-content" match={!!fieldState.error}>
              {fieldState.error?.message}
            </Field.Error>
          </Field.Root>
        )}
      />

      <Controller
        name="password_verify"
        control={control}
        rules={{
          required: 'You must verify your password.',
        }}
        render={({ field, fieldState }) => (
          <Field.Root
            name={field.name}
            invalid={fieldState.invalid}
            touched={fieldState.isTouched}
            dirty={fieldState.isDirty}
          >
            <Field.Control
              ref={field.ref}
              value={field.value}
              type="password"
              onBlur={field.onBlur}
              onValueChange={field.onChange}
              placeholder="Verify Password"
              className="w-90 h-14 px-4 text-base text-neutral-content-strong bg-secondary-background hover:bg-secondary-background-hover rounded-2xl"
            />
            <Field.Error className="text-danger-content" match={!!fieldState.error}>
              {fieldState.error?.message}
            </Field.Error>
          </Field.Root>
        )}
      />

      <Markdown>{data.site_view.local_site.application_question}</Markdown>

      <Controller
        name="answer"
        control={control}
        rules={
          data.site_view.local_site.application_question
            ? {
                required: 'You must answer the question.',
              }
            : undefined
        }
        render={({ field, fieldState }) => (
          <Field.Root
            name={field.name}
            invalid={fieldState.invalid}
            touched={fieldState.isTouched}
            dirty={fieldState.isDirty}
          >
            <Field.Control
              render={<textarea />}
              ref={field.ref}
              value={field.value}
              onBlur={field.onBlur}
              placeholder="Answer"
              onValueChange={field.onChange}
              className="w-90 h-22 px-4 py-2 text-base text-neutral-content-strong bg-secondary-background hover:bg-secondary-background-hover rounded-2xl"
            />
            <Field.Error className="text-danger-content" match={!!fieldState.error}>
              {fieldState.error?.message}
            </Field.Error>
          </Field.Root>
        )}
      />

      {captchaEnabled && (
        <>
          <img src={`data:image/png;base64,${captcha.ok?.png ?? ''}`} alt="" />

          <div className="flex justify-center items-center gap-3">
            <button
              onClick={async () => {
                const c = await refetchCaptcha();
                setValue('captcha_uuid', c.data?.ok?.uuid);
              }}
              className="text-neutral-content-strong bg-secondary-background hover:bg-secondary-background-hover active:bg-secondary-background-selected p-3 rounded-2xl"
              type="button"
              title="New captcha"
            >
              <RefreshCw size={20} />
              <span className="sr-only">New captcha</span>
            </button>

            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio src={`data:audio/wav;base64,${captcha.ok?.wav ?? ''}`} controls />
          </div>

          <Controller
            name="captcha_answer"
            control={control}
            rules={{
              required: 'You must enter captcha.',
            }}
            render={({ field, fieldState }) => (
              <Field.Root
                name={field.name}
                invalid={fieldState.invalid}
                touched={fieldState.isTouched}
                dirty={fieldState.isDirty}
              >
                <Field.Control
                  ref={field.ref}
                  value={field.value}
                  onBlur={field.onBlur}
                  onValueChange={field.onChange}
                  placeholder="Captcha"
                  className="w-90 h-14 px-4 text-base text-neutral-content-strong bg-secondary-background hover:bg-secondary-background-hover rounded-2xl"
                />
                <Field.Error className="text-danger-content" match={!!fieldState.error}>
                  {fieldState.error?.message}
                </Field.Error>
              </Field.Root>
            )}
          />
        </>
      )}

      <div className="flex flex-col gap-3 self-start ml-14">
        <span>
          Already have an account?{' '}
          <button onClick={showLoginModal} className="text-primary w-fit hover:text-primary-hover" type="button">
            Log In
          </button>
        </span>
      </div>

      <button
        className="w-90 h-12 mt-5 text-sm font-bold text-neutral-content-strong rounded-full bg-brand-background hover:bg-brand-background-hover"
        type="submit"
      >
        Continue
      </button>
    </Form>
  );
}
