import { http, HttpResponse } from 'msw';

export const upload = http.post('/api/upload', async ({ request }) => {
  const data = await request.formData();
  const file = data.get('file') as File;

  if (!file) {
    return HttpResponse.json(
      {
        message: 'File is required',
      },
      { status: 400 },
    );
  }

  return HttpResponse.json(
    {
      fileName: file.name,
      fileSize: file.size,
      fileUrl: URL.createObjectURL(new Blob([file], { type: file.type })),
      contents: await file.text(), // Fake upload progress
    },
    { status: 200 },
  );
});
