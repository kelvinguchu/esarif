import RegisterForm from "@/components/auth/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "e-Sarif | Register",
  description:
    "Create an e-Sarif account to manage your mobile and crypto wallets.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
