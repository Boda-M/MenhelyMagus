// Opens the login popup, clears input fields, and starts the fade-in animation
function loginPopup() {
    loginInputCheck();
    registerInputCheck();
    document.getElementById('hamburgerIcon').style.marginRight = "0%";
    const inputs = document.querySelectorAll('form input');
    inputs.forEach(input => { input.value = ''; }); // Clears previously entered text

    document.getElementById("loginPopup").style.display = "block";
    document.getElementById("loginWindow").style.display = "block";
    document.getElementById("loginWindow").classList.add("login");
    document.getElementById("loginWindow").classList.remove("register");
    document.body.style.overflow = 'hidden'; // Disables scrolling on the page

    var popup = document.getElementById("loginPopup");
    var popupwindow = document.getElementById("loginWindow");

    popup.style.transform = "opacity(1);"; // Login window will appear at the end of animation
    for (let i = 0; i < 11; i++) {
        setTimeout(function() { // Fade-in animation
            popup.style.opacity = i * 0.07;
            popupwindow.style.opacity = i * 0.1;
        }, 40);
    }
}

// Closes the login popup and re-enables scrolling with a fade-out animation
function loginPopupClose() {
    document.getElementById('hamburgerIcon').style.marginRight = "0%";
    var popup = document.getElementById("loginPopup");
    var popupwindow = document.getElementById("loginWindow");
    document.body.style.overflow = 'initial'; // Re-enables scrolling on the page

    popup.style.transform = "opacity(0);"; // Login window will disappear at the end of animation
    for (let i = 10; i >= 0; i--) {
        setTimeout(function() { // Fade-out animation
            popup.style.opacity = i * 0.07;
            popupwindow.style.opacity = i * 0.1;
        }, 40);
    }
    setTimeout(function() { // Runs after the opacity is set to zero
        document.getElementById("loginPopup").style.display = "none";
        document.getElementById("loginWindow").style.display = "none";
        document.getElementById('hamburgerIcon').style.marginRight = "0%";
        silentSwitch();
    }, 400);
}

// Switches the login window content to login view, clears inputs and checkboxes, and adjusts styles
function silentSwitch() {
    // Add 'login' class and remove 'register' class to switch to the login view
    document.getElementById("loginWindow").classList.add("login");
    document.getElementById("loginWindow").classList.remove("register");

    // Clear all input fields (text inputs)
    const inputs = document.querySelectorAll('form input');
    inputs.forEach(input => { input.value = ''; }); // Clears previously entered text

    // Uncheck all checkbox inputs
    const checkboxes = document.querySelectorAll('form input[type="checkbox"]');
    checkboxes.forEach(checkbox => { checkbox.checked = false; });

    // Make the login content visible and the register content invisible
    document.getElementById("loginContent").style.display = "block";
    document.getElementById("loginContent").style.opacity = "1"; // Set full opacity for login content
    document.getElementById("registerContent").style.display = "none";
    document.getElementById("registerContent").style.opacity = "0"; // Set opacity of register content to 0

    // Adjust the position of the close button (X) at the top of the login window
    document.getElementById("loginX").style.setProperty("top", "8%", "important");

    // Set the height of the login window
    document.getElementById("loginWindow").style.height = "350px";
}

// Enables or disables the login button based on input field values
function loginInputCheck() {
    var input1 = document.getElementById("loginInput1");
    var input2 = document.getElementById("loginInput2");
    var loginButton = document.getElementById("loginButton");

    if (input1.value != "" && input2.value != "")  loginButton.disabled = false; // Enable button if both inputs have values
    else  loginButton.disabled = true; // Disable button if any input is empty
}

// Enables or disables the register button based on input field values and habitat checkbox state
function registerInputCheck() {
    var input1 = document.getElementById("registerInput1");
    var input2 = document.getElementById("registerInput2");
    var input3 = document.getElementById("registerInput3");
    var input4 = document.getElementById("registerInput4");
    var input5 = document.getElementById("registerInput5");
    var input6 = document.getElementById("registerInput6");
    var input7 = document.getElementById("registerInput7");
    var habitats = document.getElementById("habitatRegister");
    var registerButton = document.getElementById("registerButton");

    // Check if all fields are filled correctly and habitat checkbox is selected
    if (input1.value.includes('.') && input1.value.includes('@') && input2.value != "" && input3.value != "" && input3.value != "" && !isNaN(input4.value) && input5.value != "" && input6.value != "" && input7.value != "" && habitats.parentElement.innerHTML.includes('data-checked="true"')) {
        registerButton.disabled = false; // Enable button if all conditions are met
    } else {
        registerButton.disabled = true; // Disable button if any condition is not met
    }
}

