<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MenhelyMágus</title>
    <link rel="stylesheet" href="CSS/style.css">
    <link rel="stylesheet" href="CSS/select.css">
    <link rel="stylesheet" href="CSS/headerStyle.css">
    <link rel="stylesheet" href="CSS/footerStyle.css">
    <link rel="stylesheet" href="CSS/loginRegisterStyle.css">
    <link rel="stylesheet" href="CSS/animalPage.css">
    <link rel="stylesheet" href="CSS/slider.css">
    <link rel="stylesheet" href="CSS/delete.css">
    <link rel="stylesheet" href="CSS/edit.css">
    <link rel="stylesheet" href="CSS/createEdit.css">
    <link rel="stylesheet" href="CSS/userProfile.css">
    <link rel="stylesheet" href="CSS/animals.css">
    <link rel="stylesheet" href="CSS/popupMessage.css">
    <link rel="icon" type="image/x-icon" href="IMG/Header/logo.png">
    <script src="JS/hamburgerMenu.JS"></script>
    <script src="JS/headerHome.JS"></script>
    <script src="JS/topButton.JS"></script>
    <script src="JS/backgroundPlacer.JS"></script>
    <script src="JS/loginRegister.JS"></script>
    <script src="JS/slider.JS"></script>
    <script src="JS/edit.JS"></script>
    <script src="JS/getData.JS"></script>
    <script src="JS/setData.JS"></script>
    <script src="JS/select.JS"></script>
    <script src="JS/create.JS"></script>
    <script src="JS/userProfile.JS"></script>
    <script src="JS/translate.JS"></script>
    <script src="JS/popupMessage.JS"></script>
    <script src="JS/darkModeToggle.JS"></script>
