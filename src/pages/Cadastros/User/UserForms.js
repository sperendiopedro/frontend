import "./user.css"
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

    const aoDigitar = (e) => {
        const { name, value } = e.target;
        setObjUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const cadastrar = () => {
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
                // Reset form
                setObjUser({
                    nome: '', 
                    setor: '',
                    email: '',
                    password: '',
                    userRole: ''
                });
            } else {
                alert("Erro ao salvar o usuário.");
            }
        })
        .catch(error => {
            console.error("Erro ao salvar o usuário:", error);
            alert("Erro ao salvar o usuário.");
        });
    };
    const navigate = useNavigate(); // Criar a instância de navigate
    
    const cancel = ()=>{
        setObjUser(
            {
                nome: '', 
                setor: '',
                email: '',
                password: '',
                userRole: ''
            });
        navigate('/login');
    };



    return (    
       <form>
          <div className='classic-user'>
            <h1 className="title">Registro de usuário:</h1>
            <br></br>
            <input 
                type="text" 
                onChange={aoDigitar} 
                name='nome' 
                value={objUser.nome}
                placeholder="Nome" 
                className="form-control"
            /> 
            <input 
                type="text" 
                onChange={aoDigitar} 
                name='setor' 
                value={objUser.setor}
                placeholder="Setor" 
                className="form-control"
            /> 
            <input 
                type="email" 
                onChange={aoDigitar} 
                name='email' 
                value={objUser.email}
                placeholder="Email" 
                className="form-control"
            />
            <input 
                type="password" 
                onChange={aoDigitar} 
                name='password' 
                value={objUser.password}
                placeholder="Senha" 
                className="form-control"
            />
            <input 
                type="text" 
                onChange={aoDigitar} 
                name='userRole' 
                value={objUser.userRole}
                placeholder="Permissões" 
                className="form-control"
            />
                
                <div className="button-group">
                    <input 
                        type="button" 
                        value="Inserir" 
                        onClick={cadastrar} 
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
    )
}

export default UserForms;