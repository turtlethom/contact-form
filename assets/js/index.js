import isValidEmailConvention from './emailvalidation.js';

/* DEBUG: FNS FOR LOGGING */
function logTargetValue(e) {
    console.log(e.target.value)
}

function logSubmission(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    console.log(formdata);
    console.log(e.target.id + " submitted.")
}

/* ========================== */
/* Helper Functions */

/* Debouncing Function To Prevent Excessive Calls To Event Listeners */
function debounce(fn, delay) {
    let debounceTimer;
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => { fn.apply(this, args) }, delay);
    }
}

/* ========================== */
/* Event Handling Functions */

function handleTextRequired(element, errElement) {
    if (!element.value) {
        errElement.classList.remove('hidden');
    }
    else {
        errElement.classList.add('hidden');
    }
}

function handleQueryChecked(elements, errElement) {
    let checkCount = 0;
    elements.forEach((element) => {
        if (element.checked) {
            checkCount += 1;
        }
    });
    console.log(checkCount)

    if (checkCount) {
        errElement.classList.add('hidden');
    }
    else {
        errElement.classList.remove('hidden');
    }
}

function handleTermsChecked(element, errElement) {
    if (!element.checked) {
        errElement.classList.remove('hidden');
    }
    else {
        errElement.classList.add('hidden');
    }
}

function handleValidEmail(element, errElement) {
    if (element.value && !isValidEmailConvention(element.value)) {
        errElement.classList.remove('hidden');
    }
    else {
        errElement.classList.add('hidden');
    }
}

/* ========================== */
/* Selecting Form Element */
const form = document.getElementById('contact-form');

/* Grabbing Form Input Elements */
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const queryTypeInputs = document.querySelectorAll('input[name="query-type"]');
const messageInput = document.getElementById('message');
const termsInput = document.getElementById('terms');

/* Handling Form Validation */
function handleForm(event) {
    event.preventDefault();
    /* Selecting All Form's Child Elements & Handling Their Error/Required Messages */
    /*
        Checklist:
        1. Handle Focus State
        2. Handle Query Active State
        3. Handle Error State
    */
    /* First Name */
    const firstNameRequired = document.getElementById('fn-required');
    handleTextRequired(firstNameInput, firstNameRequired);

    /* Last Name */
    const lastNameRequired = document.getElementById('ln-required');
    handleTextRequired(lastNameInput, lastNameRequired);

    /* Email */
    const emailRequired = document.getElementById('em-required');
    const emailInvalid = document.getElementById('em-invalid');
    handleTextRequired(emailInput, emailRequired);
    handleValidEmail(emailInput, emailInvalid);

    /* Query Type */
    const queryRequired = document.getElementById('qt-required');
    handleQueryChecked(queryTypeInputs, queryRequired);
    
    /* Message */
    const messageRequired = document.getElementById('msg-required');
    handleTextRequired(messageInput, messageRequired);

    /* Terms */
    const termsRequired = document.getElementById('terms-required');
    handleTermsChecked(termsInput, termsRequired);
    
}

/* Attaching `handleForm` itself to the form upon hitting the `submit` button */
form.addEventListener("submit", handleForm);