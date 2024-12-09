// import HamburgerSidebar from "@/components/client/appSidebar";
// import Sidebar from "@/components/client/Headers";
import Navbar from "@/components/client/MainNav";
import Top10Movies from "@/components/client/Top10Movies";
// import { Sidebar } from "lucide-react";

function Dashboard() {
  return (
    <>
      <Navbar />

      <body>
        <Top10Movies />
      </body>
      </>
  );
}

export default Dashboard;

