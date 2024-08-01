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
/* Unused... */
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
    if (element.value) {
        errElement.classList.add('hidden');
        isValid = true;
    }
    else {
        errElement.classList.remove('hidden');
        isValid = false;
    }
    // console.log(`${element.id} Valid: ${isValid}`);
    return isValid;
}

function handleQueryChecked(elements, errElement) {
    let isValid;
    let checkCount = 0;
    elements.forEach((element) => {
        if (element.checked) {
            console.log(`${element.id} is checked.`)
            checkCount += 1;
        }
    });

    if (checkCount) {
        errElement.classList.add('hidden');
        isValid = true;
    }
    else {
        errElement.classList.remove('hidden');
        isValid = false;
    }
    // console.log(`Query Valid: ${isValid}`);
    return isValid;
}

function handleTermsChecked(element, errElement) {
    let isValid;
    // If input is not checked, invalidate
    if (!element.checked) {
        errElement.classList.remove('hidden');
        isValid = false;
    }
    else {
        errElement.classList.add('hidden');
        isValid = true;
    }
    // console.log(`${element.id} Valid: ${isValid}`);
    return isValid;
}

function handleValidEmail(element, errElement) {
    let isValid;
    // If input entered, but is not a valid email convention, invalidate
    if (element.value && !isValidEmailConvention(element.value)) {
        errElement.classList.remove('hidden');
        isValid = false;
    }
    else {
        errElement.classList.add('hidden');
        isValid = true;
    }
    // console.log(`${element.id} Valid: ${isValid}`);
    return isValid;
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
const successMessage = document.getElementById('success-message');
/* Event Handling Functions */

/* Handler Functions For `On Change` */
function handleOnQueryChange(event) {
    // Iterate over each query type input
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
    if (event.target.checked) {
        event.target.classList.remove('active');
    }
    else {
        event.target.classList.remove('active');
        event.target.parentElement.classList.remove('active');

    }
}

function handleOnTermsBlur(event) {
    event.target.classList.remove('active');
}
/* ============================= */

/* Handler Function For Success Message */
function displaySuccessMessage(element) {
    element.classList.remove('hidden');
    setTimeout(() => element.classList.add('hidden'), 5000)
}
/* CLEAR ALL PREVIOUS FORM INPUT AFTER SUCCESS */
function clearTextInput() {
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach((input) => input.value = "");

    document.getElementById('message').value = "";
}

function clearCheckedFields(allQueryInputs, termsInput) {
    // Get the checked radio input for query-type and uncheck it
    const checkedQuery = document.querySelector('input[name="query-type"]:checked');
    if (checkedQuery) {
        checkedQuery.checked = false;
        checkedQuery.classList.remove('active');
    }
    
    // Get the checked input for terms and uncheck it
    const checkedTerms = document.querySelector('input[name="terms"]:checked');
    if (checkedTerms) {
        checkedTerms.checked = false;
    }
}

/* Handle Input Border Colors In Case Of Visible Error Messages */
function handleErrorBorder(errElements, element) {
    let hasError = false;
    
    // Check each error element to see if any are not hidden
    errElements.forEach(errElement => {
        if (!errElement.classList.contains('hidden')) {
            hasError = true;
        }
    });
    
    // Add or remove error border based on presence of errors
    if (hasError) {
        element.classList.add('error-border');
    } else {
        element.classList.remove('error-border');
    }
}

/* Handling Form Validation */
function handleForm(event) {
    event.preventDefault();
    /* Selecting All Form's Child Elements & Handling Their Error/Required Messages */
    /* Storing Result Of Validation Of Each Field Within Variables */
    /*
    FORMAT
        1. Error Element(s)
        2. Validation Boolean
    */
    
    /* First Name */
    const firstNameRequired = document.getElementById('fn-required');
    const wasFirstNameProvided = handleTextRequired(firstNameInput, firstNameRequired);

    /* Last Name */
    const lastNameRequired = document.getElementById('ln-required');
    const wasLastNameProvided = handleTextRequired(lastNameInput, lastNameRequired);

    /* Email */
    const emailRequired = document.getElementById('em-required');
    const emailInvalid = document.getElementById('em-invalid');
    const wasEmailProvided = handleTextRequired(emailInput, emailRequired);
    const wasEmailValidated = handleValidEmail(emailInput, emailInvalid);

    /* Query Type */
    const queryRequired = document.getElementById('qt-required');
    const wasQueryProvided = handleQueryChecked(queryTypeInputs, queryRequired);
    
    /* Message */
    const messageRequired = document.getElementById('msg-required');
    const wasMessageProvided = handleTextRequired(messageInput, messageRequired);

    /* Terms */
    const termsRequired = document.getElementById('terms-required');
    const wasTermsAgreed = handleTermsChecked(termsInput, termsRequired);

    /*
    TESTS:
        1. First name, last name, message field
        2. Email provided and email validated
        3. Query provided and terms agreed
    */

    const textFieldsValid = wasFirstNameProvided && wasLastNameProvided && wasMessageProvided;
    const emailValid = wasEmailProvided && wasEmailValidated;
    const checkboxesValid = wasQueryProvided && wasTermsAgreed;

    console.log(wasEmailProvided);
    console.log(wasEmailValidated);
    console.log(`Test results: ${textFieldsValid}, ${emailValid}, ${checkboxesValid}`)

    if (textFieldsValid && emailValid && checkboxesValid) {
        /* Do something with form data */
        const formData = new FormData(form)
        displaySuccessMessage(successMessage);

        /* Resetting All Inputs To Default State */
        clearTextInput();
        clearCheckedFields();
        console.log("SUCCESS!")
    }

    /* If Tests Failed, Color Input Borders As Red */
    /* Provide Array as 1st argument to handle MULTIPLE Errors on  */
    handleErrorBorder([firstNameRequired], firstNameInput);
    handleErrorBorder([lastNameRequired], lastNameInput);

    handleErrorBorder([emailRequired, emailInvalid], emailInput);

    handleErrorBorder([messageRequired], messageInput);
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