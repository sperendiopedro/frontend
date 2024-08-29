import { useEffect, useState } from "react";
import "./Familia.css"

function Familia(){

    const[objFam, setObjFam] = useState({
        famEmp: {id: null},
        descr: '',
        obs: ''
    });

    useEffect( () => {
        const store = localStorage.getItem('store'); 
        const idStore = store === 'store1' ? 1 : 2;
        setObjFam(prevState => ({
            ...prevState,
            famEmp:{id: Number(idStore)}
        }));
    }, []);

    const handleChange = (e) => {
        const{ name, value } = e.target;
        setObjFam(prevState => ({
            ...prevState,
                [name] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const token = localStorage.getItem('token'); 
        try{
            const response = await fetch('http://localhost:8080/familia/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(objFam)
            });

            if ( response.ok ) {
                alert('UFD registered successfully');
                window.location.reload();
                setObjFam({
                    famEmp:{id: Number(localStorage.getItem('idStore'))},
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
        setObjFam({
            famEmp:{id: Number(localStorage.getItem('idStore'))},
            descr:'',
            obs:''
        })
    }
    
    return (
        <div className="familia-loja1">
            <form className="familia-form" onSubmit={handleSubmit} > 
                <h1 className="familia-titulo">Registro de familia</h1>
                <br></br>
                <input 
                    type="text" 
                    onChange={handleChange}
                    value={objFam.descr}
                    name="descr"
                    placeholder="Descrição" 
                    className="familia-form-control"
                /> 
                 <input 
                    type="text" 
                    onChange={handleChange}
                    value={objFam.obs}
                    name="Observação"
                    className="familia-form-control"
                    placeholder="Observação" 
                /> 

                <div className="button-familia-group">
                    <input 
                        type="submit" 
                        value="inserir"
                        className="btn btn-familia-register" 
                    /> 
        
                    <input 
                        type="button"
                        onClick={handleCancel}
                        value="Cancelar"
                        className="btn btn-familia-cancel"
                    />
                </div>
            </form>
        </div>
    );
}

export default Familia; 