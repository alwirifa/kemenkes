import Footer from "@/components/footer/footer";
import Header from "@/components/header";
import Container from "@/components/home/Container";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
        <Header />
        <main className="px-3 lg:px-14">{children}</main>
        <Footer />
    </>
  );
};

export default DashboardLayout;
