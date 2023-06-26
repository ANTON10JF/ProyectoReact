import { useEffect, useState } from "react";
import { Link, useResolvedPath } from "react-router-dom";
import ModalForm from '../../components/ModalForm/ModalForm';
import { validarObligatorio, validarLongitud, validarSinNumeros } from "../../validators/validators";


export default function Vehicles() {
    const path = useResolvedPath().pathname;
    const [vehicles, setVehicles] = useState([]);
    const [vehicleData, setVehicleData] = useState({ id: '', img: '', vehicle: '', model: '', manufacturer: '', excerpt: '', description: '', });
    const [editing, setEditing] = useState(false);
    const [change, setChange] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [errors, setErrors] = useState({ id: '', name: '', price: '', image: '', description: ''});


    useEffect(() => {
        setChange(false);
        //Esta funcion se ejecuta cada vez que se llama a 'localStorage', incluso entre renderizaciones lo que garantiza el valor actualizado 
        setVehicles(() => JSON.parse(localStorage.getItem('vehicles')));
    }, [change])

    const addVehicle = (e) => {
        e.preventDefault();

        setVehicleData({ id: "", vehicle: "", model: "", img: "", manufacturer: "", excerpt: "", description: "" })

        setEditing(false)
        setOpenModal(true);

        const body = document.querySelector('body');
        body.classList.add('modal-open');
    }

    const editVehicle = (e, vehicle) => {
        e.preventDefault();

        setVehicleData({
            id: vehicle.id, vehicle: vehicle.vehicle, model: vehicle.model, img: vehicle.img,
            manufacturer: vehicle.manufacturer, excerpt: vehicle.excerpt, description: vehicle.description
        });

        setEditing(true);
        setOpenModal(true);

        const body = document.querySelector('body');
        body.classList.add('modal-open');
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData((values) => ({ ...values, [name]: value }));
    };

   

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {
            vehicle:validarObligatorio(vehicleData.vehicle, 'La marca') || validarLongitud(vehicleData.vehicle, 'La marca', 30) || validarSinNumeros(vehicleData.vehicle, 'La marca'),
            model:validarObligatorio(vehicleData.model, 'El modelo') || validarLongitud(vehicleData.model, 'El modelo', 50), 
            img:'',
            manufacturer:validarObligatorio(vehicleData.manufacturer, 'El fabricante'),
            excerpt:validarObligatorio(vehicleData.excerpt, 'El resumen') || validarLongitud(vehicleData.excerpt, 'El resumen', 20), 
            description:validarObligatorio(vehicleData.description, 'La descripcion') || validarLongitud(vehicleData.description, 'La descripcion', 1000)
        }

        setErrors(errors);

        const hasErrors = Object.values(errors).some((error) => error !== '');

        if (!hasErrors) {
            if (editing == true) {
    
                let vehiclesList = JSON.parse(localStorage.getItem('vehicles'));
    
                let editedVehicle = vehiclesList.map(vehicle => {
                    console.log(vehicleData.id);
                    // console.log(v.id);
                    if (vehicle.id == vehicleData.id) {
                        vehicle.id = vehicleData.id;
                        vehicle.vehicle = vehicleData.vehicle;
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
                    <div> {errors.vehicle && <span className='msg-error'>{errors.vehicle}</span>} </div>
                </label>

                <label>Image:
                    <input type="text" name='img' value={vehicleData.img} onChange={handleChange} />
                </label>

                <label>Model:
                    <input type="text" id="model" name="model" value={vehicleData.model} onChange={handleChange} />
                    <div> {errors.model && <span className='msg-error'>{errors.model}</span>} </div>
                </label>

                <label>Manufacturer:
                    <input type="text" id="manufacturer" name="manufacturer" value={vehicleData.manufacturer} onChange={handleChange} />
                    <div> {errors.manufacturer && <span className='msg-error'>{errors.manufacturer}</span>} </div>
                </label>

                <label>Excerpt:
                    <textarea name="excerpt" cols="30" rows="5" value={vehicleData.excerpt} onChange={handleChange}></textarea>
                    <div> {errors.excerpt && <span className='msg-error'>{errors.excerpt}</span>} </div>
                </label>

                <label htmlFor="description">Description:
                    <textarea name="description" cols="30" rows="10" value={vehicleData.description} onChange={handleChange}></textarea>
                    <div> {errors.description && <span className='msg-error'>{errors.description}</span>} </div>
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