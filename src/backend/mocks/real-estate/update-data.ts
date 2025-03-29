import { http, HttpResponse } from 'msw';
import { RealEstateRequest } from '../../../app/models';
import { realEstates } from '../database';

export const updateData = http.put('/real-estate/:id', async ({ request, params }) => {
  const { id } = params;
  const body = (await request.json()) as RealEstateRequest;

  // Find the index of the real estate item to update
  const index = realEstates.findIndex((item) => item.id === id);

  if (index === -1) {
    return HttpResponse.json({ message: 'Real estate not found' }, { status: 404 });
  }

  // Update the real estate item
  realEstates[index] = { ...realEstates[index], ...body, updatedAt: new Date() };

  return HttpResponse.json(null, { status: 204 });
});
