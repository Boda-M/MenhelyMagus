<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MenhelyMágus</title>
    <script src="JS/hamburgerMenu.JS"></script>
    <script src="JS/headerHome.JS"></script>
    <script src="JS/topButton.JS"></script>
    <script src="JS/backgroundPlacer.JS"></script>
    <script src="JS/loginRegister.JS"></script>
    <script src="JS/slider.JS"></script>
    <script src="JS/delete.JS"></script>
    <script src="JS/getData.JS"></script>
    <script src="JS/setData.JS"></script>
    <script src="JS/select.JS"></script>
    <script src="JS/habitat.JS"></script>
    <script src="JS/vaccine.JS"></script>
    <script src="JS/adopt.JS"></script>
    <script src="JS/userProfile.JS"></script>
    <script src="JS/translate.JS"></script>
    <script src="JS/animal.JS"></script>
    <script src="JS/popupMessage.JS"></script>
    <script src="JS/darkModeToggle.JS"></script>
    <link rel="stylesheet" href="CSS/style.css">
    <link rel="stylesheet" href="CSS/select.css">
    <link rel="stylesheet" href="CSS/headerStyle.css">
    <link rel="stylesheet" href="CSS/footerStyle.css">
    <link rel="stylesheet" href="CSS/loginRegisterStyle.css">
    <link rel="stylesheet" href="CSS/animalPage.css">
    <link rel="stylesheet" href="CSS/slider.css">
    <link rel="stylesheet" href="CSS/delete.css">
    <link rel="stylesheet" href="CSS/edit.css">
    <link rel="stylesheet" href="CSS/animal.css">
    <link rel="stylesheet" href="CSS/habitat.css">
    <link rel="stylesheet" href="CSS/vaccine.css">
    <link rel="stylesheet" href="CSS/userProfile.css">
    <link rel="stylesheet" href="CSS/animals.css">
    <link rel="stylesheet" href="CSS/popupMessage.css">
    <link rel="icon" type="image/x-icon" href="IMG/Header/logo.png">
</head>
<body onresize="sizeCheck();resizePaws();resizeOnWidthChange();closeSelectOnResize()" onscroll="scrollCheckTopButton()" onload="animalPageOnload(<?php echo $_GET['id'] ?>);">
    
    <?php
        include('header.php');
        include('misc.php');
        include('delete.php');
        include('habitat.php');
        include('vaccine.php');
        include('userProfile.php');
        include('popupMessage.php');
    ?>

    <div class="animalContainer">
        <div class="animalContainerLeft">
            <div class="animalImgContainer" id="animalImgContainer">

            </div>
            <div class="animalInfos">
                <div class="animalInfosSecondContainer" id="animalInfosSecondContainer">
                    
                </div>
            </div>
        </div>
        <div class="animalContainerRight">
            <div class="sliders">
                <div class="sliderDiv">
                    <p id="cutenessText">Cukiság</p>
                    <input type="range" value="0" min="0" max="10" disabled="true" id="sliderCuteness">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderDiv">
                    <p id="childFriendlynessText">Gyerekbarát</p>
                    <input type="range" value="0" min="0" max="10" disabled="true" id="sliderChildFriendlyness">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderDiv">
                    <p id="sociabilityText">Társaslény</p>
                    <input type="range" value="0" min="0" max="10" disabled="true" id="sliderSociability">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderDiv">
                    <p id="exerciseNeedText">Mozgásigény</p>
                    <input type="range" value="0" min="0" max="10" disabled="true" id="sliderExerciseNeed">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderDiv">
                    <p id="furLengthText">Szőrhossz</p>
                    <input type="range" value="0" min="0" max="10" disabled="true" id="sliderFurLength">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderDiv">
                    <p id="docilityText">Tanulékonyság</p>
                    <input type="range" value="0" min="0" max="10" disabled="true" id="sliderDocility">
                    <div class="rangeInfo">
                        <img src="IMG/rangeInfo.png" alt="Range Info icon">
                        <span></span>
                    </div>
                </div>
                <div class="sliderDiv">
                    <p class="checkboxAnimalText">
                    <span id="healthyText">Egészséges</span>
                    <input id="checkboxHealthy" type="checkbox" disabled="true" id="slider_healthy">
                    <label class="checkboxAnimal" for="checkboxHealthy"></label>
                    </p>
                </div>
                <div class="sliderDiv">
                    <p class="checkboxAnimalText">
                    <span id="neuteredText">Ivartalanított</span>
                    <input id="checkboxNeutered" type="checkbox" disabled="true">
                    <label class="checkboxAnimal" for="checkboxNeutered"></label>
                    </p>
                </div>
                <div class="sliderDiv">
                    <p class="checkboxAnimalText">
                    <span id="housebrokenText">Szobatiszta</span>
                    <input id="checkboxHousebroken" type="checkbox" disabled="true">
                    <label class="checkboxAnimal" for="checkboxHousebroken"></label>
                    </p>
                </div>
                <div class="animalDescription">
                    <p id="animalDescription">

                    </p>
                </div>
            </div>
        </div>
    </div>
    
    <?php
    include('footer.php');
    ?>

</body>
</html>