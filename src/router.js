import { BrowserRouter, Routes, Route } from "react-router-dom";
import UFDForms from "./pages/Cadastros/Ufd/UFDForms";
import UserForms from "./pages/Cadastros/User/UserForms";
import Header from "./components/Header"; 
import UFDList from "./pages/Cadastros/Ufd/UFDList";
import EmpForms from "./pages/Cadastros/Empresa/EmpForms";
import Fornec from "./pages/Cadastros/Fornecedor/Fornec";
import Login from "./pages/Login/Login";
import PrivateRoute from './privateRoutes';

function RoutesApp() {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica se o usuário está autenticado

  return (
    <BrowserRouter>
      {isAuthenticated && <Header />} {/* Renderiza o Header apenas se o usuário estiver autenticado */}
      <Routes> 
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        
        {/* Rotas Privadas */}
        <Route path="/user/register" element={<UserForms/>} />
        <Route path="/ufd/register" element={<PrivateRoute element={<UFDForms />} />} />
        <Route path="/ufd/list" element={<PrivateRoute element={<UFDList />} />} />
        <Route path="/empresa/register" element={<PrivateRoute element={<EmpForms />} />} />
        <Route path="/fornec/register" element={<PrivateRoute element={<Fornec />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;