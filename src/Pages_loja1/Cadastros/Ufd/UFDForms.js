import { useState, useEffect } from "react";
import "./ufd.css"; 


function UFDForms() {
    const [objUfd, setObjUfd] = useState({
        ufdEmp: { id: null },
        nome: '',
        sigla: '', 
        aliqIcms: ''
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
            [name]: name === 'aliqIcms' ? (value === '' ? '' : Number(value)) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8080/ufd/saveUfd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(objUfd)
            });
    
            if (response.ok) {
                alert('UFD registered successfully');
                window.location.reload();

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
                console.log("teste", idStore); 

                
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
        <div className="ufd-loja1">
            <form className="ufd-form" onSubmit={handleSubmit}> 
                <h1 className="ufd-titulo">Cadastro de estados</h1>
                <input 
                    type="text" 
                    name="nome"
                    placeholder="Nome do Estado" 
                    className="ufd-form-control" 
                    value={objUfd.nome}
                    onChange={handleChange}
                /> 
                <input 
                    type="text" 
                    name="sigla"
                    placeholder="Sigla" 
                    className="ufd-form-control" 
                    value={objUfd.sigla}
                    onChange={handleChange}
                /> 
                <input 
                    type="number" 
                    name="aliq_Icms"
                    placeholder="Aliq ICMS" 
                    className="ufd-form-control" 
                    value={objUfd.aliqIcms}
                    onChange={handleChange}
                /> 

                <div className="button-ufd-group">
                    <input 
                        type="submit" 
                        value="inserir"
                        className="btn btn-ufd-register" 
                    /> 
        
                    <input 
                        type="button"
                        value="Cancelar"
                        onClick={handleCancel}
                        className="btn btn-ufd-cancel"
                    />
                </div>
            </form>
        </div>
    );
}

export default UFDForms;