import { useForm, Controller } from 'react-hook-form';
import { client } from '../../client';
import { Form } from '@base-ui/react/form';
import { Field } from '@base-ui/react/field';

interface FormValues {
  username_or_email: string;
  password: string;
}

export function LoginForm({ showSignupModal }: { showSignupModal: () => void }) {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      username_or_email: '',
      password: '',
    },
  });

  async function submitForm(data: FormValues) {
    await client.login(data);
    // handle here
  }

  return (
    <Form
      className="flex flex-col justify-center items-center gap-5"
      aria-label="Login to Lemmy"
      onSubmit={handleSubmit(submitForm)}
    >
      <Controller
        name="username_or_email"
        control={control}
        rules={{
          required: 'Email or username is required.',
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
              placeholder="Email or Username"
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

      <div className="flex flex-col gap-3 self-start ml-14">
        <button className="text-primary w-fit hover:text-primary-hover">Forgot password?</button>

        <span>
          New to Lemmy?{' '}
          <button type="button" onClick={showSignupModal} className="text-primary w-fit hover:text-primary-hover">
            Sign Up
          </button>
        </span>
      </div>

      <button
        className="w-90 h-12 mt-5 text-sm font-bold text-neutral-content-strong rounded-full bg-brand-background hover:bg-brand-background-hover"
        type="submit"
      >
        Log In
      </button>
    </Form>
  );
}
