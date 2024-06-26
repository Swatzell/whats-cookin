import { searchRecipeName, findRecipeTags } from "./recipes";
import { getRandomInt } from "./random";
import {
  fetchUsers,
  fetchIngredients,
  fetchRecipes,
  saveRecipeToServer,
} from "./apiCalls.js";

const homeSection = document.querySelector(".main-page");
const recipePage = document.querySelector(".recipe-page");
const featuredRecipesSection = document.querySelector(".featured-recipes");
const allRecipesSection = document.querySelector(".all-recipes-page");
const homeButton = document.querySelector(".home-button");
const recipeButton = document.querySelector(".recipe-button");
const recipeHeader = document.querySelector(".featured-recipes-header");
const dropdownTags = document.querySelector(".dropdown");
const savedDropdownTags = document.querySelector(".saved-dropdown");
const viewRecipesToCookSection = document.querySelector(".saved-recipe-button");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const savedSearchButton = document.querySelector(".saved-search-button");
const savedRecipePage = document.querySelector(".saved-recipes-page");
const tagContainer = document.querySelector("#tagContainer");
const savedTagContainer = document.querySelector("#savedTagContainer");

let currentUser;
let users = [];
let ingredients = [];
let recipes = [];

function initialize() {
  Promise.all([fetchUsers(), fetchIngredients(), fetchRecipes()])

    .then(([fetchedUsers, fetchedIngredients, fetchedRecipes]) => {
      users = fetchedUsers.users;
      ingredients = fetchedIngredients.ingredients;
      recipes = fetchedRecipes.recipes;
      currentUser = getRandomUser(users);
      populateAllRecipesPage(recipes);
      generateRecipeCards(recipes);
      displayIngredients(recipes[0], ingredients);
      displayUserRecipes(users);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
console.log("testing if global variable: ", users);
addEventListener("load", function () {
  setTimeout(() => {
    initialize();
  }, 1500);
});

viewRecipesToCookSection.addEventListener("click", showSavedRecipesPage);

allRecipesSection.addEventListener("click", (e) => {
  findRecipeById(e);
  navigateToRecipePage();
});

homeSection.addEventListener("click", (e) => {
  findRecipeById(e);
  navigateToRecipePage();
});

recipeButton.addEventListener("click", function (event) {
  event.preventDefault();
  showAllRecipesPage();
});

homeButton.addEventListener("click", function () {
  showHomePage();
});

recipePage.addEventListener("click", (event) => {
  if (event.target.classList.contains("save-button")) {
    const recipeId = parseInt(event.target.closest(".full-recipe-view").id);
    const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);
    console.log("Selected Recipe:", selectedRecipe);
    if (selectedRecipe) {
      console.log("Adding recipe to cook list...");
      addRecipeToCook(currentUser.id, selectedRecipe.id);
      console.log("Adding recipe to user's cook list...");
      saveRecipeToServer(currentUser.id, selectedRecipe.id)
        .then((data) => {
          console.log("Recipe added to user's cook list:", data);
          event.target.classList.add("saved");
          event.target.innerText = "RECIPE SAVED";
        })
        .catch((error) => {
          console.error("Error adding recipe to user's cook list:", error);
        });
    }
  }
});

savedRecipePage.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-button")) {
    const closestBox = event.target.closest(".remove-recipe");

    if (closestBox) {
      const recipeId = parseInt(closestBox.previousElementSibling.id, 10);

      if (isNaN(recipeId)) {
        console.error(
          "Invalid recipe ID:",
          closestBox.previousElementSibling.id
        );
        return;
      }

      removeRecipeFromCook(currentUser.id, recipeId);
      displayUserRecipes(currentUser.name);
    }
  }
});

function removeRecipeFromCook(userId, recipeId) {
  const user = users.find((user) => user.id === userId);

  if (user) {
    user.recipesToCook = user.recipesToCook.filter(
      (recipe) => recipe.id !== recipeId
    );

    const recipeCard = document.querySelector(
      `.featured-recipe-box[id="${recipeId}"]`
    );
    if (recipeCard) {
      recipeCard.remove();
    } else {
      console.error(`Recipe card with ID ${recipeId} not found.`);
    }
  }
}

savedRecipePage.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".featured-recipe-box");

  if (clickedCard) {
    const recipeId = parseInt(clickedCard.id, 10);
    const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);

    if (selectedRecipe) {
      showFullRecipe(selectedRecipe);
      navigateToRecipePage();
    }
  }
});

searchButton.addEventListener("click", searchByName);
savedSearchButton.addEventListener("click", searchByName);

