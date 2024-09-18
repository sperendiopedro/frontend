import { useState } from "react";
import "./emp.css";

function EmpForms1() {
    const [objEmp, setObjEmp] = useState({
        razSoc: '',
        nomeFant: '',
        endereco: '',
        bairro: '',
        cep: '',
        cnpj: '',
        inscrMun: '',
        inscrEst: '',
        telefone: '',
        email: '',
        relSoc: 0,
        nrCupom: 0,
        obs: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const convertedValue = 
            name === "relSoc" || name === "nrCupom" 
            ? Number(value) 
            : value;

        setObjEmp(prevState => ({
            ...prevState,
            [name]: convertedValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
       const { razSoc, nomeFant, endereco, bairro, cep, cnpj, inscrMun, inscrEst, telefone, email, relSoc, nrCupom, obs} = objEmp; 

       if(!razSoc || !nomeFant || !endereco || !bairro || !cep || !cnpj || !inscrMun || !inscrEst || !telefone || !email || !relSoc || !nrCupom || !obs ) {
         alert("Preencha todos os campos!"); 
         return; 
       }
        
       const token = localStorage.getItem('token');
        fetch("http://localhost:8443/empresa/saveEmp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(objEmp)
        })
        .then(response => {
            if (response.ok) {
                alert("Empresa salva com sucesso!");
                cancel(); 
            } else {
                alert("Erro ao salvar empresa");
            }
        })
        .catch(error => {
            console.error("Erro ao salvar a empresa:", error);
            alert("Erro ao salvar a empresa.");
        });
    };

    const cancel = () => {
        window.location.reload(); 
        setObjEmp({
            razSoc: '',
            nomeFant: '',
            end: '',
            bairro: '',
            cep: '',
            cnpj: '',
            inscrMun: '',
            inscrEst: '',
            telefone: '',
            email: '',
            relSoc: 0,
            nrCupom: 0,
            obs: ''
        });
    };

 
    return (
        <div className="emp-principal-div">
            <h1 className="emp-titulo"> Registro de empresa </h1>
            <br></br>
            <form className="emp-form">  
                    <input
                        type="text"
                        name="razSoc"
                        onChange={handleChange}
                        value={objEmp.razSoc}
                        placeholder="Razão social"
                        className="emp-form-control"
                    />
                    <input
                        type="text"
                        name="nomeFant"
                        onChange={handleChange}
                        value={objEmp.nomeFant}
                        placeholder="Nome Fantasia"
                        className="emp-form-control"
                    />
                    <input
                        type="text"
                        name="end"
                        onChange={handleChange}
                        value={objEmp.end}
                        placeholder="Endereço"
                        className="emp-form-control"
                    />
                    <input
                        type="text"
                        name="bairro"
                        onChange={handleChange}
                        value={objEmp.bairro}
                        placeholder="Bairro"
                        className="emp-form-control"
                    />
                    <input
                        type="text"
                        name="cep"
                        onChange={handleChange}
                        value={objEmp.cep}
                        placeholder="CEP"
                        className="emp-form-control"
                    />
                    <input
                        type="text"
                        name="cnpj"
                        onChange={handleChange}
                        value={objEmp.cnpj}
                        placeholder="CNPJ"
                        className="emp-form-control"
                    />
                    <input
                        type="text"
                        name="inscrMun"
                        onChange={handleChange}
                        value={objEmp.inscrMun}
                        placeholder="Inscrição municipal"
                        className="emp-form-control"
                    />
                    <input
                        type="text"
                        name="inscrEst"
                        onChange={handleChange}
                        value={objEmp.inscrEst}
                        placeholder="Inscrição estadual"
                        className="emp-form-control"
                    />
                    <input
                        type="text"
                        name="telefone"
                        onChange={handleChange}
                        value={objEmp.telefone}
                        placeholder="Telefone"
                        className="emp-form-control"
                    />
                    <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={objEmp.email}
                        placeholder="Email"
                        className="emp-form-control"
                    />
                    <input
                        type="number"
                        name="relSoc"
                        onChange={handleChange}
                        value={objEmp.relSoc}
                        placeholder="Relação social"
                        className="emp-form-control"
                    />
                    <input
                        type="number"
                        name="nrCupom"
                        onChange={handleChange}
                        value={objEmp.nrCupom}
                        placeholder="Número Cupom"
                        className="emp-form-control"
                    />     
            </form>    
                    <input
                        type="text"
                        name="obs"
                        onChange={handleChange}
                        value={objEmp.obs}
                        placeholder="Observações"
                        className="emp-form-control-obs"
                    />
                 
                 
                    <div className="button-emp-group">
                        <input
                            type="button"
                            value="Inserir"
                            className="btn btn-emp-register"
                            onClick={handleSubmit}
                        />
                        <input 
                            type="button" 
                            value="Cancelar"
                            className="btn btn-emp-cancel"
                            onClick={cancel}
                        />
                    </div>

        </div>
    );
}

export default EmpForms1;
