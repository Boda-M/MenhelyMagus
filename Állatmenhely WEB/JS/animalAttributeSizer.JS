// Function that gets attributes for an animal and returns it
function getAttributes(animal) {
    var attributes = []; // Declares an array to store the animal's attributes based on certain conditions.

    // Checks various attributes of the animal and pushes appropriate labels into the array.
    if (animal['docility'] > 6) { attributes.push(localStorage.getItem('language') ? (localStorage.getItem('language') == "deutsch" ? "Schlau" : "Smart") : "Tanulékony"); }
    if (animal['exerciseNeed'] > 6) { attributes.push(localStorage.getItem('language') ? (localStorage.getItem('language') == "deutsch" ? "Beweglich" : "Mobile") : "Mozgékony"); }
    if (animal['childFriendlyness'] > 6) { attributes.push(localStorage.getItem('language') ? (localStorage.getItem('language') == "deutsch" ? "Kinderfreundlich" : "Child friendly") : "Gyerekbarát"); }
    if (animal['sociability'] > 6) { attributes.push(localStorage.getItem('language') ? (localStorage.getItem('language') == "deutsch" ? "Gesellig" : "Sociable") : "Társaslény"); }
    if (animal['furLength'] > 6) { attributes.push(localStorage.getItem('language') ? (localStorage.getItem('language') == "deutsch" ? "Langhaarig" : "Long-haired") : "Hosszú szőrű"); }
    if (animal['cuteness'] > 6) { attributes.push(localStorage.getItem('language') ? (localStorage.getItem('language') == "deutsch" ? "Niedlich" : "Cute") : "Cuki"); }
    if (animal['furLength'] < 4) { attributes.push(localStorage.getItem('language') ? (localStorage.getItem('language') == "deutsch" ? "Kurzhaarig" : "Short-haired") : "Rövid szőrű"); }
    if (animal['exerciseNeed'] < 4) { attributes.push(localStorage.getItem('language') ? (localStorage.getItem('language') == "deutsch" ? "Faul" : "Lazy") : "Lusta"); }
    if (animal['sociability'] < 4) { attributes.push(localStorage.getItem('language') ? (localStorage.getItem('language') == "deutsch" ? "Einzelgänger" : "Loner") : "Magának való"); }
    if (animal['housebroken'] == 1) { attributes.push(localStorage.getItem('language') ? (localStorage.getItem('language') == "deutsch" ? "Stubenrein" : "Housebroken") : "Szobatiszta"); }
    if (animal['neutered'] == 1) { attributes.push(localStorage.getItem('language') ? (localStorage.getItem('language') == "deutsch" ? "Kastriert" : "Neutered") : "Ivartalanított"); }
    if (parseInt(animal['birthDate'].split('-')[0]) > 2021) { attributes.push(localStorage.getItem('language') ? (localStorage.getItem('language') == "deutsch" ? "Jung" : "Young") : "Fiatal"); }

    // If there are 2 or fewer attributes, return them as a single string separated by "; ".
    if (attributes.length <= 2) return attributes.join("; ");

    // If there are more than 2 attributes, randomly select two unique attributes.
    var randomAttributes = [];
    while (randomAttributes.length < 2) {
        var randomIndex = Math.floor(Math.random() * attributes.length);
        var randomAttribute = attributes[randomIndex];
        if (!randomAttributes.includes(randomAttribute)) randomAttributes.push(randomAttribute);
    }

    return randomAttributes.join(";"); // Returns the two randomly selected attributes as a single string separated by ";".
}