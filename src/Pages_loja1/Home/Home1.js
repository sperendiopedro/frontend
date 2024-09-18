import React from 'react';
import './home1.css'; // Importa o CSS específico
import { Link } from 'react-router-dom';

const Home1 = () => {
    return (
        <div className="home-div">
           
        <h1 className='home-titulo'> ATENÇÃO! </h1>
        <br/> 
        <h1 className='home-subtitulo'> SITE AINDA EM CONSTRUÇÃO  </h1>
        <h1 className='home-subtitulo'> Por enquanto apenas a parte de cadastros funcionando! </h1>
        
        <div className='home-emp-redirect'> 
            <p> OBSERVAÇÃO: O REGISTRO DE EMRPESA NÃO FICARÁ EXPOSTO, PARA ACESSAR  </p>
            <Link className='home-emp-redirect-link' to="/empresa/register">CLIQUE AQUI</Link>
        </div>

        </div>
    );
};

export default Home1;
