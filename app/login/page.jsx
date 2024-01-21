"use client";

import { useRef, useState, useMemo } from "react";
import { Input, Button } from "@nextui-org/react";
import ReCAPTCHA from "react-google-recaptcha";
import { validateEmail, validateRequired } from "@utils/formValidation";

const LogIn = () => {
  const [payload, setPayload] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [recaptcha, setRecaptcha] = useState("");
  const recaptchaRef = useRef();

  console.log({
    email,
    password,
    recaptcha,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  const isEmailInvalid = useMemo(() => {
    return isEmailTouched && !validateEmail(email);
  }, [isEmailTouched, email]);

  const isPasswordInvalid = useMemo(() => {
    return isPasswordTouched && !validateRequired(password);
  }, [isPasswordTouched, password]);

  return (
    <div className="bg-foreground mb-3 rounded-xl px-4 sm:px-20 py-8 h-screen">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-5">
          <Input
            label="Email"
            type="email"
            onValueChange={setEmail}
            isInvalid={isEmailInvalid}
            errorMessage={isEmailInvalid && "Please enter a valid email."}
            onBlur={() => setIsEmailTouched(true)}
          />
          <Input
            label="Password"
            type="password"
            onValueChange={setPassword}
            isInvalid={isPasswordInvalid}
            errorMessage={isPasswordInvalid && "Password cannot be empty."}
            onBlur={() => setIsPasswordTouched(true)}
          />
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Le3AzApAAAAALxr8rITcgCOmjHh8LA13P6HmtLP"
            onChange={setRecaptcha}
          />
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
