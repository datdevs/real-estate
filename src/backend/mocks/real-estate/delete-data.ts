import { http, HttpResponse } from 'msw';
import { realEstates } from '../database';

export const deleteData = http.delete('/real-estate/:id', ({ params }) => {
  const { id } = params;

  // Find the index of the real estate item to delete
  const index = realEstates.findIndex((item) => item.id === id);

  if (index === -1) {
    return HttpResponse.json({ message: 'Real estate not found' }, { status: 404 });
  }

  // Set the isDeleted property to true instead of removing the item
  realEstates[index].isDeleted = true;

  return HttpResponse.json(null, { status: 204 });
});
