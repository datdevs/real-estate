import { faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';
import { RealEstateRequest } from '../../../app/models';
import { realEstates } from '../database';

export const postData = http.post('/real-estate', async ({ request }) => {
  const body = (await request.json()) as RealEstateRequest;

  // Validate the request body
  if (realEstates.findIndex((item) => item.name === body.name) !== -1) {
    return HttpResponse.json({ message: `"${body.name}" is already exists` }, { status: 400 });
  }

  realEstates.push({
    ...body,
    id: faker.string.uuid(),
    createdAt: new Date(),
  });

  return HttpResponse.json(null, { status: 204 });
});
