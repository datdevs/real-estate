import { http, HttpHandler, HttpResponse } from 'msw';
import { RealEstate } from '../../../app/models';
import { realEstates } from '../database';

export const getData: HttpHandler = http.get('/real-estate', ({ request }) => {
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit') as string, 10) : 10;
  const page = url.searchParams.get('page') ? parseInt(url.searchParams.get('page') as string, 10) : 0;
  const sortBy = url.searchParams.get('sortBy');
  const sortOrder = url.searchParams.get('sortOrder');
  let newResponse = structuredClone(realEstates);

  if (sortBy && sortOrder) {
    newResponse = sortData(newResponse, sortBy, sortOrder);
  }

  const start = page * limit;
  const end = start + limit;

  return HttpResponse.json({
    results: newResponse.slice(start, end),
    total: realEstates.length,
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
