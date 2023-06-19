
import { Link, useResolvedPath } from "react-router-dom";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

export default function ProductsList() {
    const path = useResolvedPath("").pathname;
    const [products, setProducts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        getProducts();

        if (editMode && selectedProduct) {
            setForm(selectedProduct);
        }
    }, [editMode, selectedProduct]);

    function getProducts() {
        const products = JSON.parse(localStorage.getItem('products'));
        setProducts(products);
    }


    const handleEditar = (product) => {
        setEditMode(true);
        setSelectedProduct(product);

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

        if (editMode && selectedProduct) {
            const updatedProducts = products.map((product) => {
                if (product.id === selectedProduct.id) {
                    return {
                        ...product,
                        name: form.name,
                        price: form.price,
                        image: form.image,
                        description: form.description,
                    }
                }
                return product;
            });
            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
        } else {
            const newProduct = {
                ...form,
                id: faker.datatype.uuid(),
            }
            setProducts([...products, newProduct]);
            localStorage.setItem('products', JSON.stringify([...products, newProduct]));
        }

        setForm({
            id: faker.datatype.uuid(),
            name: '',
            price: '',
            image: faker.image.image(),
            description: '',

        })

        setEditMode(false);
        setSelectedProduct(null);

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
                                            <button onClick={() => handleEditar(product)}>Editar</button>
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