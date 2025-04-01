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
    <link rel="stylesheet" href="CSS/delete.css">
    <link rel="stylesheet" href="CSS/slider.css">
    <link rel="stylesheet" href="CSS/filter.css">
    <link rel="stylesheet" href="CSS/userProfile.css">
    <link rel="stylesheet" href="CSS/animals.css">
    <link rel="stylesheet" href="CSS/paginator.css">
    <link rel="stylesheet" href="CSS/popupMessage.css">
    <link rel="icon" type="image/x-icon" href="IMG/Header/logo.png">
    <script src="JS/hamburgerMenu.JS"></script>
    <script src="JS/headerHome.JS"></script>
    <script src="JS/topButton.JS"></script>
    <script src="JS/backgroundPlacer.JS"></script>
    <script src="JS/loginRegister.JS"></script>
    <script src="JS/animalAttributeSizer.JS"></script>
    <script src="JS/paginator.JS"></script>
    <script src="JS/delete.JS"></script>
    <script src="JS/filter.JS"></script>
    <script src="JS/getData.JS"></script>
    <script src="JS/setData.JS"></script>
    <script src="JS/select.JS"></script>
    <script src="JS/slider.JS"></script>
    <script src="JS/favourite.JS"></script>
    <script src="JS/userProfile.JS"></script>
    <script src="JS/translate.JS"></script>
    <script src="JS/animals.JS"></script>
    <script src="JS/popupMessage.JS"></script>
    <script src="JS/darkModeToggle.JS"></script>
</head>
<body onresize="sizeCheck();resizePaws();resizeOnWidthChange();closeSelectOnResize()" onscroll="scrollCheckTopButton()" onload="placePaws(); setHeader(); setAnimals(1, null, null, true); setSpecies(); setLocation(); setRegisterHabitat(); setPrefButton(); setPrefs(); setUserDataHabitat(); setFilterHabitat(); translate()">


    <?php
        include('header.php');
        include('misc.php');
        include('delete.php');
        include('filter.php');
        include('userProfile.php');
        include('popupMessage.php');
    ?>

    <div class="animalsDiv" id="animalsDiv">
        
    </div>


    </div>

    <div class="paginator">

        <div id="paginatorContent">
            
        </div>

    </div>

    <?php
    include('footer.php');
    ?>

</body>
</html>