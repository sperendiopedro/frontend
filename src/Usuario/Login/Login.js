import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { Link } from 'react-router-dom';

//constante login handle
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [store, setStore] = useState(''); 
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if(!email||!password || !store){
            setError("Por favor, preencha todos os campos")
            return;
        }

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
                const token = await response.text();
                localStorage.setItem('token', token);
                localStorage.setItem('store', store); 
                setError('');
                if (store === 'store1') {
                    navigate('/store1/home');
                } else if (store === 'store2') {
                    navigate('/store2/home');
                }
                window.location.reload();
            } else {
                const errorText = await response.text();
                setError('Credenciais inválidas: ' + errorText);
                console.error('Erro da resposta:', errorText);
            }
        } catch (err) {
            setError('Erro de autenticação!');
            console.error('Erro de autenticação:', err);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Impede o comportamento padrão do Enter
            handleLogin();
        }
    };

    return (
        <div className='classic-login'>
            <h1 className='h1-login'>Login</h1>
            <br />
            <input 
                type="email" 
                placeholder="Email" 
                className='form-control-login'
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                onKeyDown={handleKeyDown} 
            />
            <input 
                type="password" 
                className='form-control-login'
                placeholder="Senha" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onKeyDown={handleKeyDown} 
            />
            <select 
                className='form-control-loja' 
                value={store} 
                onChange={(e) => setStore(e.target.value)} 
                onKeyDown={handleKeyDown} 
            >
                <option value="">Selecione a loja</option>
                <option value="store1">Loja 1</option>
                <option value="store2">Loja 2</option>
            </select>
                
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
