import { faker } from '@faker-js/faker';
import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from '../../app/core/constant';
import { RealEstate } from '../../app/models';

const realEstates: RealEstate[] = faker.helpers.multiple(
  () => {
    return {
      id: faker.string.uuid(),
      name: faker.company.name(),
      type: faker.helpers.arrayElement(PRODUCT_TYPES),
      category: faker.helpers.arrayElement(PRODUCT_CATEGORIES),
      description: faker.lorem.paragraphs(2),
      location: faker.location.streetAddress(),
      price: faker.number.float({ min: 50000, max: 5000000, fractionDigits: 0 }),
      imageUrl: faker.image.url({ height: 200, width: 200 }),
      createdAt: faker.date.recent({ days: 365 }),
    };
  },
  {
    count: 200,
  },
);

export { realEstates };
