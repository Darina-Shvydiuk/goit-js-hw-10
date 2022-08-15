const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(name) {
  const search = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });

  return fetch(`${BASE_URL}/name/${name}?${search}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
export default { fetchCountries };
