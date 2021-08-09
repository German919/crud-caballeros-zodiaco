import React,{useState, useEffect} from "react";
import "./CrudForm.css";

const initialForm = {
    name:"",
    constellation:"",
    id:null
}
const CrudForm = ({createData, dataToEdit, setDataToEdit, updateData}) => {

    const [form, setForm] = useState(initialForm);

    useEffect(() => {
      if(dataToEdit){
          setForm(dataToEdit)
      }else{
          setForm(initialForm)
      }
    }, [dataToEdit])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
            }
        )
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!form.name || !form.constellation){
            alert("Campos Incompletos")
            return;
        }
        if(form.id === null){
            createData(form);
        }else{
            updateData(form)
        }

        handleReset();
    }
    const handleReset = (e) => {
        setForm(initialForm)
        setDataToEdit(null)
    }

    return(
        <div>
            <h3>{dataToEdit ? "EDITAR" : "AGREGAR"}</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={handleChange} 
                    type="text" name="name" 
                    placeholder="Nombre" 
                    value={form.name} />
                <input 
                    onChange={handleChange} 
                    type="text" name="constellation"
                    placeholder="Costelaciones" 
                    value={form.constellation} />
                <input className="button-form" type="submit" value="Enviar" />
                <input className="button-form" onClick={handleReset} type="reset" value="Limpiar"  />
            </form>
        </div>
    )
}

export default CrudForm;