import React, { useState, useEffect } from 'react';
import './Fornec2.css'; 

const initialFormState = {
    fornecEmp: { id: 0 },
    fornecUfd: { id: 0 },
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
    telefone1: '',
    telefone2: '', 
    telefone3:'',
    email1: '',
    email2: '',
    email3: '',
    desc1: '',
    desc2: '',
    desc3: '',
    desc4: '',
    desc5: '',
    desc6: '',
    diferen: 0,
    rep1: 0,
    rep2: 0,
    rep3: 0,
    rep4: 0,
    obs: '',
    planObs: '',
    bloq: '',
    crdIcms: '',
    pcCrIcms1: 0,
    pcCrIcms2: 0,
    pcCrIcms3: 0
};

function Fornec2() {
    const [ufdOptions, setUfdOptions] = useState([]);
    const [objFornec, setObjFornec] = useState(initialFormState);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const store = localStorage.getItem('store'); 
        const idStore = store === 'store1' ? 1 : 2; 
        
        fetch(`https://grego-backend-1fc83ac18599.herokuapp.com/ufd/listByEmp/${idStore}`, {
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
            fornecEmp: { id: Number(idStore) }
        }));
    }, []); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjFornec(prevState => ({
            ...prevState,
            [name]: ['tipoJF', 'diferen', 'rep_1', 'rep_2', 'rep_3', 'rep_4', 'pcCrIcms1', 'pcCrIcms2', 'pcCrIcms3'].includes(name) 
                ? Number(value) 
                : value
        }));
    };

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setObjFornec(prevState => ({
            ...prevState,
            fornecUfd: { id: Number(value) }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch('http://localhost:8443/fornec/saveFornec', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(objFornec)
            });
            if (response.ok) {
                alert("Fornecedor registrado com sucesso!");
                window.location.reload();
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
        window.location.reload(); 
        setObjFornec(initialFormState);
    };

    return (
        <div className='fornec2-principal-div'>
            <h1 className='fornec2-titulo'>Registro de fornecedor</h1>
            <form className="fornec2-form">        
              
              <div className='fornec2-form-group'>
                <select
                    name="fornecUfd"
                    value={objFornec.fornecUfd.id} 
                    onChange={handleSelectChange} 
                    className="fornec2-form-control-select"
                >
                    <option value="">Selecione a UF do Fornecedor</option>
                    {ufdOptions.map((ufd) => (
                        <option key={ufd.id} value={ufd.id}>
                            {ufd.nome}
                        </option>
                    ))}
                </select>
            </div>
                
                <div className='fornec2-form-group'>
                    <label className='fornec2-label'> Razão Social: </label>
                    <input type="text" 
                           onChange={handleChange} 
                           name="razSoc" 
                           value={objFornec.razSoc}
                           className="fornec2-form-control" 
                    />
                </div>   
                              
                <div className="fornec2-form-group">
                    <label className='fornec2-label'> Nome fantasia: </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="nomeFant" 
                           value={objFornec.nomeFant}
                           className="fornec2-form-control" 
                    />
                </div>
               
               <div className='fornec2-form-group'> 
                    <label className='fornec2-label'> endereço:  </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="end"  
                           value={objFornec.end}
                           className="fornec2-form-control" 
                    />
                </div>         
                
                <div className="fornec2-form-group">
                    <label className='fornec2-label'> Bairro: </label>
                    <input type="text"  
                            onChange={handleChange} 
                            name="bairro" 
                            value={objFornec.bairro}
                            className="fornec2-form-control" 
                    />
                </div>
                
                <div className='fornec2-form-group'>  
                    <label className='fornec2-label'> CEP: </label>
                    <input type="text" 
                           onChange={handleChange}  
                           name="cep" 
                           value={objFornec.cep}
                           className="fornec2-form-control"
                    />
                </div>     
                    
                <div className="fornec2-form-group">
                    <label className='fornec2-label'> municipio: </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="municipio" 
                           value={objFornec.municipio}
                           className="fornec2-form-control" 
                    />
                </div> 
                
                <div className='fornec2-form-group'>      
                    <label className='fornec2-label'> contato: </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="contato" 
                           value={objFornec.contato}
                           className="fornec2-form-control" 
                    />
                
                </div>
                
                    <div className="fornec2-form-group">
                    <label className='fornec2-label'>Departamento:  </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="dep" 
                           value={objFornec.dep}
                           className="fornec2-form-control" 
                    />
                </div>
                
                <div className='fornec2-form-group'>      
                    <label className='fornec2-label'> Tipo J.F: </label>
                    <input type="number" 
                           onChange={handleChange} 
                           name="tipoJF" 
                           value={objFornec.tipoJF}
                           className="fornec2-form-control" 
                    />
                </div>

                <div className='fornec2-form-group'>
                    <label className='fornec2-label'> cnpj: </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="cnpj" 
                           value={objFornec.cnpj}
                           className="fornec2-form-control"
                     />
                </div>
                
                <div className='fornec2-form-group'>          
                    <label className='fornec2-label'> Inscrição Estadual: </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="inscrEst" 
                           value={objFornec.inscrEst}
                           className="fornec2-form-control" 
                    />
                </div>
            
                <div className="fornec2-form-group">
                    <label className='fornec2-label'> Inscrição Municipal : </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="inscrMun" 
                           value={objFornec.inscrMun}
                           className="fornec2-form-control" 
                    />
                </div>
               
                <div className='fornec2-form-group'>      
                    <label className='fornec2-label'> Telefone 1: </label>
                    <input type="text" 
                           onChange={handleChange} 
                           name="telefone1" 
                           value={objFornec.telefone1}
                           className="fornec2-form-control" 
                    />
                </div>
            
                <div className="fornec2-form-group">
                    <label className='fornec2-label'> Telefone 2: </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="telefone2" 
                           value={objFornec.telefone2}
                           className="fornec2-form-control" 
                    />
                </div>
               
                <div className='fornec2-form-group'>  
                    <label className='fornec2-label'> Telefone 3: </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="telefone3" 
                           value={objFornec.telefone3}
                           className="fornec2-form-control" 
                    />
                </div>
            
                <div className="fornec2-form-group">
                    <label className='fornec2-label'> Email 1: </label>
                    <input type="email"  
                           onChange={handleChange} 
                           name="email1" 
                           value={objFornec.email1}
                           className="fornec2-form-control" 
                    />
                </div>
                
                <div className='fornec2-form-group'>  
                    <label className='fornec2-label'> Email 2: </label>
                    <input type="email"  
                           onChange={handleChange} 
                           name="email2" 
                           value={objFornec.email2}
                           className="fornec2-form-control" 
                    />
                </div>
            
                <div className="fornec2-form-group"> 
                    <label className='fornec2-label'> Email 3: </label>
                    <input type="email"  
                           onChange={handleChange} 
                           name="email3"
                           value={objFornec.email3}
                           className="fornec2-form-control" 
                    />
                </div>
               
                <div className='fornec2-form-group'>  
                    <label className='fornec2-label'> Descrição 1: </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="desc1" 
                           value={objFornec.desc1}
                           className="fornec2-form-control" 
                    />
                </div>
                
                <div className="fornec2-form-group"> 
                    <label className='fornec2-label'> Descrição 2: </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="desc2" 
                           value={objFornec.desc2}
                           className="fornec2-form-control" 
                    />
                </div>
                <div className='fornec2-form-group'>  
                    <label className='fornec2-label'> Descrição 3: </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="desc3" 
                           value={objFornec.desc3}
                           className="fornec2-form-control" 
                    />
                </div>

                <div className="fornec2-form-group"> 
                    <label className='fornec2-label'> Descrição 4: </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="desc4" 
                           value={objFornec.desc4}
                           className="fornec2-form-control" 
                    />
                </div>
                
                <div className='fornec2-form-group'>  
                    <label className='fornec2-label'> Descrição 5: </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="desc5" 
                           value={objFornec.desc5}
                           className="fornec2-form-control" 
                    />
                </div>

                <div className="fornec2-form-group"> 
                    <label className='fornec2-label'> Descrição 6: </label>
                    <input type="text"  
                           onChange={handleChange} 
                           name="desc6" 
                           value={objFornec.desc6}
                           className="fornec2-form-control" 
                    />
                </div>
               
                <div className='fornec2-form-group'>  
                    <label className='fornec2-label'> Diferencial: </label>
                    <input type="number"  
                           onChange={handleChange} 
                           name="diferen" 
                           value={objFornec.diferen}
                           className="fornec2-form-control" 
                    />
                </div>

                <div className="fornec2-form-group"> 
                    <label className='fornec2-label'> Rep 1: </label>
                    <input type="number"  
                           onChange={handleChange} 
                           name="rep1" 
                           value={objFornec.rep1}
                           className="fornec2-form-control" 
                    />
                </div>
                <div className='fornec2-form-group'>  
                    <label className='fornec2-label'> Rep 2: </label>
                    <input type="number"  
                           onChange={handleChange} 
                           name="rep2"
                           value={objFornec.rep2}
                           className="fornec2-form-control" 
                    />
                </div>

                <div className="fornec2-form-group"> 
                    <label className='fornec2-label'> Rep 3: </label>
                    <input type="number"  
                            onChange={handleChange} 
                            name="rep3" 
                            value={objFornec.rep3}
                            className="fornec2-form-control" 
                    />
                </div>
                
                <div className='fornec2-form-group'>  
                    <label className='fornec2-label'> Rep 4: </label>
                    <input type="numberxt"  
                           onChange={handleChange} 
                           name="rep4" 
                           value={objFornec.rep4}
                           className="fornec2-form-control"
                    />
                </div>
                
                
                <div className='fornec2-form-group'>  
                    <label className='fornec2-label'> Plano Obs: </label>
                    <input type="text" 
                           onChange={handleChange} 
                           name="planObs" 
                           value={objFornec.planObs}
                           className="fornec2-form-control" />
                </div>
                
                <div className='fornec2-form-group'>
                    <label className='fornec2-label'> Bloqueado: </label>
                    <select onChange={handleChange} 
                            name="bloq" 
                            value={objFornec.bloq}
                            className="fornec2-form-control">
                        <option value="FALSE">Não</option>
                        <option value="TRUE">Sim</option>
                    </select> 
                </div>
                    
                <div className='fornec2-form-group'>    
                    <label className='fornec2-label'> Pc. Cr. Icsm(1): </label>
                    <input type="number"  
                           onChange={handleChange} 
                           name="pcCrIcms1"
                           value={objFornec.pcCrIcms1}
                           className="fornec2-form-control" />
                </div>
                
                <div className="fornec2-form-group"> 
                    <label className='fornec2-label'> Pc. Cr. Icsm(2): </label>
                    <input type="number"  
                           onChange={handleChange} 
                           name="pcCrIcms2" 
                           value={objFornec.pcCrIcms2}
                           className="fornec2-form-control" />
                </div>
                
                <div className='fornec2-form-group'>    
                    <label className='fornec2-label'> Pc. Cr. Icsm(3): </label>
                    <input type="number"  
                           onChange={handleChange} 
                           name="pcCrIcms3" 
                           value={objFornec.pcCrIcms3}
                           className="fornec2-form-control" />    
                </div>
            </form>

            <div className="fornec2-form-group"> 
                <label className='fornec2-label'> Observação: </label>
                <input type="text"  
                        onChange={handleChange} 
                        name="obs" 
                        value={objFornec.obs}
                        className="fornec2-form-control-obs" 
                />
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
        </div>

    );
}

export default Fornec2;


