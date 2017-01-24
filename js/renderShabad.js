function renderShabad(gurbani) {
  $shabad.appendChild(h('div', { class: 'shabad-container' }, [ baani(gurbani), ]));
  $controls.removeClass('hidden');
}

function baani(gurbani) {
  return h('div', { class: 'shabad-content' } , gurbani.map(({ shabad }) => h('div', { id: 'line-' + shabad.ID, class: 'line' }, [
    h('p', { class: 'gurmukhi gurbani-display gurbani-font' }, [
      h('div', { class: 'gurlipi' }, prepareLarivaar(shabad.Gurmukhi)),
      h('div', { class: 'unicode' }, prepareLarivaar(shabad.GurmukhiUni))
    ]),
    h('p', { class: 'transliteration english' }, shabad.Transliteration),
    h('blockquote', { class: 'translation punjabi gurbani-font' }, [
      h('div', { class: 'gurlipi' }, shabad.Punjabi),
      h('div', { class: 'unicode' }, shabad.PunjabiUni)
    ]),
    h('blockquote', { class: 'translation english' }, shabad.English),
    h('blockquote', { class: 'translation spanish' }, shabad.Spanish),
  ])));
}

function prepareLarivaar(padChhed) {
  let shabads = padChhed.split(' ');
  let newLine = '';
  Array.from(shabads).forEach(val => {
    if(val.indexOf('॥') !== -1 || val.indexOf(']') !== -1) {
      tag = "i";
    } else {
      tag = "span";
    }
    newLine += "<" + tag + ">" + val + (tag == "i" ? " " : "") + "</" + tag + "> ";
  });
  return newLine;
}

function buttons () {
  const transliterations = {
    'Transliteration': null,
    'English Transliteration': '.transliteration.english'
  };

  const translations = {
    'Translation': null,
    'Punjabi Translation': '.translation.punjabi',
    'English Translation': '.translation.english',
    'Spanish Translation': '.translation.spanish',
  };

  function renderCheckbox({ id, text }) {
    function click () {
      Array.from($shabad.querySelectorAll('.unicode')).forEach(el => el.classList.toggle('hidden'));
      Array.from($shabad.querySelectorAll('.gurlipi')).forEach(el => el.classList.toggle('hidden'));
    }
    return h('div', { }, [
      h('input', { id, type: 'checkbox', click, class: 'no-select' }),
      h('label', { 'for': id, class: 'no-select' }, text),
    ]);
  }

  function renderDropdown({ name, data }) {
    function change({ target: { value, options } }) {
      Array.from(options)
        .map(e => Array.from($shabad.querySelectorAll(e.value)))
        .forEach(els => els.forEach(el => el.classList.add('hidden')));

      if (value)
        Array.from($shabad.querySelectorAll(value))
          .forEach(el => el && el.classList.remove('hidden'));
    }
    return h('div', { }, [
      h('select', { name, change, }, Object.keys(data).map(key => h('option', { value: data[key] }, key)))
    ]);
  }
}

