import { useState, useEffect } from "react";
import "./ufd.css"; 

function UFDForms() {
    const [objUfd, setObjUfd] = useState({
        ufdEmp: { id: null },
        nome: '',
        sigla: '', 
        aliqIcms: 0
    });

    useEffect(() => {
        const store = localStorage.getItem('store');
        const idStore = store === 'store1' ? 1 : 2;  
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
            const response = await fetch('http://localhost:8443/ufd/saveUfd', {
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
                const errorText = await response.text(); 
                console.error('Failed to register UFD:', errorText);
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
        <div className="ufd-principal-div">
            <h1 className="ufd-titulo">Cadastro de estados</h1>
            <form className="ufd-form">  
           
                <div className="ufd-form-group"> 
                    <label className="ufd-label">Nome do estado: </label>
                    <input 
                        type="text" 
                        name="nome" 
                        className="ufd-form-control" 
                        value={objUfd.nome}
                        onChange={handleChange}
                    /> 
                </div>
           
                <div className="ufd-form-group">
                    <label className="ufd-label">Sigla: </label>
                    <input 
                        type="text" 
                        name="sigla"
                        className="ufd-form-control" 
                        value={objUfd.sigla}
                        onChange={handleChange}
                    /> 
                </div>
               
                <div className="ufd-form-group">
                    <label className="ufd-label">Aliquota icms: </label>
                    <input 
                        type="number" 
                        name="aliqIcms" 
                        className="ufd-form-control" 
                        value={objUfd.aliqIcms}
                        onChange={handleChange}
                    /> 
                </div>
           
            </form>
        

            <div className="ufd-button-group">
                    <input 
                        type="submit" 
                        value="Inserir"
                        onClick={handleSubmit}
                        className="btn ufd-btn-register" 
                    /> 
        
                    <input 
                        type="button"
                        value="Cancelar"
                        onClick={handleCancel}
                        className="btn ufd-btn-cancel"
                    />
                </div>
        
        </div>
    );
}

export default UFDForms;
