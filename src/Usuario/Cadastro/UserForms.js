import "./user.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserForms() {
    const [objUser, setObjUser] = useState({
        nome: '', 
        setor: '',
        email: '',
        password: '',
    });

    const [confirmPassword, setConfirmPassword] = useState(''); // Estado para a confirmação de senha
    const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro

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

        // Verifica se a senha e a confirmação de senha são diferentes
        if (value !== objUser.password) {
            setErrorMessage('As senhas não coincidem.');
        } else {
            setErrorMessage(''); // Limpa a mensagem de erro quando as senhas coincidem
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

        fetch("http://10.0.0.193:8080/user/register", {
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
        });
    };

    const navigate = useNavigate(); 
    
    const cancel = () => {
        setObjUser({
            nome: '', 
            setor: '',
            email: '',
            password: ''
        });
        setConfirmPassword(''); 
        navigate('/login');
    }; 

    return (    
        <form onSubmit={handleSubmit}>
            <div className='classic-user'>
                <h1 className="title-user">Registrar</h1>
                <br></br>
                <input 
                    type="text" 
                    onChange={handleChange} 
                    name='nome' 
                    value={objUser.nome}
                    placeholder="Nome completo" 
                    className="form-control"
                /> 
                <input 
                    type="text" 
                    onChange={handleChange} 
                    name='setor' 
                    value={objUser.setor}
                    placeholder="Setor" 
                    className="form-control"
                /> 
                <input 
                    type="email" 
                    onChange={handleChange} 
                    name='email' 
                    value={objUser.email}
                    placeholder="exemplo@email.com" 
                    className="form-control"
                />

                <input 
                    type="password" 
                    onChange={handleChange} 
                    name='password' 
                    value={objUser.password}
                    placeholder="Senha" 
                    className="form-control"
                />

                <input 
                    type="password" 
                    onChange={handleConfirmPasswordChange} 
                    value={confirmPassword}
                    placeholder="Confirme a senha" 
                    className="form-control"
                />
                {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
         
                <div className="button-user-group">
                    <input 
                        type="submit" 
                        value="Inserir" 
                        className="btn btn-user-register" 
                    /> 
        
                    <input 
                        type="button" 
                        value="Cancelar" 
                        onClick={cancel}
                        className="btn btn-user-cancel"
                    />
                </div>
            </div>
        </form>
    );
}

export default UserForms;
