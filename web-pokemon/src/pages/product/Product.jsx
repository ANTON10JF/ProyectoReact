import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Product() {
    let { id } = useParams();
    const [filteredProduct, setFilteredProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getProduct(id);
    }, []);

    const getProduct = (id) => {
        const getLocalStorage = JSON.parse(localStorage.getItem('products'));
        const getProduct = getLocalStorage.filter(product => product.id == id);
        getProduct.length > 0 ? setFilteredProduct(getProduct[0]) : setFilteredProduct({});
    };

    if (!filteredProduct.id) {
        navigate('/not-found');
    }

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