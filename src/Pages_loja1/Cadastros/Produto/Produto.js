import { useState, useEffect } from "react";
import "./Produto.css"

function Produto(){
   
    const[objProd, setObjProd] = useState({
        prodEmp: {id: null},
        descr: '',
        obs: ''
    });

    useEffect( () => {
        const store = localStorage.getItem('store'); 
        const idStore = store === 'store1' ? 1 : 2;
        setObjProd(prevState => ({
            ...prevState,
            prodEmp:{id: Number(idStore)}
        }));
    }, []);

    const handleChange = (e) => {
        const{ name, value } = e.target;
        setObjProd(prevState => ({
            ...prevState,
                [name] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const token = localStorage.getItem('token'); 
        try{
            const response = await fetch('http://localhost:8080/produto/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(objProd)
            });

            if ( response.ok ) {
                alert('Produto registrado com sucesso!');
                window.location.reload();
                setObjProd({
                    prodEmp:{id: Number(localStorage.getItem('idStore'))},
                    descr:'', 
                    obs:''
                })
            }else{
               const errorText = await response.errorText;
               alert("Erro ao inserir objeto: ", errorText, "!"); 
            }
        }catch (err) {
            alert('An error occurred:', err); 
        }
    }

    const handleCancel = () =>{
        setObjProd({
            prodEmp:{id: Number(localStorage.getItem('idStore'))},
            descr:'',
            obs:''
        })
    }
    
    return (
        <div className="produto-principal-div">
            <h1 className="produto-titulo">Registro de produto</h1>
            <form className="produto-form"> 
                <div className="produto-form-group">
                    <label className="produto-label"> Descrição: </label>
                    <input 
                        type="text" 
                        onChange={handleChange}
                        value={objProd.descr}
                        name="descr"
                        className="produto-form-control"
                    />
                </div>
                <div className="produto-form-group">
                    <label className="produto-label">Observação</label>
                    <input 
                        type="text" 
                        onChange={handleChange}
                        value={objProd.obs}
                        name="Observação"
                        className="produto-form-control-obs"
                    /> 
                </div>
            </form>

                <div className="produto-button-group">
                    <input 
                        type="submit" 
                        onClick={handleSubmit}
                        value="inserir"
                        className="btn produto-btn-register" 
                    /> 
        
                    <input 
                        type="button"
                        onClick={handleCancel}
                        value="Cancelar"
                        className="btn produto-btn-cancel"
                    />
                </div>
        </div>
    );
}
export default Produto; 