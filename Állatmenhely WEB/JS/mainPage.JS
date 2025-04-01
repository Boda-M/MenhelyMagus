// Function to set data on the main page by fetching and displaying information
function setMainPageDatas()
{
  // Fetch number of species and set the species count on the page
  getData('numberofspecies')
  .then(numberOfSpecies => {
    const datas = document.getElementsByClassName("mainPageDataBreed");
    for (let i = 0; i < datas.length; i++) {
      datas[i].innerHTML = numberOfSpecies; // Set the number of species on the element with class: "mainPageDataBreed"
    }
  })

  // Fetch number of animals and set the animals count on the page
  getData('numberofanimals')
  .then(numberOfAnimals =>{
    const datas = document.getElementsByClassName("mainPageDataAnimals");
    for (let i = 0; i < datas.length; i++) {
      datas[i].innerHTML = numberOfAnimals; // Set the number of animals on the element with class: "mainPageDataAnimals"
    }
  })

  // Fetch number of shelters and set the shelters count on the page
  getData('numberofshelters')
  .then(numberOfShelters => {
    const datas = document.getElementsByClassName("mainPageDataShelters");
    for (let i = 0; i < datas.length; i++) {
      datas[i].innerHTML = numberOfShelters; // Set the number of shelters on the element with class: "mainPageDataShelters"
    }
  })

  // Fetch number of employees and set the employees count on the page
  getData('numberofemployees')
  .then(numberOfEmployees => {
    const datas = document.getElementsByClassName("mainPageDataEmployees");
    for (let i = 0; i < datas.length; i++) {
      datas[i].innerHTML = numberOfEmployees; // Set the number of employees on the element with class: "mainPageDataEmployees"
    }
  })
}