// form-submit.js
const scriptURL = 'https://script.google.com/macros/s/AKfycbzOLm4sSz9PiXg2ejeZU8dVVtLVG3rLiv_NsdNNHd-XlNBwyW23vpnkhZkiofRjhitf/exec';
const form = document.forms['zuri-form'];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(function (response) {
      alert("Form submitted successfully!");
      form.reset();
    })
    .catch(function (error) {
      console.error("Error!", error.message);
      alert("Something went wrong. Please try again.");
    });
});
