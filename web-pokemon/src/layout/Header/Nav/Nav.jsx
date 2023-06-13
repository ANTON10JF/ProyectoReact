import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/animales'>Animals</Link>
                </li>
                <li>
                    <Link to='/'>Link2</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/not-found'>NotFound</Link>
                </li>
            </ul>
        </nav>
    );
};