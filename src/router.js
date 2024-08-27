import { BrowserRouter, Routes, Route } from "react-router-dom";
import UFDForms from "./Pages_loja1/Cadastros/Ufd/UFDForms";
import UserForms from "./Usuario/Cadastro/UserForms";
import Header from "./Components/Header_loja1"; 
import UFDList from "./Pages_loja1/Cadastros/Ufd/UFDList";
import EmpForms from "./Pages_loja1/Cadastros/Empresa/EmpForms";
import Fornec from "./Pages_loja1/Cadastros/Fornecedor/Fornec";
import Login from "./Usuario/Login/Login";
import PrivateRoute from './privateRoutes';
import Home1 from "./Pages_loja1/Home/Home1";
import Header2 from "./Components/Header_loja2/header2";
import Home2 from "./Pages_loja2/Home/Home2";
import UFDForms2 from "./Pages_loja2/Cadastros/Ufd/UFDForms2";
import Fornec2 from "./Pages_loja2/Cadastros/Fornecedor/Fornec2";



function RoutesApp() {
  const isAuthenticated = !!localStorage.getItem('token'); 
  const selectedStore = localStorage.getItem('store'); 

  return (
    <BrowserRouter>
     {isAuthenticated && (selectedStore === 'store1' ? <Header /> : <Header2 />)}
      <Routes> 
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} /> 
        <Route path="/user/register" element={<UserForms/>} />
       
        <Route path="/store1/home" element={<PrivateRoute element={<Home1 />} />} />
        <Route path="/store2/home" element={<PrivateRoute element={<Home2 />} />} />
        <Route path="/store1/ufd/register" element={<PrivateRoute element={<UFDForms />} />} />
        <Route path="/store2/ufd/register" element={<PrivateRoute element={<UFDForms2 />} />} />
        <Route path="/store1/ufd/list" element={<PrivateRoute element={<UFDList />} />} />
        <Route path="/empresa/register" element={<PrivateRoute element={<EmpForms />} />} />
        <Route path="/store1/fornec/register" element={<PrivateRoute element={<Fornec />} />} />
        <Route path="/store2/fornec/register" element={<PrivateRoute element={<Fornec2 />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;