import {useState } from "react"
import { validarObligatorio, validarLongitud, validarSinNumeros } from "../../validators/validators";

 //Creamos un Componente que retorna un formulario para editar o crear un nuevo item 'animal' y lo pintamos dentro del Comonente 'ModalForm'
 function FormAnimal({datos, setDatos, editItem, item, nameItem, setChange, setOpenModal}) {


    //Para manejar los errores de validacion de formulario, creamos un estado con un objeto de todos los campos que queremos validar
    const [formError, setFormError] = useState({species:null, image:null, location:null, excerpt:null, description:null});

    
    //Logica encargada de manejar el estado 'data' y 'formError', con cada cambio que se realice en un input del formulario
    const handleChange = (e) => {

        //Escuchamos que nombre y que valor se esta modificando
        const { name, value } = e.target;

        //Hacemos una copia del estado 'datos', modificando el valor del 'name' que se esta modificando 
        setDatos((prevDatos) => ({
            ...prevDatos, [name]: value,
        }));

        //Hacemos una copia del estado 'formError', modificando el valor del 'name' que se esta modificando 
        //Para que al hacer un cambio si ya se ha corregido el error, cambie su valor a null
        setFormError((prevDatos) => ({
            ...prevDatos, [name]: null,
        }))
    };


    //Funcion encargada de manejar el evento click sobre el formulario
    //Setea los errores si los hubiese en el estado 'fomrError', comprueba si existe algun error y si no lo hay llama a la funcion 'sendData'
    const handleSubmit = (e) => {

        e.preventDefault();

        //Creamos una constante llamando a las funciones validadoras, si existe algun error este objeto los contendra
        const errors = {
            species:validarObligatorio(datos.species, 'La especie') || validarLongitud(datos.species, 'La especie', 12),
            image:'', 
            location:validarObligatorio(datos.location, 'La localizacion') || validarSinNumeros(datos.location, 'La localizacion'), 
            excerpt:validarObligatorio(datos.excerpt, 'El resumen') || validarLongitud(datos.species, 'El resumen', 20), 
            description:validarObligatorio(datos.description, 'La descripcion') || validarLongitud(datos.description, 'La descripcion', 1000)
        }

        //Seteamos el nuevo objeto errors al estado formError
        setFormError(errors)

        // Verificar si hay algún error en el objeto 'errors'
        const hasErrors = Object.values(errors).some((error) => error !== '');

        //Si no hay errores llamamos a la funcion sendData()
        if (!hasErrors) {
            sendData();
        }
        
    }


    //Logica encargada de manejar los datos del formulario
    const sendData = () => {

               
        const modifiedLocalStorage = JSON.parse(localStorage.getItem(nameItem))

        //Si el estado 'editItem' es = 'falshy', estamos creando un nuevo item
        if (!editItem) {
            let maxId = 0;
            item.forEach(objeto => {
                if (objeto.id > maxId) {
                    maxId = objeto.id;
                }
            });
            datos.id = maxId + 1
            modifiedLocalStorage.unshift(datos);
            localStorage.setItem(nameItem, JSON.stringify(modifiedLocalStorage));
        }

        //Si el estado 'editItem' es = 'truthy', estamos editando un item y 'editItem' contiene ese item 
        if (editItem) {
            //Creamos un nuevo array con los datos del locaStorage, pero modificando el item que coincida con el que le pasamos (el item a editar)
            const editLocalStorage = modifiedLocalStorage.map(animal => {

                //Con el map recorremos el localStorage, si encontramos una coincidencia de ID modificamos los valores de ESE objeto y lo devolvemos,
                //si no, devolvemos el objeto recorrido en ese momento

                //De esta manera generamos un nuevo arary que seteamos en el localStorage
                if (animal.id == editItem.id) {
                    animal.species = datos.species;
                    animal.image = datos.image;
                    animal.location = datos.location;
                    animal.excerpt = datos.excerpt;
                    animal.description = datos.description;

                    return animal; // Devuelve el objeto modificado

                } else {
                    return animal; // Devuelve el objeto original sin modificaciones
                };

            });

            //Seteamos el nuevo array al localStorage, esto pisara el 'key' con el mismo nombre
            localStorage.setItem(nameItem, JSON.stringify(editLocalStorage));
        };

        //Finalmente ocurra lo que ocurra 
        //Activamos el scroll del body (alguna otra idea?)
        const body = document.querySelector('body');
        body.classList.remove('modal-open');

        //Cambiamos el estado de 'change' a true para que se ejecute el 'useEffect'
        setChange(true);

        //Cambiamos el estado de 'openModal' a false para que se deje de mosrtar nuestro componente modal
        setOpenModal(false);

    };

    return (
        <form className='modal-form' onSubmit={handleSubmit}>
            <label>Species:
                <input type="text" name='species' value={datos.species} onChange={handleChange} />
                <div >
                    {formError.species && <span className='msg-error'>{formError.species}</span>}
                </div>
            </label>

            <label>Image:
                <input type="text" name='image' value={datos.image} onChange={handleChange} />
            </label>

            <label>Location:
                <input type="text" name='location' value={datos.location} onChange={handleChange} />
                <div >
                    {formError.location && <span className='msg-error'>{formError.location}</span>}<br/>
                    
                </div>
            </label>

            <label>Excerpt:
                <textarea name="excerpt" cols="30" rows="5" value={datos.excerpt} onChange={handleChange}></textarea>
                <div >
                    {formError.excerpt && <span className='msg-error'>{formError.excerpt}</span>}
                </div>
            </label>

            <label>Description:
                <textarea name="description" cols="30" rows="10" value={datos.description} onChange={handleChange}></textarea>
                <div >
                    {formError.description && <span className='msg-error'>{formError.description}</span>}
                </div>

            </label>
            <button>Send</button>
        </form>
    );
};

export default FormAnimal