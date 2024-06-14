import Footer from "@/components/footer/footer";
import Header from "@/components/header";
import Container from "@/components/home/Container";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
