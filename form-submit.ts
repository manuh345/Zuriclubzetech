// form-submit.ts
const scriptURL = 'https://script.google.com/macros/s/AKfycbzOLm4sSz9PiXg2ejeZU8dVVtLVG3rLiv_NsdNNHd-XlNBwyW23vpnkhZkiofRjhitf/exec';
const form = document.forms['zuri-form'];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      alert("Form submitted successfully!");
      form.reset();
    })
    .catch(error => {
      console.error("Error!", error.message);
      alert("Something went wrong. Please try again.");
    });
});
