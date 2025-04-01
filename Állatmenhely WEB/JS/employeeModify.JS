// Function to update the onclick of the save button with the new shelter ID
function updateShelterId(inputElement, employeeId) {

    inputElement.value = inputElement.value.replace(/[^0-9]/g, "");

    if (parseInt(inputElement.value) < 1) {
        inputElement.value = "1";
    }


    // Get the new shelter ID from the input field
    let newshelterId = inputElement.value;

    // Find the "Save" button
    let saveButton = inputElement.closest('tr').querySelector('img[src="IMG/saveIcon.png"]');

    // Update the "onclick" event for the save button with the new shelter ID
    var modifyEmployeeText = `Biztosan módosítaná az alkalmazott menhelyét? [ID: ${employeeId}]`;
    var translateAlert = [`Are you sure you would modify this employee's shelter? [ID: ${employeeId}]`, `Sind Sie sich sicher, dass Sie das Tierheim von diesen Angestellten ändern möchten? [ID: ${employeeId}]`];
    if (localStorage.getItem('language')) modifyEmployeeText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

    saveButton.setAttribute('onclick', `informationPopup('${modifyEmployeeText}', false, 'modifyEmployee(${employeeId}, ${newshelterId})', false)`);
}

// Function to modify employee details (shelter ID) by making a PUT request
function modifyEmployee(employeeId, shelterId) {
    // Send a PUT request to update the employee's shelter ID
    fetch(APISERVER + "/employees/"+employeeId, {
        method: "PUT", // Specifies that the request is a PUT request.
        headers: 
        {
            "Content-Type": "application/json" // Indicates the request body format is JSON.
        },
        body: JSON.stringify( // Prepares the body of the request with modification details.
        {
            "shelterId":`${shelterId}`, // Includes the new shelter ID
            "token":`${localStorage.getItem('token')}` // Includes the user's authentication token in the request.
        })
    })
    .then(response => {
        // If the request is successful, notify the user of the success based on the user's preferred language setting
        if (response.ok) {
            var translateText = `Módosítás sikeres!`;
            var translateAlert = [`Modification successful!`, `Änderung erfolgreich!`];
            if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
            informationPopup(translateText, true, '', false);
        }
        // If the request fails, notify the user of the error based on the user's preferred language setting
        else
        {
            var translateText = `Nem létező / a jelenlegi menhely ID lett megadva!`;
            var translateAlert = [`Non-existent / the current shelter ID has been entered!`, `Die angegebene ID existiert nicht / wurde nicht geändert!`];
            if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
            informationPopup(translateText, true, '', false);
        }
    })
}

// Function to delete an employee by making a DELETE request
function deleteEmployee(employeeId) {
    // Send a DELETE request to remove the employee
    fetch(APISERVER + "/employees/"+employeeId, {
        method: "DELETE", // Specifies that the request is a DELETE request.
        headers: 
        {
            "Content-Type": "application/json" // Indicates the request body format is JSON.
        },
        body: JSON.stringify( // Prepares the body of the request with deletion details.
        {
            "token":`${localStorage.getItem('token')}` // Includes the user's authentication token in the request.
        })
    })
    .then(response => {
        // If the request is successful, notify the user based on the user's preferred language setting and reload the page
        if (response.ok) {
            var translateText = `Törlés sikeres!`;
            var translateAlert = [`Deletion successful!`, `Löschen erfolgreich!`];
            if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
            informationPopup(translateText, true, 'location.reload()', false);
        }
    })
}

function setEmployees() {
    // Fetch employee data using token stored in localStorage
    getData('employees/' + localStorage.getItem('token'))
    .then(employeeArray => {
        // Select the table body element where employee rows will be added
        let tableBody = document.querySelector('#employeesTable');

        // Iterate through each employee in the array
        for (let i = 0; i < employeeArray.length; i++) {
            // Create a new table row element
            let newRow = document.createElement('tr');

            var deleteEmployeeText = `Biztosan törölni ezt az alkalmazottat? [ID: ${employeeArray[i].id}]`;
            var translateAlert = [`Are you sure you would delete this employee? [ID: ${employeeArray[i].id}]`, `Sind Sie sich sicher, dass Sie diesen Angestellten löschen möchten? [ID: ${employeeArray[i].id}]`];
            if (localStorage.getItem('language')) deleteEmployeeText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

            var modifyEmployeeText = `Biztosan módosítaná az alkalmazott menhelyét? [ID: ${employeeArray[i].id}]`;
            var translateAlert = [`Are you sure you would modify this employee's shelter? [ID: ${employeeArray[i].id}]`, `Sind Sie sich sicher, dass Sie das Tierheim von diesen Angestellten ändern möchten? [ID: ${employeeArray[i].id}]`];
            if (localStorage.getItem('language')) modifyEmployeeText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

            // Populate the row with employee details
            newRow.innerHTML = `
            <td>${employeeArray[i].id}</td>
            <td>${employeeArray[i].name}</td>
            <td class="manageEmployeesEmail">${employeeArray[i].email}</td>
            <td><input type="text" value="${employeeArray[i].shelterId}" oninput='updateShelterId(this, ${employeeArray[i].id})'"></td>
            <td><img src="IMG/saveIcon.png" alt="Save icon" onclick="informationPopup('${modifyEmployeeText}', false, 'modifyEmployee(${employeeArray[i].id}, ${employeeArray[i].shelterId})', false)"></td>
            <td><img src="IMG/delete.png" alt="Delete icon" onclick="informationPopup('${deleteEmployeeText}', false, 'deleteEmployee(${employeeArray[i].id})', false)"></td>`;
            
            // Append the new row to the table body
            tableBody.appendChild(newRow);
        }
    })
}