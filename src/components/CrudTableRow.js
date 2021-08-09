import React from "react";

const CrudTableRow = ({data, deleteData, setDataToEdit}) => {

    let {name, constellation, id} = data;

    return(
            <tr>
                <td>{name}</td>
                <td>{constellation}</td>
                <td>
                    <button className="button-editar" onClick={()=>setDataToEdit(data)}>Editar</button>
                    <button className="button-eliminar" onClick={()=>deleteData(id)}>Eliminar</button>
                </td>
            </tr>
    )
}

export default CrudTableRow;