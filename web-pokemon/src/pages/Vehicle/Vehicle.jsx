import { useParams, useNavigate } from "react-router-dom";
// import vehicles from "../../data/dataVehicles/dataVehicles";
import { useEffect, useState } from "react";


export default function Vehicle() {

    const navigate = useNavigate();
    const { id } = useParams()
    const [vehicle, setVehicle] = useState({}); // siempre hay que inicializarlo pero como sé que recojo array, inicialiizamos a array vacío

    useEffect(() => {
        getVehicle(id);
    }, [])

    const getVehicle = (id) => {
        const getLocalStorage = JSON.parse(localStorage.getItem('vehicles'));
        const getV = getLocalStorage.filter(vehicle => vehicle.id == id);
        getV.length > 0 ? setVehicle(getV[0]) : setVehicle({});
    }

    if (!vehicle.id) {
        navigate("/not-found");
    }

    return (
        <>
            <section>
                <header><h2>Vehiculos</h2></header>
                <main>
                    <article>
                        <h3 className="{vehicle.id}">{vehicle.vehicle}</h3>
                        <div>
                            <img src={`${vehicle.img}`} alt={`Imegen de un ${vehicle.vehicle}`} />
                            <p>Modelo: {vehicle.model}</p>
                            <p>Fabricante: {vehicle.manufacturer}</p>
                            <p>{vehicle.description}</p>
                        </div>
                    </article>
                </main>
            </section>
        </>
    )
}