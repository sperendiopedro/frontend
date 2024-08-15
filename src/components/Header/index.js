import './header.css'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Header(){

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.reload();
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.reload();
        navigate("/login");
    };

    return(
        <header>
        
            <Link className="logo" to="/"> Grego </Link>
            <Link className="cadastros" to="/"> Orçamentos </Link>
            <Link className="cadastros" to="/"> Nota Fiscal </Link>
            <Link className="cadastros" to="/"> Boletos </Link>
            <Link className="cadastros" to="/"> Mercadoria </Link>
            <Link className="cadastros" to="/"> Moeda </Link>
           
           
        <div className="dropdown">
            <div className="dropdown-toggle">Cadastros gerais</div>
            <div className="dropdown-menu">
                <Link className="dropdown-item" to="/ufd/register">Registro de UF</Link>
                <Link className="dropdown-item" to="/empresa/register">Registro de empresa</Link>
                <Link className="dropdown-item" to="/cadastros/item4">Registro de fornecedor</Link>
            </div>
        </div>
           
            <div className='auth'>
                <button className='SignOut' onClick={handleLogout}>Sair</button>
            </div> 
        
        </header>
    )
}

export default Header; 