function searchByName(e) {
  const searchName = searchInput.value;
  let searchResult;
  let headerText;
  if (e.target === searchButton) {
    searchResult = searchRecipeName(recipes, searchName);
    headerText = `Search Results by: "${searchInput.value}"`;
  } else if (e.target === savedSearchButton) {
    searchResult = searchRecipeName(currentUser.recipesToCook, searchName);
    headerText = `Saved Recipe Search Results by: "${searchInput.value}"`;
  }

  filteredRecipeCards(searchResult);
  recipeHeader.innerHTML = headerText;
  searchInput.value = "";
}

tagContainer.addEventListener("click", function (e) {
  console.log(e.target.closest("a"));
  if (e.target.closest("a")) {
    const clickedTag = e.target.textContent;
    const searchResult = findRecipeTags(recipes, clickedTag);
    filteredRecipeCards(searchResult);
    recipeHeader.innerHTML = `Recipes By Tag: "${clickedTag}"`;
  }
});

savedTagContainer.addEventListener("click", function (e) {
  console.log(e.target.closest("a"));
  if (e.target.closest("a")) {
    const clickedTag = e.target.textContent;
    const searchResult = findRecipeTags(currentUser.recipesToCook, clickedTag);
    filteredRecipeCards(searchResult);
    recipeHeader.innerHTML = `Saved Recipes By Tag: "${clickedTag}"`;
  }
});

function navigateToRecipePage() {
  homeSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");
  recipePage.classList.remove("hidden");
  savedRecipePage.classList.add("hidden");
}

function showSavedRecipesPage() {
  console.log("SAVED RECIPES PAGE FUNCTION INITITATED");
  homeSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");
  recipePage.classList.add("hidden");
  savedRecipePage.classList.remove("hidden");
  searchButton.classList.add("hidden");
  savedSearchButton.classList.remove("hidden");
  dropdownTags.classList.add("hidden");
  savedDropdownTags.classList.remove("hidden");
  displayUserRecipes(currentUser.name);
}

function resetFilteredResultsPage() {
  homeSection.classList.remove("hidden");
  allRecipesSection.classList.add("hidden");
  recipePage.classList.add("hidden");
  savedRecipePage.classList.add("hidden");
  featuredRecipesSection.innerHTML = "";
}

function showAllRecipesPage() {
  console.log("SHOW ALL RECIPES PAGE INITIATED");
  homeSection.classList.add("hidden");
  allRecipesSection.classList.remove("hidden");
  recipePage.classList.add("hidden");
  savedRecipePage.classList.add("hidden");
  searchButton.classList.remove("hidden");
  savedSearchButton.classList.add("hidden");
  dropdownTags.classList.remove("hidden");
  savedDropdownTags.classList.add("hidden");
}

function showHomePage() {
  console.log("SHOW HOME PAGE INITIATED");
  allRecipesSection.innerHTML = "";
  homeSection.classList.remove("hidden");
  allRecipesSection.classList.add("hidden");
  recipePage.classList.add("hidden");
  savedRecipePage.classList.add("hidden");
  searchButton.classList.remove("hidden");
  savedSearchButton.classList.add("hidden");
  recipeHeader.innerText = "This week's featured recipes:";
  dropdownTags.classList.remove("hidden");
  savedDropdownTags.classList.add("hidden");
  generateRecipeCards(recipes);
  populateAllRecipesPage(recipes);
}

function populateAllRecipesPage(data) {
  let recipes;

  if (Array.isArray(data.recipes)) {
    recipes = data.recipes;
  } else if (Array.isArray(data)) {
    recipes = data;
  } else {
    console.error("Invalid recipes data:", data);
    return;
  }

  allRecipesSection.innerHTML = "";

  recipes.forEach((recipe) => {
    const cardHTML = `
      <div class="featured-recipe-box" id="${recipe.id}">
        <img class="card-image" src="${recipe.image}" alt="${recipe.name}">
        <h2 class="card-title">${recipe.name}</h2>
      </div>
    `;
    allRecipesSection.innerHTML += cardHTML;
  });
}

function displayIngredients(selectedRecipe, ingredients) {
  console.log("DISPLAY INGREDIENTS FUNCTION INITIATED");
  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.className = "section-title";
  ingredientsTitle.textContent = "Ingredients";

  const ingredientsList = document.createElement("ul");
  ingredientsList.className = "recipe-ingredients";

  selectedRecipe.ingredients.forEach((ingredientItem) => {
    const ingredient = ingredients.find(
      (data) => data.id === ingredientItem.id
    );

    const listItem = document.createElement("li");
    listItem.textContent = `${ingredient.name}: ${ingredientItem.quantity.amount} ${ingredientItem.quantity.unit}`;
    ingredientsList.appendChild(listItem);
  });
  return { ingredientsTitle, ingredientsList };
}

