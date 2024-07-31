import isValidEmailConvention from './emailvalidation.js';

/* DEBUG: FUNCTIONS FOR LOGGING */
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
/* Unused at the moment... */
function debounce(fn, delay) {
    let debounceTimer;
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => { fn.apply(this, args) }, delay);
    }
}

/* ========================== */
/* Form Validator Functions */

function handleTextRequired(element, errElement) {
    let isValid;
    if (!element.value) {
        errElement.classList.remove('hidden');
        isValid = true;
    }
    else {
        errElement.classList.add('hidden');
        isValid = false;
    }
    return isValid;
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

/* Selecting All Text Inputs */
const textInputs = document.querySelectorAll('input[type="text"]');
const allTextInputs = [...textInputs, messageInput];

/* Selecting Success Message */

/* Event Handling Functions */

/* Handler Functions For `On Change` */
function handleOnQueryChange(event) {
    queryTypeInputs.forEach(input => {
        if (input.checked) {
            input.parentElement.classList.add('active');
        }
        else {
            input.parentElement.classList.remove('active');
        }
    })
}
/* ============================= */

/* Handler Functions For `Focus` */
function handleOnTextFocus(event) {
    event.target.classList.add('active');
}

function handleOnQueryFocus(event) {
    event.target.parentElement.classList.add('active');
    event.target.classList.add('active');
}

function handleOnTermsFocus(event) {
    event.target.classList.add('active')
}
/* ============================= */

/* Handler Functions For `Blur` (Losing Focus) */
function handleOnTextBlur(event) {
    event.target.classList.remove('active');
}

function handleOnQueryBlur(event) {
    event.target.parentElement.classList.remove('active')
}

function handleOnTermsBlur(event) {
    event.target.classList.remove('active');
}
/* ============================= */


/* Handling Form Validation */
function handleForm(event) {
    event.preventDefault();
    /* Selecting All Form's Child Elements & Handling Their Error/Required Messages */
    
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

/* Attaching `handleOnText` and `handleOnBlur` to all text inputs for `focus`, `hover`, and `blur` events */
allTextInputs.forEach(textInput => {
    textInput.addEventListener('focus', handleOnTextFocus);
    textInput.addEventListener('blur', handleOnTextBlur);
})

/* Attaching handler functions to query type options - linked together */
queryTypeInputs.forEach(queryOption => {
    queryOption.addEventListener('change', handleOnQueryChange);
    queryOption.addEventListener('focus', handleOnQueryFocus);
    queryOption.addEventListener('blur', handleOnQueryBlur);
});

/* Attaching handler functions to terms checkbox */
termsInput.addEventListener('focus', handleOnTermsFocus)
termsInput.addEventListener('blur', handleOnTermsBlur)

/* Attaching `handleForm` itself to the form upon hitting the `submit` button */
form.addEventListener("submit", handleForm);