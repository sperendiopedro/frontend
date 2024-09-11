import { useState, useEffect } from "react";
import "./UFD2.css"; 

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
            const response = await fetch('https://localhost:8443/ufd/saveUfd', {
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
        <div className="ufd2-loja2">
            <div className='ufd2-content'></div>
                <h1 className="ufd2-titulo">Registro de estado</h1>
                <form className="ufd2-form" onSubmit={handleSubmit}> 
                    <br></br>
                    <input 
                        type="text" 
                        name="nome"
                        placeholder="Nome do Estado" 
                        className="ufd2-form-control" 
                        value={objUfd.nome}
                        onChange={handleChange}
                    /> 
                    <input 
                        type="text" 
                        name="sigla"
                        placeholder="Sigla" 
                        className="ufd2-form-control" 
                        value={objUfd.sigla}
                        onChange={handleChange}
                    /> 
                    <input 
                        type="number" 
                        name="aliqIcms"
                        placeholder="Aliq_ICMS" 
                        className="ufd2-form-control" 
                        value={objUfd.aliqIcms}
                        onChange={handleChange}
                    /> 
        
                    <div className="button-ufd2-group">
                        <input 
                            type="submit" 
                            value="inserir"
                            className="btn btn-ufd2-register" 
                        /> 
            
                        <input 
                            type="button"
                            value="Cancelar"
                            onClick={handleCancel}
                            className="btn btn-ufd2-cancel"
                        />
                    </div>
                </form>
        </div>
    );
}

export default UFDForms2;