function calculateRecipeCost(selectedRecipe, ingredients) {
  let totalCost = 0;

  selectedRecipe.ingredients.forEach((ingredientItem) => {
    const ingredientData = ingredients.find(
      (data) => data.id === ingredientItem.id
    );

    if (ingredientData) {
      totalCost +=
        ingredientData.estimatedCostInCents * ingredientItem.quantity.amount;
    }
  });

  return totalCost / 100;
}

function showFullRecipe(selectedRecipe) {
  console.log(selectedRecipe);
  recipePage.innerHTML = `
    <div class="full-recipe-view" id=${selectedRecipe.id}>
      <img class="recipe-image" src="${selectedRecipe.image}" alt="${
    selectedRecipe.name
  }">
      <h2 class="card-title">${selectedRecipe.name}</h2>
      <button class="save-button">SAVE FOR LATER</button>
      <h3 class="instructions-title">Instructions</h3>
      <ul class="recipe-instructions">
        ${selectedRecipe.instructions
          .map((instruction) => `<li>${instruction.instruction}</li>`)
          .join("")}
      </ul>
      ${
        displayIngredients(selectedRecipe, ingredients).ingredientsTitle
          .outerHTML
      }
      ${
        displayIngredients(selectedRecipe, ingredients).ingredientsList
          .outerHTML
      }
      <p class="recipe-total-cost">Total Cost: $${calculateRecipeCost(
        selectedRecipe,
        ingredients
      ).toFixed(2)}</p>
      <h3 class="tags-title">Tags</h3>
      <ul class="recipe-tags">
        ${selectedRecipe.tags.map((tag) => `<li>${tag}</li>`).join("")}
      </ul>
    </div>
  `;
}

function findRecipeById(event) {
  console.log("FIND RECIPE BY ID INITIATED");
  const recipeId = +event.target.closest(".featured-recipe-box").id;
  const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);

  if (selectedRecipe) {
    console.log("selected recipe: ", selectedRecipe);
    showFullRecipe(selectedRecipe);
  }
}

function generateRecipeCards(recipes) {
  featuredRecipesSection.innerHTML = "";

  for (let i = 0; i < 3 && i < recipes.length; i++) {
    const recipe = recipes[i];

    const cardHTML = `
      <div class="featured-recipe-box" id="${recipe.id}">
        <img class="card-image" src="${recipe.image}" alt="${recipe.name}">
        <h2 class="card-title">${recipe.name}</h2>
      </div>
    `;
    featuredRecipesSection.innerHTML += cardHTML;
  }
}

function addRecipeToCook(userId, recipeId) {
  const user = users.find((user) => user.id === userId);
  const recipe = recipes.find((recipe) => recipe.id === recipeId);

  if (user && recipe) {
    if (!user.recipesToCook.some((r) => r.id === recipeId)) {
      user.recipesToCook.push(recipe);
      console.log(user);
    }
  }
}

function filteredRecipeCards(recipeInput) {
  console.log("FILTERED RECIPE CARDS INITIATED");
  resetFilteredResultsPage();
  if (recipeInput === "No Results Found") {
    featuredRecipesSection.innerHTML = `${recipeInput}`;
  } else
    for (let i = 0; i < recipeInput.length; i++) {
      const recipe = recipeInput[i];

      const card = document.createElement("div");
      card.className = "featured-recipe-box";
      card.id = recipe.id;

      const image = document.createElement("img");
      image.className = "card-image";
      image.src = recipe.image;
      image.alt = recipe.name;

      const title = document.createElement("h2");
      title.className = "card-title";
      title.textContent = recipe.name;

      card.appendChild(image);
      card.appendChild(title);

      featuredRecipesSection.appendChild(card);
    }
}

function getRandomUser(users) {
  const index = getRandomInt(users.length);
  const randomUser = users[index];
  return randomUser;
}

function displayUserRecipes(userName) {
  const user = users.find((user) => user.name === userName);
  if (user) {
    savedRecipePage.innerHTML = "";

    user.recipesToCook.forEach((recipe) => {
      const cardHTML = `
            <div class="featured-recipe-box" id="${recipe.id}">
              <img class="card-image" src="${recipe.image}" alt="${recipe.name}">
              <h2 class="card-title">${recipe.name}</h2>
              </div>
              <div class=remove-recipe>
              <button class="remove-button">REMOVE</button>
            </div>
          `;
      savedRecipePage.innerHTML += cardHTML;
    });
  }
}
