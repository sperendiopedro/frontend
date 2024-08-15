import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import "./Login.css";
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Usar useNavigate para redirecionar

    const handleLogin = async () => {
        const credentials = btoa(`${email}:${password}`);
    
        try {
            const response = await fetch('http://localhost:8080/user/authenticate', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Armazena o JWT no localStorage
                setError('');
                navigate('/user/list'); // Redireciona para uma página protegida usando navigate
            } else {
                setError('Credenciais inválidas');
            }
        } catch (err) {
            setError('Erro de autenticação!');
            console.error(err);
        }
    };

    return (
        <div className='classic'>
            <h1>Login</h1>
            <br />
            <input 
                type="email" 
                placeholder="Email" 
                className='form-control'
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                className='form-control'
                placeholder="Senha" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
                
            {error && <p>{error}</p>}
            <button onClick={handleLogin} className='btn btn-primary'>
                Entrar
            </button>
            
            <div className='teste'> 
                <p>Não tem uma conta?</p>
                <Link className='register' to="/user/register">Registrar</Link>
            </div>
        </div>
    );
};

export default Login;