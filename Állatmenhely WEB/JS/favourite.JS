// Function to toggle the star icon (active/inactive) and add/remove from favourites
function toggleStar(element, animalId) {
    // Toggle the 'active' class on the star element
    element.classList.toggle('active');
    
    // If the star is now active, add the animal to the user's favourites
    if (element.classList.contains('active')) {
        fetch(APISERVER + "/favourites", {
            method: "POST", // Specifies that this is a POST request for creating data
            headers: 
            {
                "Content-Type": "application/json" // Indicates the request body format is JSON.
            },
            body: JSON.stringify(
            {
                "animalId":`${animalId}`, // Includes animal ID to be added to favourite
                "userId":`${localStorage.getItem('userId')}`, // Includes user ID for authentication
                "token":`${localStorage.getItem('token')}` // Includes the user's authentication token in the request.
            })
        })
        .then(response => {
            // If the request fails, log an error
            if (response.ok == false)  console.error("Failed to create favourite. Status:", response.status);
        })
        .catch(error => console.error("Error:", error)); // Catch and log errors
    } else {
        // If the star is inactive, remove the animal from the user's favourites
        fetch(APISERVER + "/favourites/" + animalId + "/" + localStorage.getItem('userId'), {
            method: "DELETE", // Specifies that this is a DELETE request for removing data
            headers: 
            {
                "Content-Type": "application/json" // Indicates the request body format is JSON.
            },
            body: JSON.stringify(
            {
                "token":`${localStorage.getItem('token')}` // Includes the user's authentication token in the request.
            })
        })
    }
}