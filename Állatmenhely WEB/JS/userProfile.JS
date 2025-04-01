function userProfilePopup() {
    document.getElementById('hamburgerIcon').style.marginRight = "0%";
    document.getElementById("userProfilePopup").style.display = "block";
    document.getElementById("userProfileWindow").style.display = "block";

    // Displaying the popup window and disabling page scroll
    document.body.style.overflow = 'hidden';
    var popup = document.getElementById("userProfilePopup");
    var popupwindow = document.getElementById("userProfileWindow");

    // Fade-in animation
    popup.style.transform = "opacity(1);"; // Final opacity
    for (let i = 0; i < 11; i++) {
        setTimeout(function() {
            popup.style.opacity = i*0.07;
            popupwindow.style.opacity = i*0.1;
        }, 40); // Timing (40ms) for smoother animation
    }
}

function userProfilePopupClose() {
    document.getElementById('hamburgerIcon').style.marginRight = "0%";
    var popup = document.getElementById("userProfilePopup");
    var popupwindow = document.getElementById("userProfileWindow");

    // Enabling page scroll and hiding popup
    document.body.style.overflow = 'initial';
    popup.style.transform = "opacity(0);"; // Final opacity
    for (let i = 10; i >= 0; i--) {
        setTimeout(function() {
            popup.style.opacity = i*0.07;
            popupwindow.style.opacity = i*0.1;
        }, 40); // Timing (40ms) for smoother animation
    }
    setTimeout(function() { //Csak akkor fut le, ha már az opacity lement nullára.
        document.getElementById("userProfilePopup").style.display = "none";
        document.getElementById("userProfileWindow").style.display = "none";
        document.getElementById('hamburgerIcon').style.marginRight = "0%";
    }, 400);
}

