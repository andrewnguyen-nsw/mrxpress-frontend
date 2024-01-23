'use client';

import { useAuth } from '@context/useAuth';
import { Button, Input, Link, Spacer } from '@nextui-org/react';
import { sendLoginRequest } from '@services/authService';
import { validateEmail, validateRequired } from '@utils/formValidation';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useMemo, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [recaptcha, setRecaptcha] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const recaptchaRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Check for valid email and password before proceeding
    if (isEmailInvalid || isPasswordInvalid) {
      enqueueSnackbar('Please fill in all required fields.', {
        variant: 'error',
      });
      return;
    }

    // Check for reCAPTCHA completion
    if (!recaptcha) {
      enqueueSnackbar('Please complete the reCAPTCHA.', { variant: 'error' });
      return;
    }

    const payload = {
      email,
      password,
      'g-recaptcha-response': recaptcha,
    };

    // Attempt to send login request and handling response
    try {
      const response = await sendLoginRequest(payload);
      if (response.code !== 1000) {
        enqueueSnackbar(response.msg, { variant: 'error' });
        recaptchaRef.current.reset();
      } else {
        enqueueSnackbar('Login successfully!', { variant: 'success' });
        login(response.data.access_token);

        // Navigate based on the repair step stored in local storage
        let repairStep = JSON.parse(localStorage.getItem('repair_step'));
        if (repairStep) {
          router.push('/book');
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Memoized values for email and password validation
  const isEmailInvalid = useMemo(() => {
    return isEmailTouched && !validateEmail(email);
  }, [isEmailTouched, email]);
  const isPasswordInvalid = useMemo(() => {
    return isPasswordTouched && !validateRequired(password);
  }, [isPasswordTouched, password]);

  return (
    <div className='mb-3 flex min-h-[75vh] items-center justify-center rounded-xl bg-foreground px-4 py-8 sm:px-20'>
      <div className='md:w-1/2 lg:w-1/3'>
        <h2 className='mb-5 text-center text-2xl font-bold md:text-3xl'>
          Login
        </h2>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col gap-3'>
            {/* Email Input */}
            <Input
              label='Email'
              type='email'
              onValueChange={setEmail}
              isInvalid={isEmailInvalid}
              errorMessage={isEmailInvalid && 'Please enter a valid email.'}
              onBlur={() => setIsEmailTouched(true)}
            />

            {/* Password Input */}
            <Input
              label='Password'
              type='password'
              onValueChange={setPassword}
              isInvalid={isPasswordInvalid}
              errorMessage={isPasswordInvalid && 'Password cannot be empty.'}
              onBlur={() => setIsPasswordTouched(true)}
            />

            {/* Forgot Password Link */}
            <Link
              href='forgot-password'
              className='flex justify-end italic'
              size='sm'
            >
              Forgot password?
            </Link>

            {/* Google reCAPTCHA */}
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_CLIENT_SECRET}
              onChange={setRecaptcha}
            />

            {/* Login Button */}
            <Button type='submit'>Login</Button>

            {/* Link to Register Page */}
            <div className='flex justify-center'>
              <p className='text-sm '>Don&apos;t have an account? </p>
              <Spacer x={1} />
              <Link href='register' className='text-sm'>
                Register now
              </Link>
            </div>
          </div>
        </form>
        <div className='mt-6 flex justify-center'>
          <Button
            as={Link}
            href='https://technician.mrxpress.com.au/technician/auth/login'
            variant='faded'
          >
            Login as a Technician
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
