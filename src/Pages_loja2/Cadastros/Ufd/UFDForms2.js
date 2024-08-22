import { useState, useEffect } from "react";
import "./UFD2.css"; 

function UFDForms2() {
    const [objUfd, setObjUfd] = useState({
        ufd_emp: { id: 0 },
        nome: '',
        sigla: '', 
        aliqIcms: 0 
    });


    useEffect(() => {
        const store = localStorage.getItem('store');
        const idStore = store==='store1' ? 1 : 2;  
        setObjUfd(prevState => ({
            ...prevState,
            ufd_emp: { id: Number(idStore) } 
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
            const response = await fetch('http://localhost:8080/ufd/saveUfd', {
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
                    ufd_emp: { id: Number(localStorage.getItem('idStore')) },
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
            ufd_emp: { id: Number(localStorage.getItem('idStore')) },
            nome: '',
            sigla: '',
            aliqIcms: 0 
        });
    };


    return (
        <div className="home-loja2">
            <form className="ufd-form" onSubmit={handleSubmit}> 
                <h1 className="ufd-titulo">Registro de estado</h1>
                <br></br>
                <input 
                    type="text" 
                    name="nome"
                    placeholder="Nome do Estado" 
                    className="form-control" 
                    value={objUfd.nome}
                    onChange={handleChange}
                /> 
                <input 
                    type="text" 
                    name="sigla"
                    placeholder="Sigla" 
                    className="form-control" 
                    value={objUfd.sigla}
                    onChange={handleChange}
                /> 
                <input 
                    type="text" 
                    name="aliqIcms"
                    placeholder="Aliq_ICMS" 
                    className="form-control" 
                    value={objUfd.aliqIcms}
                    onChange={handleChange}
                /> 

                <div className="button-ufd-group">
                    <input 
                        type="submit" 
                        value="inserir"
                        className="btn btn-user-register" 
                    /> 
        
                    <input 
                        type="button"
                        value="Cancelar"
                        onClick={handleCancel}
                        className="btn btn-user-cancel"
                    />
                </div>
            </form>
        </div>
    );
}

export default UFDForms2;