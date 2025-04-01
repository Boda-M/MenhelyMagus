// Define the base API server URL
const APISERVER = "http://localhost:10001";
var isFiltering = false; // A flag to indicate if filtering is currently active or not

// Function to fetch data from the server based on the specified endpoint
function getData(dataToGet) {
  return fetch(APISERVER + '/' + dataToGet) // Make a GET request to the server
    .then(response => {
      if (!response.ok) { // Check if the response is not successful
        throw new Error('Network response was not ok'); // Throw an error if the response failed
      }
      return response.json(); // Parse the response as JSON
    })
    .then(data => {
      return data.data; // Return the relevant data from the server response
    });
}

// Function to retrieve paginated animal data
function getAnimalsPaginator(howmany, page, filters = null, preferences = null) {
  let data = {}; // Initialize an object to store filters and preferences
  data.filters = filters; // Assign filters to the data object
  data.preferences = preferences; // Assign preferences to the data object
  var body = JSON.stringify(data); // Convert the data object to a JSON string


  // Setting a token string if a token exists in local storage
  let tokenStr = "";
  if(localStorage.getItem('token'))tokenStr = "?token=" + localStorage.getItem('token');

  // Make a POST request to fetch the paginated animal data
  return fetch(`${APISERVER}/animalsPaginator/${howmany}/${page}` + tokenStr, {
    method: 'POST', // Specifies that the request is a POST request.
    headers: {
      'Content-Type': 'application/json', // Indicates the request body format is JSON.
    },
    body // Include the JSON stringified data as the request body
  })
    .then(response => {
      if (!response.ok) { // Check if the response is not successful
        throw new Error('Network response was not ok'); // Throw an error if the response failed
      }
      return response.json(); // Parse the response as JSON
    }).then(data => {
      let meta = data.meta;
      currentPage = meta['currentPage'];
      pageCount = meta['pageCount'];
      return data.data; // Return the relevant data from the server response
    });
}

// Function to check user privileges and restrict access to certain pages
function privilegeChecker() {
  const url = new URL(window.location.href); // Get the current URL

  // Check if the URL includes 'edit'
  if (url.href.includes('edit')) {
    const id = url.searchParams.get('id'); // Extract the 'id' parameter from the URL
    if (localStorage.getItem('userType') == "employee") { // Check if the user is an employee
      Promise.all([ // Fetch employee and animal data simultaneously
        getData('employees/' + localStorage.getItem('userId') + '/' + localStorage.getItem('token')),
        getData('animals/' + id)
      ])
        .then(([employee, animal]) => {
          const employeeShelterId = employee['shelterId']; // Get the employee's shelter ID
          const animalShelterId = animal['shelterId']; // Get the animal's shelter ID

          // Check if the animal's shelter ID does not match the employee's shelter ID
          if (animalShelterId != employeeShelterId) {
            // Alert the user based on the selected language
            var translateText = `Oldalhoz való hozzáférés megtagadva!`;
            var translateAlert = ['Site access denied!', 'Zugang zur Website verweigert!'];
            if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

            informationPopup(translateText, true, 'window.location.href = "main.php"', false);
          }
        });
    } else {
      // Alert the user and redirect if they are not an employee
      var translateText = `Oldalhoz való hozzáférés megtagadva!`;
      var translateAlert = ['Site access denied!', 'Zugang zur Website verweigert!'];
      if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

      informationPopup(translateText, true, 'window.location.href = "main.php"', false);
    }
  } 
  // Restrict access to employee-only pages
  else if (url.href.includes('employeeTools') || url.href.includes('create') || url.href.includes('adoptions')) {
    if (localStorage.getItem('userType') != "employee") {
      var translateText = `Oldalhoz való hozzáférés megtagadva!`;
      var translateAlert = ['Site access denied!', 'Zugang zur Website verweigert!'];
      if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

      informationPopup(translateText, true, 'window.location.href = "main.php"', false);
    } else {
      getData('employees/' + localStorage.getItem('userId') + '/' + localStorage.getItem('token'))
      .then(employee => {
        if (employee['shelterId'] == null)
        {
          var translateText = `Nem rendelkezik még menhely ID&#8209;vel!`;
          var translateAlert = ['You don\'t have a shelter ID yet!', 'Sie haben noch kein Tierheim ID!'];
          if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

          informationPopup(translateText, true, 'window.location.href = "main.php"', false);
        }
      })
    }
  } 
  // Restrict access to admin-only pages
  else if (url.href.includes('adminTools') || url.href.includes('manageEmployees') || url.href.includes('manageUsers') || url.href.includes('manageShelters')) {
    if (localStorage.getItem('userType') != "admin") {
      var translateText = `Oldalhoz való hozzáférés megtagadva!`;
      var translateAlert = ['Site access denied!', 'Zugang zur Website verweigert!'];
      if (localStorage.getItem('language')) translateText = translateAlert[localStorage.getItem('language') == "deutsch" ? 1 : 0];

      informationPopup(translateText, true, 'window.location.href = "main.php"', false);
    }
  }
}

// Function to fetch adoption data
function getAdoptions() {
  return fetch(APISERVER + '/adoptions/' + localStorage.getItem('userId'), {
    method: 'POST', // Specifies that the request is a POST request.
    headers: {
      'Content-Type': 'application/json', // Indicates the request body format is JSON.
    },
    body: JSON.stringify({
      "token": `${localStorage.getItem('token')}` // Include the token in the request body
    })
  })
    .then(response => {
      if (!response.ok) { // Check if the response is not successful
        throw new Error('Network response was not ok'); // Throw an error if the response failed
      }
      return response.json(); // Parse the response as JSON
    })
    .then(data => {
      return data.data; // Return the relevant data from the server response
    });
}

function awaitCondition(callback, conditionEvaluationFunction, interval = 10, timeout = 5000) {
  const startTime = Date.now();

  let checkInterval = setInterval(() => {
      if (conditionEvaluationFunction()) {
          clearInterval(checkInterval);
          callback();
      } else if (Date.now() - startTime > timeout) {
          clearInterval(checkInterval);
      }
  }, interval);
}