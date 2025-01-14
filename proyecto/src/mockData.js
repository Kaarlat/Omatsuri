import { faker } from '@faker-js/faker';

export function generateEvents(count = 10) {
    const events = [];
    for (let i = 0; i < count; i++) {
        events.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            description: faker.lorem.sentence(),
            image: faker.image.imageUrl(),
            code: faker.random.alphaNumeric(10),
        });
    }
    return events;
}

export function generateUsers(count = 10, events = []) {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push({
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            email: faker.internet.email(),
            role: faker.helpers.randomize(roles),
            isPremium: faker.datatype.boolean(),
            occupation: faker.name.jobTitle(),
            cart: faker.helpers.arrayElements(events, faker.datatype.number({ min: 1, max: 5 })),
        });
    }
    return users;
}