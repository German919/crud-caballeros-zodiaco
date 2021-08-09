import React,{useState} from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";

const initialDb = [
    {
        id:1,
        name:"Seiya",
        constellation:"Pegaso"
    },
    {
        id:2,
        name:"Shiryu",
        constellation:"Dragón"
    },
    {
        id:3,
        name:"Hyoga",
        constellation:"Cisne"
    },
    {
        id:4,
        name:"Shun",
        constellation:"Andrómeda"
    },
    {
        id:5,
        name:"Ikki",
        constellation:"Fénix"
    },
]
const CrudApp = () => {

    const [db, setDb] = useState(initialDb)
    const [dataToEdit, setDataToEdit] = useState(null)

    const createData = (data) =>{
        data.id = Date.now();
        setDb([...db, data])
    }

    const updateData = (data) =>{
        let newData = db.map(reg=> reg.id === data.id ? data : reg)
        setDb(newData)
    }

    const deleteData = (id) =>{

        let isDelete = window.confirm(`¿Estas seguro que quieres eliminar el id ${id}?`)

        if(isDelete){
            let newData =db.filter(reg => reg.id !== id)
            setDb(newData)
        }else{
            return;
        }
    }

    return (
        <div>
            {/*<h2>Crud App</h2>*/}
            <article className="grid-1-2">
                <CrudForm 
                    createData={createData} 
                    dataToEdit={dataToEdit} 
                    setDataToEdit={setDataToEdit} 
                    updateData={updateData}/>
                <CrudTable 
                    data={db} 
                    setDataToEdit={setDataToEdit} 
                    deleteData={deleteData}/>
            </article>
        </div>
    )
}

export default CrudApp;