import posts from '../../data/dataAnimals/dataAnimals'
import { Link, useResolvedPath } from 'react-router-dom'


export default function Animales() {

    const path = useResolvedPath().pathname

    return (
        <section>
            <header>
                <h2>Animales</h2>
            </header>
            <main>
                <div className='lista-container'>
                    {posts.map(post =>
                        <Link to={`${path}/animal/${post.id}`} key={post.id}>
                            <article className='card shadows-cards'>
                                <h3 className='title-card'>{post.species}</h3>
                                <div className='body-card'>
                                    {/* <img src={`${post.img}`} alt='imgAnimal' /> */}
                                    <p>
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className='footer-card'>
                                    <span>{'From->'}{post.location}</span>
                                </div>
                            </article>
                        </Link>
                    )}

                </div>
            </main>
        </section>
    );
};