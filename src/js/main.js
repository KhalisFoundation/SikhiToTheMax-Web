const $search = document.getElementById('search');
const $searchType = document.getElementById('search-type');
let $controls = document.getElementById('controls-wrapper');
let $shabad = document.getElementById('shabad');
let $meta = document.getElementById('metadata');
const prefs = {};
const defaultPrefs = {
  displayOptions: ['translation-english', 'transliteration-english'],
  shabadToggles: [],
  sliders: { 'font-size-slider': '16' },
};
let placeholderAni;

function shortenURL(url = window.location.href) {
  const path = window.location.pathname;
  const shortdomain = 'sttm.co';
  const URL = `http://${shortdomain}`;

  switch (path) {
    case '/shabad': return `${URL}/s/${getParameterByName('id')}`;
    case '/ang': return `${URL}/a/${getParameterByName('ang')}`;
    case '/hukamnama': return `${URL}/h`;
    default: return url.replace(window.location.hostname, shortdomain);
  }
}

const getPrefs = () => Object
  .keys(defaultPrefs)
  .forEach(key => prefs[key] = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : defaultPrefs[key]
  );

const setPref = (key, val) => localStorage.setItem(key, JSON.stringify(val));

function checkboxPref(e, key, option) {
  if (e.target.classList.contains('active')) {
    if (prefs[key].indexOf(option) < 0) {
      prefs[key].push(option);
    }
  } else {
    const index = prefs[key].indexOf(option);
    prefs[key].splice(index, 1);
  }
  setPref(key, prefs[key]);
}

// Note: Don't add listeners to JS rendered DOM Nodes. Use h() to bind eventListeners to them.

function attachEventListeners() {
  // Search form validator
  [document.querySelector('.search-form')]
    .forEach(f => f && f.addEventListener('submit', e => {
      if ($search.value.length < 2 && $searchType.value != 5) {
        alert('Please enter at least 2 characters');
        e.preventDefault();
        return false;
      }
    }));

  // Mobile hamburger menu
  [document.getElementById('open-mobile-menu')]
    .forEach(e => e && e.addEventListener('click', () => document.body.classList.toggle('menu-open')));

  // Close menu
  [document.querySelector('.top-bar-right .close a')]
    .forEach(e => e && e.addEventListener('click', () => document.body.classList.remove('menu-open')));

  // Share menu
  [document.getElementById('open_share_menu')]
    .forEach(e => e && e.addEventListener('click', () => document.body.classList.toggle('share-open')));

  [...document.querySelectorAll('#search-options select')]
    .forEach(e => e && e.addEventListener('change', function () {
      const update = this.dataset.update;
      document.getElementById(update).value = this.value;
      if (this.getAttribute('id') === 'search-source') {
        document.getElementById('top-bar-search-form').submit();
      }
    }));

  [document.querySelector('.gurmukhi-keyboard-toggle')]
    .forEach(e => e && e.addEventListener('click', () => document.querySelector('.gurmukhi-keyboard').classList.toggle('active')));

  [document.querySelector('.clear-search-toggle')]
    .forEach(e => e && e.addEventListener('click', () => $search.value=''));
}

document.addEventListener('DOMContentLoaded', () => {
  attachEventListeners();
});

function animatePlaceholder(e, content) {
  // todo - have a single $search var that points to the actual input element
  const $form = e.target.form || document.querySelector('.search-form');
  const $searchField = $form.q;
  // animate over 2 seconds
  const aniTime = 2000 / content.length;

  const curPlaceholderLength = $searchField.placeholder.length;
  const newPlaceholder = content.substr(0, curPlaceholderLength + 1);
  $searchField.placeholder = newPlaceholder;
  if (newPlaceholder !== content) {
    placeholderAni = setTimeout((el) => {
      animatePlaceholder(el, content);
    }, aniTime, e);
  }
}

