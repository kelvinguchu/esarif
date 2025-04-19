import { Metadata } from "next";
import { ConnectedAccounts } from "@/components/account/connected-accounts";

export const metadata: Metadata = {
  title: "e-Sarif | My Accounts",
  description: "Manage your connected wallets and accounts",
};

export default function AccountPage() {
  return (
    <div className='w-full py-4 px-4 md:px-4 md:py-8'>
      <ConnectedAccounts />
    </div>
  );
}
