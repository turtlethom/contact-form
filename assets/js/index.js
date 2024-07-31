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
/* Email guidelines => https://help.xmatters.com/ondemand/trial/valid_email_format.htm */

/* Check For Alpha Numeric Characters */
function isAlphaNum(charCode) {
    if (!(charCode >= 48 && charCode <= 57) &&  // 0-9
        !(charCode >= 65 && charCode <= 90) &&  // A-Z
        !(charCode >= 97 && charCode <= 122)) { // a-z
            return false;
    }
    return true;
}

/* Check For Allowed Non-Alpha Numeric Characters For Emails */
/* code 95 (underscore), code 45 (dash), code 46 (period) */
function isExceptionChar(charCode) {
    return (charCode === 95 || charCode === 45 || charCode === 46);
}

function validateCharacters(partition) {
    for (let i = 0; i < partition.length; i++) {
        const charCode = partition.charCodeAt(i);
        /* If Character Is NOT Alpha AND Is Not ('.', '-', OR '_'), Invalidate */
        if (!isAlphaNum(charCode) && !isExceptionChar(charCode)) {
            return false;
        }
    }
    return true;
}

function isValidEmailConvention(elementVal) {
    /* Split email input into two parts -- `john-smith@examp.com` ==> john-smith, examp.com */
    const inputChars = elementVal.split('@');
    const emailPrefix = inputChars[0];
    const emailDomain = inputChars[1];

    /* Grab last character for check (MUST BE ALPHA) */
    const lastCharOfPrefix = emailPrefix.charCodeAt(emailPrefix.length - 1);
    
    /* If Email Is Not Parsed Successfully Into Prefix & Domain, Invalidate */
    if (inputChars.length !== 2) {
        return false;
    }

    /* If The Last Character Of Email Prefix Is Not Alpha, Invalidate */
    if (!isAlphaNum(lastCharOfPrefix)) {
        return false;
    }

    /* Iterate Through Partitions For Validating Individual Characters */
    isValidPrefix = validateCharacters(emailPrefix);
    if (!isValidPrefix) { return false; }
    isValidDomain = validateCharacters(emailDomain);
    if (!isValidDomain) { return false; }

    /* ALL TESTS ARE PASSED, ALLOW VALIDATION */
    return true;
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