// Adjusts the height and layout of the login window based on screen width and conditions
function resizeOnWidthChange() {
    // Get references to the login window and register content
    var loginWindow = document.getElementById("loginWindow");
    var registercontent = document.getElementById("registerContent");

    // If screen width is <= 500px and login window height is smaller than 650px
    if (window.innerWidth <= 500 && loginWindow && parseInt(loginWindow.style.height) < 650 && loginWindow.classList.contains("register")) {
        // Adjust register content margin
        registercontent.style.marginTop = "-20px";
        
        // Gradually adjust the close button position and increase window height
        for (let i = 0; i < 10; i++) {
            setTimeout(function() {
                var percentageCalc = 10 - (i * 0.4 + 0.4);
                document.getElementById("loginX").style.setProperty("top", percentageCalc + "%", "important");
                loginWindow.style.height = "720px";
            }, 10);
        }
    }
    // If screen width is > 500px and login window height is greater than 600px
    else if (window.innerWidth > 500 && loginWindow && parseInt(loginWindow.style.height) > 600 && loginWindow.classList.contains("register")) {
        // Reset register content margin
        registercontent.style.marginTop = "0";
        
        // Gradually adjust the close button position and decrease window height
        for (let i = 0; i < 10; i++) {
            setTimeout(function() {
                var percentageCalc = 12 - (i * 0.4 + 0.4);
                document.getElementById("loginX").style.setProperty("top", percentageCalc + "%", "important");
                loginWindow.style.height = "630px";
            }, 10);
        }
    }
}

// Switches to the registration form and animates transition
function switchToRegister() {
    // Add 'register' class and remove 'login' class
    document.getElementById("loginWindow").classList.add("register");
    document.getElementById("loginWindow").classList.remove("login");
    const inputs = document.querySelectorAll('form input');
    inputs.forEach(input => { input.value = ''; }); // Clear previous input

    var loginWindow = document.getElementById("loginWindow");
    var logincontent = document.getElementById("loginContent");
    logincontent.style.transform = "opacity(0);";

    // Fade out login content
    for (let i = 10; i >= 0; i--) {
        setTimeout(function() {
            logincontent.style.opacity = i * 0.1;
        }, 40);
    }

    // Once opacity is zero, show the register content with animation
    setTimeout(function() {
        document.getElementById("loginContent").style.display = "none";
        var registercontent = document.getElementById("registerContent");
        registercontent.style.transform = "opacity(0);";
        document.getElementById("registerContent").style.display = "block";

        let starter = loginWindow.offsetHeight;

        // Adjust content size and opacity for smaller and bigger screens
        if (window.innerWidth <= 500) {
            registercontent.style.marginTop = "-20px";
            for (let i = 0; i < 10; i++) {
                setTimeout(function() {
                    var percentageCalc = 10 - (i * 0.4 + 0.4);
                    document.getElementById("loginX").style.setProperty("top", percentageCalc + "%", "important");
                    registercontent.style.opacity = i * 0.11;
                    loginWindow.style.height = (starter + (42 * i + 42)) + "px";
                }, 40);
            }
        } else {
            registercontent.style.marginTop = "0";
            for (let i = 0; i < 10; i++) {
                setTimeout(function() {
                    var percentageCalc = 12 - (i * 0.4 + 0.4);
                    document.getElementById("loginX").style.setProperty("top", percentageCalc + "%", "important");
                    registercontent.style.opacity = i * 0.11;
                    loginWindow.style.height = (starter + (28 * i + 28)) + "px";
                }, 40);
            }
        }
    }, 400);
}

