import './css/styles.css';
import countryCard from './templets/country-card.hbs';
import API from './fetchCountries';
// import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  countryInfo: document.querySelector('.country-info'),
  inputEl: document.querySelector('#search-box'),
};
refs.inputEl.addEventListener('input', onInputTarget);
function onInputTarget(event) {
  // event.preventDefault();
  // _.debounce(() => {}, DEBOUNCE_DELAY);
  const input = event.currentTarget;
  API.fetchCountries(input).then(renderCountryInfo).catch(onFetchError);
  // .finally(() => input.reset());
  // const input = event.currentTarget;
  // console.log(input.elements);
}

function renderCountryInfo(name) {
  const markup = countryCard(name);

  refs.countryInfo.innerHTML = markup;
}
function onFetchError(error) {
  alert('Нажаль помилка');
}
