// theme switch button
let darkmode = localStorage.getItem('darkmode');
const switchTheme = document.getElementById('switch-theme');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
};

if (darkmode === "active") enableDarkmode();

switchTheme.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

// to top button --------------------------------------------------------
const toTop = document.getElementById('top-btn');

toTop.addEventListener("click", () => {
    if (window.scrollY != 0) {
        setTimeout(function () {
            window.scrollTo(0, window.scrollY - 2500);
        }, 10)
    }
});

// contact.html: validate form inputs ------------------------------------
const form = document.getElementById('fbk-form');
const lastname = document.getElementById('lastname');
const firstname = document.getElementById('firstname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const fbk = document.getElementById('feedback');

const rstBtn = document.getElementById('clear');
const submitBtn = document.getElementById('submit');
const pop = document.getElementById('pop-up');
const closeBtn = document.getElementById('close');

// button to reset the form
rstBtn.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const field = element.parentElement;
    const errorDisplay = field.querySelector('.error');

    errorDisplay.innerText = message;
    field.classList.add('error');
    field.classList.remove('success');
};

const setSuccess = (element) => {
    const field = element.parentElement;
    const errorDisplay = field.querySelector('.error');

    errorDisplay.innerText = '';
    field.classList.add('success');
    field.classList.remove('error');
};

const validEmail = email => {
    // regex pattern sourced from https://www.geeksforgeeks.org/how-to-validate-phone-numbers-using-javascript-with-regex/
    const emRef = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emRef.test(String(email).toLowerCase());
};

const validPhone = (phone) => {
    // regex pattern sourced from https://codepen.io/javascriptacademy-stash/pen/oNeNMNR
    const phRef = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
    return phRef.test(phone);
};

const validateInputs = () => {
    let valid = 0;

    const lastnameValue = lastname.value.trim(); // trim(): remove all white space in the string !!!
    const firstnameValue = firstname.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const fbkValue = fbk.value.trim();

    if (lastnameValue === '') {
        setError(lastname, '* Last name is required !');
    } else {
        setSuccess(lastname);
        valid++;
    }

    if (firstnameValue === '') {
        setError(firstname, '* First name is required !');
    } else {
        setSuccess(firstname);
        valid++;
    }

    if (emailValue === '') {
        setError(email, '* Email is required !');
    } else if (!validEmail(emailValue)) { // dont suit the required pattern of input !!!
        setError(email, '* Provided email is not valid !');
    } else {
        setSuccess(email);
        valid++;
    }

    if (phoneValue === '') {
        setError(phone, '* Phone number is required !');
    } else if (!validPhone(phoneValue)) { // dont suit the required pattern of input !!!
        setError(phone, '* Provided phone number is not valid !');
    } else {
        setSuccess(phone);
        valid++;
    }

    if (fbkValue === '') {
        setError(fbk, '* Feedback is required !');
    } else {
        setSuccess(fbk);
        valid++;
    }

    return valid;
};

// button to open and close pop-up msg
submitBtn.addEventListener("click", () => {
    if (validateInputs() == 5) {
        pop.classList.add("open");
    }
});
closeBtn.addEventListener("click", () => {
    pop.classList.remove("open");
});