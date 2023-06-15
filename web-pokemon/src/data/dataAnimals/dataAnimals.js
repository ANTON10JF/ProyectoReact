import { faker } from '@faker-js/faker';


/* let posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
posts = posts.map(post => {
    return {
        id:post,
        species: faker.animal.type(),
        img: faker.image.animals(),
        location:faker.address.city(),
        excerpt: faker.lorem.sentence(30),
        description: faker.lorem.sentence(100),

    }
})
 */

export function postAnimals (){
    const quantity = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    
    let arrayAnimals = [];
    arrayAnimals = quantity.map(animal => {
         return {
            id:animal,
            species: faker.animal.type(),
            img: faker.image.image(),
            location:faker.address.city(),
            excerpt: faker.lorem.sentence(10),
            description: faker.lorem.sentence(100)
        }
    })

   firstGestionLocalStorage(arrayAnimals)
    
}

function firstGestionLocalStorage(arrayAnimals){
    localStorage.setItem('animals', JSON.stringify(arrayAnimals))
}

//export default posts
