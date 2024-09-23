import { useState, useEffect } from "react";
import "./Ufd2.css"; 

function UFDForms2() {
    const [objUfd, setObjUfd] = useState({
        ufdEmp: { id: 0 },
        nome: '',
        sigla: '', 
        aliqIcms: 0 
    });


    useEffect(() => {
        const store = localStorage.getItem('store');
        const idStore = store==='store1' ? 1 : 2;  
        setObjUfd(prevState => ({
            ...prevState,
            ufdEmp: { id: Number(idStore) } 
        }));
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjUfd(prevState => ({
            ...prevState,
            [name]: name === 'aliqIcms' ? Number(value) : value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8443/ufd/saveUfd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(objUfd)
            });
    
            if (response.ok) {
                console.log('UFD registered successfully');
                setObjUfd({
                    ufdEmp: { id: Number(localStorage.getItem('idStore')) },
                    nome: '',
                    sigla: '',
                    aliqIcms: 0 
                });
            } else {
                const store = localStorage.getItem('store');
                const idStore = store==='store1' ? 1 : 2; 
                const errorText = await response.text(); 
                console.error('Failed to register UFD:', errorText); 
                console.log('teste', idStore);

                
            }
        } catch (err) {
            console.error('An error occurred:', err); 
        }
    };

    const handleCancel = () => {
        setObjUfd({
            ufdEmp: { id: Number(localStorage.getItem('idStore')) },
            nome: '',
            sigla: '',
            aliqIcms: 0 
        });
    };


    return (
        <div className="ufd2-principal-div">
                <h1 className="ufd2-titulo">Registro de estado</h1>
                <form className="ufd2-form"> 
                   <div className="ufd2-form-group">
                        <label className="ufd2-label">Nome do estado: </label>
                        <input 
                            type="text" 
                            name="nome"
                            className="ufd2-form-control" 
                            value={objUfd.nome}
                            onChange={handleChange}
                        /> 
                    </div>
                    
                    <div className="ufd2-form-group"> 
                        <label className="ufd2-label">Sigla:</label>
                        <input 
                            type="text" 
                            name="sigla"
                            className="ufd2-form-control" 
                            value={objUfd.sigla}
                            onChange={handleChange}
                        /> 
                    </div>
                    
                    <div className="ufd2-form-group"> 
                    <label className="ufd2-label">Aliquota ICMS:</label>
                        <input 
                            type="number" 
                            name="aliqIcms"
                            className="ufd2-form-control" 
                            value={objUfd.aliqIcms}
                            onChange={handleChange}
                        /> 
                    </div>
                </form>     
                    
                    <div className="ufd2-button-group">
                        
                        <input 
                            type="submit" 
                            value="inserir"
                            onClick={handleSubmit}
                            className="btn ufd2-btn-register" 
                        /> 
            
                        <input 
                            type="button"
                            value="Cancelar"
                            onClick={handleCancel}
                            className="btn ufd2-btn-cancel"
                        />
                    </div>
        </div>
    );
}

export default UFDForms2;