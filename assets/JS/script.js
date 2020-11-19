
$(document).ready(function () {

    /* QuerySelectors for HTML Elements */
    /* Modals */
    var instModal = document.querySelector("#inst-modal");
    var infoModal = document.querySelector("#info-modal");
    var recipeInfoModal = document.querySelector("#recipe-info-modal");

    /* Close Buttons */
    var instModalCloseButton = document.querySelector("#inst-modal-close-button");
    var infoModalCloseButton = document.querySelector("#info-modal-close-button");
    var recipeInstModalCloseButton = document.querySelector("#recipe-inst-modal-close-button");

    /* Modals Background */
    var instModalBg = document.querySelector("#inst-modal-background");
    var infoModalBg = document.querySelector("#info-modal-background");
    var recipeInstModalBg = document.querySelector("#recipe-info-modal-background");

    /* Extra buttons */
    var viewRecipeButton = document.querySelector("#view-recipe-button");
    var fullRecipeButton = document.querySelector("#full-recipe-button");
    var searchButton = document.querySelector("#searchBtn");

    var instList = document.querySelector("#instructions-list");
    var mealTypeInput = document.querySelector("#meal-type");
    var cookTimeInput = document.querySelector("#cook-time");

    var fullRecipeUrl; // need to get this info from chosen data

    /* If there is not a value saved on pageVisited (local storage) */
    if (localStorage.getItem("pageVisited") === null) {
        instModal.classList.add("is-active");  // Disable inst modal
    }

    // This Function Create Recipe Div
    function createRecipeDiv(title, cuisine, image, foodTags, ingredients) {
        // Message Div element
        var messageDiv = $("<div>").addClass("message is-primary mx-3");
        console.log("The cuisine type is: ", cuisine);
        messageDiv.attr("id", cuisine);
        var messageHeader = $("<div>").addClass("message-header");
        var messageBody = $("<div>").addClass("message-body");

        // MessageHeader Div Elements
        var recipeTitle = $("<h2>").addClass("has-text-weight-bold is-size-4 is-italic");
        recipeTitle.text(title);
        var cuisineName = $("<h2>").addClass("has-text-weight-bold is-size-6 has-text-right");
        cuisineName.text(cuisine);

        // MessageBody Div Elements
        var colummsDiv = $("<div>").addClass("columns");

        // Elements Image column
        var imgDiv = $("<div>").addClass("column is-4-tablet");
        var figureDiv = $("<figure>").addClass("image is-128x128");
        var imgEl = $("<img>");
        imgEl.attr("src", image)
        figureDiv.append(imgEl);
        imgDiv.append(figureDiv);

        // Elements Food tags column
        var foodTagDiv = $("<div>").addClass("column is-4-tablet");

        // Vegetarian tag
        var vegetarianP = $("<p>").addClass("has-text-success has-text-weight-bold");
        vegetarianP.text("Vegetarian: ");
        var vegetarianSpan = $("<span>");
        vegetarianSpan.attr("id", "vegetarian");
        if (foodTags[0] === true) {
            vegetarianSpan.addClass("has-text-success");
            vegetarianSpan.text("YES");
        }
        else {
            vegetarianSpan.addClass("has-text-danger")
            vegetarianSpan.text("NO");
        }
        vegetarianP.append(vegetarianSpan);
        // Vegan tag
        var veganP = $("<p>").addClass("has-text-primary has-text-weight-bold");
        veganP.text("Vegan: ");
        var veganSpan = $("<span>");
        veganSpan.attr("id", "vegan");
        if (foodTags[1] === true) {
            veganSpan.addClass("has-text-success");
            veganSpan.text("YES");
        }
        else {
            veganSpan.addClass("has-text-danger")
            veganSpan.text("NO");
        }
        veganP.append(veganSpan);
        // Gluten Free tag
        var glutenFreeP = $("<p>").addClass("has-text-warning-dark has-text-weight-bold");
        glutenFreeP.text("Gluten Free: ");
        var glutenFreeSpan = $("<span>");
        glutenFreeSpan.attr("id", "glutenFree");
        if (foodTags[2] === true) {
            glutenFreeSpan.addClass("has-text-success");
            glutenFreeSpan.text("YES");
        }
        else {
            glutenFreeSpan.addClass("has-text-danger")
            glutenFreeSpan.text("NO");
        }
        glutenFreeP.append(glutenFreeSpan);
        // Dairy free tag
        var dairyP = $("<p>").addClass("has-text-info has-text-weight-bold");
        dairyP.text("Dairy Free: ");
        var dairySpan = $("<span>");
        dairySpan.attr("id", "dairyFree");
        if (foodTags[3] === true) {
            dairySpan.addClass("has-text-success");
            dairySpan.text("YES");
        }
        else {
            dairySpan.addClass("has-text-danger")
            dairySpan.text("NO");
        }
        dairyP.append(dairySpan);

        // Append foof tags to foodTagDiv
        foodTagDiv.append(vegetarianP);
        foodTagDiv.append(veganP);
        foodTagDiv.append(glutenFreeP);
        foodTagDiv.append(dairyP);

        // Elements Ingredients column
        var ingredientsDiv = $("<div>").addClass("column is-4-tablet");
        var ingredientsP = $("<p>").addClass("is-size-5 has-text-weight-bold");
        ingredientsP.text("Ingredients")
        var ulDiv = $("<ul>");
        ulDiv.attr("id", "ingredientsNeeded");

        $.each(ingredients, function (index) {
            ulDiv.append($("<li>").text(ingredients[index]));
        })

        // Appends html elements
        ingredientsDiv.append(ingredientsP);
        ingredientsDiv.append(ulDiv);
        messageHeader.append(recipeTitle);
        messageHeader.append(cuisineName);
        colummsDiv.append(imgDiv);
        colummsDiv.append(foodTagDiv);
        colummsDiv.append(ingredientsDiv);
        messageBody.append(colummsDiv);
        messageDiv.append(messageHeader);
        messageDiv.append(messageBody);
        $("#recipes-section").append(messageDiv);
    }

    // This Function Create a fetch request
    function getRecipe(cuisine, recipeCounter) {

        // var apiKey = "e2866768e0cb46598bbca075bc0a04ff";    // Manuel api Key
        // var apiKey = "e9e71129ef994529977055667914d612";    // Michael api Key
        // var apiKey = "f1665cf0e8db418b975517f3bf4ddf27"; //Jhonny api Key
        var apiKey = "92a55a776ce14c14af21d4ac3e27789c";    // Demo api Key

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

        var urlRequest = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&number=1" + "&addRecipeInformation=true" + "&cuisine=" + cuisine + mealType + maxReadyTime + "&ignorePantry=true" + "&instructionsRequired=true" + "&fillIngredients=true";

        // This fetch is to get the recipe id, image, list of missed ingredients, name. Parameter: max 6 recipe, use most of ingredients provided and ignore pantry items. 
        fetch(urlRequest)
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                var recipeTitle;        // Variable to storage Recipe Title
                var recipeImage;        // Variable to storage Image URL Src
                var recipeUrl;          // Variable to storage Recipe URL
                var vegetarian;         // Variable to storage Vegetarien condition
                var vegan;              // Variable to storage Vegan condition
                var glutenFree;         // Variable to storage Gluten condition
                var dairyFree;          // Variable to storage Dairy condition
                var recipeSteps = [];   // Variable to storage Recipe Steps

                var ingredientsNeeded = []; // Variable to storage Ingredients

                for (var counter = 0; counter < data.results.length; counter++) {
                    recipeTitle = data.results[counter].title;  // Recipe Title
                    recipeImage = data.results[counter].image; // Recipe Image URL Src
                    recipeUrl = data.results[counter].sourceUrl; // Recipe Image URL Src

                    vegetarian = data.results[counter].vegetarian;
                    vegan = data.results[counter].vegan;
                    glutenFree = data.results[counter].glutenFree;
                    dairyFree = data.results[counter].dairyFree;

                    // Loop through Recipe and storage each stepSteps into recipeSteps list
                    for (var count = 0; count < data.results[counter].analyzedInstructions[0].steps.length; count++) {
                        recipeSteps.push(data.results[counter].analyzedInstructions[0].steps[count].step);
                    }
                    
                    recipeSteps.push(recipeUrl);    // Add recipe url to the end of recipe steps

                    // Loop through missedIngredients array on each recipe and storage each ingredients in ingredientsNeeded list
                    for (var ingredCount = 0; ingredCount < data.results[counter].missedIngredients.length; ingredCount++) {
                        ingredientsNeeded.push(data.results[counter].missedIngredients[ingredCount].name);
                    }
                    // Pass recipe data and Call createRecipeDiv()
                    createRecipeDiv(recipeTitle, cuisine, recipeImage, [vegetarian, vegan, glutenFree, dairyFree], ingredientsNeeded);
                    /* Save each recipe steps and url on the local storage with recipe number as key name */
                    localStorage.setItem(cuisine, JSON.stringify(recipeSteps))
                }
            })
    }

    // List to Cuisine / Cities
    var listCuisineAndCity = [
        { cuisine: "African", city: "Cape_Town", country: "South Africa" },
        { cuisine: "American", city: "New_York_City", country: "USA" },
        { cuisine: "British", city: "London", country: "England" },
        { cuisine: "Cajun", city: "New_Orleans", country: "Lousiana" },
        { cuisine: "Caribbean", city: "Montego_Bay", country: "Jamaica" },
        { cuisine: "Chinese", city: "Guangzhou", country: "China" },
        { cuisine: "Eastern European", city: "Paris", country: "France" },
        { cuisine: "European", city: "Paris", country: "France" },
        { cuisine: "French", city: "Paris", country: "France" },
        { cuisine: "German", city: "Munich", country: "Germany" },
        { cuisine: "Greek", city: "Athens", country: "Greece" },
        { cuisine: "Indian", city: "New_Delhi", country: "India" },
        { cuisine: "Irish", city: "Dublin", country: "Ireland" },
        { cuisine: "Italian", city: "Rome", country: "Italy" },
        { cuisine: "Japanese", city: "Tokyo", country: "Japan" },
        { cuisine: "Jewish", city: "Jerusalem", country: "Israel" },
        { cuisine: "Korean", city: "Seoul", country: "Korea" },
        { cuisine: "Latin American", city: "Bogota", country: "Colombia" },
        { cuisine: "Mediterranean", city: "Istanbul", country: "Turkey" },
        { cuisine: "Mexican", city: "Mexico", country: "Mexico" },
        { cuisine: "Middle Eastern", city: "Cairo", country: "Egypt" },
        { cuisine: "Nordic", city: "Oslo", country: "Norway" },
        { cuisine: "Southern", city: "Houston", country: "Texas" },
        { cuisine: "Spanish", city: "Madrid", country: "Spain" },
        { cuisine: "Thai", city: "Bangkok", country: "Thailand" },
        { cuisine: "Vietnamese", city: "Hanoi", country: "Vietnam" }
    ]

    // This Function gets the corresponding Obj from listCuisineAndCity by cuisine type
    function findCountryByCuisine(objArray, cuisine) {
        var foundCityCountry;  // Storage the new object
        var length = objArray.length;   // Storage the array length

        for (var idx = 0; idx <= length; idx++) {
            // Get the object and make the comparison
            var obj = objArray[idx];
            if (obj.cuisine === cuisine) {
                foundCityCountry = obj;
                // we're done! get out now
                break;
            }
        }
        return foundCityCountry;    // Send it back
    }

    // This function selects randomly 6 objects from listCuisineAndCity and call getRecipe function
    function getRandomCuisineAndCity() {

        var listOfSelectedObjs = [];    // List of selected objects
        var recipeCounter = 1;
        while (recipeCounter <= 5) {
            var randomIndex = Math.floor(Math.random() * listCuisineAndCity.length)
            if (listOfSelectedObjs.indexOf(listCuisineAndCity[randomIndex]) === -1) {
                listOfSelectedObjs.push(listCuisineAndCity[randomIndex]);
                // or call getRecipe ()
                getRecipe(listCuisineAndCity[randomIndex].cuisine, recipeCounter);
                recipeCounter++;
            }
        }

    }

    //This function will be used to render the points of interest everytime the cuisinetype is clicked on
    function renderPoi(location) {
        var triposoId = "98JDSPD1";
        var triposoApiKey = "opge12o7zdr1npc4primk2yaxn3omhxa";
        var triposoUrl = "https://www.triposo.com/api/20201111/poi.json?location_id=" + location.city + "&account=" + triposoId + "&token=" + triposoApiKey + "&count=4&fields=id,name,score,snippet,location_id,tag_labels&order_by=-score";
        fetch(triposoUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var poiDivEl = document.querySelector("#poidiv");
                for (i = 0; i < 3; i++) {
                    var liEl = document.createElement("li");
                    liEl.classList.add("has-text-weight-bold")
                    var poiP = document.createElement("p");
                    var poiRate = document.createElement("p");
                    poiRate.classList.add("has-text-danger");
                    var ratingRounded = Math.round(data.results[i].score * 10) / 10;
                    liEl.textContent = data.results[i].name;
                    poiP.innerHTML = (data.results[i].snippet);
                    poiRate.innerHTML = ("RATING: " + ratingRounded + "/10");
                    poiDivEl.append(liEl, poiP, poiRate);
                }
            })
    }

    // Call function getRandomCuisineAndCity when page load
    // getRandomCuisineAndCity();  // Call getRandomCuisineAndCity and get recipes
    // setClickEventForRecipe();   // Call setClickEventForRecipe and add event listening to each recipe div

    // Event listening for Search button
    searchButton.addEventListener("click", function () {
        $("#recipes-section").empty();
        getRandomCuisineAndCity(); // Call getRandomCuisineAndCity and get recipes
        setClickEventForRecipe();  // Call setClickEventForRecipe and add event listening to each recipe div
    })

    // Event Listening for Instructions Modal
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

    // Event Listening for POI Modal
    function setClickEventForRecipe() {
        setTimeout(function () {
            $(".message").on("click", function () {
                var cuisineID = $(this).attr("id");
                var dataRecipeNumber = $(this).attr("id");
                /* Save selected recipe id on the local storage */
                localStorage.setItem("selectedRecipeID", JSON.stringify(dataRecipeNumber))
                infoModal.classList.add("is-active");   // Show POI modal
                var cityCountryObj = findCountryByCuisine(listCuisineAndCity, cuisineID);
                var poiDivEl = $("#poidiv");
                poiDivEl.empty();
                var poiTitleEl = document.querySelector("#poi-title");
                poiTitleEl.innerHTML = cityCountryObj.city + ", " + cityCountryObj.country + " - Points of Interest";
                renderPoi(cityCountryObj);
            })
        }, 500);
    }

    // Event listening for closing POI modal
    infoModalBg.addEventListener("click", function () {
        infoModal.classList.remove("is-active");
    })
    infoModalCloseButton.addEventListener("click", function () {
        infoModal.classList.remove("is-active");
    })

    // Event listening for the Recipe Steps modal
    viewRecipeButton.addEventListener("click", function () {
        infoModal.classList.remove("is-active");
        recipeInfoModal.classList.add("is-active");

        /* If there is not a value saved on pageVisited (local storage) */
        if (localStorage.getItem("selectedRecipeID") !== null) {
            var recNumber = JSON.parse(localStorage.getItem("selectedRecipeID"));
            console.log(recNumber);
            var recSteps = JSON.parse(localStorage.getItem(recNumber));
            console.log(recSteps);
            $("#instructions-list").empty();    // Clear any current li on instruction ol
            for (var m = 0; m < recSteps.length; m++) {
                if (m + 1 === recSteps.length) {
                    fullRecipeUrl = recSteps[m];
                    break;
                }
                var recStepsLi = document.createElement("li");
                recStepsLi.textContent = recSteps[m];
                instList.append(recStepsLi);
            }
        }
    })

    // Event listening for closing Recipe Modal 
    recipeInstModalBg.addEventListener("click", function () {
        recipeInfoModal.classList.remove("is-active");
    })
    recipeInstModalCloseButton.addEventListener("click", function () {
        recipeInfoModal.classList.remove("is-active");
    })

    // Event listening for Recipe URL button
    fullRecipeButton.addEventListener("click", function () {
        window.open(fullRecipeUrl); 
    })

})



