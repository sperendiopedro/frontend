import { useState, useEffect } from "react";
import "./Emp.css";

function EmpForms() {
    const [objEmp, setObjEmp] = useState({
        ufd: { id: 0 },
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

    const [ufdOptions, setUfdOptions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/ufd/listUfd")
            .then(response => response.json())
            .then(data => setUfdOptions(data))
            .catch(error => console.error("Erro ao carregar UFDs:", error));
    }, []);

    
    const aoDigitar = (e) => {
        const { name, value } = e.target;

        if (name === "ufd_emp") {
            setObjEmp(prevState => ({
                ...prevState,
                ufd: { id: Number(value) }
            }));
        } else {
            setObjEmp(prevState => ({
                ...prevState,
                [name]: name === "relSoc" || name === "nrCupom" ? Number(value) : value
            }));
        }
    };
    const cancel = ()=>{
        setObjEmp(
            {
                ufd: { id: 0 },
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


    const cadastrar = () => {
        fetch("http://localhost:8080/empresa/saveEmp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objEmp)
        })
            .then(response => {
                if (response.ok) {
                    alert("Empresa salva com sucesso!");
                    setObjEmp({
                        ufd: { id: 0 },
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
                } else {
                    alert("Erro ao salvar empresa");
                }
            })
            .catch(error => {
                console.error("Erro ao salvar o usuário:", error);
                alert("Erro ao salvar o usuário.");
            });
    };

    return (
        <form>
            <h1 className="title">Registro de empresa:</h1>
            <br />
            <select
                name="ufd_emp"
                onChange={aoDigitar}
                value={objEmp.ufd.id}
                className="form-control"
            >
                <option value="">Selecione a UF da empresa</option>
                {ufdOptions.map(ufd => (
                    <option key={ufd.id} value={ufd.id}>
                        {ufd.sigla}
                    </option>
                ))}
            </select>
            
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
                value={objEmp.cnpj}
                onChange={aoDigitar}
                placeholder="CNPJ"
                className="form-control"
            />

            <input
                type="text"
                name="inscrMun"
                value={objEmp.inscrMun}
                onChange={aoDigitar}
                placeholder="Inscrição municipal"
                className="form-control"
            />

            <input
                type="text"
                name="inscrEst"
                value={objEmp.inscrEst}
                onChange={aoDigitar}
                placeholder="Inscrição estadual"
                className="form-control"
            />

            <input
                type="text"
                name="telefone"
                value={objEmp.telefone}
                onChange={aoDigitar}
                placeholder="Telefone"
                className="form-control"
            />

            <input
                type="text"
                name="email"
                value={objEmp.email}
                onChange={aoDigitar}
                placeholder="Email"
                className="form-control"
            />

            <input
                type="number"
                name="relSoc"
                value={objEmp.relSoc}
                onChange={aoDigitar}
                placeholder="Relação social"
                className="form-control"
            />

            <input
                type="number"
                name="nrCupom"
                value={objEmp.nrCupom}
                onChange={aoDigitar}
                placeholder="Numero cupom"
                className="form-control"
            />

            <input
                type="text"
                name="obs"
                value={objEmp.obs}
                onChange={aoDigitar}
                placeholder="Observações"
                className="form-control"
            />

            <input
                type="button"
                value="Inserir"
                className="btn btn-primary"
                onClick={cadastrar}
            />

            <input 
            type="button" 
            value="Cencelar"
            className="btn btn-secondary"
            onClick={cancel}
            />
        </form>
    );
}

export default EmpForms;