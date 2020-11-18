
$(document).ready(function () {
    // Modal Events
  
    // var recipeButton = document.querySelector("#recipe");
    var instModalBg = document.querySelector("#inst-modal-background");
    var infoModalBg = document.querySelector("#info-modal-background");
    var instModal = document.querySelector("#inst-modal");
    var infoModal = document.querySelector("#info-modal");
    var instList = document.querySelector("#instructions-list");
    var instModalCloseButton = document.querySelector("#inst-modal-close-button");
    var infoModalCloseButton = document.querySelector("#info-modal-close-button");

    instModalBg.addEventListener("click", function () {
        instModal.classList.remove("is-active");
    })

    instModalCloseButton.addEventListener("click", function () {
        instModal.classList.remove("is-active");
    })
    //Starting fetch request for spoonacular Api

    // QuerySelectors for HTML Elements
    var recipeSection = document.querySelector("#recipes-section");
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

    // This Function Create Recipe Div
    function createRecipeDiv(title, cuisine, image, foodTags, ingredients, recipeCounter) {
        // Message Div element
        var messageDiv = $("<div>").addClass("message is-primary mx-6 my-6");
        messageDiv.attr("id", "recipe-id");
        messageDiv.attr("data-recipe-number", recipeCounter);
        var messageHeader = $("<div>").addClass("message-header");
        var messageBody = $("<div>").addClass("message-body");

        // MessageHeader Div Elements
        var recipeTitle = $("<h2>").addClass("has-text-weight-bold is-size-4 is-italic");
        recipeTitle.attr("id", "recipeTitle");
        recipeTitle.text(title);
        var cuisineName = $("<h2>").addClass("has-text-weight-bold is-size-6 has-text-right");
        cuisineName.attr("id", cuisine);
       // cuisineName.attr("id", "cuisine");
        cuisineName.text(cuisine);

        // MessageBody Div Elements
        var colummsDiv = $("<div>").addClass("columns");

        // Elements Image column
        var imgDiv = $("<div>").addClass("column is-4-tablet");
        var figureDiv = $("<figure>").addClass("image is-128x128");
        var imgEl = $("<img>");
        imgEl.attr("id", "recipeImage")
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
        var apiKey = "e9e71129ef994529977055667914d612";    // Michael api Key
        // var apiKey = "f1665cf0e8db418b975517f3bf4ddf27"; //Jhonny api Key;

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
                    recipeTitle = data.results[counter].title;  // Recipe Title
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

                    // Pass recipe data and Call createRecipeDiv()
                    createRecipeDiv(recipeTitle, cuisine, recipeImage, [vegetarian, vegan, glutenFree, dairyFree], ingredientsNeeded, recipeCounter);

                    /* Save each recipe steps on the local storage with recipe number as key name */
                    localStorage.setItem(recipeCounter, JSON.stringify(recipeSteps))
                    console.log(recipeCounter);
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
        var recipeCounter = 1;
        while (recipeCounter <= 6) {
            var randomIndex = Math.floor(Math.random() * listCuisineAndCity.length)
            if (listOfSelectedObjs.indexOf(listCuisineAndCity[randomIndex]) === -1) {
                listOfSelectedObjs.push(listCuisineAndCity[randomIndex]);
                // or call getRecipe ()
                getRecipe(listCuisineAndCity[randomIndex].cuisine, recipeCounter);
                console.log("this is recipeCounter" + recipeCounter);
                recipeCounter++;
            }
        }
            console.log(listOfSelectedObjs);
            var location = [];
            location.push(listOfSelectedObjs[0]["city"], listOfSelectedObjs[1]["city"], listOfSelectedObjs[2]["city"], listOfSelectedObjs[3]["city"], listOfSelectedObjs[4]["city"], listOfSelectedObjs[5]["city"]);
            console.log(location);    
        }

        //This function will be used to render the points of interest everytime the cuisinetype is clicked on
        function renderPoi (location) {
            var poiSectionEl = document.querySelector("#poisection");
            var poiDivEl = document.querySelector("#poidiv");
            var triposoId = "98JDSPD1";
                    var triposoApiKey = "opge12o7zdr1npc4primk2yaxn3omhxa";
                    var triposoUrl = "https://www.triposo.com/api/20201111/poi.json?location_id=" + location + "&account=" + triposoId + "&token=" + triposoApiKey + "&count=4&fields=id,name,score,snippet,location_id,tag_labels&order_by=-score";
                        fetch(triposoUrl)
                            .then(function (response) {
                                console.log("Triposo has a " + response);
                                return response.json();
                            })
                            .then(function (data) {
                                // console.log(data);
                                // console.log(data.results.name);
                                var newLocation = location.replace(/_/g, " ");
                                for (i=0;i<3;i++) {
                                    console.log(data.results[i].name);
                                    var poiDivEl = document.querySelector("#poidiv");
                                    var poiH3El = document.createElement("h3");
                                    var liEl = document.createElement("li");
                                    var poiP = document.createElement("p");
                                    var ratingRounded = Math.round(data.results[i].score * 10) / 10;
                                    poiH3El.innerHTML = "These are the top 3 points of interest in ", newLocation;
                                    liEl.textContent = data.results[i].name;
                                    poiP.innerHTML = ("description: " + data.results[i].snippet + "<br>" + "rating: " + ratingRounded + "/10");
                                    poiDivEl.append(poiH3El, liEl, poiP);
                                }
                            })   
        }
    getRandomCuisineAndCity();


    //Starting fetch request for triposo
    var location = "Toronto"; //Placeholder this will change based on the cuisine.
    var triposoId = "98JDSPD1";
    var triposoApiKey = "opge12o7zdr1npc4primk2yaxn3omhxa";
    var triposoUrl = "https://www.triposo.com/api/20201111/poi.json?location_id=" + location + "&account=" + triposoId + "&token=" + triposoApiKey + "&count=4&fields=id,name,score,snippet,location_id,tag_labels&order_by=-score";
    fetch(triposoUrl)
        .then(function (response) {
            // console.log("Triposo has a " + response);
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            for (i = 0; i < 3; i++) {
                // console.log(data.results[i].name);
                var poiDivEl = document.querySelector("#poidiv");
                var poih3El = document.querySelector("#poih3");
                var liEl = document.createElement("li");
                var poiP = document.createElement("p");
                var ratingRounded = Math.round(data.results[i].score * 10) / 10;
                poih3El.innerHTML = "These are the top 3 points of interest in ", location;
                liEl.textContent = data.results[i].name;
                poiP.innerHTML = ("description: " + data.results[i].snippet + "<br>" + "rating: " + ratingRounded + "/10");
                poiDivEl.append(liEl, poiP);
            }
        })
  
  
    searchButton.addEventListener("click", function () {
        $("#recipes-section").empty();
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
    recipeSection.addEventListener("click", function (e) {
        var h2CuisineText = e.target.id;
        infoModal.classList.add("is-active");
        var h2Cuisine = $("#cuisine");
        //var h2CuisineText = h2Cuisine.text();
        //console.log("anything",$(this).attr("id"));
        // added if and else if statement to change the points of interest modal based on the cuisine type
        if (h2CuisineText === "French") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "France - Points of Interest";
            var location = "Paris";
            renderPoi(location);
        } else if (h2CuisineText === "African") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "South Africa - Points of Interest";
            var location = "Cape_Town";
            renderPoi(location);
        } else if (h2CuisineText === "American") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "USA - Points of Interest";
            var location = "New_York_City";
            renderPoi(location);
        } else if (h2CuisineText === "British") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML ="England - Points of Interest";
            var location = "London";
            renderPoi(location);
        } else if (h2CuisineText === "Cajun") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Louisiana - Points of Interest";
            var location = "New_Orleans";
            renderPoi(location);
        } else if (h2CuisineText === "Caribbean") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Jamaica - Points of Interest";
            var location = "Montego_Bay";
            renderPoi(location);
        } else if (h2CuisineText === "Chinese") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "China - Points of Interest";
            var location = "Guangzhou";
            renderPoi(location);
        } else if (h2CuisineText === "Eastern European") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "France - Points of Interest";
            var location = "Paris";
            renderPoi(location);
        } else if (h2CuisineText === "European") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "France - Points of Interest";
            var location = "Paris";
            renderPoi(location);
        } else if (h2CuisineText === "German") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Germany - Points of Interest";
            var location = "Munich";
            renderPoi(location);
        } else if (h2CuisineText === "Greek") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Greece - Points of Interest";
            var location = "Athens";
            renderPoi(location);
        } else if (h2CuisineText === "Indian") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "India - Points of Interest";
            var location = "New_Delhi";
            renderPoi(location);
        } else if (h2CuisineText === "Irish") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Ireland - Points of Interest";
            var location = "Dublin";
            renderPoi(location);
        } else if (h2CuisineText === "Italian") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Italy - Points of Interest";
            var location = "Rome";
            renderPoi(location);
        } else if (h2CuisineText === "Japanese") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Japan - Points of Interest";
            var location = "Tokyo";
            renderPoi(location);
        } else if (h2CuisineText === "Korean") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Korea - Points of Interest";
            var location = "Seoul";
            renderPoi(location);
        } else if (h2CuisineText === "Jewish") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Isreal - Points of Interest";
            var location = "Jerusalem";
            renderPoi(location);
        } else if (h2CuisineText === "Latin American") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Colombia - Points of Interest";
            var location = "Bogota";
            renderPoi(location);
        } else if (h2CuisineText === "Mediterranean") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Turkey - Points of Interest";
            var location = "Istanbul";
            renderPoi(location);
        } else if (h2CuisineText === "Mexican") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Mexico - Points of Interest";
            var location = "Mexico_City";
            renderPoi(location);
        } else if (h2CuisineText === "Middle-Eastern") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Egypt - Points of Interest";
            var location = "Cairo";
            renderPoi(location);
        } else if (h2CuisineText === "Nordic") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Norway - Points of Interest";
            var location = "Oslo";
            renderPoi(location);
        } else if (h2CuisineText === "Southern") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Texas - Points of Interest";
            var location = "Houston";
            renderPoi(location);
        } else if (h2CuisineText === "Spanish") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Spain - Points of Interest";
            var location = "Madrid";
            renderPoi(location);
        } else if (h2CuisineText === "Thai") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Thailand - Points of Interest";
            var location = "Bangkok";
            renderPoi(location);
        } else if (h2CuisineText === "Vietnamese") {
            var poiDivEl = $("#poidiv");
            poiDivEl.empty();
            var poiTitleEl = document.querySelector("#poi-title");
            console.log(h2CuisineText);
            poiTitleEl.innerHTML = "Vietnam - Points of Interest";
            var location = "Hanoi";
            renderPoi(location);
        }
    })
    viewRecipeButton.addEventListener("click", function () {
        infoModal.classList.remove("is-active");
        recipeInfoModal.classList.add("is-active");
        var recSteps = JSON.parse(localStorage.getItem("3"));
        console.log("This is the number of recipe steps: " + recSteps.length);
        console.log("This from local storage: "+ (recSteps[1]));
        
        for (var m = 0; m < recSteps.length; m++) {
            var recStepsLi = document.createElement("p");
            recStepsLi.textContent = recSteps[m];
            instList.append(recStepsLi);
        }
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

