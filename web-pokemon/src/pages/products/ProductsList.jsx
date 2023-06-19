
import { Link, useResolvedPath } from "react-router-dom";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

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

    const handleEditar = (id) => {

    }

    const handleEliminar = (id) => {
        const products = JSON.parse(localStorage.getItem('products'));
        const newProducts = products.filter(product => product.id !== id);
        localStorage.setItem('products', JSON.stringify(newProducts));
        getProducts();
    }

    // formulario
    const [form, setForm] = useState({
        id: faker.datatype.uuid(),
        name: '',
        price: '',
        image: faker.image.image(),
        description: '',
    });

    const [error, setError] = useState({
        id: '',
        name: '',
        price: '',
        image: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => {
            return {
                ...prevForm,
                [name]: value,
            };
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const products = JSON.parse(localStorage.getItem('products'));
        const newProducts = [...products, form];
        localStorage.setItem('products', JSON.stringify(newProducts));
        getProducts();

        setForm({
            id: faker.datatype.uuid(),
            name: '',
            price: '',
            image: faker.image.image(),
            description: '',

        })

    }

    return (
        <>
            <section>
                <header className='section-title'>
                    <h2>Formulario</h2>
                </header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="name" value={form.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="price">Precio</label>
                        <input type="number" id="price" name="price" value={form.price} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="image">Imagen</label>
                        <input type="text" id="image" name="image" value={form.image} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="description">Descripción</label>
                        <input type="text" id="description" name="description" value={form.description} onChange={handleChange} />
                    </div>
                    <div>
                        <button type="submit">Guardar</button>
                    </div>
                </form>

            </section>

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
                                            <button onClick={() => handleEditar(product.id)}>Editar</button>
                                            <button onClick={() => handleEliminar(product.id)}>Eliminar</button>
                                        </div>

                                    </article>
                                );
                            })
                        }
                    </div>
                </main>
            </section>
        </>
    );
}