function setUserProfile() {
    // Check if the 'userProfileButton' exists, and if so, set its onclick function to show the profile popup
    if (document.getElementsByClassName('userProfileButton').length != 0)  document.getElementsByClassName("userProfileButton")[0].setAttribute("onclick","userProfilePopup()");

    // Check the user type from localStorage
    if (localStorage.getItem('userType') == "admin") {
        // If the user is an admin, show admin-related data and buttons
        document.getElementById('userDataAdmin').style.display = "block";
        document.getElementById("userProfileWindow").style.height = "400px";

        var popupText = "Biztosan törölni szeretné fiókját?";
        var translateAlert = ['Are you sure you want to delete your account?', 'Sind Sie sicher, dass Sie Ihr Profil löschen möchten?'];
        if (localStorage.getItem('language')) popupText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        document.getElementById('userProfileDeleteButton').setAttribute("onclick","informationPopup('" + popupText + "', false, 'deleteAccount(" + localStorage.getItem('userId') + ", `admins`)', true);");

        var popupText = "Biztosan módosítaná fiókja adatait?";
        var translateAlert = ['Are you sure you want to change your account details?', 'Sind Sie sicher, dass Sie Ihre Profil-Daten ändern möchten?'];
        if (localStorage.getItem('language')) popupText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        document.getElementById('userProfileModifyButton').setAttribute("onclick","informationPopup('" + popupText + "', false, 'userDataChange(" + localStorage.getItem('userId') + ", `admins`)', true);");

        // Fetch and display admin data using the getData function
        getData('admins/' + localStorage.getItem('userId') + '/' + localStorage.getItem('token'))
        .then(adminData => {
            // Populate the admin data into the form fields
            document.getElementById('adminDataEmail').value = adminData['email'];
            document.getElementById('adminDataEmail').setAttribute("data-original", adminData['email']);
            document.getElementById('adminDataPassword').value = ""; // Do not show password
            document.getElementById('adminDataName').value = adminData['name'];
        })

    } else if (localStorage.getItem('userType') == "employee") {
        // If the user is an employee, show employee-related data and buttons
        document.getElementById('userDataEmployee').style.display = "block";
        document.getElementById("userProfileWindow").style.height = "400px";

        var popupText = "Biztosan törölni szeretné fiókját?";
        var translateAlert = ['Are you sure you want to delete your account?', 'Sind Sie sicher, dass Sie Ihr Profil löschen möchten?'];
        if (localStorage.getItem('language')) popupText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        document.getElementById('userProfileDeleteButton').setAttribute("onclick","informationPopup('" + popupText + "', false, 'deleteAccount(" + localStorage.getItem('userId') + ", `employees`)', true);");
        
        var popupText = "Biztosan módosítaná fiókja adatait?";
        var translateAlert = ['Are you sure you want to change your account details?', 'Sind Sie sicher, dass Sie Ihre Profil-Daten ändern möchten?'];
        if (localStorage.getItem('language')) popupText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        document.getElementById('userProfileModifyButton').setAttribute("onclick","informationPopup('" + popupText + "', false, 'userDataChange(" + localStorage.getItem('userId') + ", `employees`)', true);");

        // Fetch and display employee data using the getData function
        getData('employees/' + localStorage.getItem('userId') + '/' + localStorage.getItem('token'))
        .then(employeeData => {
            // Populate the employee data into the form fields
            document.getElementById('employeeDataEmail').value = employeeData['email'];
            document.getElementById('employeeDataEmail').setAttribute("data-original", employeeData['email']);
            document.getElementById('employeeDataPassword').value = ""; // Do not show password
            document.getElementById('employeeDataName').value = employeeData['name'];
        })
    } else {
        // If the user is a regular user, show user-related data and buttons
        document.getElementById('userDataUser').style.display = "block";
        document.getElementById("userProfileWindow").style.height = "580px";

        var popupText = "Biztosan törölni szeretné fiókját?";
        var translateAlert = ['Are you sure you want to delete your account?', 'Sind Sie sicher, dass Sie Ihr Profil löschen möchten?'];
        if (localStorage.getItem('language')) popupText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        document.getElementById('userProfileDeleteButton').setAttribute("onclick","informationPopup('" + popupText + "', false, 'deleteAccount(" + localStorage.getItem('userId') + ", `users`)', true);");
        
        var popupText = "Biztosan módosítaná fiókja adatait?";
        var translateAlert = ['Are you sure you want to change your account details?', 'Sind Sie sicher, dass Sie Ihre Profil-Daten ändern möchten?'];
        if (localStorage.getItem('language')) popupText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        document.getElementById('userProfileModifyButton').setAttribute("onclick","informationPopup('" + popupText + "', false, 'userDataChange(" + localStorage.getItem('userId') + ", `users`)', true);");

        // Fetch and display user data using the getData function
        getData('users/' + localStorage.getItem('userId') + '/' + localStorage.getItem('token'))
        .then(userData => {
            // Populate the user data into the form fields
            document.getElementById('userDataEmail').value = userData['email'];
            document.getElementById('userDataEmail').setAttribute("data-original", userData['email']);
            document.getElementById('userDataPassword').value = ""; // Do not show password
            document.getElementById('userDataName').value = userData['name'];
            document.getElementById('userDataTelephone').value = userData['telephoneNumber'];
            document.getElementById('userDataCity').value = userData['city'];
            document.getElementById('userDataStreet').value = userData['street'];
            document.getElementById('userDataHouse').value = userData['houseNumber'];
            document.getElementById('userDataPrefEmail').checked = (userData['wantsEmail'] == 1 ? true : false);

            // Handle the user's habitats by selecting the appropriate options in the UI
            for (let i = 0; i < userData['habitats'].length; i++) {
                // Loop through each habitat option and select the relevant ones for the user
                for (let j = 0; j < document.getElementById("habitatUserData").nextElementSibling.querySelectorAll(".optionDiv").length; j++) {
                    if (document.getElementById("habitatUserData").nextElementSibling.querySelectorAll(".optionDiv")[j].innerHTML.includes('Habitat' + userData['habitats'][i])) document.getElementById("habitatUserData").nextElementSibling.querySelectorAll(".optionDiv")[j].click();
                }
            }
        })
    }
}