</head>
<body onresize="sizeCheck();resizePaws();resizeOnWidthChange();closeSelectOnResize()" onscroll="scrollCheckTopButton()" onload="placePaws(); checkBoxFixer(); setHeader(); displayWithBreaks(); fillInDate(); setSpecies(); setLocation(); setHabitat(); setRegisterHabitat(); setUserDataHabitat(); privilegeChecker(); translate(); setCreateButtons()">
    
    <?php
        include('header.php');
        include('misc.php');
        include('delete.php');
        include('userProfile.php');
        include('popupMessage.php');
    ?>

    <div class="animalContainer">
        <div class="animalContainerLeft">
            <div class="animalImgContainer">
                <img src="IMG/imageIcon.png" class="animalContainerIMG" id="animalContainerIMG" alt="A picture of the animal">
                <div class="editHoverDiv" onclick="imageEdit()">
                    <img src="IMG/imageIcon.png" alt="Edit Icon">
                    <p id="animalModifyImage">Kép módosítása!</p>
                </div>
            </div>
            <div class="animalInfos">
                <div class="animalInfosSecondContainer">
                    <div class="animalName">
                        <input type="text" placeholder="Név" class="inputAnimalName" id="inputAnimalName">
                        <img src="IMG/male.png" alt="Male icon" class="animalGenderImage selectedGender genderMale" onclick="switchGender('m')" id="genderM">
                        <img src="IMG/female.png" alt="Female icon" class="animalGenderImage genderFemale" onclick="switchGender('f')" id="genderF">
                        <img src="IMG/questionMark.png" alt="Unknown gender icon" class="animalGenderImage genderUnknown" onclick="switchGender('u')" id="genderU">
                    </div>
                    <div class="speciesDiv">
                        <img src="IMG/breedIcon.png" alt="Breed icon">
                        <div class="select">
                            <div class="selectTitle placeholder" id="species" data-enabled="true" data-type="species" data-select-type="single" data-show-type="showselected" onclick="selectDropdown(this);">
                                Faj
                            </div>
                            <div class="selectContent">

                            </div>
                        </div>
                    </div>
                    <div class="breedsDiv">
                        <img src="IMG/breedIcon.png" alt="Breed icon">
                        <div class="select">
                            <div class="selectTitle placeholder" id="breed" data-enabled="false" data-type="breed" data-show-type="shownumber" onclick="selectDropdown(this);">
                                Fajta
                            </div>
                            <div class="selectContent">
                                
                            </div>
                        </div>
                    </div>
                    <br><br>
                    <br>
                    <div class="birthdayDiv"><img src="IMG/birthdaycake.png" alt="Birthday cake icon"><input type="date" class ="inputBirthday" id ="inputBirthday" min="1960-01-01" max="<?php echo date("Y-m-d"); ?>"></div>
                    <div class="mmDiv"><img src="IMG/Header/logo.png" alt="MenhelyMágus logo"><input type="date" class ="inputBirthday" id ="inputShelterDate" min="1960-01-01" max="<?php echo date("Y-m-d"); ?>"></div>
                    <br><br>
                    <div class="locationDiv">
                        <img src="IMG/location.png" class="pushDownLocationImage" alt="Location icon">
                        <div class="select">
                            <div class="selectTitle placeholder" id="location" data-enabled="true" data-type="location" data-select-type="single" data-show-type="showcity" onclick="selectDropdown(this);">
                                Menh. Hely.
                            </div>
                            <div class="selectContent">

                            </div>
                        </div>
                    </div>
                    <div class="weightDiv pushDownWeightDiv"><img src="IMG/weightIcon.png" alt="Weight icon"><input type="number" placeholder="Súly (kg)" oninput="limitInputLength(this); weightInputChanged()" class ="inputWeight" id ="inputWeight"><div class="kg" id="input_kg">kg</div></div>
                    <br><br>
                    <div class="habitatDiv">
                        <img src="IMG/habitatIcon.png" class="pushDownLocationImage" alt="Habitat icon">
                        <div class="select">
                            <div class="selectTitle placeholder" id="habitat" data-enabled="true" data-type="habitat" data-show-type="shownumber" onclick="selectDropdown(this);">
                                Élőhely
                            </div>
                            <div class="selectContent">

                            </div>
                        </div>
                    </div>
                    <div class="vaccineDiv">
                        <img src="IMG/vaccineIcon.png" class="pushDownLocationImage" alt="Vaccine icon">
                        <div class="select">
                            <div class="selectTitle placeholder" id="vaccine" data-enabled="true" data-type="vaccine" data-show-type="shownumber" onclick="selectDropdown(this);">
                                Oltás
                            </div>
                            <div class="selectContent">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="animalContainerRight">
            <div class="sliders">
                <div class="sliderDiv">
                    <p id="cutenessText">Cukiság</p>
                    <input type="range" value="5" min="0" max="10" id="sliderCuteness">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderDiv">
                    <p id="childFriendlynessText">Gyerekbarát</p>
                    <input type="range" value="5" min="0" max="10" id="sliderchildFriendlyness">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderDiv">
                    <p id="sociabilityText">Társaslény</p>
                    <input type="range" value="5" min="0" max="10" id="sliderSociability">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderDiv">
                    <p id="exerciseNeedText">Mozgásigény</p>
                    <input type="range" value="5" min="0" max="10" id="sliderexerciseNeed">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderDiv">
                    <p id="furLengthText">Szőrhossz</p>
                    <input type="range" value="5" min="0" max="10" id="sliderfurLength">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderDiv">
                    <p id="docilityText">Tanulékonyság</p>
                    <input type="range" value="5" min="0" max="10" id="sliderDocility">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderDiv">
                    <p class="checkboxAnimalText">
                    <span id="healthyText">Egészséges</span>
                    <input id="checkboxHealthy" type="checkbox">
                    <label class="checkboxAnimal" for="checkboxHealthy"></label>
                    </p>
                </div>
                <div class="sliderDiv">
                    <p class="checkboxAnimalText">
                    <span id="neuteredText">Ivartalanított</span>
                    <input id="checkboxNeutered" type="checkbox">
                    <label class="checkboxAnimal" for="checkboxNeutered"></label>
                    </p>
                </div>
                <div class="sliderDiv">
                    <p class="checkboxAnimalText">
                    <span id="housebrokenText">Szobatiszta</span>
                    <input id="checkboxHousebroken" type="checkbox">
                    <label class="checkboxAnimal" for="checkboxHousebroken"></label>
                    </p>
                </div>
                <textarea class="inputDescription" id="inputDescription" maxlength="2000"></textarea>
            </div>
        </div>
        <div class="modifyButton">
            <button class="fancyButton" id="createDiscardAnimal">Állat elvetése!</button>
            <button class="fancyButton" onclick="create();" id="createAddAnimal">Állat hozzáadása!</button>
        </div>
    </div>
    
    <?php
        include('footer.php');
    ?>

</body>
</html>