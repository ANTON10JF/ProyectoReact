import { useParams } from "react-router-dom";
// import vehicles from "../../data/dataVehicles/dataVehicles";
import { useEffect, useState } from "react";
import { ErrorMessage } from '../../compartidos';


export default function Vehicle() {

    const {id} = useParams()

    const [vehicle, setVehicle] = useState({}); // siempre hay que inicializarlo pero como sé que recojo array, inicialiizamos a array vacío

    useEffect(() => {
        getVehicle(id);
    }, [])

    const getVehicle = (id) => {
        const getLocalStorage = JSON.parse(localStorage.getItem('vehicles'));
        const getV = getLocalStorage.filter(vehicle => vehicle.id == id);
        getV.length > 0 ? setVehicle(getV[0]) : setVehicle({});
    }

    return(
        <>
            <section>
                <header><h2>Vehiculos</h2></header>
                <main>
                    {vehicle ?
                        (
                            <article>
                                <h3 className="{vehicle.id}">{vehicle.vehicle}</h3>
                                <div>
                                    <img src={`${vehicle.img}`} alt={`Imegen de un ${vehicle.vehicle}`}/>
                                    <p>Tipo: {vehicle.type}</p>
                                    <p>Modelo: {vehicle.model}</p>
                                    <p>Fabricante: {vehicle.manufacturer}</p>
                                    <p>{vehicle.description}</p>
                                </div>
                            </article>
                        )
                    : 
                        (
                            <ErrorMessage message={'Vehiculos no encontardos'}/>
                        )
                    }
                </main>
            </section>
        </>
    )
}