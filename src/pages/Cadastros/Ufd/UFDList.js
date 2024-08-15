import { useEffect, useState } from "react";

function UFDList(){
    
    const [Ufd, setUfd] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:8080/ufd/listUfd")
        .then(response => response.json())
        .then(data => setUfd(data));
    },[])

    return(
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Id: </th>
                    <th>Nome: </th>
                    <th>Silga: </th>
                    <th>Aliq. Icms: </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    Ufd.map((obj, indicie) => (
                        <tr key={indicie}>
                            <td>{indicie+1}</td>
                            <td>{obj.id}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.sigla}</td>
                            <td>{obj.aliqIcms}</td>
                            <td><button className="btn btn-success">Selecionar</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default UFDList; 