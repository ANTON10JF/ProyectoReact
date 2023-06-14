import { faker } from '@faker-js/faker';

let products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

products = products.map((product) => {
    return {
        id: product,
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        image: faker.image.image(),
        description: faker.commerce.productDescription(),
    };
});

export default products;

