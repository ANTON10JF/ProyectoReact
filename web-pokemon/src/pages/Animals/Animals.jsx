import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import ModalForm from '../../compartidos/ModalForm/ModalForm';
import FormAnimal from '../../components/FormAnimal';
//Logica encargado de editar, borrar y crear un item del localStorage
import { functionEditItem, functionDeleteItem, functionNewItem } from '../../helpers/cartsManagement'


export default function Animals() {

    const [animals, setAnimals] = useState([]);
    //Lo inicializamos a true para que el use effect se vuelva a ejecutar y cambie el esado de 'animals' a un array con los datos del local storage, si no no se actualiza el estado y el array en el primer pintado esta vacio
    //Cada vez que se ejecute un cambio invocamos useEffect al cambiar el estado
    const [change, setChange] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [datos, setDatos] = useState({ id: '', species: '', image: '', location: '', excerpt: '', description: '' })
    const [editItem, setEditItem] = useState('');


    useEffect(() => {
        //Reasignamos el estado 'change' a fale, para posibles nuevos cambios
        setChange(false);

        //Asignamos el valor actualizado del localStorage a 'animals' tras cada cambio
        setAnimals(() => JSON.parse(localStorage.getItem('animals')));

        //Cada vez que el estado 'change' se actualiza se ejecuta useEffect
    }, [change]);

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
                                        <img src={`${animal.image}`} alt='imgAnimal' height='200px' />
                                    </div>
                                    <p>
                                        {animal.excerpt}
                                    </p>
                                    <div className='footer-card'>
                                        <p>{'From->'}{animal.location}</p>
                                        <div>
                                            <button onClick={(e) => functionEditItem(e, animal, setDatos, setEditItem, setOpenModal)} className='btn-card btn-card-edit'></button>
                                            <button onClick={(e) => functionDeleteItem(e, animal.id, setChange)} className='btn-card btn-card-delete'></button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    )}
                </div>
            </main>
            <button className='add-item' onClick={() => functionNewItem(setDatos, setEditItem, setOpenModal)}>+</button>

            {/* Si openModal es true, mostramos el 'componente' modal */}
            {openModal ? <ModalForm setOpenModal={setOpenModal}>{<FormAnimal datos={datos} setDatos={setDatos} editItem={editItem} item={animals} nameItem={'animals'} setChange={setChange} setOpenModal={setOpenModal} />}</ModalForm> : null}
        </section>
    );


};