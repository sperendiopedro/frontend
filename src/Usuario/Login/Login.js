import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { Link } from 'react-router-dom';

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
            const response = await fetch('http://10.0.0.193:8080/user/authenticate', {
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
                setError('Credenciais invalidas: ' + errorText); 
            }
        } catch (err) {
            setError('Erro de autenticação!');
            console.error('Erro de autenticação:', err);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            handleLogin();
        }
    };

    return (
        <div className='login-div'>
            <h1 className='login-title'> Bem vindo(a)!</h1>
            <h2 className='login-subtitle'>Entre para continuar </h2>
            <br/>
            <input 
                type="email" 
                placeholder="Email" 
                className='login-form-control'
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                onKeyDown={handleKeyDown} 
            />
            <input 
                type="password" 
                className='login-form-control'
                placeholder="Senha" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onKeyDown={handleKeyDown} 
            />

            <Link className='login-password-recover' to='/user/password/recover'>Esqueceu sua senha?</Link>
            
            <select 
                className='login-option-control' 
                value={store} 
                onChange={(e) => setStore(e.target.value)} 
                onKeyDown={handleKeyDown} 
            >
                <option value="">Selecione a loja</option>
                <option value="store1">Loja 1</option>
                <option value="store2">Loja 2</option>
            </select>
                
            {error && <p className='error-message'>{error}</p>}
            
           
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
