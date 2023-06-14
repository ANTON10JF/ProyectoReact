import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Link1</Link>
                </li>
                <li>
                    <Link to='/'>Link2</Link>
                </li>
                <li>
                    <Link to='/vehicles'>Vehiculos</Link>
                </li>
                <li>
                    <Link to='/not-found'>NotFound</Link>
                </li>
            </ul>
        </nav>
    );
};