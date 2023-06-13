import posts from '../../data/dataAnimals/dataAnimals'
import { Link } from 'react-router-dom'


export default function Animales() {

    const handleClick = (animal) => {
        console.log(animal);
    }

    return (
        <section>
            {console.log(posts)}
            <header>
                <h2>Animales</h2>
            </header>
            <main>
                {posts.map(post => 
                <Link to={`${post.id}`} onClick={()=>handleClick(post)}>
                    <article>
                        <h3>{post.species}</h3>
                        <div>
                            <img src={`${post.img}`} alt='imgAnimal'/>
                            <p>
                                {post.excerpt}
                            </p>
                        </div>
                        <span>{'From->'}{post.location}</span>
                    </article>
                </Link>
                )}
            </main>
        </section>
    );
};