// Function to change user data based on user type (admin, employee, user)
function userDataChange(id,type) {
    // If the user is an admin
    if (type == "admins") {
        // Get the admin data from the page
        email =  document.getElementById('adminDataEmail').value;
        nameAdmin =  document.getElementById('adminDataName').value; // VS Code said I shouldn't use the "name" variable, thats why I named it nameAdmin
        passwordHash =  document.getElementById('adminDataPassword').value;

        // Fetch existing admin data from the server
        getData('admins/' + localStorage.getItem('userId') + '/' + localStorage.getItem('token'))
        .then(adminData => {
            // If email or name are empty, use the current values
            if (email == "") email = adminData['email'];
            if (nameAdmin == "") nameAdmin = adminData['name'];

            // Create the request body
            let body = {
                "email": email,
                "name": nameAdmin,
                "token": localStorage.getItem('token')
            };

            // If password is provided, add the password hash to the request
            if (passwordHash != "") {
                body["passwordHash"] = passwordHash;
            }

            var emailNotModified = email == document.getElementById('adminDataEmail').getAttribute('data-original');

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
                if (canUseEmail['status'] == 200 || emailNotModified) {
                    // Send PUT request to update the admin data
                    fetch(APISERVER + "/" + type +"/" + id, 
                    {
                        method: "PUT", // Specifies that the request is a PUT request.
                        headers: 
                        {
                            "Content-Type": "application/json" // Indicates the request body format is JSON.
                        },
                        body: JSON.stringify(body)
                    })
                    var translateText = `Módosítás sikeres!`;
                    var translateAlert = [`Modification successful!`, `Veränderung erfolgreich!`];
                    if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
                    informationPopup(translateText, true, 'location.reload()', false);
                } else {
                    // If email is already in use, show an alert
                    var translateText = `Az email cím már használatban van!`;
                    var translateAlert = ['The email address is already in use!', 'Diese E-Mail-Adresse wird bereits verwendet!'];
                    if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        
                    informationPopup(translateText, true, '', true);
                }
            })
        });
    // If the user is an employee
    } else if (type == "employees") {
        // Get employee data from the page
        email = document.getElementById('employeeDataEmail').value;
        nameEmployee = document.getElementById('employeeDataName').value; // VS Code said I shouldn't use the "name" variable, thats why I named it nameEmployee
        passwordHash = document.getElementById('employeeDataPassword').value;

        // Fetch existing employee data from the server
        getData('employees/' + localStorage.getItem('userId') + '/' + localStorage.getItem('token'))
            .then(employeeData => {
                // If email or name are empty, use the current values
                if (email == "") email = employeeData['email'];
                if (nameEmployee == "") nameEmployee = employeeData['name'];

                // Create the request body
                let body = {
                    "email": email,
                    "name": nameEmployee,
                    "token": localStorage.getItem('token')
                };

                // If password is provided, add the password hash to the request
                if (passwordHash != "") {
                    body["passwordHash"] = passwordHash;
                }

                var emailNotModified = email == document.getElementById('employeeDataEmail').getAttribute('data-original');

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
                    if (canUseEmail['status'] == 200 || emailNotModified) {
                        // Send PUT request to update the employee data
                        fetch(`http://localhost:10001/${type}/${id}`, {
                            method: "PUT", // Specifies that the request is a PUT request.
                            headers: {
                                "Content-Type": "application/json" // Indicates the request body format is JSON.
                            },
                            body: JSON.stringify(body)
                        })
                        var translateText = `Módosítás sikeres!`;
                        var translateAlert = [`Modification successful!`, `Veränderung erfolgreich!`];
                        if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
                        informationPopup(translateText, true, 'location.reload()', false);
                    } else {
                        // If email is already in use, show an alert
                        var translateText = `Az email cím már használatban van!`;
                        var translateAlert = ['The email address is already in use!', 'Diese E-Mail-Adresse wird bereits verwendet!'];
                        if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
            
                        informationPopup(translateText, true, '', true);
                    }
                })
            });
    // If the user is a regular user
    } else if (type == "users") {
        // Get user data from the page
        email = document.getElementById('userDataEmail').value;
        nameUser = document.getElementById('userDataName').value; // VS Code said I shouldn't use the "name" variable, thats why I named it nameUser
        passwordHash = document.getElementById('userDataPassword').value;
        telephoneNumber = document.getElementById('userDataTelephone').value;
        city = document.getElementById('userDataCity').value;
        street = document.getElementById('userDataStreet').value;
        houseNumber = document.getElementById('userDataHouse').value;
        wantsEmail = (document.getElementById('userDataPrefEmail').checked ? 1 : 0);

        // Get selected habitats
        var habitats = [];
        
        for (let i = 0; i < document.getElementById('habitatUserData').nextElementSibling.querySelectorAll('.optionDiv').length; i++) {
            if (document.getElementById('habitatUserData').nextElementSibling.querySelectorAll('.optionDiv')[i].innerHTML.includes('data-checked="true"')){
                habitats.push(document.getElementById('habitatUserData').nextElementSibling.querySelectorAll('.optionDiv')[i].querySelector('.checkboxAnimalText').querySelector('input').id.split('Habitat')[1]); // Add habitat to the array if selected}
            } 
        }
        // Fetch existing user data from the server
        getData('users/' + localStorage.getItem('userId') + '/' + localStorage.getItem('token'))
        .then(userData => {
            // If any field is empty, use the current values
            if (email == "") email = userData['email'];
            if (nameUser == "") nameUser = userData['name'];
            if (telephoneNumber == "") telephoneNumber = userData['telephoneNumber'];
            if (city == "") city = userData['city'];
            if (street == "") street = userData['street'];
            if (houseNumber == "") houseNumber = userData['houseNumber'];
            if (habitats == []) habitats = userData['habitats'];

            // Create the request body
            let body = {
                "email": email,
                "name": nameUser,
                "telephoneNumber": telephoneNumber,
                "city": city,
                "street": street,
                "houseNumber": houseNumber,
                "wantsEmail": wantsEmail,
                "habitats": habitats,
                "token": localStorage.getItem('token')
            };

            // If password is provided, add the password hash to the request
            if (passwordHash != "") {
                body["passwordHash"] = passwordHash;
            }

            var emailNotModified = email == document.getElementById('userDataEmail').getAttribute('data-original');

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
                if (canUseEmail['status'] == 200 || emailNotModified) {
                        // Send PUT request to update the user data
                        fetch(`http://localhost:10001/${type}/${id}`, {
                            method: "PUT", // Specifies that the request is a PUT request.
                            headers: {
                                "Content-Type": "application/json" // Indicates the request body format is JSON.
                            },
                            body: JSON.stringify(body)
                        })
                        var translateText = `Módosítás sikeres!`;
                        var translateAlert = [`Modification successful!`, `Veränderung erfolgreich!`];
                        if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
                        informationPopup(translateText, true, 'location.reload()', false);
                } else {
                    // If email is already in use, show an alert
                    var translateText = `Az email cím már használatban van!`;
                    var translateAlert = ['The email address is already in use!', 'Diese E-Mail-Adresse wird bereits verwendet!'];
                    if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
        
                    informationPopup(translateText, true, '', true);
                }
            })
        });
    }
}