// Switches back to the login form and animates transition
function switchToLogin() {
    // Add 'login' class and remove 'register' class
    document.getElementById("loginWindow").classList.add("login");
    document.getElementById("loginWindow").classList.remove("register");
    const inputs = document.querySelectorAll('form input');
    inputs.forEach(input => { input.value = ''; }); // Clear previous input
    const checkboxes = document.querySelectorAll('form input[type="checkbox"]');
    checkboxes.forEach(checkbox => { checkbox.checked = false; }); // Uncheck checkboxes

    var loginWindow = document.getElementById("loginWindow");
    var logincontent = document.getElementById("registerContent");
    logincontent.style.transform = "opacity(0);";

    // Fade out register content
    for (let i = 10; i >= 0; i--) {
        setTimeout(function() {
            logincontent.style.opacity = i * 0.1;
        }, 40);
    }

    // Once opacity is zero, show the login content with animation
    setTimeout(function() {
        document.getElementById("registerContent").style.display = "none";
        var registercontent = document.getElementById("loginContent");
        registercontent.style.transform = "opacity(0);";
        document.getElementById("loginContent").style.display = "block";

        let starter = loginWindow.offsetHeight;

        // Adjust content size and opacity for smaller and bigger screens
        if (window.innerWidth <= 500) {
            for (let i = 0; i < 10; i++) {
                setTimeout(function() {
                    var percentageCalc = 8 + (i * 0.4 + 0.4);
                    document.getElementById("loginX").style.setProperty("top", percentageCalc + "%", "important");
                    registercontent.style.opacity = i * 0.11;
                    loginWindow.style.height = (starter - (42 * i + 42)) + "px";
                }, 40);
            }
        } else {
            for (let i = 0; i < 10; i++) {
                setTimeout(function() {
                    var percentageCalc = 8 + (i * 0.4 + 0.4);
                    document.getElementById("loginX").style.setProperty("top", percentageCalc + "%", "important");
                    registercontent.style.opacity = i * 0.11;
                    loginWindow.style.height = (starter - (28 * i + 28)) + "px";
                }, 40);
            }
        }
    }, 400);
}


// Adds and removes 'noAnimation' class for sliders to fix animation issues
function checkBoxFixer() {
    document.querySelectorAll('.sliderDiv').forEach((div) => {
        div.classList.add('noAnimation'); // Disable animation initially
        div.addEventListener('change', () => {
            div.classList.remove('noAnimation'); // Enable animation when changed
        });
    });
}

// Handles login by sending login credentials to the server
function login(e) {
    e.preventDefault();
    var email = document.getElementById('loginInput1').value;
    var password = document.getElementById('loginInput2').value;

    // Send login request
    fetch(APISERVER + '/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": `${email}`,
            "password": `${password}`
        })
    })
    .then(response => {
        // Check if login is successful, otherwise show error
        if (response.status != 200) {
            document.getElementById('loginInput2').value = "";
            loginInputCheck();

            var translateText = `Hibás bejelentkezési adatok!`;
            var translateAlert = ['Incorrect login details!', 'Falsche Login-Daten'];
            if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

            informationPopup(translateText, true, '', true);
        }
        return response.json();
    })
    .then(data => {
        // If login is successful, save the token and user info to localStorage
        if (data.data.new != "nothing") {
            localStorage.setItem("token", data.data.new);
            getData('tokens/' + localStorage.getItem('token'))
            .then(token => {
                localStorage.setItem('userType', token['userType']);
                localStorage.setItem('userId', token['userId']);
                localStorage.setItem('tokenId', token['id']);

                var translateText = `Bejelentkezés sikeres!`;
                var translateAlert = ['Login successful!', 'Anmeldung erfolgreich!'];
                if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
    
                informationPopup(translateText, true, 'location.reload()', true);
            })
                
        }
    });
}

// Handles logout by sending logout request and removing user data
function logout(e, tokenToDelete) {
    e.preventDefault();

    // Send logout request
    fetch(APISERVER + '/logout/' + tokenToDelete, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenId');
        location.href = "main.php";
    });
}

