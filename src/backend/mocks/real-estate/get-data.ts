import { faker } from '@faker-js/faker';
import { http, HttpHandler, HttpResponse } from 'msw';
import { RealEstate } from '../../../app/models';

const response: RealEstate[] = faker.helpers.multiple(
  () => {
    return {
      id: faker.string.uuid(),
      name: faker.company.name(),
      type: faker.helpers.arrayElement(['Apartment', 'Villa', 'Condo', 'Townhouse']),
      category: faker.helpers.arrayElement(['For Sale', 'For Rent', 'Commercial', 'Luxury']),
      description: faker.lorem.paragraphs(2),
      location: faker.location.streetAddress(),
      price: faker.number.float({ min: 50000, max: 5000000, fractionDigits: 0 }),
      imageUrl: faker.image.url({ height: 200, width: 200 }),
      quantity: faker.number.int({ min: 1, max: 10 }),
      createdAt: faker.date.recent(),
    };
  },
  {
    count: 200,
  },
);

export const getData: HttpHandler = http.get('/real-estate', ({ request }) => {
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit') as string, 10) : 10;
  const page = url.searchParams.get('page') ? parseInt(url.searchParams.get('page') as string, 10) : 0;

  const start = page * limit;
  const end = start + limit;

  return HttpResponse.json({
    results: response.slice(start, end),
    total: response.length,
  });
});
