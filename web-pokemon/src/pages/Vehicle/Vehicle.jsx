import { useParams } from "react-router-dom";
import vehicles from "../../data/dataVehicles/dataVehicles";
import { useEffect, useState } from "react";


export default function Vehicle() {
    const [vehicle, setVehicle] = useState({}); // siempre hay que inicializarlo pero como sé que recojo array, inicialiizamos a array vacío
    let {id} = useParams()

    useEffect(() => {
        getVehicle(id);
    }, [])

    const getVehicle = (id) => {
        const getV = vehicles.filter(vehicle => vehicle.id == id);
        getV.length > 0 ? setVehicle(getV[0]) : setVehicle({});
    }

    return(
        <>
            <section>
                <article>
                    <main>

                        {vehicle ?
                            (
                                <article>
                                    <h3>{vehicle.vehicle}</h3>
                                    <div>
                                        <p>{vehicle.model}</p>
                                        <p>{vehicle.color}</p>
                                    </div>
                                </article>
                            )
                        : 
                            (
                                <h2>Error</h2>
                            )
                        }
                        
                    </main>
                </article>
            </section>
        </>
    )
}