// Handles user registration, checks if email is available, then registers the user
function register(e) {
    e.preventDefault();

    // Get user input
    var email = document.getElementById('registerInput1').value;
    var password = document.getElementById('registerInput2').value;
    var name = document.getElementById('registerInput3').value;
    var telephoneNumber = document.getElementById('registerInput4').value;
    var city = document.getElementById('registerInput5').value;
    var street = document.getElementById('registerInput6').value;
    var houseNumber = document.getElementById('registerInput7').value;
    var wantsEmail = document.getElementById('RegisterCBid').checked ? "1" : "0";

    // Collect selected habitats
    var habitats = [];
    for (let i = 0; i < document.getElementById('habitatRegister').nextElementSibling.querySelectorAll('.optionDiv').length; i++) {
        if (document.getElementById('habitatRegister').nextElementSibling.querySelectorAll('.optionDiv')[i].innerHTML.includes('data-checked="true"')) {
            habitats.push(i + 1);
        }
    }

    // Check if the email is already registered
    fetch(APISERVER + '/email', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": `${email}`
        })
    })
    .then(canUseEmail => {
        if (canUseEmail['status'] == 200) {
            // If email is available, register the user
            fetch(APISERVER + '/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": `${email}`,
                    "passwordHash": `${password}`,
                    "name": `${name}`,
                    "telephoneNumber": `${telephoneNumber}`,
                    "city": `${city}`,
                    "street": `${street}`,
                    "houseNumber": `${houseNumber}`,
                    "wantsEmail": `${wantsEmail}`,
                    "provideablehabitats": habitats
                })
            })
            // Log in the user after registration
            .then(() => {
                fetch(APISERVER + '/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "email": `${email}`,
                        "password": `${password}`
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.data.new != "nothing") {
                        localStorage.setItem("token", data.data.new);
                        getData('tokens/' + localStorage.getItem('token'))
                        .then(token => {
                            localStorage.setItem('userType', token['userType']);
                            localStorage.setItem('userId', token['userId']);
                            localStorage.setItem('tokenId', token['id']);

                            var translateText = `Regisztráció sikeres!`;
                            var translateAlert = ['Registration successful!', 'Erfolgreich registriert!'];
                            if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
                
                            informationPopup(translateText, true, 'location.reload()', true);
                        })
                    }
                });
            });
        } else {
            // If email is already in use, show an alert
            var translateText = `Az email cím már használatban van!`;
            var translateAlert = ['The email address is already in use!', 'Diese E-Mail-Adresse wird bereits verwendet!'];
            if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

            informationPopup(translateText, true, '', true);
        }
    });
}

// Function that toggles password visibility and eye icon class between show and hide
function showPassword(eye, id) {
    var passElement = document.getElementById(id);

    // Toggle password visibility
    if (passElement.type === "password") passElement.type = "text";
    else passElement.type = "password";

    // Toggle the eye icon class
    if (eye.classList.contains('hidePass')) { eye.classList.remove('hidePass'); eye.classList.add('showPass'); }
    else { eye.classList.remove('showPass'); eye.classList.add('hidePass'); }
}

function setRegisterHabitat() {
    // Check if the 'habitatRegister' element exists
    if (selectElement = document.getElementById('habitatRegister')) {
        // Fetch habitat data from the server
        getData('habitats')
        .then(habitatArray => {
            // Select the element to display habitat options
            const selectElement = document.getElementById('habitatRegister').parentElement.querySelector('.selectContent');
            selectElement.innerHTML = ""; // Clear existing options
            var inner = ""; // String to store new habitat options

            // Iterate through each habitat and create a corresponding checkbox option
            for (let i = 0; i < habitatArray.length; i++) {
                inner += `<div class="optionDiv" onclick="registerInputCheck()"><p class="checkboxAnimalText"><input id="Habitat${habitatArray[i]['id']}" type="checkbox"><label class="checkboxAnimal" for="Habitat${habitatArray[i]['id']}"></label><span class="optionText">${habitatArray[i]['name']}</span></p></div>`;
            }

            selectElement.innerHTML = inner; // Populate the dropdown with habitat options.
            setOptionDivs(); // Apply additional behaviors or styling to the dropdown.
        })
    }
}

//Function to limit the phone number length to 15
function limitTelephoneLength(input)
{
    if (input.value.length > 15) input.value = input.value.slice(0, 15);
}