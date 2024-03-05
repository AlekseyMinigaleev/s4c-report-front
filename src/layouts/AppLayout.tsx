import { Outlet } from "react-router-dom";
import Footer from "../widgets/footer/Footer";

export default function AppLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
