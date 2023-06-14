import { useParams } from "react-router-dom";
import { ErrorMessage } from "../../compartidos";
import products from "../../data/products/products";

export default function Product() {
    let { id } = useParams();


    const filteredProducts = products.filter((product) => {
        return product.id == id;
    });




    if (!filteredProducts.length) {
        return <ErrorMessage message={"Producto no encontrado"} />
    }



    const product = filteredProducts[0];

    return (
        <>
            <section>
                <article>
                    <header>
                        <h2>{product.name}</h2>
                    </header>
                    <div>
                        <img src={product.image} alt={product.name} />
                    </div>
                    <p>{product.description}</p>
                    <p>{product.price}</p>

                </article>
            </section>
        </>

    );

}