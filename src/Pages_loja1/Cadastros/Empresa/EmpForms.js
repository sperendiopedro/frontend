import { useState } from "react";
import "./Emp.css";

function EmpForms() {
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

    const aoDigitar = (e) => {
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

    const cadastrar = () => {
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
        <div className="emp-loja1">
            <div className="emp-content">
                <form className="emp-form">
                <h1>Registro de empresa </h1>
                <br></br>
                    <input
                        type="text"
                        name="razSoc"
                        onChange={aoDigitar}
                        value={objEmp.razSoc}
                        placeholder="Razão social"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="nomeFant"
                        onChange={aoDigitar}
                        value={objEmp.nomeFant}
                        placeholder="Nome Fantasia"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="end"
                        onChange={aoDigitar}
                        value={objEmp.end}
                        placeholder="Endereço"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="bairro"
                        onChange={aoDigitar}
                        value={objEmp.bairro}
                        placeholder="Bairro"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="cep"
                        onChange={aoDigitar}
                        value={objEmp.cep}
                        placeholder="CEP"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="cnpj"
                        onChange={aoDigitar}
                        value={objEmp.cnpj}
                        placeholder="CNPJ"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="inscrMun"
                        onChange={aoDigitar}
                        value={objEmp.inscrMun}
                        placeholder="Inscrição municipal"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="inscrEst"
                        onChange={aoDigitar}
                        value={objEmp.inscrEst}
                        placeholder="Inscrição estadual"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="telefone"
                        onChange={aoDigitar}
                        value={objEmp.telefone}
                        placeholder="Telefone"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="email"
                        onChange={aoDigitar}
                        value={objEmp.email}
                        placeholder="Email"
                        className="form-control"
                    />
                    <input
                        type="number"
                        name="relSoc"
                        onChange={aoDigitar}
                        value={objEmp.relSoc}
                        placeholder="Relação social"
                        className="form-control"
                    />
                    <input
                        type="number"
                        name="nrCupom"
                        onChange={aoDigitar}
                        value={objEmp.nrCupom}
                        placeholder="Número Cupom"
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="obs"
                        onChange={aoDigitar}
                        value={objEmp.obs}
                        placeholder="Observações"
                        className="form-control"
                    />
                    <div className="button-emp-group">
                        <input
                            type="button"
                            value="Inserir"
                            className="btn btn-emp-register"
                            onClick={cadastrar}
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

export default EmpForms;
