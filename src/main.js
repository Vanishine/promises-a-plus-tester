'use strict';

const url = new URL(location.href);
const $form = document.getElementById('form');
const scriptUrl = url.searchParams.get('script');
if (scriptUrl) {
  loadScript();
} else {
  initializeEditor();
}

async function loadScript() {
  const t1 = import(scriptUrl).then(({ default: adaptor }) => {
    if (!adaptor) {
      throw new Error('No adaptor found');
    }
    mocha.setup('bdd');
    require('promises-aplus-tests').mocha(adaptor);
    mocha.run();
  });

  const $code = document.getElementById('code');
  const t2 = fetch(scriptUrl)
    .then(res => res.text())
    .then(code => ($code.textContent = code));

  await Promise.all([t1, t2]).catch(err => {
    alert(err.message);
    throw err;
  });
}

function setTemplate(name) {
  const fs = require('fs');
  let code = '';
  switch (name) {
    case 'standard':
      code = fs.readFileSync(`${__dirname}/templates/standard.js`);
      break;
    case 'rsvp':
      code = fs.readFileSync(`${__dirname}/templates/rsvp.js`);
      break;
    case 'custom':
      code = fs.readFileSync(`${__dirname}/templates/custom.js`);
      break;
  }
  $form.code.value = code;
}

function initializeEditor() {
  $form.template.onchange = e => setTemplate(e.target.value);
  $form.onsubmit = e => {
    e.preventDefault();

    const blob = new Blob([$form.code.value], { type: 'text/javascript' });
    url.searchParams.set('script', URL.createObjectURL(blob));
    window.open(url);
  };
  $form.classList.remove('hidden');
  setTemplate('standard');
}
