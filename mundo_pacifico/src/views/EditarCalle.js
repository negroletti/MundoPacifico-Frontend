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
    const [regiones, setRegiones] = useState([]);
    const [provincia, setProvincia] = useState('');
    const [provincias, setProvincias] = useState([]);
    const [ciudad, setCiudad] = useState('');
    const [ciudades, setCiudades] = useState([]);

    //update calle
    const getCalleById = async (id) => {
        try{
            const response = await fetch(`http://mundo_pacifico.test/api/calles/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response.json();
            console.log(res);
            setCalle(res.nombre_calle);
            setRegion(res.id_region);
            setProvincia(res.id_provincia);
            setCiudad(res.id_ciudad);
            getProvincias(res.id_region);
            getCiudades(res.id_provincia);
        }catch(error){
            console.log(error);
        }
    };
    const postCalle = () => {
        try{
            fetch('http://mundo_pacifico.test/api/calles',{
                method: 'POST',
                body: JSON.stringify({
                    nombre_calle: calle,
                    id_ciudad: ciudad
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if(res.status === 200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Calle agregada',
                        showConfirmButton: false,
                        timer: 2500,
                        onClose: Navigate('/')
                    });
                }
            });
        }catch(error){
            console.log(error);
        }
    };

    const updateCalle = () => {
        console.log(calle);
        console.log(ciudad);
        console.log(id);
        try{
            fetch(`http://mundo_pacifico.test/api/calles/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    nombre_calle: calle,
                    id_ciudad: ciudad
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if(res.status===200){
                    Swal.fire({
                    icon: 'success',
                    title: 'Calle editada',
                    showConfirmButton: false,
                    timer: 2500,
                    onClose: Navigate('/')
                    });
            }
            }); 
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
            const res = await response.json();
            Object.entries(res).forEach(([key, value]) => {
                setRegiones(regiones => [...regiones, {label: value.Nombre_region, value: value.id}]);
            });

        } catch(error) {
            console.log(error);
        }
    };
    //get provincias from api for id
    const getProvincias = async (id) => {
        try{
            const response = await fetch(`http://mundo_pacifico.test/api/provincias/region/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response.json();
            Object.entries(res).forEach(([key, value]) => {
                setProvincias(provincias => [...provincias, {label: value.nombre_provincia, value: value.id}]);
            });
        } catch(error) {
            console.log(error);
        }
    };
    //get ciudades from api for id
    const getCiudades = async (id) => {
        try{
            const response = await fetch(`http://mundo_pacifico.test/api/ciudades/provincia/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response.json();
            Object.entries(res).forEach(([key, value]) => {
                setCiudades(ciudades => [...ciudades, {label: value.nombre_ciudad, value: value.id}]);
            });
        } catch(error) {
            console.log(error);
        }
    };
    
    const handleRegionInput = (e) => {
        setProvincias([]);
        setCiudades([]);
        setRegion(e.target.value);
        getProvincias(e.target.value);
    };

    const handleProvinciaInput = (e) => {
        setCiudades([]);
        setProvincia(e.target.value);
        getCiudades(e.target.value);
    };

    const handleEditButton = () => {
        id === undefined ? postCalle() : updateCalle();
    };


    useEffect(() => {
        getCalleById(id);
        getRegiones();
        }, []);


        return (
        <div style={{margin: "10% 20% 0 42%"}}>
            <Card style={{ width: '44%', marginBottom: '2em', textAlign:'center' }}>
            <span className="p-float-label">
                <InputText id="nombreCalle" value={calle} onChange={(e)=>setCalle(e.target.value)} />
                <label htmlFor="nombreCalle">Nombre de la calle</label>
            </span>

            <br/>
                <Dropdown style={{width:'90%', textAlign:'left'}} value={region} options={regiones} onChange={handleRegionInput} placeholder="Elige una región" />
            <br/><br/>
            <Dropdown style={{width:'90%', textAlign:'left'}} value={provincia} options={provincias} onChange={handleProvinciaInput} placeholder="Elige una provincia" />
            <br/><br/>
            <Dropdown style={{width:'90%', textAlign:'left'}} value={ciudad} options={ciudades} onChange={(e)=> setCiudad(e.target.value)} placeholder="Elige una ciudad" />
            <br/><br/>

            <Button label={id === undefined ? "Agregar": "Editar"} style={{width:'40%', marginRight:'5%'}} onClick={handleEditButton} className="p-button-raised" />

            <Button label="Cancelar" style={{width: '40%', marginLeft:'5%'}} className="p-button-raised p-button-danger"
            onClick={()=>Navigate('/')}/>

            </Card>
        </div>
    )
}
export default EditarCalle;