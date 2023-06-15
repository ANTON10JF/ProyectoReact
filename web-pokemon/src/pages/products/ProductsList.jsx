
import { Link, useResolvedPath } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductsList() {
    const path = useResolvedPath("").pathname;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    function getProducts() {
        const products = JSON.parse(localStorage.getItem('products'));
        setProducts(products);
    }

    return (

        <section>
            <header className='section-title'>
                <h2>Lista de productos</h2>
            </header>
            <main >
                <div className="lista-container">
                    {
                        products.map((product) => {
                            return (

                                <article className="card shadows-cards" key={product.id}>
                                    <div className="body-card">
                                        <div className='card-img'>
                                            <img src={product.image} alt={product.name} height="200px" />
                                        </div>

                                        <div className="title-card">
                                            <Link to={`${path}/product/${product.id}`}>
                                                <h3>{product.name}</h3>
                                            </Link>
                                        </div>
                                        <p>{product.description}</p>
                                        <p>{product.price}</p>
                                    </div>

                                </article>
                            );
                        })
                    }
                </div>
            </main>
        </section>

    );
}