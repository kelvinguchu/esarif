import LoginForm from "@/components/auth/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "e-Sarif | Login",
  description:
    "Login to your e-Sarif account to manage your mobile and crypto wallets.",
};

export default function LoginPage() {
  return <LoginForm />;
}
