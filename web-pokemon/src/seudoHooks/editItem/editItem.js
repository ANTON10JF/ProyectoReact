const editAnimal = (e, animal) => {
    e.preventDefault();
    setDatos({ id: animal.id, species: animal.species, image: animal.img, location: animal.location, excerpt: animal.excerpt, description: animal.description })
    setEditItem(animal)
    setOpenModal(true);


    //Por estetica quiero desactivar el scroll del body (alguna otra idea?)
    const body = document.querySelector('body')
    body.classList.add('modal-open')
};

export default editAnimal