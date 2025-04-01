// This function handles language translation based on the user's selected language stored in localStorage
function translate()
{
    document.body.style.visibility = 'visible'; // Make the body visible

    // Set the selected language icon based on the language in localStorage
    if (localStorage.getItem('language') == "english") document.getElementById('SelectedLanguageIcon').src = "IMG/Header/en_EN.png"; // Set to English icon
    else if (localStorage.getItem('language') == "deutsch") document.getElementById('SelectedLanguageIcon').src = "IMG/Header/de_DE.png"; // Set to German icon
    else document.getElementById('SelectedLanguageIcon').src = "IMG/Header/hu_HU.png"; // Set to Hungarian icon

    // Array that contains the elements and their translations for various languages
    var translate = [
        ['selectedLanguageText', 'English', 'Deutsch'],
        ['mainPageTextNormal', 'Main Page', 'Startseite'],
        ['mainPageTextHamburger', 'Main Page', 'Startseite'],
        ['animalsTextNormal', 'Animals', 'Tiere'],
        ['animalsTextHamburger', 'Animals', 'Tiere'],
        ['adminToolsTextNormal', 'Admin Tools', 'Admin Tools'], 
        ['adminToolsTextHamburger', 'Admin Tools', 'Admin Tools'],
        ['employeeToolsTextNormal', 'Employee Tools', 'Angestellten Tools'],
        ['employeeToolsTextHamburger', 'Employee Tools', 'Angestellten Tools'],
        ['logoutButton', 'Logout', 'Abmelden'],
        ['logoutButtonHamburger', 'Logout', 'Abmelden'],
        ['footerText1', '<b>MenhelyMágus</b><br><br>Adopt an animal today! Our animals are waiting for you!', '<b>MenhelyMágus</b><br><br>Adoptieren Sie noch Heute! Unsere Tiere warten schon auf Sie!'],
        ['footerText2', '<b>Do you have a question?</b><br><br> Contact us at support@<wbr>menhely<wbr>magus.hu.', '<b>Haben Sie Fragen?</b><br><br> Kontaktieren Sie uns unter support@<wbr>menhely<wbr>magus.hu.'],
        ['mainPageContentText', 'MenhelyMágus is a platform that collects and displays animals from different shelters on a single website. This makes it easy for users to browse and find many animals in one place. We also help shelters that do not yet have their own website to make their animals available online.', 
        'MenhelyMágus ist eine Platform, die Daten von verschiedenen Tierheimen sammelt, und auf einer einzigen Webseite präsentiert. So können Nutzer eine große anzahl von Tieren, einfach an einer stelle suchen, und finden. Außerdem helfen wir Tierheimen, die keine eigene Website haben, ihre Tiere Online zur verfügung zu stellen.'],
        ['mainPageSpeciesCount', 'species', 'Arten'],
        ['mainPageAnimalCount', 'animals', 'Tiere'],
        ['mainPageShelterCount', 'shelters', 'Tierheime'],
        ['mainPageEmployeeCount', 'employees', 'Angestellte'],
        ['mainPageSpeciesContent1', 'At our partner shelters', 'In unseren Partnertierheimen leben'],
        ['mainPageSpeciesContent2', 'different species live, each with its own needs. We treat each animal with care to find the best home for them.', 'verschiedene Tierarten, alle mit ihren eigenen Bedürfnissen. Wir pflegen alle Tiere mit großen aufwand, um ihnen das beste Zuhause zu finden'], //this is weird, but the hungarian is too
        ['mainPageAnimalContent1', 'Currently', 'Momentan sind'],
        ['mainPageAnimalContent2', 'animals can be found at our partner shelters, including dogs, cats and other animals. Our goal is to keep each of them healthy and happy until they find a loving owner.', 'Tiere in unseren Partnertierheimen, wie zum Beispiel Hunde, Katzen, und andere Arten. Unser ziel ist das alle Tiere Gesund und Glücklich sind bis sie einen liebevollen Besitzer finden.'],
        ['mainPageShelterContent1', 'Our', 'Unsere Partnertierheime haben'],
        ['mainPageShelterContent2', ' partner shelters have locations where they provide abandoned animals with the right environment until they find a new home.', 'Standorte, wo sie den verlassenen Tieren passenden Unterschlupf bieten, bis sie ein neues Zuhause finden.'],
        ['mainPageEmployeeContent1', 'Our ', 'Unsere '],
        ['mainPageEmployeeContent2', 'dedicated staff works to provide the best possible environment for the animals and help them in the adoption process.', 'engagierte Angestellte arbeiten fleißsig, um den Tieren das best mögliche Umfeld zu bieten, und ihnen das Adoptionsverfahren zu vereinfachen.'],
        ['hamburgerLoginButton', 'Login', 'Anmelden'],
        ['normalLoginButton', 'Login', 'Anmelden'],
        ['loginWindowLoginText', 'Login', 'Anmelden'],
        ['loginWindowPasswordText', 'Password', 'Passwort'],
        ['loginButton', 'Login', 'Anmelden'],
        ['loginWindowNoAccountText', 'No account yet? <a class="loginCreateOne" onclick="switchToRegister()">Create one!</a>', 'Noch kein account? <a class="loginCreateOne" onclick="switchToRegister()">Erstellen Sie einen!</a>'],
        ['registerWindowRegisterText', 'Registration', 'Registrieren'],
        ['registerWindowPasswordText', 'Password', 'Passwort'],
        ['registerWindowNameText', 'Name', 'Name'],
        ['registerWindowPhoneNumberText', 'Phone number', 'Telefonnummer'],
        ['registerWindowCityText', 'City', 'Stadt'],
        ['registerWindowStreetText', 'Street', 'Straße'],
        ['registerWindowHouseNumberText', 'House no.', 'Hausnr.'],
        ['registerWindowNotificationText', 'Would you like to receive an e-mail when an animal matching your preferences comes to the shelter?', 'Möchten sie eine e-mail erhalten wenn ein Tier mit Ihren Präferenzen in ein Tierheim kommt?'],
        ['registerWindowHabitatText', 'Which habitats could you provide for your adopted animal?', 'Welche lebensräume könnten Sie für ein adoptiertes Tier bieten?'],
        ['registerButton', 'Register', 'Registrieren'],
        ['registerAlreadyHasAnAccount', 'Already has an accout? <a class="loginCreateOne" onclick="switchToLogin()">Log in!</a>', 'Haben Sie schon einen Account? <a class="loginCreateOne" onclick="switchToLogin()">Melden Sie sich an!</a>'],
        ['profileTitle', 'Profile data', 'Profildaten'],
        ['profileAdminPassword', 'Password', 'Passwort'],
        ['profileAdminName', 'Name', 'Name'],
        ['profileEmployeePassword', 'Password', 'Passwort'],
        ['profileEmployeeName', 'Name', 'Name'],
        ['profileUserPassword', 'Password', 'Passwort'],
        ['profileUserName', 'Name', 'Name'],
        ['profileUserTelephoneNumber', 'Telephone number', 'Telefonnummer'],
        ['profileUserCity', 'City', 'Stadt'],
        ['profileUserStreet', 'Street', 'Straße'],
        ['profileUserHouseNumber', 'House no.', 'Hausnr.'],
        ['profileUserNotification', 'Would you like to receive an e-mail when an animal matching your preferences comes to the shelter?', 'Möchten sie eine e-mail erhalten wenn ein Tier mit Ihren Präferenzen in ein Tierheim kommt?'],
        ['profileUserHabitat', 'Which habitats could you provide for your adopted animal?', 'Welche lebensräume könnten Sie für ein adoptiertes Tier bieten?'],
        ['userProfileDeleteButton', 'Delete Account', 'Account löschen'],
        ['userProfileModifyButton', 'Save modifications', 'Änderungen speichern'],
        ['cardManageEmployee', 'Manage employees', 'Angestellte verwalten'],
        ['cardManageUsers', 'Manage users', 'Nutzer verwalten'],
        ['cardManageShelters', 'Manage shelters', 'Tierheime verwalten'],
        ['cardNewAnimal', 'Add new animal', 'Neues Tier hinzufügen'],
        ['cardAdoptions', 'Adoptions', 'Adoptionen'],
        ['manageEmployeeTitle', 'Table of employees', 'Angestellte'],
        ['manageEmployeeName', 'Name', 'Name'],
        ['manageEmployeeShelterID', 'Shelter ID', 'Tierheim ID'],
        ['manageUsersTitle', 'Table of users', 'Nutzer'],
        ['manageUsersName', 'Name', 'Name'],
        ['manageSheltersTitle', 'Table of shelters', 'Tierheime'],
        ['manageSheltersName', 'Name', 'Name'],
        ['manageSheltersNewShelterButton', 'New shelter', 'Neues Tierheim'],
        ['modifyShelterTitle', 'Shelter data', 'Tierheim Daten'],
        ['modifyShelterNameP', 'Name', 'Name'],
        ['modifyShelterCityP', 'City', 'Stadt'],
        ['modifyShelterStreetP', 'Street', 'Straße'],
        ['modifyShelterHouseNumberP', 'House number', 'Hausnummer'],
        ['modifyShelterTelephoneP', 'Telephone number', 'Telefonnummer'],
        ['discardShelterModificationsButton', 'Discard modifications', 'Änderungen verwerfen'],
        ['modifyShelterButton', 'Save modifications', 'Änderungen speichern'],
        ['discardNewShelterButton', 'Discard new shelter', 'Verwerfen'],
        ['addShelterButton', 'Add new shelter', 'Hinzufügen'],
        ['animalModifyImage', 'Modify image!', 'Bild ändern!'],
        ['cutenessText', 'Cuteness', 'Niedlichkeit'],
        ['childFriendlynessText', 'Child friendlyness', 'Kinderfreundlich'],
        ['sociabilityText', 'Sociability', 'Geselligkiet'],
        ['exerciseNeedText', 'Exercise need', 'Bewegungsbedarf'],
        ['furLengthText', 'Fur length', 'Felllänge'],
        ['docilityText', 'Docility', 'Lernfähigkeit'],
        ['healthyText', 'Healthy', 'Gesund'],
        ['neuteredText', 'Neutered', 'Kastriert'],
        ['housebrokenText', 'Housebroken', 'Stubenrein'],
        ['createDiscardAnimal', 'Discard animal!', 'Tier verwerfen'],
        ['createAddAnimal', 'Add animal!', 'Tier hinzufügen'],
        ['noAdoptions', 'There are currently no pending adoptions!', 'Es gibt momentan keine ausstehenden Adoptionen!'],
        ['deleteText', 'Animal deletion', 'Tier Löschung'],
        ['deleteText1', 'Are you sure you want to delete the selected animal?', 'sind sie sicher, dass Sie dieses Tier löschen möchten?'],
        ['deleteText2', 'This operation <b>cannot be reversed</b>!', 'Diese Aktion <b>kann nicht rückgängig gemacht werden!</b>'],
        ['deleteButtonNo', 'No', 'Nein'],
        ['deleteButtonYes', 'Yes', 'Ja'],
        ['editDiscardModifications', 'Discard modifications!', 'Änderungen verwerfen!'],
        ['editSaveModifications', 'Save modifications!', 'Änderungen speichern!'],
        ['filterAnimalsPerPageDropdownText1', 'Listing:', ''],
        ['filterAnimalsPerPageDropdownText2', 'animals', 'Tiere pro Seite'],
        ['filterFilterText', 'Filter', 'Filter'],
        ['preferencesText', 'Preferences', 'Präferenzen'],
        ['filterButton', 'Filter!', 'Filtern!'],
        ['filterGender', 'Gender', 'Geschlecht'],
        ['filterNeutered', 'Neutered', 'Kastriert'],
        ['filterHouseBroken', 'Housebroken', 'Stubenrein'],
        ['filterFavourite', 'Is favourite', 'Ist Favorit'],
        ['filterSpecies', 'Species', 'Art'],
        ['filterBreed', 'Breed', 'Rasse'],
        ['filterShelterLocation', 'Shelter', 'Tierheim'],
        ['filterAnimalHabitat', 'Animal habitat', 'Lebensraum'],
        ['preferencesValueText', 'Value', 'Wert'],
        ['preferencesWeightText', 'Weight', 'Gewicht'],
        ['preferencesAge', 'Age', 'Alter'],
        ['preferenceWeight', 'Weight', 'Gewicht'],
        ['preferenceCuteness', 'Cuteness', 'Niedlichkeit'],
        ['preferencechildFriendlyness', 'Child friendly', 'Kinderfreundlich'],
        ['preferenceSociability', 'Sociability', 'Geselligkiet'],
        ['preferenceexerciseNeed', 'Need to move', 'Bewegungsbedarf'],
        ['preferencefurLength', 'Hair length', 'Felllänge'],
        ['preferenceDocility', 'Docility', 'Lernfähigkeit'],
        ['animalHabitatTitle', 'Animal habitats', 'Lebensräume'],
        ['animalVaccineTitle', 'Animal vaccines', 'Impfungen']
    ]

    // Check if a language is set in localStorage
    if (localStorage.getItem('language')) {
        // Loop through each translation and update the HTML content based on the language selected
        for (let i = 0; i < translate.length; i++) {
            // Set the innerHTML of the element to the corresponding translation based on the selected language
            if(document.getElementById(translate[i][0])) document.getElementById(translate[i][0]).innerHTML = translate[i][localStorage.getItem('language') == "deutsch" ? 2 : 1];
        }
    }

    // Array for translating placeholder text of input fields
    var translatePlaceHolder = [
        ['inputAnimalName', 'Name', 'Name'],
        ['inputWeight', 'Weight (kg)', 'Gewicht'],
        ['searchByName', 'Search by name...', 'Suche namen...'],
    ];

    // Update placeholders for input fields based on the selected language
    if (localStorage.getItem('language')) {
        for (let i = 0; i < translatePlaceHolder.length; i++) {
            if(document.getElementById(translatePlaceHolder[i][0])) document.getElementById(translatePlaceHolder[i][0]).placeholder = translatePlaceHolder[i][localStorage.getItem('language') == "deutsch" ? 2 : 1];
        }
    }

    // Array for translating select options
    var translateSelect = [
        ['species', 'Species', 'Art'],
        ['breed', 'Breed', 'Rasse'],
        ['location', 'Location', 'Ort'],
        ['habitat', 'Habitat', 'Lebensraum'],
        ['vaccine', 'Vaccine', 'Impfung'],
        ['habitatUserData', 'Habitat', 'Lebensraum'],
        ['habitatRegister', 'Habitat', 'Lebensraum'],
        ['habitatFilter', 'Habitat', 'Lebensraum']
    ];

    // Update the select options based on the selected language
    if (localStorage.getItem('language')) {
        for (let i = 0; i < translateSelect.length; i++) {
            if(document.getElementById(translateSelect[i][0])) document.getElementById(translateSelect[i][0]).innerHTML = translateSelect[i][localStorage.getItem('language') == "deutsch" ? 2 : 1];
        }
    }
}

// Function to switch the language to English
function setToEnglish() {
    if (!localStorage.getItem('language') || localStorage.getItem('language') == "deutsch") { localStorage.setItem('language','english'); location.reload(); } //Setting the language to english in localStorage, and refreshing
}

// Function to switch the language to German
function setToDeutsch() {
    if (!localStorage.getItem('language') || localStorage.getItem('language') == "english") { localStorage.setItem('language','deutsch'); location.reload(); } //Setting the language to german in localStorage, and refreshing
}

// Function to unset the language and revert to the default
function unsetLanguage() {
    if (localStorage.getItem('language') == "english" || localStorage.getItem('language') == "deutsch") { localStorage.removeItem('language'); location.reload(); } //Unsetting the language in localStorage, and refreshing
}

function pickTranslation(hungarian, english, deutsch){
    let language = localStorage.getItem('language')
    let result = language == null ? hungarian : language == "deutsch" ? deutsch : english;
    return result;
}