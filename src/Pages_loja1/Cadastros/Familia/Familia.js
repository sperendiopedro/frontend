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
        <div className="familia-principal-div">
            <h1 className="familia-titulo">Registro de familia</h1>
            <form className="familia-form" onSubmit={handleSubmit}>
                <div className="familia-form-group"> 
                    <label className="familia-label"> Descrição: </label>
                    <input 
                        type="text" 
                        onChange={handleChange}
                        value={objFam.descr}
                        name="descr" 
                        className="familia-form-control"
                    /> 
                </div>
                <div className="familia-form-group">    
                    <label className="familia-label"> Observação: </label>
                    <input 
                        type="text" 
                        onChange={handleChange}
                        value={objFam.obs}
                        name="obs"
                        className="familia-form-control-obs"
                    /> 
                </div>
            </form>             

                <div className="familia-button-group">
                    <input 
                        type="submit" 
                        value="inserir"
                        className="btn familia-btn-register" 
                    /> 
        
                    <input 
                        type="button"
                        onClick={handleCancel}
                        value="Cancelar"
                        className="btn familia-btn-cancel"
                    />
                </div>

        </div>
    );
}

export default Familia; 