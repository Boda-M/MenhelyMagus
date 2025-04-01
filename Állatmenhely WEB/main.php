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
    <link rel="stylesheet" href="CSS/mainPage.css">
    <link rel="stylesheet" href="CSS/userProfile.css">
    <link rel="stylesheet" href="CSS/popupMessage.css">
    <link rel="icon" type="image/x-icon" href="IMG/Header/logo.png">
    <script src="JS/hamburgerMenu.JS"></script>
    <script src="JS/headerHome.JS"></script>
    <script src="JS/topButton.JS"></script>
    <script src="JS/backgroundPlacer.JS"></script>
    <script src="JS/getData.JS"></script>
    <script src="JS/setData.JS"></script>
    <script src="JS/loginRegister.JS"></script>
    <script src="JS/select.JS"></script>
    <script src="JS/userProfile.JS"></script>
    <script src="JS/translate.JS"></script>
    <script src="JS/mainPage.JS"></script>
    <script src="JS/popupMessage.JS"></script>
    <script src="JS/darkModeToggle.JS"></script>
</head>
<body onresize="sizeCheck();resizePaws();resizeOnWidthChange();closeSelectOnResize()" onscroll="scrollCheckTopButton()" onload="placePaws(); setHeader(); setRegisterHabitat(); setMainPageDatas(); setUserDataHabitat(); translate();">
    
    <?php
        include('header.php');
        include('misc.php');
        include('userProfile.php');
        include('popupMessage.php');
    ?>
    
    <div class="mainImage" id="mainImage">
        <div class="mainImageText">
            <h1>
                MenhelyMágus
            </h1>
        </div>
    </div>

    <main>
        <div class="mainPageContent">
            <div class="mainLeftColumn">
                <div class="mainPageContentTitle">
                    MenhelyMágus
                </div>
                <div class="mainPageContentText" id="mainPageContentText">
                A MenhelyMágus egy olyan platform, amely különböző menhelyek állatait gyűjti össze és jeleníti meg egy közös weboldalon. Így a felhasználók egyszerűen böngészhetnek és találhatnak sok-sok állatot egy helyen. Ezen kívül segítünk azoknak a menhelyeknek, akiknek még nincs saját weboldaluk, hogy állataik online is elérhetővé váljanak.
                </div>
            </div>
            <div class="mainRightColumn">
                <div class="mainSquare mainSquare1">
                    <img src="IMG/breedIcon.png" alt="Breed icon">
                    <div class="mainSquareTitle">
                    <span class="mainPageDataBreed"></span> <span id="mainPageSpeciesCount">faj</span>
                    </div>

                    <div class="mainSquareDesc">
                    <span id="mainPageSpeciesContent1">Partner menhelyeinken jelenleg</span> <span class="mainPageDataBreed"></span> <span id="mainPageSpeciesContent2"> különböző faj él, mindegyik saját igényeivel. Minden állatot gondosan kezelünk, hogy megtaláljuk számukra a legjobb otthont.</span>
                    </div>
                </div>
                <div class="mainSquare mainSquare2">
                    <img src="IMG/pawIcon.png" alt="Paw icon">
                    <div class="mainSquareTitle">
                        <span class="mainPageDataAnimals"></span> <span id="mainPageAnimalCount">állat</span>
                    </div>

                    <div class="mainSquareDesc">
                    <span id="mainPageAnimalContent1">Jelenleg</span> <span class="mainPageDataAnimals"></span> <span id="mainPageAnimalContent2"> állat található partner menhelyeinken, köztük kutyák, macskák és egyéb állatok. Célunk, hogy mindegyikük egészséges és boldog legyen, amíg szerető gazdára nem találnak.</span>
                    </div>
                </div>
                <div class="mainSquare mainSquare3">
                    <img src="IMG/Header/logo.png" alt="MenhelyMágus logo">
                    <div class="mainSquareTitle">
                        <span class="mainPageDataShelters"></span> <span id="mainPageShelterCount">menhely</span>
                    </div>

                    <div class="mainSquareDesc">
                    <span id="mainPageShelterContent1">Partner menhelyeink</span> <span class="mainPageDataShelters"></span> <span id="mainPageShelterContent2"> telephellyel rendelkeznek, ahol biztosítják az elhagyott állatok számára a megfelelő környezetet, amíg új otthont találnak.</span>
                    </div>
                </div>
                <div class="mainSquare mainSquare4">
                    <img src="IMG/userIcon.png" alt="User icon">
                    <div class="mainSquareTitle">
                        <span class="mainPageDataEmployees"></span> <span id="mainPageEmployeeCount">alkalmazott</span>
                    </div>

                    <div class="mainSquareDesc">
                    <span id="mainPageEmployeeContent1"></span><span class="mainPageDataEmployees"></span> <span id="mainPageEmployeeContent2"> elhivatott munkatársunk dolgozik azon, hogy a lehető legjobb környezetet biztosítsuk az állatoknak, és segítsük őket az örökbefogadás folyamatában.</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
    
    <?php
    include('footer.php');
    ?>

</body>
</html>