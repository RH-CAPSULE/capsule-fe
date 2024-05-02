// src/mocks.js
// 1. Import the library.
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

// 2. Describe network behavior with request handlers.
const worker = setupWorker(
  http.get('https://github.com/octocat', ({ request, params, cookies }) => {
    return HttpResponse.json(
      {
        message: 'Mocked response',
      },
      {
        status: 202,
        statusText: 'Mocked status',
      }
    );
  })
);

// 3. Start request interception by starting the Service Worker.
await worker.start();
