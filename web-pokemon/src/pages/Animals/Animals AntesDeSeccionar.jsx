import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import ModalForm from '../../compartidos/ModalForm/ModalForm';


export default function Animals() {

    const [animals, setAnimals] = useState([]);
    const [change, setChange] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [datos, setDatos] = useState({ id: '', species: '', image: '', location: '', excerpt: '', description: '' })
    const [editItem, setEditItem] = useState('')

    useEffect(() => {
        getAnimals();
        setChange(false)
    }, [change]);


    //Funcion encargada de 'coger' los items del local storage
    function getAnimals() {
        const getLocalStorage = JSON.parse(localStorage.getItem('animals'));
        setAnimals(getLocalStorage);
    };

    //Funcion encargada de borrar un animal
    const deleteAnimal = (e, animalId) => {
        //Como todo el card es un link, realizo un prevent default para evitar el bubbling y que realice el efecto del boton
        e.preventDefault();

        //Muestro un alert por si acaso se arrepiente
        let sure = window.confirm("Seguro que deseas borrar este 'Pokemon', esto sera defitivo.");
        //Si estamos seguros, creamos un nuevo array con todos los objetos del local storage que sean diferentes al id que apuntamos "borramos el item"
        //Y a continuacion actualizamos el valor en el localStorage
        if (sure) {
            const editLocalStorage = JSON.parse(localStorage.getItem('animals')).filter(animals => animals.id != animalId);
            localStorage.setItem('animals', JSON.stringify(editLocalStorage));
            //Actualizamos un estado para que se repinte la pagina
            setChange(true)
        }
    }

    const editAnimal = (e, animal) => {
        e.preventDefault();
        setDatos({ id: animal.id, species: animal.species, image: animal.img, location: animal.location, excerpt: animal.excerpt, description: animal.description })
        setEditItem(animal)
        setOpenModal(true);


        //Por estetica quiero desactivar el scroll del body (alguna otra idea?)
        const body = document.querySelector('body')
        body.classList.add('modal-open')
    };

    function newAnimal() {
        setDatos({ id: '', species: '', image: '', location: '', excerpt: '', description: '' })
        setEditItem('')
        setOpenModal(true);
    }


    function formAnimal() {
        return (
            <form className='modal-form' onSubmit={handleSubmit}>
                <label>Species:
                    <input type="text" name='species' value={datos.species} onChange={handleChange} />
                </label>

                <label>Image:
                    <input type="text" name='image' value={datos.image} onChange={handleChange} />
                </label>

                <label>Location:
                    <input type="text" name='location' value={datos.location} onChange={handleChange} />
                </label>

                <label>Excerpt:
                    <textarea name="excerpt" cols="30" rows="5" value={datos.excerpt} onChange={handleChange}></textarea>
                </label>

                <label>Description:
                    <textarea name="description" cols="30" rows="10" value={datos.description} onChange={handleChange}></textarea>

                </label>
                <button>Send</button>
            </form>
        )
    }

    //Funcion manejadora de lso esados en relacion a los cambios sobre el formulario
    const handleChange = (e) => {
        //Para que este manejador sea generico para cualquier dato que le haga 'click'
        const { name, value } = e.target;
        setDatos((prevDatos) => ({
            ...prevDatos, [name]: value,
        }));


    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const addLocalStorage = JSON.parse(localStorage.getItem('animals'));

        if (!editItem) {
            let maxId = 0;
            animals.forEach(objeto => {
                if (objeto.id > maxId) {
                    maxId = objeto.id;
                }
            });
            datos.id = maxId + 1
            addLocalStorage.unshift(datos);
            localStorage.setItem('animals', JSON.stringify(addLocalStorage));
        }

        if (editItem) {
            console.log(editItem);
            const editLocalStorage = JSON.parse(localStorage.getItem('animals')).map(animal => {

                //Con el map recorremos el localStorage, si encontramos una coincidencia de ID modificamos sus valores y lo devolvemos,
                //si no devolvemos el objeto recorrido en ese momento
                //De esta manera generamos un nuevo arary que insertamos en el localStorage
                if (animal.id == editItem.id) {
                    animal.species = datos.species;
                    animal.image = datos.image;
                    animal.location = datos.location;
                    animal.excerpt = datos.excerpt;
                    animal.description = datos.description;

                    return animal; // Devuelve el objeto modificado

                } else {
                    return animal; // Devuelve el objeto original sin modificaciones
                }

            });
            localStorage.setItem('animals', JSON.stringify(editLocalStorage));
        }

        const body = document.querySelector('body')
        body.classList.remove('modal-open')
        setChange(true)
        setOpenModal(false)

    }


    return (
        <section>
            <header className='section-title'>
                <h2>Animales</h2>
            </header>
            <main>
                <div className='lista-container'>
                    {animals.map(animal =>
                        <Link to={`/animal/${animal.id}`} key={animal.id}>
                            <article className='card shadows-cards'>

                                <h3 className='title-card'>{animal.species}</h3>
                                <div className='body-card'>
                                    <div className='card-img'>
                                        <img src={`${animal.img}`} alt='imgAnimal' height='200px' />
                                    </div>
                                    <p>
                                        {animal.excerpt}
                                    </p>
                                    <div className='footer-card'>
                                        <p>{'From->'}{animal.location}</p>
                                        <div>
                                            <button onClick={(e) => editAnimal(e, animal)} className='btn-card btn-card-edit'></button>
                                            <button onClick={(e) => deleteAnimal(e, animal.id)} className='btn-card btn-card-delete'></button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    )}
                </div>
            </main>
            <button className='add-item' onClick={newAnimal}>+</button>

            {/* Si openModal es true, mostramos el componente modal */}
            {openModal ? <ModalForm setOpenModal={setOpenModal}>{formAnimal()}</ModalForm> : null}
        </section>
    );
};