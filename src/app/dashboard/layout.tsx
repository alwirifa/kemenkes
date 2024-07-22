import Header from "@/components/dashboard/header/header";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Suspense>
        <main className="flex-grow">{children}</main>
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
