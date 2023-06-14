import { useEffect, useState } from 'react';
import { ErrorMessage } from '../../compartidos';
import posts from '../../data/dataAnimals/dataAnimals'
import {useParams} from 'react-router-dom'


export default function Animal() {
    
    const {id} = useParams();

    const [animal, setAnimal] = useState({});
    

    useEffect(() => {
        getAnimal(id);
      }, []);


    const getAnimal = (id) => {
        const getA = posts.filter(animal => animal.id == id);   
        getA.length > 0 ? setAnimal(getA[0]) : setAnimal({});   
    };
   
    return (
        <section>
            <header>
                <h2>Animales</h2>
            </header>
            <main>
                {animal ?
                    ( 
                        <article>
                            <h3>{animal.species}</h3>
                            <div>
                                <img src={`${animal.img}`} alt='imgAnimal'/>
                                <p>
                                    {animal.excerpt}
                                </p>
                            </div>
                            <span>{'From->'}{animal.location}</span>
                        </article>
                    ) 
                :
                
                    (
                        <ErrorMessage message={'Animales no encontrados'}/>
                    )
                }
                
            </main>
        </section>
    );
};