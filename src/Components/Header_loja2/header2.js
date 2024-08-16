import './header2.css'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function Header2(){

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.reload();
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        window.location.reload();
        localStorage.removeItem('token')
        navigate("/login");
    };

    return(
        <header className='header-other'>
            <Link className="logo" to="/store1/home"> GR2 </Link>
            <Link className="cadastros" to="/"> Orçamentos </Link>
            <Link className="cadastros" to="/"> Nota Fiscal </Link>
            <Link className="cadastros" to="/"> Boletos </Link>
            <Link className="cadastros" to="/"> Mercadoria </Link>
            <Link className="cadastros" to="/"> Moeda </Link>
           
           
        <div className="dropdown-other">
            <div className="dropdown-toggle-other">Cadastros gerais</div>
            <div className="dropdown-menu-other">
                <Link className="dropdown-item-other" to="/ufd/register">Registro de UF</Link>
                <Link className="dropdown-item-other" to="/empresa/register">Registro de empresa</Link>
                <Link className="dropdown-item-other" to="/cadastros/item4">Registro de fornecedor</Link>
            </div>
        </div>
           
            <div className='auth'>
                <button className='SignOut-other' onClick={handleLogout}>Sair</button>
            </div> 
        
        </header>
    )
}


export default Header2;