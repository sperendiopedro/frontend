import { useState, useEffect } from "react";
import "./Acabmat.css"

function Acabmat(){
    const[objAcabmat, setObjAcabmat] = useState({
        acabmatEmp: {id: null},
        descr: '',
        obs: ''
    });

    useEffect( () => {
        const store = localStorage.getItem('store'); 
        const idStore = store === 'store1' ? 1 : 2;
        setObjAcabmat(prevState => ({
            ...prevState,
            acabmatEmp:{id: Number(idStore)}
        }));
    }, []);

    const handleChange = (e) => {
        const{ name, value } = e.target;
        setObjAcabmat(prevState => ({
            ...prevState,
                [name] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const token = localStorage.getItem('token'); 
        try{
            const response = await fetch("https://grego-backend-1fc83ac18599.herokuapp.com/acabmat/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(objAcabmat)
            });

            if ( response.ok ) {
                alert('Acabamento registrado com sucesso!');
                window.location.reload();
                setObjAcabmat({
                    acabmatEmp:{id: Number(localStorage.getItem('idStore'))},
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
        setObjAcabmat({
            acabmatEmp:{id: Number(localStorage.getItem('idStore'))},
            descr:'',
            obs:''
        })
    }
    
    return (
        <div className="acabmat-principal-div">
            <h1 className="acabmat-titulo">Registro de acabmat</h1>
            <form className="acabmat-form"> 
                
                <div className="acabmat-form-group">
                    <label className="acabmat-label"> Descrição: </label>
                    <input 
                        type="text" 
                        onChange={handleChange}
                        value={objAcabmat.descr}
                        name="descr"
                        className="acabmat-form-control"
                    /> 
                </div> 

                <div className="acabmat-form-group">  
                    <label className="acabmat-label">Observação: </label>
                    <input
                        type="text"
                        onChange={handleChange}
                        value={objAcabmat.obs}
                        name="obs"
                        className="acabmat-form-control-obs"
                    />
                </div>    
            </form>    
            
            <div className="acabmat-button-group">
                <input 
                    onClick={handleSubmit}
                    type="submit" 
                    value="inserir"
                    className="btn acabmat-btn-register" 
                /> 
    
                <input 
                    type="button"
                    onClick={handleCancel}
                    value="Cancelar"
                    className="btn acabmat-btn-cancel"
                />
            </div>
        
        </div>
    );
}

export default Acabmat; 