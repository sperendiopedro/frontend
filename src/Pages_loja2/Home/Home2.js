import React from 'react';
import './home2.css';
import { Link } from 'react-router-dom';

const Home2 = () => {
    return (
        <div className="home2-div">
           
        <h1 className='home2-titulo'> ATENÇÃO! </h1>
        <br/> 
        <h1 className='home2-subtitulo'> SITE AINDA EM CONSTRUÇÃO  </h1>
        <h1 className='home2-subtitulo'> Por enquanto apenas a parte de cadastros funcionando! </h1>
        
        <div className='home2-emp-redirect'> 
            <p> OBSERVAÇÃO: O REGISTRO DE EMRPESA NÃO FICARÁ EXPOSTO, PARA ACESSAR  </p>
            <Link className='home2-emp-redirect-link' to="/empresa/register">CLIQUE AQUI</Link>
        </div>

        </div>
    );
}

export default Home2;