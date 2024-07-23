import UserHeader from "@/components/user/header/header";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const UserLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <UserHeader />
      <Suspense>
        <main className="flex-grow">{children}</main>
      </Suspense>
    </div>
  );
};

export default UserLayout;
