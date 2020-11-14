// $(document).ready(function () {

    //Triposo Api search by city
    var triposoLocation = "Mississauga";
    var triposoUrl = "https://www.triposo.com/api/20201111/poi.json?location_id="+ triposoLocation + "&count=10&fields=id,name,score,snippet,location_id,tag_labels&order_by=-score&account=98JDSPD1&token=60v4hgiq3zyo304rc0p3kfkh19zd224l"
    console.log(triposoUrl);
    fetch(triposoUrl)
        .then (function (response) {
            return response.json();
        })
        .then (function (data) {
            console.log(data);
            var name;
            var score = 9.6715;
            var scoreRounded = Math.round(score * 10) /10;
        })
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

// recipeButton.addEventListener("click", function() {
//     infoModal.classList.add("is-active");
// })

// infoModalBg.addEventListener("click", function() {
//     infoModal.classList.remove("is-active");
// })

// infoModalCloseButton.addEventListener("click", function() {
//     infoModal.classList.remove("is-active");
// })
// });

