import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../../compartidos";
import products from "../../data/products/products";

export default function Product() {
    let { id } = useParams();
    const [filteredProduct, setFilteredProduct] = useState({});

    useEffect(() => {
        const getProduct = products.filter((product) => {
            return product.id == id;
        });
        setFilteredProduct(getProduct[0]);

    }, []);

    return (
        <>
            <section>
                <article>
                    <header>
                        <h2>{filteredProduct.name}</h2>
                    </header>
                    <div>
                        <img src={filteredProduct.image} alt={filteredProduct.name} />
                    </div>
                    <p>{filteredProduct.description}</p>
                    <p>{filteredProduct.price}</p>

                </article>
            </section>
        </>

    );

}