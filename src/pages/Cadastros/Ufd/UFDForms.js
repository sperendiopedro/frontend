import { useState } from "react";
import "./ufd.css"; 


function UFDForms() {
    const [objUfd, setObjUfd] = useState({
        nome: '',
        sigla: '', 
        aliqIcms: 0 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjUfd(prevState => ({
            ...prevState,
            [name]: name === 'aliqIcms' ? Number(value) : value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/ufd/saveUfd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objUfd)
        });

        if (response.ok) {
            console.log('UFD registered successfully');
            setObjUfd({
                nome: '',
                sigla: '',
                aliqIcms: 0 
            });
        } else {
            console.error('Failed to register UFD');
        }
    };

    const handleCancel = () => {
        setObjUfd({
            nome: '',
            sigla: '',
            aliqIcms: 0 
        });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <p>{JSON.stringify.objUfd}</p>
            <h1 className="title">Registro de UFD</h1>
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

            <button type="submit" className="btn btn-primary">
                Inserir
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancelar
            </button>
        </form>
    );
}

export default UFDForms;