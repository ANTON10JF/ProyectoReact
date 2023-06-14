import './nav.css'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav id='main-nav'>
            <ul>
                <li>
                    <Link to='/'>Home page</Link>
                </li>
                <li>
                    <Link to='/products'>Listado de productos</Link>
                </li>

                <li>
                    <Link to='/animals'>Animals</Link>
                </li>
                <li>
                    <Link to='/vehicles'>Vehiculos</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/contact'>Contact</Link>
                </li>
                <li>
                    <Link to='/not-found'>{'(NotFound)'}</Link>
                </li>
            </ul>
        </nav>
    );
};