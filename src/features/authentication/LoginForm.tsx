import { useState } from "react";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import Input from "@/ui/Input";
import FormRowVertical from "@/ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "@/ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("pass1234");
  const { login, isLoggingIn } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          disabled={isLoggingIn}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoggingIn}>
          {!isLoggingIn ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
