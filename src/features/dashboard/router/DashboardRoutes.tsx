import { Routes, Route } from "react-router-dom";
import CrudPage from "../pages/CrudPage";
import CrudPage2 from "../pages/CrudPage2";

function DashboradRoutes() {
  return (
    <>
      <Routes>
        <Route path="dashboard">
          <Route path="crud" element={<CrudPage2/>} />
        </Route>
      </Routes>
    </>
  );
}

export default DashboradRoutes;
