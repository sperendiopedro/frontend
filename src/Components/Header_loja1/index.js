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
        window.location.reload();
        localStorage.removeItem('token')
        navigate("/login");
    };

    return(
        <header className='header-one'>
            <Link className="logo" to="/store1/home"> Grego </Link>
            <Link className="cadastros" to="/"> Orçamentos </Link>
            <Link className="cadastros" to="/"> Nota Fiscal </Link>
            <Link className="cadastros" to="/"> Boletos </Link>
            <Link className="cadastros" to="/"> Mercadoria </Link>
            <Link className="cadastros" to="/"> Moeda </Link>
           
           
        <div className="dropdown">
            <div className="dropdown-toggle">Cadastros gerais</div>
            <div className="dropdown-menu">
                <Link className="dropdown-item" to="/store1/ufd/register">Registro de estado</Link>
                <Link className="dropdown-item" to="/store1/fornec/register">Registro de fornecedor</Link>
            </div>
        </div>
           
            <div className='auth'>
                <button className='SignOut' onClick={handleLogout}>Sair</button>
            </div> 
        
        </header>
    )
}

export default Header; 