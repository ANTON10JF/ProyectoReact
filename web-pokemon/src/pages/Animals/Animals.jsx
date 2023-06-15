import { useEffect, useState } from 'react';
//import posts from '../../data/dataAnimals/dataAnimals'
import { Link, useResolvedPath } from 'react-router-dom'


export default function Animals() {

    const path = useResolvedPath().pathname;
    const [animals, setAnimals] = useState([]);


    useEffect(() => {
        getAnimals();
    }, []);


    function getAnimals() {
        const getLocalStorage = JSON.parse(localStorage.getItem('animals'));
        setAnimals(getLocalStorage);
    };

    return (
        <section>
            <header className='section-title'>
                <h2>Animales</h2>
            </header>
            <main>
                <div className='lista-container'>
                    {animals.map(animal =>
                        <Link to={`/animal/${animal.id}`} key={animal.id}>
                            <article className='card shadows-cards'>

                                <h3 className='title-card'>{animal.species}</h3>
                                <div className='body-card'>
                                    <div className='card-img'>
                                        <img src={`${animal.img}`} alt='imgAnimal' />
                                    </div>
                                    <p>
                                        {animal.excerpt}
                                    </p>
                                    <p>{'From->'}{animal.location}</p>
                                </div>
                            </article>
                        </Link>
                    )}

                </div>
            </main>
        </section>
    );
};