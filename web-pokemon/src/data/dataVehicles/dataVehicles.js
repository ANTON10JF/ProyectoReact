import { faker } from '@faker-js/faker';

// let vehicles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
// vehicles = vehicles.map(post => {
//     return {
//         id:post,
//         vehicle:faker.vehicle.vehicle(),
//         color:faker.vehicle.color(),
//         type:faker.vehicle.type(),
//         model:faker.vehicle.model(),
//         fuel:faker.vehicle.fuel(),
//         vin:faker.vehicle.vin(),
//         vrm:faker.vehicle.vrm(),
//     }
// })

// export default vehicles


export function postVehicles() {
    let quantity = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    let arrayVehicles = [];
    arrayVehicles = quantity.map(vehicle => {
        return {
            id:vehicle,
            vehicle:faker.vehicle.vehicle(),
            type:faker.vehicle.type(),
            model:faker.vehicle.model(),
            img:faker.image.urlLoremFlickr({width: 400, height: 200, category: 'vehicles' }),
            manufacturer:faker.vehicle.manufacturer(),
            excerpt: faker.lorem.sentence(10),
            description: faker.lorem.sentence(100)
        }
    })
    firstGestionLocalStorage(arrayVehicles);
}

function firstGestionLocalStorage(arrayVehicles) {
    localStorage.setItem('vehicles', JSON.stringify(arrayVehicles))
}