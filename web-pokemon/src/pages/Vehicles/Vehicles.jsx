// import vehicles from "../../data/dataVehicles/dataVehicles";
import { useEffect, useState } from "react";
import { Link, useResolvedPath } from "react-router-dom";


export default function Vehicles() {

    const path = useResolvedPath().pathname;
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getVehicles();
    }, [])

    function getVehicles() {
        const getLocalStorage = JSON.parse(localStorage.getItem('vehicles'));
        setVehicles(getLocalStorage);
    }

    return (
        <section>
            <header className="section-title">
                <h2>Vehiculos</h2>
            </header>
            <main>
                <div className="lista-container">
                    {vehicles.map(vehicle => 
                        <Link to={`${path}/vehicle/${vehicle.id}`} key={vehicle.id}>
                            <article className="card shadow-cards">
                                <h3 className="title-card">{vehicle.vehicle}</h3>
                                <div className="body-card">
                                    {/* <div className='card-img'>
                                        <img src={`${animal.img}`} alt='imgAnimal' />
                                    </div> */}
                                    <p>{vehicle.model} <br />
                                    {vehicle.color}</p>
                                </div>
                            </article>
                        </Link>
                    )}
                </div>
            </main>
        </section>
    );
}