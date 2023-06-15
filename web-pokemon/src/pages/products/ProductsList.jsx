import products from "../../data/products/products";
import { Link, useResolvedPath } from "react-router-dom";

export default function ProductsList() {
    const path = useResolvedPath("").pathname;

    return (

        <section>
            <header>
                <h2>Lista de productos</h2>
            </header>
            <main >
                <div className="lista-container">
                    {
                        products.map((product) => {
                            return (

                                <article className="card shadows-cards" key={product.id}>

                                    {/* <div>
                                <img src={product.image} alt={product.name} />
                            </div> */}

                                    <div className="title-card">
                                        <Link to={`${path}/product/${product.id}`}>
                                            <h3>{product.name}</h3>
                                        </Link>
                                    </div>
                                    <div className="body-card">
                                        <p>{product.description}</p>
                                    </div>
                                    <div className="footer-card">
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