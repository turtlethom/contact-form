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

/* Email Validator Functions */
/* AlphaNumeric Algorithm => https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript */
/* Credit ^^ Michael Martin-Smucker */
/* Acceptable Email Formats => https://help.xmatters.com/ondemand/trial/valid_email_format.htm */

/* Check For Allowed Non-Alpha Numeric Characters For Emails */
/* Email guidelines => https://help.xmatters.com/ondemand/trial/valid_email_format.htm */

function isSpecialChar(code) {
    /* code 95 (underscore), code 45 (dash), code 46 (period) */
    return (code === 95 || code === 45 || code === 46);
}

/* Check For Alpha Numeric Characters */
function isAlphaNum(inputString) {
    for (let i = 0; i < inputString.length; i++) {
        let code = inputString.charCodeAt(i);
        let nextCode = inputString.charCodeAt(i + 1);
        console.log(inputString[i], code)
        console.log(inputString[i + 1], nextCode)

        if (!(code > 47 && code < 58) &&    // numeric (0-9)
            !(code > 64 && code < 91) &&    // UPPER alpha (A-Z)
            !(code > 96 && code < 123) &&   // LOWER alpha (a-z)
            !(isSpecialChar(code)) &&
            !(isSpecialChar(nextCode) === isSpecialChar(code))) {       // Allowed Characters (_, -, .)
            return false;
        }
    }
    return true;
}

function isEmailExtension(elementVal) {
    const inputChars = elementVal.split('@');
    let emailPrefix = inputChars[0];
    let emailDomain = inputChars[1];
    let lastCharOfPrefix = emailPrefix.charCodeAt(emailPrefix.length - 1);

    if ((inputChars.length === 2) && 
        (isAlphaNum(emailPrefix)) &&
        (isAlphaNum(emailDomain)) &&
        !(isSpecialChar(lastCharOfPrefix))
    ) {
        return true;
    }
    return false;
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
    if (element.value && !isEmailExtension(element.value)) {
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
    firstNameRequired = document.getElementById('fn-required');
    handleTextRequired(firstNameInput, firstNameRequired);

    /* Last Name */
    lastNameRequired = document.getElementById('ln-required');
    handleTextRequired(lastNameInput, lastNameRequired);

    /* Email */
    emailRequired = document.getElementById('em-required');
    emailInvalid = document.getElementById('em-invalid');
    handleTextRequired(emailInput, emailRequired);
    handleValidEmail(emailInput, emailInvalid);

    /* Query Type */
    queryRequired = document.getElementById('qt-required');
    handleQueryChecked(queryTypeInputs, queryRequired);
    
    /* Message */
    messageRequired = document.getElementById('msg-required');
    handleTextRequired(messageInput, messageRequired);

    /* Terms */
    termsRequired = document.getElementById('terms-required');
    handleTermsChecked(termsInput, termsRequired);
    
}

/* Attaching `handleForm` itself to the form upon hitting the `submit` button */
form.addEventListener("submit", handleForm);