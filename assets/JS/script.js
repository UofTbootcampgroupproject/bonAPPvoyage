
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

    // QuerySelectors for HTML Elements
    var recipeButton = document.querySelector("#recipe-id");
    var viewRecipeButton = document.querySelector("#view-recipe-button");
    var instModalBg = document.querySelector("#inst-modal-background");
    var infoModalBg = document.querySelector("#info-modal-background");
    var recipeInstModalBg = document.querySelector("#recipe-inst-modal-background");
    var instModal = document.querySelector("#inst-modal");
    var infoModal = document.querySelector("#info-modal");
    var recipeInfoModal = document.querySelector("#recipe-info-modal");
    var instModalCloseButton = document.querySelector("#inst-modal-close-button");
    var infoModalCloseButton = document.querySelector("#info-modal-close-button");
    var recipeInstModalCloseButton = document.querySelector("#recipe-inst-modal-close-button");
    var fullRecipeButton = document.querySelector("#full-recipe-button");
    var fullRecipeUrl; // need to get this info from chosen data
    var mealTypeInput = document.querySelector("#meal-type");
    var cookTimeInput = document.querySelector("#cook-time");
    var searchButton = document.querySelector("#searchBtn");


    /* If there is not a value saved on pageVisited (local storage) */
    if (localStorage.getItem("pageVisited") === null) {
        instModal.classList.add("is-active");  // Disable inst modal
    }

    function getRecipe(cuisine) {

        // var apiKey = "e2866768e0cb46598bbca075bc0a04ff";    // Manuel api Key
        var apiKey = "e9e71129ef994529977055667914d612";    // Michael api Key
        var type = mealTypeInput.value;      // Here we check the value from the dropdown
        var time = cookTimeInput.value;      // Here we check the value from the dropdown

        // If the User selects any type
        if (type === "Any") {
            var mealType = "";      // Enter an empty string as the parameter to urlRequest
        }
        else {
            var mealType = "&type=" + type;     // Enter selection as the parameter to urlRequest
        }
        // If the User selects any time
        if (time === "Any") {
            var maxReadyTime = "";  // Enter an empty string as the parameter to urlRequest
        }
        else {
            var maxReadyTime = "&maxReadyTime=" + time;     // Enter selection as the parameter to urlRequest
        }

        // https://api.spoonacular.com/recipes/complexSearch?apiKey=e2866768e0cb46598bbca075bc0a04ff&number=1&addRecipeInformation=true&cuisine=Italian&type=main%20course&maxReadyTime=20&ignorePantry=true&instructionsRequired=true&fillIngredients=true
        var urlRequest = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&number=1" + "&addRecipeInformation=true" + "&cuisine=" + cuisine + mealType + maxReadyTime + "&ignorePantry=true" + "&instructionsRequired=true" + "&fillIngredients=true";

        // This fetch is to get the recipe id, image, list of missed ingredients, name. Parameter: max 6 recipe, use most of ingredients provided and ignore pantry items. 
        fetch(urlRequest)
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                console.log(data);
                var recipeTitle;
                var recipeImage; // Recipe Image URL Src
                var recipeUrl;
                var vegetarian;
                var vegan;
                var glutenFree;
                var dairyFree;
                var recipeSteps = [];


                var ingredientsNeeded = [];

                for (var counter = 0; counter < data.results.length; counter++) {
                    recipeTitle = data.results[counter].title;
                    recipeImage = data.results[counter].image; // Recipe Image URL Src
                    recipeUrl = data.results[counter].sourceUrl; // Recipe Image URL Src

                    vegetarian = data.results[counter].vegetarian;
                    vegan = data.results[counter].vegan;
                    glutenFree = data.results[counter].glutenFree;
                    dairyFree = data.results[counter].dairyFree;
                    ingredientsNeeded = [];

                    // Loop through Recipe and storage each stepSteps into recipeSteps list
                    for (var count = 0; count < data.results[counter].analyzedInstructions[0].steps.length; count++) {
                        recipeSteps.push(data.results[counter].analyzedInstructions[0].steps[count].step);
                    }
                    // Loop through missedIngredients array on each recipe and storage each ingredients in ingredientsNeeded list
                    for (var ingredCount = 0; ingredCount < data.results[counter].missedIngredients.length; ingredCount++) {
                        ingredientsNeeded.push(data.results[counter].missedIngredients[ingredCount].name);
                    }


// infoModalCloseButton.addEventListener("click", function() {
//     infoModal.classList.remove("is-active");
// })


                    // console.log(data);
                    console.log("--------------")
                    console.log(recipeTitle);
                    console.log(recipeImage);
                    console.log(recipeUrl);
                    console.log("Vegetarian: " + vegetarian + ", Vegan: " + vegan + ", GlutenFree: " + glutenFree + ", DairyFree: " + dairyFree);
                    console.log("This are the steps: " + recipeSteps);
                    console.log("Ingredients Needed: " + ingredientsNeeded);
                }
            })
    }

    // List to Cuisine / Cities
    var listCuisineAndCity = [
        { cuisine: "African", city: "Cape_Town", },
        { cuisine: "American", city: "New_York_City", },
        { cuisine: "British", city:"London", },
        { cuisine: "Cajun", city:"New_Orleans", },
        { cuisine: "Caribbean", city: "Montego_Bay",},
        { cuisine: "Chinese", city: "Guangzhou", },
        { cuisine: "Eastern European", city: "Paris", },
        { cuisine: "European", city: "Paris", },
        { cuisine: "French", city: "Paris", },
        { cuisine: "German", city: "Berlin", },
        { cuisine: "Greek", city: "Athens" },
        { cuisine: "Indian", city: "New_Delhi", },
        { cuisine: "Irish", city: "Dublin", },
        { cuisine: "Italian", city: "Rome", },
        { cuisine: "Japanese", city: "Tokyo", },
        { cuisine: "Jewish", city: "Israel", },
        { cuisine: "Korean", city: "Seoul", },
        { cuisine: "Latin American", city: "Bogota", },
        { cuisine: "Mediterranean", city: "Istanbul", },
        { cuisine: "Mexican", city: "Mexico", },
        { cuisine: "Middle Eastern", city: "Cairo", },
        { cuisine: "Nordic", city: "Oslo", },
        { cuisine: "Southern", city: "Houston", },
        { cuisine: "Spanish", city: "Madrid", },
        { cuisine: "Thai", city: "Bangkok", },
        { cuisine: "Vietnamese", city: "Hanoi", }
    ]

    //Starting fetch request for spoonacular Api

    // This function selects randomly 6 objects from listCuisineAndCity and call getRecipe function
    function getRandomCuisineAndCity() {

        var listOfSelectedObjs = [];    // List of selected objects
        var numberOfRecipe = 6;
        while (numberOfRecipe > 0) {
            var randomIndex = Math.floor(Math.random() * listCuisineAndCity.length)
            if (listOfSelectedObjs.indexOf(listCuisineAndCity[randomIndex]) === -1) {
                listOfSelectedObjs.push(listCuisineAndCity[randomIndex]);
                // or call getRecipe ()
                getRecipe(listCuisineAndCity[randomIndex].cuisine);
                numberOfRecipe--;
            }
        }
            console.log(listOfSelectedObjs);
            var location = [];
            location.push(listOfSelectedObjs[0]["city"], listOfSelectedObjs[1]["city"], listOfSelectedObjs[2]["city"], listOfSelectedObjs[3]["city"], listOfSelectedObjs[4]["city"], listOfSelectedObjs[5]["city"]);
            console.log(location);
        
        //Starting fetch request for triposo
        // using a for each loop start a function for each city inside the listofselectedobjects
            for (i=0; i<location.length; i++) {
                var poiSectionEl = document.querySelector("#poisection");
                var poiDivEl = document.querySelector("#poidiv");
                var poiH3El = document.createElement("h3");
                poiDivEl.setAttribute("class", "is-size-5");
                poiDivEl.setAttribute("id", "poidiv");
                poiH3El.innerHTML = "These are the top 3 points of interest in " + location[i];
                poiDivEl.append(poiH3El);
                    
                    $(poiH3El).each(function () {
                        var triposoId = "98JDSPD1";
                        var triposoApiKey = "opge12o7zdr1npc4primk2yaxn3omhxa";
                        var triposoUrl = "https://www.triposo.com/api/20201111/poi.json?location_id=" + location[i] + "&account=" + triposoId + "&token=" + triposoApiKey + "&count=4&fields=id,name,score,snippet,location_id,tag_labels&order_by=-score";
                            fetch(triposoUrl)
                                .then(function (response) {
                                    console.log("Triposo has a " + response);
                                    return response.json();
                                })
                                .then(function (data) {
                                    console.log(data);
                                    console.log(data.results.name);
                                    for (j=0;j<3;j++); {
                                        var liEl = document.createElement("li");
                                        var poiP = document.createElement("p");
                                        var ratingRounded = Math.round(data.results[j].score * 10) / 10;
                                        liEl.textContent = data.results[j].name;
                                        poiP.innerHTML = ("description: " + data.results[j].snippet + "<br>" + "rating: " + ratingRounded + "/10");
                                        poiH3El.append(liEl, poiP);
                                    }
                                })   
                })  
            }
        }
    getRandomCuisineAndCity();


        // Search Button Event Listening
    searchButton.addEventListener("click", function () {
        getRandomCuisineAndCity();
    })

    // Modal Events Listening
    instModalBg.addEventListener("click", function () {
        instModal.classList.remove("is-active");
        /* Save true value when user close the inst modal to pageVisited (the local storage) */
        localStorage.setItem("pageVisited", JSON.stringify("true"));
    })
    instModalCloseButton.addEventListener("click", function () {
        instModal.classList.remove("is-active");
        /* Save true value when user close the inst modal to pageVisited (the local storage) */
        localStorage.setItem("pageVisited", JSON.stringify("true"));
    })
    recipeButton.addEventListener("click", function () {
        infoModal.classList.add("is-active");
    })
    viewRecipeButton.addEventListener("click", function () {
        infoModal.classList.remove("is-active");
        recipeInfoModal.classList.add("is-active");
    })
    recipeInstModalCloseButton.addEventListener("click", function () {
        recipeInfoModal.classList.remove("is-active");
    })
    fullRecipeButton.addEventListener("click", function () {
        window.open(fullRecipeUrl); // need to get this info from data
    })
    infoModalBg.addEventListener("click", function () {
        infoModal.classList.remove("is-active");
    })
    infoModalCloseButton.addEventListener("click", function () {
        infoModal.classList.remove("is-active");
    })
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

