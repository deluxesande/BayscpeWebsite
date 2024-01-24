// function toggle() {
//     const password = document.querySelector('#pwd')
//     const img = document.getElementById('eye');
//              if(password.getAttribute('type') == 'password' ) {
//                 password.setAttribute('type','text' );
//                 img.style.backgroundImage = "url('/assets/images/pic.png')";
//              } else   {
//                password.setAttribute('type','password');
//                img.style.backgroundImage = "url('/assets/images/pic2.png')";
//              }
// }
// function toggle2() {
//    const password2 = document.querySelector('#confpwd');
//    const img = document.getElementById('eye2');
//    if( password2.getAttribute('type') == 'password' ) {
//       password2.setAttribute('type','text' );
//       img.style.backgroundImage = "url('/assets/images/pic.png')";
//    } else {
//                password2.setAttribute('type','password');
//                img.style.backgroundImage = "url('/assets/images/pic2.png')";
//    }
// }

// function passwordCheck() {
//    const val1 = document.getElementById('pwd').value;
//    const val2 = document.getElementById('confpwd').value;
//    if(val1 != val2) {
//       alert('password do not match');
//    }
// }
const passwordInput = document.querySelector(".pass-field input");
const passwordInput3 = document.querySelector('.new .pwd');
const passwordInput2 = document.querySelector(".confpassword input");
const eyeIcon = document.querySelector(".pass-field i");
const eyeIcon3 = document.querySelector('.new .i')
const eyeIcon2 = document.querySelector(".confpassword i");
const requirementList = document.querySelectorAll(".requirement-list li");

// An array of password requirements with corresponding 
// regular expressions and index of the requirement list item
const requirements = [
    { regex: /.{8,}/, index: 0 }, // Minimum of 8 characters
    { regex: /[0-9]/, index: 1 }, // At least one number
    { regex: /[a-z]/, index: 2 }, // At least one lowercase letter
    { regex: /[^A-Za-z0-9]/, index: 3 }, // At least one special character
    { regex: /[A-Z]/, index: 4 }, // At least one uppercase letter
]

passwordInput.addEventListener("keyup", (e) => {
    requirements.forEach(item => {
        // Check if the password matches the requirement regex
        const isValid = item.regex.test(e.target.value);
        const requirementItem = requirementList[item.index];

        // Updating class and icon of requirement item if requirement matched or not
        if (isValid) {
            requirementItem.classList.add("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-check";
        } else {
            requirementItem.classList.remove("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-circle";
        }
    });
});


passwordInput2.addEventListener("keyup", (e) => {
    requirements.forEach(item => {
        // Check if the password matches the requirement regex
        const isValid = item.regex.test(e.target.value);
        const requirementItem = requirementList[item.index];

        // Updating class and icon of requirement item if requirement matched or not
        if (isValid) {
            requirementItem.classList.add("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-check";
        } else {
            requirementItem.classList.remove("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-circle";
        }
    });
});

eyeIcon.addEventListener("click", () => {
    // Toggle the password input type between "password" and "text"
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";

    // Update the eye icon class based on the password input type
    eyeIcon.className = `fa-solid fa-eye${passwordInput.type === "password" ? "" : "-slash"}`;
});

eyeIcon2.addEventListener("click", () => {
    // Toggle the password input type between "password" and "text"
    passwordInput2.type = passwordInput2.type === "password" ? "text" : "password";

    // Update the eye icon class based on the password input type
    eyeIcon2.className = `fa-solid fa-eye${passwordInput2.type === "password" ? "" : "-slash"}`;
});


eyeIcon3.addEventListener("click", () => {
    // Toggle the password input type between "password" and "text"
// alert('helo') ;
    passwordInput3.type = passwordInput3.type === "password" ? "text" : "password";

    // Update the eye icon class based on the password input type
    eyeIcon3.className = `fa-solid fa-eye${passwordInput3.type === "password" ? "" : "-slash"}`;
});



var config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
}


var countrySelect = document.querySelector('.country'),
    stateSelect = document.querySelector('.state'),
    citySelect = document.querySelector('.city')


function loadCountries() {

    let apiEndPoint = config.cUrl

    fetch(apiEndPoint, {headers: {"X-CSCAPI-KEY": config.ckey}})
    .then(Response => Response.json())
    .then(data => {
        // console.log(data);

        data.forEach(country => {
            const option = document.createElement('option')
            option.value = country.iso2
            option.textContent = country.name 
            countrySelect.appendChild(option)
        })
    })
    .catch(error => console.error('Error loading countries:', error))

    stateSelect.disabled = true
    citySelect.disabled = true
    stateSelect.style.pointerEvents = 'none'
    citySelect.style.pointerEvents = 'none'
}


function loadStates() {
    stateSelect.disabled = false
    citySelect.disabled = true
    stateSelect.style.pointerEvents = 'auto'
    citySelect.style.pointerEvents = 'none'

    const selectedCountryCode = countrySelect.value
    // console.log(selectedCountryCode);
    stateSelect.innerHTML = '<option value="">Select State</option>' // for clearing the existing states
    citySelect.innerHTML = '<option value="">Select City</option>' // Clear existing city options

    fetch(`${config.cUrl}/${selectedCountryCode}/states`, {headers: {"X-CSCAPI-KEY": config.ckey}})
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        data.forEach(state => {
            const option = document.createElement('option')
            option.value = state.iso2
            option.textContent = state.name 
            stateSelect.appendChild(option)
        })
    })
    .catch(error => console.error('Error loading countries:', error))
}


function loadCities() {
    citySelect.disabled = false
    citySelect.style.pointerEvents = 'auto'

    const selectedCountryCode = countrySelect.value
    const selectedStateCode = stateSelect.value
    // console.log(selectedCountryCode, selectedStateCode);

    citySelect.innerHTML = '<option value="">Select City</option>' // Clear existing city options

    fetch(`${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, {headers: {"X-CSCAPI-KEY": config.ckey}})
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        data.forEach(city => {
            const option = document.createElement('option')
            option.value = city.iso2
            option.textContent = city.name 
            citySelect.appendChild(option)
        })
    })
}

window.onload = loadCountries

function checkPasswordMatch() {
    const passwordInput = document.getElementById('passwordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    const passwordMatchMessage = document.getElementById('passwordMatchMessage');

    if (passwordInput.value === confirmPasswordInput.value && passwordInput.value != null) {
        passwordMatchMessage.textContent = 'Passwords match';
        passwordMatchMessage.style.color = 'green';
    } else {
        passwordMatchMessage.textContent = 'Passwords do not match';
        passwordMatchMessage.style.color = 'red';
    }
}