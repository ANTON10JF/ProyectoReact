// import vehicles from "../../data/dataVehicles/dataVehicles";
import { useEffect, useState } from "react";
import { Link, useResolvedPath } from "react-router-dom";
//import ModalForm from "../../compartidos/ModalForm/ModalForm";
import ModalForm from '../../components/ModalForm/ModalForm'



export default function Vehicles() {

    const path = useResolvedPath().pathname;
    const [vehicles, setVehicles] = useState([]);
    const [vehicleData, setVehicleData] = useState({ id: '', img: '', vehicle: '', type: '', model: '', manufacturer: '', excerpt: '', description: '', });
    const [editing, setEditing] = useState(false);
    // const [editing, setEditing] = useState('');
    const [change, setChange] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        //Reasignamos el estado 'change' a false, para posibles nuevos cambios
        setChange(false);
        //Esta funcion se ejecuta cada vez que se llama a 'localStorage', incluso entre renderizaciones lo que garantiza el valor actualizado 
        setVehicles(() => JSON.parse(localStorage.getItem('vehicles')));
    }, [change])

    // TODO
    // function getVehicles() { 
    //     const getLocalStorage = JSON.parse(localStorage.getItem('vehicles'));
    //     setVehicles(getLocalStorage);
    // }


    const addVehicle = (e, vehicle) => {
        e.preventDefault();
        // console.log(vehicle.vehicle); // BORRAR

        // console.log(vehicle); // BORRAR
        setVehicleData({ id: "", vehicle: "", type: "", model: "", img: "", manufacturer: "", excerpt: "", description: "" })

        setEditing(false)
        setOpenModal(true);

        const body = document.querySelector('body');
        body.classList.add('modal-open');
    }

    const editVehicle = (e, vehicle) => {
        e.preventDefault();

        // console.log(vehicle.vehicle); // BORRAR

        setVehicleData({
            id: vehicle.id, vehicle: vehicle.vehicle, type: vehicle.type, model: vehicle.model, img: vehicle.img,
            manufacturer: vehicle.manufacturer, excerpt: vehicle.excerpt, description: vehicle.description
        });

        setEditing(true);

        setOpenModal(true);

        const body = document.querySelector('body');
        body.classList.add('modal-open');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData((values) => ({
            ...values, [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(vehicle); // BORRAR
        if (editing == true) {

            let vehiclesList = JSON.parse(localStorage.getItem('vehicles'));

            let editedVehicle = vehiclesList.map(vehicle => {
                console.log(vehicleData.id);
                // console.log(v.id);
                if (vehicle.id == vehicleData.id) {
                    vehicle.id = vehicleData.id;
                    vehicle.vehicle = vehicleData.vehicle;
                    vehicle.type = vehicleData.type;
                    vehicle.model = vehicleData.model;
                    vehicle.img = vehicleData.img;
                    vehicle.manufacturer = vehicleData.manufacturer;
                    vehicle.excerpt = vehicleData.excerpt;
                    vehicle.description = vehicleData.description;

                    return vehicle;
                } else {
                    return vehicle;
                }
            })

            localStorage.setItem('vehicles', JSON.stringify(editedVehicle));
        } else {
            console.log(vehicleData);
            let vehiclesList = JSON.parse(localStorage.getItem('vehicles'));
            let id = 0;
            vehiclesList.forEach(vehicle => {
                console.log("Vehicle.id: " + vehicle.id);
                if (vehicle.id > id) {
                    id = vehicle.id;
                }
            })
            console.log("ID: " + (id + 1));
            vehicleData.id = (id + 1);

            let newVehicle = vehicleData;
            console.log(newVehicle);

            // const vehiclesList = JSON.parse(localStorage.getItem('vehicles'));
            vehiclesList.unshift(newVehicle)
            localStorage.setItem('vehicles', JSON.stringify(vehiclesList));
        }


        const body = document.querySelector('body');
        body.classList.remove('modal-open');

        //Cambiamos el estado de 'change' a true para que se ejecute el 'useEffect'
        setChange(true);

        //Cambiamos el estado de 'openModal' a false para que se deje de mosrtar nuestro componente modal
        setOpenModal(false);
    }


    const deleteVehicle = (e, id) => {
        e.preventDefault();
        console.log(id);
        let vehiclesList = JSON.parse(localStorage.getItem('vehicles'));
        let newVehiclesList = vehiclesList.filter(vehicle => vehicle.id != id);
        console.log(newVehiclesList);
        localStorage.setItem('vehicles', JSON.stringify(newVehiclesList));

        setChange();
    }


    function formVehicle() {
        return (
            <form className='modal-form' onSubmit={handleSubmit}>

                <label>Vehicles name:
                    <input type="text" id="vehicle" name="vehicle" value={vehicleData.vehicle} onChange={handleChange} />
                </label>

                <label>Image:
                    <input type="text" name='img' value={vehicleData.img} onChange={handleChange} />
                </label>

                <label>Type:
                    <input type="text" id="type" name="type" value={vehicleData.type} onChange={handleChange} />
                </label>

                <label>Model:
                    <input type="text" id="model" name="model" value={vehicleData.model} onChange={handleChange} />
                </label>

                <label>Excerpt:
                    <textarea name="excerpt" cols="30" rows="5" value={vehicleData.excerpt} onChange={handleChange}></textarea>
                </label>

                <label htmlFor="description">Description:
                    <textarea name="description" cols="30" rows="10" value={vehicleData.description} onChange={handleChange}></textarea>
                </label>

                <button>Send</button>
            </form>
        );
    };


    return (
        <>
            <section>

                <header className='section-title'>
                    <h2>Vehiculos</h2>
                </header>

                <main>
                    <div className='lista-container'>
                        {vehicles.map(vehicle =>
                            <Link to={`${path}/vehicle/${vehicle.id}`} key={vehicle.id}>
                                <article className="card shadows-cards">
                                    <h3 className="title-card">{vehicle.vehicle}</h3>
                                    <div className="body-card">
                                        <div className='card-img'>
                                            <img src={`${vehicle.img}`} alt={`Imagen de ${vehicle.vehicle}`} height='200px' />
                                        </div>
                                        {/* <p>Modelo: {vehicle.model}</p>
                                        <p>Tipo: {vehicle.type}</p> */}
                                        <p>{vehicle.excerpt}</p>
                                        <div className='footer-card'>
                                            <p>Fabricante: {vehicle.manufacturer}</p>
                                            <div>
                                                <button type="submit" onClick={(e) => editVehicle(e, vehicle)} className='btn-card btn-card-edit'></button>
                                                <button type="submit" onClick={(e) => deleteVehicle(e, vehicle.id)} className='btn-card btn-card-delete'></button>
                                            </div>

                                        </div>
                                    </div>
                                </article>
                            </Link>
                        )}
                    </div>
                </main>
                <button className='add-item' onClick={addVehicle}>+</button>

                {openModal ? <ModalForm setOpenModal={setOpenModal}>{formVehicle()}</ModalForm> : null}
            </section>
        </>
    );
}