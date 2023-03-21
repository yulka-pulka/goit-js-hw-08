const throttle = require('lodash.throttle');

const refs = {
  formEl: document.querySelector('.feedback-form'),
  emailEl: document.querySelector("input[type='email']"),
  textareaEl: document.querySelector('textarea'),
};
const { formEl, emailEl, textareaEl } = refs;
const STORAGE_KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

formEl.addEventListener('submit', handleSubmit);
formEl.addEventListener('input', throttle(onInputElements, 500));

formData.email !== undefined ? (emailEl.value = formData.email) : '';
formData.message !== undefined ? (textareaEl.value = formData.message) : '';

function onInputElements(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleSubmit(e) {
  e.preventDefault();
  if (!emailEl.value.trim() || !textareaEl.value.trim()) {
    return alert('Please fill in all the fields!');
  }
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}
