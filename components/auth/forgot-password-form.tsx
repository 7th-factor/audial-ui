'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { AuthFormWrapper } from './auth-form-wrapper';
import { useAuth } from '@/lib/firebase/auth-context';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/lib/validations/auth';

// Check if Firebase emulator is enabled
// Returns false during SSR to prevent hydration mismatch
const isUsingEmulator = (): boolean => {
  if (typeof window === 'undefined') return false;
  return process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true';
};

export function ForgotPasswordForm() {
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const { resetPassword, loading } = useAuth();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // Track client-side mount to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setServerError('');
    setSuccess(false);

    try {
      const { error } = await resetPassword(data.email);
      if (error) {
        setServerError(error.message);
        toast.error(error.message);
      } else {
        setSubmittedEmail(data.email);
        setSuccess(true);
        toast.success('Password reset email sent! Check your inbox.');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setServerError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleTryAgain = () => {
    setSuccess(false);
    setSubmittedEmail('');
    form.reset();
  };

  if (success) {
    return (
      <AuthFormWrapper>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Check your email</h1>
            <p className="text-muted-foreground text-balance">
              We&apos;ve sent a password reset link to {submittedEmail}
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Didn&apos;t receive the email? Check your spam folder or try again.</p>
          </div>
          <Button onClick={handleTryAgain} variant="outline" className="w-full">
            Try again
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            <Link href="/login" className="text-primary hover:underline underline-offset-4">
              Back to sign in
            </Link>
          </div>
        </div>
      </AuthFormWrapper>
    );
  }

  return (
    <AuthFormWrapper>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Reset password</h1>
            <p className="text-muted-foreground text-balance">
              Enter your email address and we&apos;ll send you a link to reset your password
            </p>
            {isMounted && isUsingEmulator() && (
              <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 px-2 py-1 rounded">
                Firebase Emulator Active
              </div>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...form.register('email')}
              disabled={loading}
              aria-invalid={!!form.formState.errors.email}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          {serverError && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {serverError}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send reset link'}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link href="/login" className="text-primary hover:underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </AuthFormWrapper>
  );
}
