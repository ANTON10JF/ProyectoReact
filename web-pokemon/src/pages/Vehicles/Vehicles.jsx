// import vehicles from "../../data/dataVehicles/dataVehicles";
import { useEffect, useState, useNavigate } from "react";
import { Link, json, useResolvedPath } from "react-router-dom";


export default function Vehicles() {

    const path = useResolvedPath().pathname;
    const [vehicles, setVehicles] = useState([]);
    const [vehicleData, setVehicleData] = useState({id: '', img: '', vehicle: '', type : '', model: '', manufacturer: '', excerpt: '', description: '',})
    const [editV, setEditV] = useState(false);

    useEffect(() => {
        getVehicles();
    }, [])

    function getVehicles() {
        const getLocalStorage = JSON.parse(localStorage.getItem('vehicles'));
        setVehicles(getLocalStorage);
    }

    
    const addVehicle = (e, vehicle) => {
        e.preventDefault();
        console.log(vehicle.vehicle);

        setVehicleData({id: vehicle.id, img: vehicle.img, vehicle: vehicle.vehicle, type: vehicle.type, model: vehicle.model, 
                        manufacturer: vehicle.manufacturer, excerpt: vehicle.excerpt, description: vehicle.description})
    }

    const editVehicle = (e, vehicle) => {
        e.preventDefault();
        console.log(vehicle.vehicle);

        let a = 5;
        if (a==5) {
            console.log(a++==6)
            console.log(++a==6)
        }

        if (editV === false) {
            setEditV(true);
        }

        setVehicleData({id: vehicle.id, img: vehicle.img, vehicle: vehicle.vehicle, type: vehicle.type, model: vehicle.model, 
                        manufacturer: vehicle.manufacturer, excerpt: vehicle.excerpt, description: vehicle.description})
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setVehicleData((values) => ({
            ...values,
            [name]: value,
        })       
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(vehicle);

        let vehiclesList = JSON.parse(localStorage.getItem('vehicles'));

        let editedVehicle = vehiclesList.map(vehicle => {
            // console.log(vehicleData.id);
            // console.log(v.id);
            if (vehicle.id == vehicleData.id ) {
                vehicle.id = vehicleData.id;
                vehicle.vehicle = vehicleData.vehicle;
                vehicle.type = vehicleData.type;
                vehicle.model = vehicleData.model;

                return vehicle;
            } else {
                return vehicle;
            }
        })

        localStorage.setItem('vehicles', JSON.stringify(editedVehicle));
        getVehicles();
    }


    const deleteVehicle = (e, id) => {
        e.preventDefault();
        console.log(id);
        let vehiclesList = JSON.parse(localStorage.getItem('vehicles'));
        let newVehiclesList = vehiclesList.filter(vehicle => vehicle.id != id);
        console.log(newVehiclesList);
        localStorage.setItem('vehicles', JSON.stringify(newVehiclesList));
        getVehicles();
    }

    return (
        <>
            <section>
                <header>
                    <h2>Vehicle form</h2>
                </header>
                <form onSubmit={handleSubmit}> 
                    <div>
                        <input type="hidden" name="id" value={vehicleData.id} />
                    </div>
                    <div>
                        <label>Vehicles name: 
                            <input type="text" id="vehicle" name="vehicle" value={vehicleData.vehicle} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>Image: 
                            <input type="text" id="img" name="img" value={vehicleData.img} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>Type: 
                            <input type="text" id="type" name="type" value={vehicleData.type} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>Model: 
                            <input type="text" id="model" name="model" value={vehicleData.model} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>Excerpt:
                            <textarea name="excerpt" cols="30" rows="5" value={vehicleData.excerpt} onChange={handleChange}></textarea>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="description">Description: 
                            <textarea name="description" cols="30" rows="10" value={vehicleData.description} onChange={handleChange}></textarea>
                        </label>
                    </div>
                    <div>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </section>




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
                                    <img src={`${vehicle.img}`} alt={`Imagen de ${vehicle.vehicle}`} />
                                    <div className="body-card">
                                        <p>Modelo: {vehicle.model}</p>
                                        <p>Tipo: {vehicle.type}</p>
                                        <p>{vehicle.excerpt}</p>
                                    </div>
                                    <div className="footer-card">Fabricante: {vehicle.manufacturer}</div>
                                    <button type="submit" onClick={(e) => addVehicle(e)}>Añadir vehículo</button>
                                    <button type="submit" onClick={(e) => editVehicle(e, vehicle)}>Editar vehículo</button>
                                    <button type="submit" onClick={(e) => deleteVehicle(e, vehicle.id)}>Eliminar vehículo</button>
                                </article>
                            </Link>
                        )}
                    </div>
                </main>
            </section>
        </>
    );
}