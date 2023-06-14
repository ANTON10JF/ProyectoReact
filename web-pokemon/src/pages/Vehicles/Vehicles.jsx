import vehicles from "../../data/dataVehicles/dataVehicles";
import { Link, useResolvedPath } from "react-router-dom";


export default function Vehicles() {

    const path = useResolvedPath().pathname;

    return (
        <section>
            <div className="container">

                <header>
                    <h2>Vehiculos</h2>
                </header>
                <main>
                    <div>
                        {vehicles.map(vehicle => 
                            <Link to={`${path}/vehicle/${vehicle.id}`} key={vehicle.id}>
                                <article className="card shadow-cards">
                                    <h3 className="title-card">{vehicle.vehicle}</h3>
                                    {/* <img src={`${vehicle.img}` alt=""}></img> */}
                                    <div className="body-card">
                                        <p>{vehicle.model} <br />
                                        {vehicle.color}</p>
                                    </div>
                                    {/* <div className="footer-card"></div> */}
                                </article>
                            </Link>
                        )}
                    </div>
                </main>
            </div>
        </section>
    );
}