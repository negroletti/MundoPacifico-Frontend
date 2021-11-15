import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import 'primereact/resources/primereact.css';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';


const EditarCalle = () => {
    const {id} = useParams();
    const Navigate = useNavigate();
    const [calle, setCalle] = useState('');
    const [region, setRegion] = useState('');

    useEffect(() => {
        getCalleById(id);
    }, []);
    //update calle
    const getCalleById = async (id) => {
        try{
            const response = await fetch(`http://mundo_pacifico.test/api/calles/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const calle = await response.json();
            setCalle(calle);
        }catch(error){
            console.log(error);
        }
    };
    const updateCalle = async (id) => {
        try{
            const response = fetch(`http://mundo_pacifico.test/api/calles/${id}`, {
                method: 'PUT',
                body: JSON.stringify(calle),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status===200){
                Swal.fire(
                    '¡Editado!',
                    'La calle se ha editado correctamente.',
                    'success'
                );
            }
        } catch(error) {
            console.log(error);
        }
    };
    const getRegiones = async () => {
        try{
            const response = await fetch('http://mundo_pacifico.test/api/regiones',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const regiones = await response.json();
            setRegion(regiones);
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <div style={{margin: "10% 20% 0 42%"}}>
            <Card style={{ width: '44%', marginBottom: '2em', textAlign:'center' }}>
            <span className="p-float-label">
                <InputText id="nombreCalle" value={calle.nombre_calle} onChange={(e) => setCalle(e.target.value)} />
                <label htmlFor="nombreCalle">Nombre de la calle</label>
            </span>

            <br/>
            <Dropdown style={{width:'90%',  textAlign:'left'}} value={region.Nombre_region} options onChange optionLabel="name" placeholder="Select a City" />
            <br/><br/>
            <Dropdown style={{width:'90%', textAlign:'left'}} value options onChange optionLabel="name" placeholder="Select a City" />
            <br/><br/>
            <Dropdown style={{width:'90%', textAlign:'left'}} value options onChange optionLabel="name" placeholder="Select a City" />
            <br/><br/>

            <Button label="Editar" style={{width:'40%', marginRight:'2%'}} className="p-button-raised" />

            <Button label="Cancelar" style={{width: '40%', marginLeft:'2%'}} className="p-button-raised p-button-danger"
            onClick={()=>Navigate('/')}/>

            </Card>
        </div>
    )
}
export default EditarCalle;