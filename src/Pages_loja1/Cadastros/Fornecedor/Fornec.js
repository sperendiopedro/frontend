import React from 'react';
import './Fornec.css'; 


function Fornec() {
    return (
        <form className="fornec-form">
            <h1 className='title'>Registro de fornecedor</h1>
           
            <div className="form-group">
                <select name="ufd_emp" className="form-control">
                    <option value="">Selecione a UF do Fornecedor</option>
                </select>
                <input type="text" name="razSoc" placeholder="Razão social" className="form-control" />
            </div>
           
            <div className="form-group">
                <input type="text" name="nomeFant" placeholder="Nome Fantasia" className="form-control" />
                <input type="text" name="end" placeholder="Endereço" className="form-control" />
            </div>
           
            <div className="form-group">
                <input type="text" name="bairro" placeholder="Bairro" className="form-control" />
                <input type="text" name="cep" placeholder="CEP" className="form-control" />
            </div>
           
            <div className="form-group">
                <input type="text" name="municipio" placeholder="Municipio" className="form-control" />
                <input type="text" name="dep" placeholder="Departamento" className="form-control" />
           
            </div>
           
            <div className="form-group">
                <input type="text" name="tipoJF" placeholder="Tipo JF" className="form-control" />
                <input type="text" name="cnpj" placeholder="CNPJ" className="form-control" />
            </div>

            <div className='form-group'>
           
                <input type="text" name="inscrMun" placeholder="Inscrição municipal" className="form-control" />
                <input type="text" name="inscrEst" placeholder="Inscrição estadual" className="form-control" />
            </div>
           
            <div className="form-group">
                <input type="text" name="telefone_1" placeholder="Telefone 1" className="form-control" />
                <input type="text" name="telefone_2" placeholder="Telefone 2" className="form-control" />
            </div>
           
            <div className="form-group">
                <input type="text" name="telefone_3" placeholder="Telefone 3" className="form-control" />
                <input type="text" name="email" placeholder="Email" className="form-control" />
            </div>
           
            <div className="form-group">
                <input type="number" name="relSoc" placeholder="Relação social" className="form-control" />
                <input type="number" name="nrCupom" placeholder="Numero cupom" className="form-control" />
            </div>
           
            <div className="form-group">
                <input type="text" name="obs" placeholder="Observações" className="form-control" />
                <input type='text' name='inscr' placeholder='Teste' className='form-control' />
            </div>
        </form>
    );
}

export default Fornec;