// Function to delete a user account based on the user ID and type (admin, employee, user)
function deleteAccount(id,type) {
    // Send a DELETE request to the server to remove the user data
    fetch(APISERVER + "/" + type +"/" + id, 
    {
        method: "DELETE", // Specifies that the request is a DELETE request.
        headers: 
        {
            'Content-Type': 'application/json' // Indicates the request body format is JSON.
        },
        body: JSON.stringify( // Convert the body to a JSON string
        { 
            "token":`${localStorage.getItem('token')}` // Includes the user's authentication token in the request.
        })
    });
    // Removing the token and other data from the localStorage.
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("tokenId");

    // Redirecting to the main page.
    var translateText = `Törlés sikeres!`;
    var translateAlert = [`Deletion successful!`, `Löschen erfolgreich!`];
    if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
    informationPopup(translateText, true, 'window.location.href = "main.php"', false);
}

function setUserDataHabitat() {
    // Check if the user type stored in localStorage is "user".
    if (localStorage.getItem('userType') == "user") {
        // Fetch habitat data from the API endpoint.
        getData('habitats')
        .then(habitatArray => 
        {
            // Select the element to populate habitat options.
            const selectElement = document.getElementById('habitatUserData').parentElement.querySelector('.selectContent');
            selectElement.innerHTML = ""; // Clear existing content.
            var inner = ""; // Initialize empty string to store option HTML.

            // Iterate through the habitat array to create checkbox options.
            for (let i = 0; i < habitatArray.length; i++) {
                inner += `<div class="optionDiv"><p class="checkboxAnimalText"><input id="Habitat${habitatArray[i]['id']}" type="checkbox"><label class="checkboxAnimal" for="Habitat${habitatArray[i]['id']}"></label><span class="optionText">${habitatArray[i]['name']}</span></p></div>`;
            }

            // Insert generated options into the select element.
            selectElement.innerHTML = inner;

            // Initialize behavior of the option elements.
            setOptionDivs();

            // Fetch user data for the currently logged-in user.
            getData('users/' + localStorage.getItem('userId') + '/' + localStorage.getItem('token'))
            .then(userData => {
                // Loop through the user's habitat preferences.
                for (let i = 0; i < userData['habitats'].length; i++) {
                    // Select and visually mark habitats associated with the user.
                    document.getElementById('Habitat' + userData['habitats'][i]).parentElement.parentElement.click();
                }
            })
        })
    }
}