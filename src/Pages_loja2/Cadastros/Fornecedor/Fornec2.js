import React, { useState, useEffect } from 'react';
import './Fornec2.css'; 

const initialFormState = {
    fornec_emp: { id: 0 },
    fornec_ufd: { id: 0 },
    razSoc: '',
    nomeFant: '',
    end: '',
    bairro: '',
    cep: '',
    municipio: '',
    contato: '',
    dep: '',
    tipoJF: 0,
    cnpj: '',
    inscrMun: '',
    inscrEst: '',
    telefone_1: '',
    telefone_2: '', 
    telefone_3:'',
    email_1: '',
    email_2: '',
    email_3: '',
    desc_1: '',
    desc_2: '',
    desc_3: '',
    desc_4: '',
    desc_5: '',
    desc_6: '',
    diferen: 0,
    rep_1: 0,
    rep_2: 0,
    rep_3: 0,
    rep_4: 0,
    obs: '',
    plan_obs: '',
    bloq: '',
    crd_icms: '',
    pc_cr_icms_1: 0,
    pc_cr_icms_2: 0,
    pc_cr_icms_3: 0
};

function Fornec2() {
    const [ufdOptions, setUfdOptions] = useState([]);
    const [objFornec, setObjFornec] = useState(initialFormState);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const store = localStorage.getItem('store'); 
        const idStore = store === 'store1' ? 1 : 2; 
        
        fetch(`http://localhost:8080/ufd/listByEmp/${idStore}`, {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            setUfdOptions(data); 
        })
        .catch(error => console.error("Erro ao carregar UFDs:", error));
    }, [token]);

    useEffect(() => { 
        const store = localStorage.getItem('store'); 
        const idStore = store === 'store1' ? 1 : 2; 
        setObjFornec(prevState => ({
            ...prevState,
            fornec_emp: { id: Number(idStore) }
        }));
    }, []); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjFornec(prevState => ({
            ...prevState,
            [name]: ['tipoJF', 'diferen', 'rep_1', 'rep_2', 'rep_3', 'rep_4', 'pc_cr_icms_1', 'pc_cr_icms_2', 'pc_cr_icms_3'].includes(name) 
                ? Number(value) 
                : value
        }));
    };

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setObjFornec(prevState => ({
            ...prevState,
            fornec_ufd: { id: Number(value) }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch('http://localhost:8080/fornec/saveFornec', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(objFornec)
            });
            if (response.ok) {
                console.log("Fornecedor registrado com sucesso!");
                setObjFornec(initialFormState);
            } else {
                const errorText = await response.text();
                console.log('Registro de fornecedor falhou: ', errorText);
            }
        } catch (err) {
            console.error('An error occurred:', err); 
        }
    };

    const handleCancel = () => {
        setObjFornec(initialFormState);
    };

    return (
        <div className='fornec2'>
            <div className='fornec2-content'>
                <h1 className='fornec2-titulo'>Registro de fornecedor</h1>
                <form className="fornec2-form">       
                    <div className="fornec2-form-group">
                        <select
                            name="fornec_ufd"
                            value={objFornec.fornec_ufd.id} 
                            onChange={handleSelectChange} 
                            className="fornec2-form-control"
                        >
                            <option value="">Selecione a UF do Fornecedor</option>
                            {ufdOptions.map((ufd) => (
                                <option key={ufd.id} value={ufd.id}>
                                    {ufd.nome}
                                </option>
                            ))}
                        </select>
                        <input type="text" onChange={handleChange} name="razSoc" placeholder="Razão social" className="fornec2-form-control" value={objFornec.razSoc} />
                    </div>

                    <div className="fornec2-form-group">
                        <input type="text"  onChange={handleChange} name="nomeFant" placeholder="Nome Fantasia" className="fornec2-form-control" />
                        <input type="text"  onChange={handleChange} name="end" placeholder="Endereço" className="fornec2-form-control" />
                    </div>
                
                    <div className="fornec2-form-group">
                        <input type="text"  onChange={handleChange} name="bairro" placeholder="Bairro" className="fornec2-form-control" />
                        <input type="text" onChange={handleChange}  name="cep" placeholder="CEP" className="fornec2-form-control" />
                    </div>
                
                    <div className="fornec2-form-group">
                        <input type="text"  onChange={handleChange} name="municipio" placeholder="Municipio" className="fornec2-form-control" />
                        <input type="text"  onChange={handleChange} name="contato" placeholder="Contato" className="fornec2-form-control" />
                
                    </div>
                
                    <div className="fornec2-form-group">
                        <input type="text"  onChange={handleChange} name="dep" placeholder="Departamento" className="fornec2-form-control" />
                        <input type="number" onChange={handleChange} name="tipoJF" placeholder="Tipo JF" className="fornec2-form-control" />
                    </div>

                    <div className='fornec2-form-group'>
                
                        <input type="text"  onChange={handleChange} name="cnpj" placeholder="CNPJ" className="fornec2-form-control" />
                        <input type="text"  onChange={handleChange} name="inscrEst" placeholder="Inscrição estadual" className="fornec2-form-control" />
                    </div>
                
                    <div className="fornec2-form-group">
                        <input type="text" onChange={handleChange} name="inscrMun" placeholder="Inscrição municipal" className="fornec2-form-control" />
                        <input type="text" onChange={handleChange} name="telefone_1" placeholder="Telefone 1" className="fornec2-form-control" />
                    </div>
                
                    <div className="fornec2-form-group">
                        <input type="text"  onChange={handleChange} name="telefone_2" placeholder="Telefone 2" className="fornec2-form-control" />
                        <input type="text"  onChange={handleChange} name="telefone_3" placeholder="Telefone 3" className="fornec2-form-control" />
                    </div>
                
                    <div className="fornec2-form-group">
                        <input type="email"  onChange={handleChange} name="email_1" placeholder="Email 1" className="fornec2-form-control" />
                        <input type="email"  onChange={handleChange} name="email_2" placeholder="Email 2" className="fornec2-form-control" />
                    </div>
                
                   <div className="fornec2-form-group"> 
                        <input type="email"  onChange={handleChange} name="email_3" placeholder="Email 3" className="fornec2-form-control" />
                        <input type="text"  onChange={handleChange} name="desc_1" placeholder="Descrição 1" className="fornec2-form-control" />
                    </div>
                    
                    <div className="fornec2-form-group"> 
                        <input type="text"  onChange={handleChange} name="desc_2" placeholder="Descrição 2" className="fornec2-form-control" />
                        <input type="text"  onChange={handleChange} name="desc_3" placeholder="Descrição 3" className="fornec2-form-control" />
                    </div>

                    <div className="fornec2-form-group"> 
                        <input type="text"  onChange={handleChange} name="desc_4" placeholder="Descrição 4" className="fornec2-form-control" />
                        <input type="text"  onChange={handleChange} name="desc_5" placeholder="Descrição 5" className="fornec2-form-control" />
                    </div>

                    <div className="fornec2-form-group"> 
                        <input type="text"  onChange={handleChange} name="desc_6" placeholder="Descrição 6" className="fornec2-form-control" />
                        <input type="number"  onChange={handleChange} name="diferen" placeholder="Diferencial" className="fornec2-form-control" />
                    </div>

                    <div className="fornec2-form-group"> 
                        <input type="number"  onChange={handleChange} name="rep_1" placeholder="rep 1" className="fornec2-form-control" />
                        <input type="number"  onChange={handleChange} name="rep_2" placeholder="rep 2" className="fornec2-form-control" />
                    </div>

                    <div className="fornec2-form-group"> 
                        <input type="number"  onChange={handleChange} name="rep_3" placeholder="rep 3" className="fornec2-form-control" />
                        <input type="number"  onChange={handleChange} name="rep_4" placeholder="rep 4" className="fornec2-form-control" />
                    </div>
                    
                    <div className="fornec2-form-group"> 
                        <input type="text"  onChange={handleChange} name="obs" placeholder="Observação" className="fornec2-form-control" />
                        <input type="text"  onChange={handleChange} name="plan_obs" placeholder="crd icsm MAX:1" className="fornec2-form-control" />
                    </div>
                    
                    <div className="fornec2-form-group"> 
                        <select onChange={handleChange} name="bloq" className="fornec2-form-control">
                            <option value="">Bloqueado</option>
                            <option value="TRUE">Sim</option>
                            <option value="FALSE">Não</option>
                        </select> 
                        <input type="number"  onChange={handleChange} name="pc_cr_icms_1" placeholder="pc_cr_icms_1" className="fornec2-form-control" />
                    </div>
                    
                    <div className="fornec2-form-group"> 
                        <input type="number"  onChange={handleChange} name="pc_cr_icms_2" placeholder="pc_cr_icms_2" className="fornec2-form-control" />
                        <input type="number"  onChange={handleChange} name="pc_cr_icms_3" placeholder="pc_cr_icms_3" className="fornec2-form-control" />    
                    </div>


                   <div className="fornec2-button-group">
                        <input
                            type="button"
                            value="Inserir"
                            className="btn fornec2-btn-register"
                            onClick={handleSubmit}
                        />
                        <input 
                            type="button" 
                            value="Cancelar"
                            className="btn fornec2-btn-cancel"
                            onClick={handleCancel}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Fornec2;


