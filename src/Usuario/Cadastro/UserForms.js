import "./user.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserForms() {
    const [objUser, setObjUser] = useState({
        nome: '', 
        setor: '',
        email: '',
        password: '',
    });

    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (value !== objUser.password) {
            setErrorMessage('As senhas não coincidem.');
        } else {
            setErrorMessage(''); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        const { nome, setor, email, password } = objUser;

        if (!nome || !setor || !email || !password || !confirmPassword) {
            alert("Preencha todos os campos!");
            return; 
        }

        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        fetch("https://grego-backend-1fc83ac18599.herokuapp.com/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objUser)
        })
        .then(response => {
            if (response.ok) {
                alert("Usuário salvo com sucesso!");
                setObjUser({
                    nome: '', 
                    setor: '',
                    email: '',
                    password: ''
                });
                setConfirmPassword(''); 
                navigate("/login");
            } else {
                alert("Erro ao salvar o usuário.");
            }
        })
        .catch(error => {
            console.error("Erro ao salvar o usuário:", error);
            alert("Erro ao salvar o usuário.");
            window.location.reload();
        });
    };

    const navigate = useNavigate(); 

    return (    
        <form onSubmit={handleSubmit}>
            <div className="user-principal-div">
                <h1 className="user-title">Registrar</h1>
                <h2 className="user-subtitle">Faça o registro para ter acesso à aplicação!</h2>
                <br />
                
                <div className="input-group">    
                    <input 
                        type="text" 
                        onChange={handleChange} 
                        name='nome' 
                        value={objUser.nome}
                        className="input"
                        required
                    /> 
                    <label className="user-label">Nome completo:</label>
                </div>   
                
                <div className="input-group">
                    <input 
                        type="text" 
                        onChange={handleChange} 
                        name='setor' 
                        value={objUser.setor}
                        className="input"
                        required
                    /> 
                    <label className="user-label">Setor:</label>
                </div>   

                <div className="input-group">
                    <input 
                        type="email" 
                        onChange={handleChange} 
                        name='email' 
                        value={objUser.email}
                        className="input"
                        required
                    />
                    <label className="user-label">Email:</label>
                </div>   

                <div className="input-group">
                    <input 
                        type="password" 
                        onChange={handleChange} 
                        name='password' 
                        value={objUser.password}
                        className="input"
                        required
                    />
                    <label className="user-label">Senha:</label>
                </div>   

                <div className="input-group">
                    <input 
                        type="password" 
                        onChange={handleConfirmPasswordChange} 
                        value={confirmPassword}
                        className="input"
                        required
                    />
                    <label className="user-label">Confirme sua senha:</label>
                </div>   

                {errorMessage && <p className="user-register-error">{errorMessage}</p>}
         
                <input 
                    type="submit" 
                    value="Inserir" 
                    className="user-btn-register" 
                /> 

                <div className="user-login-redirect">
                    <p>Já possui uma conta? Faça</p>  
                    <Link className="user-login-redirect-link" to="/login">Login</Link>
                </div>
            </div>
        </form>
    );
}

export default UserForms;
