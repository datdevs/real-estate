import { faker } from '@faker-js/faker';
import { http, HttpHandler, HttpResponse } from 'msw';
import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from '../../../app/core/constant';
import { RealEstate } from '../../../app/models';

const response: RealEstate[] = faker.helpers.multiple(
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
      quantity: faker.number.int({ min: 1, max: 10 }),
      createdAt: faker.date.recent({ days: 365 }),
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
  const sortBy = url.searchParams.get('sortBy');
  const sortOrder = url.searchParams.get('sortOrder');
  let newResponse = structuredClone(response);

  if (sortBy && sortOrder) {
    newResponse = sortData(response, sortBy, sortOrder);
  }

  const start = page * limit;
  const end = start + limit;

  return HttpResponse.json({
    results: newResponse.slice(start, end),
    total: response.length,
  });
});

const sortData = (data: RealEstate[], sortBy: string, sortOrder: string): RealEstate[] => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    const valueA = a[sortBy as keyof RealEstate];
    const valueB = b[sortBy as keyof RealEstate];

    if (valueA === undefined || valueB === undefined) {
      return 0;
    }

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    } else if (valueA instanceof Date && valueB instanceof Date) {
      return sortOrder === 'asc' ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
    }

    return 0;
  });

  return sortedData;
};
