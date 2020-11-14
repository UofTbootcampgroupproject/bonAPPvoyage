$(document).ready(function () {
    // Modal Events
// var recipeButton = document.querySelector("#recipe");
var instModalBg = document.querySelector("#inst-modal-background");
var infoModalBg = document.querySelector("#info-modal-background");
var instModal = document.querySelector("#inst-modal");
var infoModal = document.querySelector("#info-modal");
var instModalCloseButton = document.querySelector("#inst-modal-close-button");
var infoModalCloseButton = document.querySelector("#info-modal-close-button");

instModalBg.addEventListener("click", function() {
    instModal.classList.remove("is-active");
})

instModalCloseButton.addEventListener("click", function() {
    instModal.classList.remove("is-active");
})
    //Starting fetch request for spoonacular Api


    //Starting fetch request for triposo
var location = "Toronto"; //Placeholder this will change based on the cuisine.
var triposoId = "98JDSPD1";
var triposoApiKey = "opge12o7zdr1npc4primk2yaxn3omhxa";
var triposoUrl = "https://www.triposo.com/api/20201111/poi.json?location_id="+ location + "&account="+ triposoId +"&token="+ triposoApiKey +"&count=4&fields=id,name,score,snippet,location_id,tag_labels&order_by=-score";
fetch(triposoUrl)
    .then(function(response) {
        console.log("Triposo has a "+response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        return data;
    })


// recipeButton.addEventListener("click", function() {
//     infoModal.classList.add("is-active");
// })

// infoModalBg.addEventListener("click", function() {
//     infoModal.classList.remove("is-active");
// })

// infoModalCloseButton.addEventListener("click", function() {
//     infoModal.classList.remove("is-active");
// })
});