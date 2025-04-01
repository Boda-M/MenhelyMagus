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
    <link rel="stylesheet" href="CSS/userProfile.css">
    <link rel="stylesheet" href="CSS/manageShelters.css">
    <link rel="stylesheet" href="CSS/modifyShelter.css">
    <link rel="stylesheet" href="CSS/popupMessage.css">
    <link rel="icon" type="image/x-icon" href="IMG/Header/logo.png">
    <script src="JS/hamburgerMenu.JS"></script>
    <script src="JS/headerHome.JS"></script>
    <script src="JS/topButton.JS"></script>
    <script src="JS/backgroundPlacer.JS"></script>
    <script src="JS/loginRegister.JS"></script>
    <script src="JS/getData.JS"></script>
    <script src="JS/setData.JS"></script>
    <script src="JS/select.JS"></script>
    <script src="JS/slider.JS"></script>
    <script src="JS/favourite.JS"></script>
    <script src="JS/userProfile.JS"></script>
    <script src="JS/modifyShelter.JS"></script>
    <script src="JS/translate.JS"></script>
    <script src="JS/popupMessage.JS"></script>
    <script src="JS/darkModeToggle.JS"></script>
</head>
<body onresize="sizeCheck();resizePaws();resizeOnWidthChange();closeSelectOnResize()" onscroll="scrollCheckTopButton()" onload="placePaws(); setHeader(); setRegisterHabitat(); setUserDataHabitat();  privilegeChecker(); setShelters(); translate()">

<?php
    include('header.php');
    include('misc.php');
    include('userProfile.php');
    include('modifyShelter.php');
    include('popupMessage.php');
?>

<h1 class="tableTitle" id="manageSheltersTitle">Menhelyek táblázata</h1>
<div id="tableWrapper">
    <div class="tableSpaceFiller"></div>
    <table id="sheltersTable">
        <tr>
            <th>ID</th>
            <th id="manageSheltersName">Név</th>
            <th colspan="2"></th>
        </tr>
    </table>
</div>

<div class="addShelterDiv">
    <button class="fancyButton addShelterButton" onclick="modifyShelterPopup(-1);" id="manageSheltersNewShelterButton">Új menhely</button>
</div>

<?php
    include('footer.php');
?>

</body>
</html>