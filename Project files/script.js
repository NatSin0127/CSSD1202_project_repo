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

// Carbon Footprint Calculator
document.addEventListener('DOMContentLoaded', () => {
    const calculatorForm = document.querySelector('.cal-form');
    
    if (calculatorForm) {
        const transportInput = document.getElementById('transport');
        const electricityInput = document.getElementById('electricity');

        transportInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9.]/g, ''); // filters input
        });

        electricityInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9.]/g, '');
        });

        const result = document.getElementById('result');

        calculatorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const transportKm = parseFloat(document.getElementById('transport').value) || 0;
            const electricityUsage = parseFloat(document.getElementById('electricity').value) || 0;
            const diet = document.getElementById('diet').value;
            
            let carbonFootprint = 0;
            const transportEmissions = transportKm * 0.192; // calc emmission
        
            const electricityEmissions = electricityUsage * 0.5;
            
            let dietEmissions = 0; // initalize diet emissions 
            switch(diet) {
                case 'Vegetarian':
                    dietEmissions = 1.7; 
                    break;
                case 'Omnivore':
                    dietEmissions = 3.3; 
                    break;
                case 'Vegan':
                    dietEmissions = 1.0; 
                    break;
            }
            
            carbonFootprint = transportEmissions + electricityEmissions + dietEmissions;
            
            /*if (!resultsDiv) {
                resultsDiv = document.createElement('div');
                resultsDiv.id = 'carbon-results';
                resultsDiv.className = 'carbon-results'; 
                calculatorForm.appendChild(resultsDiv);
            }*/
            const resultsDiv = document.getElementById('result-text');
            resultsDiv.innerHTML = `
                <h3>Your Carbon Footprint Breakdown:</h3>
                <p>Transportation Emissions: ${transportEmissions.toFixed(2)} kg CO2</p>
                <p>Electricity Emissions: ${electricityEmissions.toFixed(2)} kg CO2</p>
                <p>Diet Emissions: ${dietEmissions.toFixed(2)} kg CO2</p>
                <p><strong>Total Carbon Footprint: ${carbonFootprint.toFixed(2)} kg CO2 per day</strong></p>
                <p>${getFootprintFeedback(carbonFootprint)}</p>
            `;
            
        });
        
        const submitResult = document.getElementById('calSubmit');
        const closeResult = document.getElementById('calClose');
        
        submitResult.addEventListener('click', () => {
            result.classList.add("calopen");
        });
        closeResult.addEventListener('click', () => {
            result.classList.remove("calopen");
            calculatorForm.reset();
        });
    }
});

// foot print feedback 
function getFootprintFeedback(carbonFootprint) {
    if (carbonFootprint < 2) {
        return "Great job! Your carbon footprint is very low.";
    } else if (carbonFootprint < 5) {
        return "Not bad! There's room for improvement in reducing your carbon footprint.";
    } else {
        return "Your carbon footprint is quite high. Consider learning more about being eco friendly to reduce your environmental impact.";
    }
};

// Eco-Friendly Quiz
document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.querySelector('.quiz-section form'); // Get quiz form
    const quizButton = document.querySelector('.quizBtn'); // Get quiz button
    const quizresult =document.getElementById('quizresult');
    /*
    const resultsDiv = document.getElementById('result-text');
    const submitResult = document.getElementById('calSubmit');
    */

    if (quizButton) {
        quizButton.addEventListener('click', () => {
            const correctAnswers = {
                q1: 'b', 
                q2: 'c', 
                q3: 'a', 
                q4: 'd', 
                q5: 'true', 
                q6: 'true', 
                q7: 'false', 
                q8: 'true', 
                q9: 'true', 
                q10: 'false',
            };
            
            let score = 0;
            let totalQuestions = Object.keys(correctAnswers).length;
            
            Object.keys(correctAnswers).forEach(questionId => {
                const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
                
                if (selectedOption && selectedOption.value === correctAnswers[questionId]) {
                    score++;
                }
            });
            
            const percentage = Math.round((score / totalQuestions) * 100);
            
            /*
            let resultsDiv = document.getElementById('quiz-results');
            if (!resultsDiv) {
                resultsDiv = document.createElement('div');
                resultsDiv.id = 'quiz-results';
                resultsDiv.className = 'quiz-results'; 
                quizForm.appendChild(resultsDiv);
            }
            */          

            const resultsDiv = document.getElementById('quizresult-text');
            resultsDiv.innerHTML = `
                <h3>Quiz Results</h3>
                <p>Your Score: ${score} out of ${totalQuestions}</p>
                <p>Percentage: ${percentage}%</p>
                <p>${getQuizFeedback(percentage)}</p>
            `;
            quizresult.classList.add("open");
        });
       
        const closequizResult = document.getElementById('quizClose');
        
        closequizResult.addEventListener('click', () => {
            quizresult.classList.remove("open");
            quizForm.reset();
        });
    }
});


function getQuizFeedback(percentage) {
    if (percentage >= 90) {
        return "Excellent! You have great environmental knowledge!";
    } else if (percentage >= 70) {
        return "Great job! You have a good understanding of how to be eco friendly.";
    } else if (percentage >= 50) {
        return "Not bad, but there's room for improvement. Keep learning!";
    } else {
        return "You might want to learn more about environmental conservation. Check out our Learn page!";
    }
};

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
