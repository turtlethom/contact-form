/* Email Validator Functions */

/* ============== SOURCES ============== */
/* Inspired Email Guidelines => https://help.xmatters.com/ondemand/trial/valid_email_format.htm */
/* AlphaNumeric Algorithm => https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript */
/* Credit ^^ Michael Martin-Smucker */
/* ============== ======= ============== */

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

function handleSuccessMessage() {
    
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
    const isValidPrefix = validateCharacters(emailPrefix);
    if (!isValidPrefix) { return false; }
    const isValidDomain = validateCharacters(emailDomain);
    if (!isValidDomain) { return false; }

    /* ALL TESTS ARE PASSED, ALLOW VALIDATION */
    return true;
}

export default isValidEmailConvention;