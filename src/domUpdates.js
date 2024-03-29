import recipeData from "./data/recipes";
import { searchRecipeName } from "./recipes";

//NEW QUERYSELECTORS
const homeSection = document.querySelector(".main-page");
const recipePage = document.querySelector(".recipe-page");
const ingredientsSection = document.querySelector(".ingredients-page");
const featuredRecipesSection = document.querySelector(".featured-recipes");
const allRecipesSection = document.querySelector(".all-recipes-page");
const homeButton = document.querySelector(".home-button");
const recipeButton = document.querySelector(".recipe-button");
const ingredientButton = document.querySelector(".ingredients-button");
const savedRecipesSection = document.querySelector(".user-saved-recipes");
const searchButton = document.querySelector(".search-button")
const searchInput = document.querySelector(".search-input")

// window.addEventListener('DOMContentLoaded', createFeaturedRecipe);
searchButton.addEventListener('click', function(){
  const searchName = searchInput.value;
  const searchResult = searchRecipeName(recipeData, searchName);
  console.log(searchResult)
  filteredRecipeCards(searchResult);
})




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

ingredientButton.addEventListener("click", function () {
  showIngredientsPage();
});

function navigateToRecipePage() {
  homeSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");
  ingredientsSection.classList.add("hidden");
  recipePage.classList.remove("hidden");
  savedRecipesSection.classList.add("hidden");
}

function showIngredientsPage() {
  homeSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");
  ingredientsSection.classList.remove("hidden");
  recipePage.classList.add("hidden");
  savedRecipesSection.classList.add("hidden");
}

function showAllRecipesPage() {
  homeSection.classList.add("hidden");
  allRecipesSection.classList.remove("hidden");
  ingredientsSection.classList.add("hidden");
  recipePage.classList.add("hidden");
  savedRecipesSection.classList.add("hidden");
}

function showHomePage() {
  homeSection.classList.remove("hidden");
  allRecipesSection.classList.add("hidden");
  ingredientsSection.classList.add("hidden");
  recipePage.classList.add("hidden");
  savedRecipesSection.classList.add("hidden");
}

function populateAllRecipesPage() {
  allRecipesSection.innerHTML = "";

  recipeData.forEach((recipe) => {
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

    card.addEventListener("click", () => {
      findRecipeById(recipe.id);
    });

    allRecipesSection.appendChild(card);
  });
}

function showFullRecipe(selectedRecipe) {
  recipePage.innerHTML = "";

  const fullRecipe = document.createElement("div");
  fullRecipe.className = "full-recipe-view";

  const image = document.createElement("img");
  image.className = "recipe-image";
  image.src = selectedRecipe.image;
  image.alt = selectedRecipe.name;

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = selectedRecipe.name;

  const instructions = document.createElement("h3");
  instructions.className = "recipe-instructions";
  selectedRecipe.instructions.map((instruction) => {
    instructions.textContent = instruction.instruction;
  });

  const tags = document.createElement("h3");
  tags.className = "recipe-tags";
  tags.textContent = selectedRecipe.tags;

  fullRecipe.appendChild(image);
  fullRecipe.appendChild(title);
  fullRecipe.appendChild(instructions);
  fullRecipe.appendChild(tags);

  recipePage.appendChild(fullRecipe);
}

function findRecipeById(event) {
  const recipeId = +event.target.closest(".featured-recipe-box").id;
  console.log(`>>>>>>>>>`, recipeId);
  const selectedRecipe = recipeData.find((recipe) => recipe.id === recipeId);

  if (selectedRecipe) {
    showFullRecipe(selectedRecipe);
  }
}

function generateRecipeCards() {
  featuredRecipesSection.innerHTML = "";

  // Display only the first 3 recipes
  for (let i = 0; i < recipeData.length; i++) {
    const recipe = recipeData[i];

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

function filteredRecipeCards(recipeInput) {
  featuredRecipesSection.innerHTML = "";

  // Display only the first 3 recipes
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


generateRecipeCards();
populateAllRecipesPage();
showFullRecipe();
