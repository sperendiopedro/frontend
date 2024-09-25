import { useEffect, useState } from "react";
import "./Familia2.css"

function Familia2(){

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
            const response = await fetch('https://grego-backend-1fc83ac18599.herokuapp.com/familia/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(objFam)
            });

            if ( response.ok ) {
                alert('Objeto empresa cadastrado com sucesso!');
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
        <div className="familia2-principal-div">
            <h1 className="familia2-titulo">Registro de familia</h1>
            <form className="familia2-form" onSubmit={handleSubmit}>
                <div className="familia2-form-group"> 
                    <label className="familia2-label"> Descrição: </label>
                    <input 
                        type="text" 
                        onChange={handleChange}
                        value={objFam.descr}
                        name="descr" 
                        className="familia2-form-control"
                    /> 
                </div>
                <div className="familia2-form-group">    
                    <label className="familia2-label"> Observação: </label>
                    <input 
                        type="text" 
                        onChange={handleChange}
                        value={objFam.obs}
                        name="obs"
                        className="familia2-form-control-obs"
                    /> 
                </div>
            </form>             

                <div className="familia2-button-group">
                    <input 
                        type="submit" 
                        value="inserir"
                        onClick={handleSubmit}
                        className="btn familia2-btn-register" 
                    /> 
        
                    <input 
                        type="button"
                        onClick={handleCancel}
                        value="Cancelar"
                        className="btn familia2-btn-cancel"
                    />
                </div>

        </div>
    );
}

export default Familia2; 