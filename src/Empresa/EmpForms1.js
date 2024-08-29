import { useState } from "react";
import "./emp.css";

function EmpForms1() {
    
    const [objEmp, setObjEmp] = useState({
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

    const handleSubmit = () => {
        const token = localStorage.getItem('token');
        fetch("http://localhost:8080/empresa/saveEmp", {
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
                resetForm();
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
        resetForm();
    };

    const resetForm = () => {
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
        <div className="emp">
            <div className="emp-content">
                <form className="emp-form">
                <h1>Registro de empresa </h1>
                <br></br>
                    <input
                        type="text"
                        name="razSoc"
                        onChange={handleChange}
                        value={objEmp.razSoc}
                        placeholder="Razão social"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="nomeFant"
                        onChange={handleChange}
                        value={objEmp.nomeFant}
                        placeholder="Nome Fantasia"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="end"
                        onChange={handleChange}
                        value={objEmp.end}
                        placeholder="Endereço"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="bairro"
                        onChange={handleChange}
                        value={objEmp.bairro}
                        placeholder="Bairro"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="cep"
                        onChange={handleChange}
                        value={objEmp.cep}
                        placeholder="CEP"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="cnpj"
                        onChange={handleChange}
                        value={objEmp.cnpj}
                        placeholder="CNPJ"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="inscrMun"
                        onChange={handleChange}
                        value={objEmp.inscrMun}
                        placeholder="Inscrição municipal"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="inscrEst"
                        onChange={handleChange}
                        value={objEmp.inscrEst}
                        placeholder="Inscrição estadual"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="telefone"
                        onChange={handleChange}
                        value={objEmp.telefone}
                        placeholder="Telefone"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={objEmp.email}
                        placeholder="Email"
                        className="form-control"
                    />
                    <input
                        type="number"
                        name="relSoc"
                        onChange={handleChange}
                        value={objEmp.relSoc}
                        placeholder="Relação social"
                        className="form-control"
                    />
                    <input
                        type="number"
                        name="nrCupom"
                        onChange={handleChange}
                        value={objEmp.nrCupom}
                        placeholder="Número Cupom"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="obs"
                        onChange={handleChange}
                        value={objEmp.obs}
                        placeholder="Observações"
                        className="form-control"
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
                </form>
            </div>
        </div>
    );
}

export default EmpForms1;
