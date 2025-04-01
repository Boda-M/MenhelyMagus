function deleteUser(userId)
{
    // Making a DELETE request to the server to delete the user by their ID
    fetch(APISERVER + "/users/"+userId, 
    {
        method: "DELETE", // Specifies that the request is a DELETE request.
        headers: 
        {
            "Content-Type": "application/json" // Indicates the request body format is JSON.
        },
        body: JSON.stringify(
        {
            "token":`${localStorage.getItem('token')}` // Passing the token stored in localStorage for authentication
        })
    })
    .then(response => {
        // If the response is successful
        if (response.ok) 
        {
            var translateText = `Törlés sikeres!`;
            var translateAlert = [`Deletion successful!`, `Löschen erfolgreich!`];
            if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];
            informationPopup(translateText, true, 'location.reload()', false);
        }
    })
}

function setUsers() {
    // Fetch user data using token stored in localStorage
    getData('users/' + localStorage.getItem('token'))
    .then(userArray => {
        // Select the table body where user rows will be added
        let tableBody = document.querySelector('#usersTable');

        // Loop through each user in the returned userArray
        for (let i = 0; i < userArray.length; i++) {
            // Create a new row for each user
            let newRow = document.createElement('tr');

            // Populate the row with user details (ID, Name, Email, and Delete option)
            var deleteUserText = `Biztosan törölni ezt a felhasználót? [ID: ${userArray[i].id}]`;
            var translateAlert = [`Are you sure you would delete this user? [ID: ${userArray[i].id}]`, `Sind Sie sicher, dass Sie diesen Nutzer löschen möchten? [ID: ${userArray[i].id}]`];
            if (localStorage.getItem('language')) deleteUserText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

            newRow.innerHTML = `
            <td>${userArray[i].id}</td>
            <td>${userArray[i].name}</td>
            <td class="manageEmployeesEmail">${userArray[i].email}</td>
            <td><img src="IMG/delete.png" alt="Delete icon" onclick="informationPopup('${deleteUserText}', false, 'deleteUser(${userArray[i].id})', false)"></td>`;
            
            // Append the new row to the table body
            tableBody.appendChild(newRow);
        }
    })
}