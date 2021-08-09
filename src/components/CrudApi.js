import React,{useState, useEffect} from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";
import Message from "./Message";
const CrudAppi = () => {

    const [db, setDb] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    let api = helpHttp();
    let url = "http://localhost:5000/santos";
    useEffect(()=>{

        setLoading(true);
        helpHttp().get(url).then(res=>{
            if(!res.err){
              setDb(res)
            }else{
              setDb(null)
              setError(res)
            }
            setLoading(false);
        } );
    },[]);

    const createData = (data) =>{
        data.id = Date.now();
        let options = {
            body:data, 
            headers:{"content-type": "application/json"}
        }
        api.post(url, options).then(res=>{
            if(!res.err){
                setDb([...db, res])
            }else{
                setError(res)
            }
        } )
    }
    const updateData = (data) =>{

        let endpoint = `${url}/${data.id}`
        let options = {
            body:data, 
            headers:{"content-type": "application/json"}
        }
        api.put(endpoint, options).then(res=>{
            if(!res.err){
                let newData = db.map(reg=> reg.id === data.id ? data : reg)
                setDb(newData)
            }else{
                setError(res)
            }
        } )
    }

    const deleteData = (id) =>{

        let isDelete = window.confirm(`¿Estas seguro que quieres eliminar el id ${id}?`)

        if(isDelete){
            let endpoint = `${url}/${id}`
            let options = { 
                headers:{"content-type": "application/json"}
            }
            api.del(endpoint, options).then(res=> {
                if(!res.err){
                    let newData = db.filter(reg=> reg.id !== id)
                    setDb(newData)
                }else{
                    setError(res)  
                }
            })
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
                  {
                      loading &&  <Loader/>
                  }
                  {
                      error &&  <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545"/>
                  }

                  {
                    db &&  (
                      <CrudTable 
                    data={db} 
                    setDataToEdit={setDataToEdit} 
                    deleteData={deleteData}/>
                    )
                  }
                
            </article>
        </div>
    )
}

export default CrudAppi;