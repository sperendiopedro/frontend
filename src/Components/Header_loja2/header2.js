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
            <Link className="logo" to="/store2/home"> GR2 </Link>
            <Link className="cadastros" to="/store2/home"> Orçamentos </Link>
            <Link className="cadastros" to="/store2/home"> Nota Fiscal </Link>
            <Link className="cadastros" to="/store2/home"> Boletos </Link>
            <Link className="cadastros" to="/store2/home"> Mercadoria </Link>
            <Link className="cadastros" to="/store2/home"> Moeda </Link>
           
           
        <div className="dropdown-other">
            <div className="dropdown-toggle-other">Cadastros gerais</div>
            <div className="dropdown-menu-other">
                <Link className="dropdown-item-other" to="store2/ufd/register">Estado</Link>
                <Link className="dropdown-item-other" to="store2/fornec/register">Fornecedor</Link>
                <Link className="dropdown-item" to="/store2/familia/register">Familia</Link>
                <Link className="dropdown-item" to="/store2/produto/register">Produto</Link>
                <Link className="dropdown-item" to="/store2/acabmat/register">Acabmat* </Link>
                <Link className="dropdown-item" to="/store2/cor/register">Cor</Link>
            </div>
        </div>
           
           
                <button className='SignOut' onClick={handleLogout}>Sair</button>
           
        
        </header>
    )
}


export default Header2;