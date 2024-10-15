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
            <Link className="cadastros" to="/store1/home"> Orçamentos </Link>
            <Link className="cadastros" to="/store1/home"> Nota Fiscal </Link>
            <Link className="cadastros" to="/store1/home"> Boletos </Link>
            <Link className="cadastros" to="/store1/home"> Mercadoria </Link>
            <Link className="cadastros" to="/store1/home"> Moeda </Link>
           

        <div className="dropdown">
            <div className="dropdown-toggle">Contas a pagar</div>
            <div className="dropdown-menu"> 
                <Link className='dropdown-item' to ="/store1/ctpg/cadastro">Cadastro de nota </Link>
            
            
            
            </div>         
        </div>  
           
        <div className="dropdown">
            <div className="dropdown-toggle">Cadastros gerais</div>
            <div className="dropdown-menu">
                <Link className="dropdown-item" to="/store1/ufd/register">Estados</Link>
                <Link className="dropdown-item" to="/store1/fornec/register">Fornecedores</Link>
                <Link className="dropdown-item" to="/store1/familia/register">Familia</Link>
                <Link className="dropdown-item" to="/store1/produto/register">Produto</Link>
                <Link className="dropdown-item" to="/store1/acabmat/register">Acabamentos* </Link>
                <Link className="dropdown-item" to="/store1/cor/register">Cores</Link>
            </div>
        </div>
           
            <div className='auth'>
                <button className='SignOut' onClick={handleLogout}>Sair</button>
            </div> 
        
        </header>
    )
}

export default Header; 