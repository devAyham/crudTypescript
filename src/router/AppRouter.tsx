import { BrowserRouter } from "react-router-dom";
import DashboradRoutes from "../features/dashboard/router/DashboardRoutes";
import MainLayout from "../Layouts/Main/MainLayout";


const AppRouter = () => {
  return (
    <>
    <MainLayout>
      <BrowserRouter>
          <DashboradRoutes/>
      </BrowserRouter>
      </MainLayout>
    </>
  );
};
export default AppRouter;
