import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";
import ListPage from "../pages/ListPage";
import DetailPage from "../pages/DetailPage";
import EditCreatePage from "../pages/EditCreatePage";
import About from "../pages/About";

export default function AppRouter(){
  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/item/:id" element={<DetailPage />} />
        <Route path="/crear" element={<EditCreatePage mode="create" />} />
        <Route path="/editar/:id" element={<EditCreatePage mode="edit" />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <AppFooter />
    </BrowserRouter>
  );
}
