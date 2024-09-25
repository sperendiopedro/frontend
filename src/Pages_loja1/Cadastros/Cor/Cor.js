import { useState, useEffect } from "react";
import "./Cor.css";

function Cor(){
    const[objCor, setObjCor] = useState({
        corEmp: {id: null},
        descr: '',
        obs: ''
    });

    useEffect( () => {
        const store = localStorage.getItem('store'); 
        const idStore = store === 'store1' ? 1 : 2;
        setObjCor(prevState => ({
            ...prevState,
            corEmp:{id: Number(idStore)}
        }));
    }, []);

    const handleChange = (e) => {
        const{ name, value } = e.target;
        setObjCor(prevState => ({
            ...prevState,
                [name] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const token = localStorage.getItem('token'); 
        try{
            const response = await fetch("https://grego-backend-1fc83ac18599.herokuapp.com/cor/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(objCor)
            });

            if ( response.ok ) {
                alert('Acabamento registrado com sucesso!');
                window.location.reload();
                setObjCor({
                    corEmp:{id: Number(localStorage.getItem('idStore'))},
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
        window.location.reload(); 
        setObjCor({
            corEmp:{id: Number(localStorage.getItem('idStore'))},
            descr:'',
            obs:''
        })
    }
   
    return (
        <div className="cor-principal-div">
            <h1 className="cor-titulo">Registro de cor</h1>
            <form className="cor-form" > 
                <div className="cor-form-group">
                    <label className="cor-label"> Descrição: </label>
                    <input 
                        type="text" 
                        onChange={handleChange}
                        value={objCor.descr}
                        name="descr"
                        className="cor-form-control"
                    /> 
                </div> 

                <div className="cor-form-group">  
                    <label className="cor-label">Observação: </label>
                    <input
                        type="text"
                        onChange={handleChange}
                        value={objCor.obs}
                        name="obs"
                        className="cor-form-control-obs"
                    />
                </div>    
            </form>    
            
            <div className="cor-button-group">
                <input 
                    type="submit" 
                    onClick={handleSubmit}
                    value="inserir"
                    className="btn cor-btn-register" 
                /> 
    
                <input 
                    type="button"
                    onClick={handleCancel}
                    value="Cancelar"
                    className="btn cor-btn-cancel"
                />
            </div>
        
        </div>
    )
}

export default Cor; 