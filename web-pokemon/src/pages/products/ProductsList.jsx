import products from "../../data/products/products";
import { Link, useResolvedPath } from "react-router-dom";

export default function ProductsList() {
    const path = useResolvedPath("").pathname;

    return (

        <section>
            <header>
                <h2>Lista de productos</h2>
            </header>
            {
                products.map((product) => {
                    return (

                        <article key={product.id}>

                            <div>
                                <img src={product.image} alt={product.name} />
                            </div>

                            <div>
                                <Link to={`${path}/product/${product.id}`}>
                                    <h3>{product.name}</h3>
                                </Link>
                            </div>

                            <p>{product.description}</p>
                            <p>{product.price}</p>

                        </article>

                    );
                })
            }
        </section>

    );
}