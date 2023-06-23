
//Logica encargada de crear un item y agregarlo al localStorage
function functionNewItem(setDatos, setEditItem, setOpenModal) {

    //Seteo los datos con los valores en blanco. Para cuando pinte el formulario este limpio.
    setDatos({ id: '', species: '', image: '', location: '', excerpt: '', description: '' });

    //Para manejar logica de el submit del formulario seteo editItem a un valor 'falshy'
    setEditItem('');

    //Seteo open modal a true para que se abra el modal con el formulario gracias a un comonente colocado al final del 'html'
    setOpenModal(true);

    //Por estetica quiero desactivar el scroll del body (alguna otra idea?)
    const body = document.querySelector('body');
    body.classList.add('modal-open');
};




//Logica encargada de editar un item del localStorage
function functionEditItem (e, animal, setDatos, setEditItem, setOpenModal) {
    //Como todo el card es un link, realizo un prevent default para evitar el link y que realice el efecto del boton
    e.preventDefault();

    //Seteo los datos con los valores del card "objeto" al que hago click. Para cuando pinte el formulario se muestren.
    setDatos({ id: animal.id, species: animal.species, image: animal.image, location: animal.location, excerpt: animal.excerpt, description: animal.description })

    //Para manejar logica de el submit del formulario seteo editItem a un valor 'truthy' ademas de aprovechar para pasar el objeto del item clickado
    setEditItem(animal);

    //Seteamos 'openModal' a true para que se abra el modal con el formulario gracias a un comonente colocado al final del 'html'
    setOpenModal(true);

    //Por estetica quiero desactivar el scroll del body (alguna otra idea?)
    const body = document.querySelector('body');
    body.classList.add('modal-open');
};




//Logica encargado de borrar un item del localStorage
function functionDeleteItem(e, animalId, setChange) {
    //Como todo el card es un link, realizamos un 'preventDefault()' para evitar el link y que realice el efecto del boton
    e.preventDefault();

    //Mostramos un alert por si se arrepiente
    let sure = window.confirm("Seguro que deseas borrar este 'Pokemon', esto sera defitivo.");

    //Si estamos seguros, creamos un nuevo array con todos los objetos del local storage que sean diferentes al id al que apuntamos "borramos el item"
    //Y a continuacion actualizamos el valor en el localStorage
    if (sure) {
        const editLocalStorage = JSON.parse(localStorage.getItem('animals')).filter(animals => animals.id != animalId);

        //Seteamos el nuevo array al localStorage, esto pisara el 'key' con el mismo nombre
        localStorage.setItem('animals', JSON.stringify(editLocalStorage));

        //Cambiamos el estado de 'change' a true para que se ejecute el 'useEffect'
        setChange(true)
    };
};

 


export{
    functionNewItem,
    functionEditItem,
    functionDeleteItem
   
} 