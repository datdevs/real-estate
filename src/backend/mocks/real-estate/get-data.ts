import { http, HttpHandler, HttpResponse } from 'msw';
import { RealEstate } from '../../../app/models';
import { realEstates } from '../database';

export const getData: HttpHandler = http.get('/real-estate', ({ request }) => {
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit') as string, 10) : 10;
  const page = url.searchParams.get('page') ? parseInt(url.searchParams.get('page') as string, 10) : 0;
  const sortBy = url.searchParams.get('sortBy');
  const sortOrder = url.searchParams.get('sortOrder');
  const search = url.searchParams.get('search') || null;
  const category = url.searchParams.get('category') || null;
  const type = url.searchParams.get('type') || null;
  const status = url.searchParams.get('status') || null;
  const isAvailableProduct = structuredClone(realEstates.filter((item) => !item.isDeleted));
  let filteredProduct = structuredClone(isAvailableProduct);

  // Filter by status
  if (status === 'isDeleted') {
    filteredProduct = realEstates.filter((item) => item.isDeleted);
  }

  // Filter by search
  if (search) {
    filteredProduct = filteredProduct.filter((item) => {
      const searchLowerCase = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchLowerCase) ||
        item.description.toLowerCase().includes(searchLowerCase) ||
        item.location.toLowerCase().includes(searchLowerCase)
      );
    });
  }

  // Filter by category
  if (category) {
    const categories = category.split(',');
    filteredProduct = filteredProduct.filter((item) => categories.includes(item.category));
  }

  // Filter by type
  if (type) {
    const types = type.split(',');
    filteredProduct = filteredProduct.filter((item) => types.includes(item.type));
  }

  let newResponse = structuredClone(filteredProduct);

  if (sortBy && sortOrder) {
    newResponse = sortData(newResponse, sortBy, sortOrder);
  }

  const start = page * limit;
  const end = start + limit;

  return HttpResponse.json({
    results: newResponse.slice(start, end),
    total: filteredProduct.length,
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
