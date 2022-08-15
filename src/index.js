import './css/styles.css';
import countryCard from './templets/country-card.hbs';
import countryCards from './templets/country-cards.hbs';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  countryInfo: document.querySelector('.country-info'),
  inputEl: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
};
refs.inputEl.addEventListener('input', debounce(onInputTarget, DEBOUNCE_DELAY));

function onInputTarget(event) {
  const inputResult = event.target.value.trim();

  if (!inputResult) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }
  API.fetchCountries(inputResult)
    .then(response => {
      if (response.length > 10) {
        refs.countryInfo.innerHTML = '';
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (response.length === 1) {
        renderCountryInfo(response[0]);
      } else if (response.length > 1 && response.length <= 10) {
        renderCountryList(response);
      }
    })
    .catch(onFetchError);
}

function renderCountryInfo(search) {
  const markup = countryCard(search);

  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = markup;
}

function renderCountryList(search) {
  const markup = countryCards(search);

  refs.countryInfo.innerHTML = '';

  refs.countryList.innerHTML = markup;
}

function onFetchError(error) {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';

  Notiflix.Notify.failure('Oops, there is no country with that name');
}

// це для себе 2й варіант вирішення без hbs через reduce
//   const markup = arr.reduce((acc, { name, flags }) => {
//     return (
//       acc +
//       `<li class="country-list_item">
//     <img class="country-list_flag" src="${flags.svg}" alt="${name.official}" width="60" height="60">
//     <p class="country-list_name">${name.official}</p>
// </li>`
//     );
//   }, '');
