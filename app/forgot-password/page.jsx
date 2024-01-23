"use client";

import { useState, useMemo, useRef } from "react";
import { validateEmail } from "@utils/formValidation";
import { Button, Input } from "@nextui-org/react";
import { useSnackbar } from "notistack";
import ReCAPTCHA from "react-google-recaptcha";
import { sendForgotPasswordRequest } from "@services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const isEmailInvalid = useMemo(() => {
    return isEmailTouched && !validateEmail(email);
  }, [isEmailTouched, email]);
  const [recaptcha, setRecaptcha] = useState("");
  const recaptchaRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isEmailInvalid) {
      enqueueSnackbar("Please enter a valid email.", {
        variant: "error",
      });
      return;
    }

    try {
      const response = await sendForgotPasswordRequest({
        email,
        "g-recaptcha-response": recaptcha,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-foreground mb-3 rounded-xl px-4 sm:px-20 py-8 min-h-[75vh] flex items-center justify-center">
      <div className="md:w-1/2 lg:w-2/5 flex flex-col gap-3">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Forgot your password?
        </h2>
        <p className="text-center">
          Enter the email address associated with your account and we’ll send
          you a link to reset your password.
        </p>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <Input
            label="Email"
            type="email"
            variant="bordered"
            onValueChange={setEmail}
            isInvalid={isEmailInvalid}
            errorMessage={isEmailInvalid && "Please enter a valid email."}
            onBlur={() => setIsEmailTouched(true)}
          />
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Le3AzApAAAAALxr8rITcgCOmjHh8LA13P6HmtLP"
            onChange={setRecaptcha}
          />
          <Button type="submit" fullWidth>
            Send email
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
