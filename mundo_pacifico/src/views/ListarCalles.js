import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";
import { DataTable } from 'primereact/datatable';
import "primereact/resources/themes/lara-dark-indigo/theme.css"; 
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';



const ListarCalles = () => {
    const [calle, setCalle] = useState([]);
    const Navigate = useNavigate();
    const columns =[
        {field: 'id', header: 'Id calle'},
        {field: 'nombre_calle', header: 'Nombre calle'},
        {field: 'nombre_ciudad', header:'Nombre Ciudad'},
        {field: 'nombre_provincia', header:'Nombre Provincia'},
        {field: 'Nombre_region', header:'Nombre Region'},
    ];
    
    /*const handleInputChangeCalle = (e) => {
        setCalle({
            ...calle,
            [e.target.name]: e.target.value
        });
    };*/

    //get calles from api
    const getCalles = async () => {
        try{
            const response = await fetch('http://mundo_pacifico.test/api/calles/get/all');
            if(response.status===200){
                const data = await response.json();
                setCalle([]);
                setCalle(data);
            }
        } catch(error) {
            console.log(error);
        }

    };
    //delete calles from api
    const deleteCalle = async (id) => {
        try{
            const response = await fetch(`http://mundo_pacifico.test/api/calles/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status===204){
                Swal.fire({
                    icon: 'success',
                    title: 'Calle eliminada',
                    showConfirmButton: false,
                    timer: 2500
                });
                setCalle([]);
                getCalles();
            }
        } catch(error) {
            console.log(error);
        }
    };

    const dynamicColumns = columns.map((col, i) => {
        return <Column key={i} field={col.field} header={col.header} sortable/>;
    });
    const buttonEdit = (rowData) => {
        return(
            <Button label="Editar" className="p-button-raised" onClick={() =>Navigate(`/editarcalle/${rowData.id}`)} />        
        )
    };
    const buttonDelete = (rowData) => {
        return(
                <Button label="Eliminar" className="p-button-raised p-button-danger" onClick={()=> deleteCalle(`${rowData.id}`)}/>
        )
    };
    useEffect(() => {
        getCalles();
    }, []);
    //Datatable con calles
    return(
            <div style={{margin: "3% 20% 0 24%"}}>
                <div style={{margin:"0 0 3% 0"}}>
                        <h2 style={{color:"#e2e3e3"}}>Listado de calles</h2>
                        <Button label="Agregar calle" onClick={()=>Navigate("/agregar")} className="p-button-raised p-button-success" />
                </div>
                <Card style={{ width: '80%', marginBottom: '2em' }}>
                <DataTable value={calle} responsiveLayout="scroll">
                    {dynamicColumns}
                    <Column body={buttonEdit} style={{textAlign:'center', width: '8em'}} />
                    <Column body={buttonDelete} style={{textAlign:'center', width:'8em'}} />
                </DataTable>
                </Card>
            </div>
    );
}

export default ListarCalles;