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
            const response = await fetch('http://localhost:8080/acabmat/register', {
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
        <div className="acabmat-loja1">
            <form className="acabmat-form" onSubmit={handleSubmit} > 
                <h1 className="acabmat-titulo">Registro de acabmat</h1>
                <br></br>
                <input 
                    type="text" 
                    onChange={handleChange}
                    value={objAcabmat.descr}
                    name="descr"
                    placeholder="Descrição" 
                    className="acabmat-form-control"
                /> 
                 <input
                    type="text"
                    onChange={handleChange}
                    value={objAcabmat.obs}
                    name="obs"
                    placeholder="Observações"
                    className="acabmat-form-control-obs"
        
                 />

                <div className="button-familia-group">
                    <input 
                        type="submit" 
                        value="inserir"
                        className="btn btn-acabmat-register" 
                    /> 
        
                    <input 
                        type="button"
                        onClick={handleCancel}
                        value="Cancelar"
                        className="btn btn-acabmat-cancel"
                    />
                </div>
            </form>
        </div>
    );
}

export default Acabmat; 