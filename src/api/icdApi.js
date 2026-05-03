import api from './httpClient';

export function searchIcd11Diagnoses(query) {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 2) {
    return Promise.resolve([]);
  }

  return api.get('/icd/search', {
    params: {
      q: trimmedQuery,
    },
  });
}
