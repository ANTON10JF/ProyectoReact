import posts from '../../data/dataAnimals/dataAnimals'

export default function Animal() {
    return (
        <section>
            {console.log(posts)}
            <header>
                <h2>Animales</h2>
            </header>
            <main>
                {posts.map(post => 
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
                )}
            </main>
        </section>
    );
};