function updateSearchContent(e, content = 'Koj', useEnglish = false) {
  const $form = e.target.form || document.querySelector('.search-form');
  const $searchField = $form.q;

  if (useEnglish) {
    $searchField.classList.remove('gurbani-font');
  } else {
    $searchField.classList.add('gurbani-font');
  }

  clearTimeout(placeholderAni);
  $searchField.placeholder = '';
  animatePlaceholder(e, content);
}

function updateSearchLang(e) {
  const searchType = parseInt(e.target.value, 10);

  const options = {
    0: ['jmTAq'], // first letters
    1: ['mqjbe'], // first letter anywhere
    2: ['jo mwgih Twkur Apuny qy'], // gurmukhi
    3: ['He has extended His power', true], // translation
    4: ['jo mange thakur apne te soi', true], // romanized
    5: ['123', true], //ang
  };

  updateSearchContent(e, options[searchType][0], options[searchType][1]);

  $searchType.value = searchType;
}

function updateSearchAction(e) {
  const searchType = parseInt(e.target.value);
  const $form = e.target.form || document.querySelector('.search-form');
  const $search = $form.q;

  switch (searchType) {
    case 5:
      $form.setAttribute('action', '/ang');
      $search.setAttribute('name', 'ang');
      $search.removeAttribute('pattern');
      $search.removeAttribute('title', '');
      break;
    default:
      $search.setAttribute('pattern', '.{2,}');
      $search.setAttribute('title', 'Enter 2 characters minimum.');
      $form.setAttribute('action', '/search');
      $search.setAttribute('name', 'q');
      break;
  }
  $searchType.value = searchType;
}

function displayOptionSlider(e) {
  const option = e.id;
  let prefVal = {};

  switch (option) {
    case 'font-size-slider':
      prefVal[option] = e.value;
      const fontSize = (e.value/10).toString() + 'em';
      for ( let line of document.querySelectorAll('.gurbani-display') ) { line.style.fontSize=fontSize; }
      break;
  }
  if ( prefVal !== {} ) { setPref('sliders', prefVal); }
}

function shabadToggle(e) {
  e.currentTarget.classList.toggle('active');
  const option = e.currentTarget.id;
  switch (option) {
    case 'display-options-toggle':
      toggleHiddenFlex(document.querySelector('#display-options'));
      break;
    case 'font-options-toggle':
      toggleHiddenFlex(document.querySelector('#font-options'));
      break;
    case 'unicode-toggle':
    case 'larivaar-toggle':
    case 'larivaar_assist-toggle': {
      const [toggle] = e.target.id.split('-');
      document.querySelector('.display').classList.toggle(toggle);
      checkboxPref(e, 'shabadToggles', option);
      break;
    }
  }
}

function toggleHiddenFlex(e) {
  e.style.display = (e.style.display === 'none' || e.style.display === '')? 'flex' : 'none';
}

function displayOptionToggle(e) {
  const option = e.target.id;
  const $display = document.querySelector('.display');

  e.target.classList.toggle('active');
  $display.classList.toggle(option);

  checkboxPref(e, 'displayOptions', option);

  // Update the textarea for copy/social sharing
  [...document.querySelectorAll('.display .line')]
    .forEach(el => el && (
      // for every textarea
      el.querySelector('textarea').value = (

        // get all div, blockquotes
        [...el.querySelector('div, blockquote')]

          // filter hidden ones
          .filter(c => c.style.visibility !== 'hidden' && c.style.display !== 'none')

          // get innerText
          .map(child => child.querySelectorAll('div.unicode')
            ? child.querySelector('div.unicode').innerText
            : el.innerText)

          // filter empty strings
          .filter(text => text)

          // join them by new line
          .join('\n')
      )));
}

getPrefs();

if ($searchType) $searchType.addEventListener('change', updateSearchLang);

if ($searchType) $searchType.addEventListener('change', updateSearchAction);

$search.onkeyup = function () {
  if ($searchType.value == 5 && this.value != this.value.replace(/[^0-9]/g, '')) {
    this.value = this.value.replace(/[^0-9]/g, '');
  }
};
