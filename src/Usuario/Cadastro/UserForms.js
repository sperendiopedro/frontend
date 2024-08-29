import "./user.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserForms() {
    const [objUser, setObjUser] = useState({
        nome: '', 
        setor: '',
        email: '',
        password: '',
        userRole: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        const { nome, setor, email, password} = objUser;

        if (!nome || !setor || !email || !password) {
            alert("Preencha todos os campos!");
            return; 
        }

        fetch("http://localhost:8080/user/register", {
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
        navigate('/login');
    };

    return (    
        <form>
            <div className='classic-user' onSubmit={handleSubmit}>
                <h1 className="title-user">Registro de usuário:</h1>
                <br></br>
                <input 
                    type="text" 
                    onChange={handleChange} 
                    name='nome' 
                    value={objUser.nome}
                    placeholder="Nome" 
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
                    placeholder="Email" 
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
         
                <div className="button-user-group">
                    <input 
                        type="submit" 
                        value="Inserir" 
                        on
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
