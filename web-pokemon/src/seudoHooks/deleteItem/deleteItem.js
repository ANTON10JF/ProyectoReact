//Funcion encargada de borrar un item del localStorage
const deleteItem = (e, itemId, nameItemLocStorage, setChange) => {
    //Como todo el card es un link, realizo un prevent default para evitar el link y que realice el efecto del boton
    e.preventDefault();

    //Mostramos un alert por si se arrepiente
    let sure = window.confirm("Seguro que deseas borrar este item, esto sera defitivo.");

    //Si estamos seguros, creamos un nuevo array con todos los objetos del local storage que sean diferentes al id al que apuntamos "borramos el item"
    //Y a continuacion actualizamos el valor en el localStorage
    if (sure) {
        const editLocalStorage = JSON.parse(localStorage.getItem(nameItemLocStorage)).filter(animals => animals.id != itemId);
        localStorage.setItem(nameItemLocStorage, JSON.stringify(editLocalStorage));
        //Actualizamos un estado para que se repinte la pagina
        setChange(true);
    };
};

export default deleteItem;