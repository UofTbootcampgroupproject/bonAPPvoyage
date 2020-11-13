


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