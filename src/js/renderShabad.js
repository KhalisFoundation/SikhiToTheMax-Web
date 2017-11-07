function renderShabad(gurbani,nav) {
  document.body.classList.remove("loading");
  let footnav = '';
  if(typeof nav != "undefined") {
    let link        = navLink(nav);
    let pagination  = [];
    if (typeof nav.previous != "undefined") {
      pagination.push(h('a', { href: link + nav.previous }, '&laquo;'));
    }

    if (typeof nav.next != "undefined") {
      pagination.push(h('a', { href: link + nav.next }, '&raquo;'));
    }
    footnav = h('div', { class: 'pagination'}, pagination);
  }

  $shabad.appendChild(h('div', { class: 'shabad-container' }, [ baani(gurbani), footnav]));
  $.each(prefs.displayOptions, function(index, option) {
    document.getElementById(option).click();
  });
  $.each(prefs.shabadToggles, function(index, option) {
    document.getElementById(option).click();
  });
  $controls.classList.remove('hidden');


}

function navLink(nav,source) {
    if(nav.type == 'shabad') { return 'shabad?id='; }
    else if(nav.type == 'ang') { return 'ang?source=' + source + '&ang='; }
}

function metaData(data,nav) {
  let page_type_gurmukhi  = data.source.id == 'G' ? 'AMg' : 'pMnw';
  let page_type_english   = data.source.id == 'G' ? 'Ang' : 'Pannaa';
  let gurmukhi_meta       = [];
  let english_meta        = [];
  if (data.raag && data.raag.gurmukhi && data.raag.gurmukhi != "null") {
    gurmukhi_meta.push(data.raag.gurmukhi);
    english_meta.push(data.raag.english);
  }
  if (data.writer) {
    gurmukhi_meta.push(data.writer.gurmukhi);
    english_meta.push(data.writer.english);
  }
  gurmukhi_meta.push(data.source.gurmukhi);
  english_meta.push(data.source.english);

  gurmukhi_meta.push('<a href="/ang?ang=' + data.source.pageno + '&amp;source=' + data.source.id + '">' + page_type_gurmukhi + ' ' + data.source.pageno + '</a>');
  english_meta.push('<a href="/ang?ang=' + data.source.pageno + '&amp;source=' + data.source.id + '">' + page_type_english + ' ' + data.source.pageno + '</a>');0

  if(typeof nav != "undefined") {
    let link = navLink(nav,data.source.id);

    if (typeof nav.previous != "undefined") {
      $meta.appendChild(h('div', { class: 'shabad-nav left'}, '<a href="' + link + nav.previous + '">&lt;</a>'));
    }

    if (typeof nav.next != "undefined") {
      $meta.appendChild(h('div', { class: 'shabad-nav right'}, '<a href="' + link + nav.next + '">&gt;'));
    }
  }

  $meta.appendChild(h('h4', { class: 'gurbani-font' }, gurmukhi_meta.join(' - ')));
  $meta.appendChild(h('h4', {}, english_meta.join(' - ')));

  $meta.classList.remove('hidden');
}

function baani(gurbani) {
  return h('div', { class: 'shabad-content' } , gurbani.map(({ shabad }) => h('div', { id: 'line-' + shabad.id, class: 'line' }, [
    h('p', { class: 'gurmukhi gurbani-display gurbani-font' }, [
      h('div', { class: 'gurlipi' }, prepareLarivaar(shabad.gurbani.gurmukhi)),
      h('div', { class: 'unicode' }, prepareLarivaar(shabad.gurbani.unicode))
    ]),
    h('div', { class: 'transliteration english' }, shabad.transliteration),
    h('blockquote', { class: 'translation punjabi gurbani-font' }, [
      h('div', { class: 'gurlipi' }, shabad.translation.punjabi.bms.gurmukhi),
      h('div', { class: 'unicode' }, shabad.translation.punjabi.bms.unicode)
    ]),
    h('blockquote', { class: 'translation english' }, shabad.translation.english.ssk),
    h('blockquote', { class: 'translation spanish' }, shabad.translation.spanish),
    h('div', { class: 'share' }, [
      h('a', { class: 'copy' },
        h('i', { class: 'fa fa-fw fa-clipboard' })),
      h('a', { class: 'twitter' },
        h('i', { class: 'fa fa-fw fa-twitter' }))/*,
      h('a', { class: 'facebook' },
        h('i', { class: 'fa fa-fw fa-facebook' }))*/
    ]),
    h('textarea', {}, shabad.GurmukhiUni + "\n" + shabad.English)
  ])));
}

function prepareLarivaar(padChhed) {
  return padChhed
    .split(' ')
    .map(val => (val.indexOf('॥') !== -1 || val.indexOf(']') !== -1)
      ? `<i>${val} </i>`
      : `<div class="akhar">${val}</div>`
    )
    .join('')
}
