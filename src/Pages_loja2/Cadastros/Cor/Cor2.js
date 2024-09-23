import { useState, useEffect } from "react";
import "./Cor2.css";

function Cor2(){
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
            const response = await fetch('http://localhost:8443/cor/register', {
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
        <div className="cor2-principal-div">
            <h1 className="cor2-titulo">Registro de cor</h1>
            <form className="cor2-form" > 
                <div className="cor2-form-group">
                    <label className="cor2-label"> Descrição: </label>
                    <input 
                        type="text" 
                        onChange={handleChange}
                        value={objCor.descr}
                        name="descr"
                        className="cor2-form-control"
                    /> 
                </div> 

                <div className="cor2-form-group">  
                    <label className="cor2-label">Observação: </label>
                    <input
                        type="text"
                        onChange={handleChange}
                        value={objCor.obs}
                        name="obs"
                        className="cor2-form-control-obs"
                    />
                </div>    
            </form>    
            
            <div className="cor2-button-group">
                <input 
                    type="submit" 
                    onClick={handleSubmit}
                    value="inserir"
                    className="btn cor2-btn-register" 
                /> 
    
                <input 
                    type="button"
                    onClick={handleCancel}
                    value="Cancelar"
                    className="btn cor2-btn-cancel"
                />
            </div>
        
        </div>
    )
}

export default Cor2; 