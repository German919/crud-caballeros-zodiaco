import React from "react";
import CrudTableRow from "./CrudTableRow";

const CrudTable = ({data, deleteData, setDataToEdit}) => {

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>COSTELLACION</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ? data.map(reg=>(
                            <CrudTableRow key={reg.id} data={reg} deleteData={deleteData} setDataToEdit={setDataToEdit} />
                        )) :  <tr><td>No hay datos</td></tr> 
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CrudTable;