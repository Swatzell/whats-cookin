import recipeData from "./data/recipes";
import { searchRecipeName, findRecipeTags } from "./recipes";
import ingredientsData from "./data/ingredients";
import usersData from "./data/users";
import { getRandomInt } from "./random";

//NEW QUERYSELECTORS
const homeSection = document.querySelector(".main-page");
const recipePage = document.querySelector(".recipe-page");
const featuredRecipesSection = document.querySelector(".featured-recipes");
const allRecipesSection = document.querySelector(".all-recipes-page");
const homeButton = document.querySelector(".home-button");
const recipeButton = document.querySelector(".recipe-button");
const recipeHeader = document.querySelector(".featured-recipes-header")
const dropdownButton = document.querySelector(".dropbtn");
const viewRecipesToCookSection = document.querySelector(".saved-recipe-button");
const searchButton = document.querySelector(".search-button")
const searchInput = document.querySelector(".search-input")
const savedRecipePage = document.querySelector(".saved-recipes-page")
const recipeTagsSection = document.querySelector(".recipe-tags");
const tagContainer = document.querySelector('#tagContainer');
const saveRecipeButton = document.querySelector('.save-button')

let currentUser;

function initialize(){
  generateRecipeCards();
  populateAllRecipesPage();
  // showFullRecipe();
  // displayUserRecipes(userName)
  currentUser = getRandomUser() 
  console.log("Current user: ", currentUser)
}

addEventListener('load', initialize)

viewRecipesToCookSection.addEventListener("click",showSavedRecipesPage)

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



// featuredRecipesSection.addEventListener("click", (event) => {
//   if (event.target.classList.contains("save-button")) {
//     const recipeId = parseInt(event.target.closest(".featured-recipe-box").id);
//     const selectedRecipe = recipeData.find((recipe) => recipe.id === recipeId);
//     if (selectedRecipe) {
//       addRecipeToCook(currentUser.id, selectedRecipe.id);
//     }
//   }
// });

recipePage.addEventListener('click', (event) => {
  if (event.target.classList.contains('save-button')) {
     // Assuming the selected recipe is stored in a variable named `selectedRecipe`
     // and the current user is stored in a variable named `currentUser`
     // You might need to adjust this part based on how you're managing the selected recipe and current user
     const savedRecipe = saveRecipeToUser(currentUser.id, selectedRecipe.id);
     displayUserRecipes(savedRecipe); // Assuming you have a function to display the saved recipe
  }
 });
searchButton.addEventListener('click', searchByName)

function searchByName(){
  const searchName = searchInput.value;
  const searchResult = searchRecipeName(recipeData, searchName);
  filteredRecipeCards(searchResult);
  recipeHeader.innerHTML=`Search Results by: "${searchInput.value}"`
  searchInput.value = ''
}

tagContainer.addEventListener('click', function (e){
  console.log(e.target.closest("a"))
  if(e.target.closest("a")){ 
    const clickedTag = e.target.textContent;
    const searchResult = findRecipeTags(recipeData, clickedTag);
    filteredRecipeCards(searchResult);
    recipeHeader.innerHTML=`Recipes By Tag: "${clickedTag}"`}
})


function navigateToRecipePage() {
  homeSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");
  recipePage.classList.remove("hidden");
  savedRecipePage.classList.add("hidden");
}
//vvv Change to Saved Recipes Page
function showSavedRecipesPage() {
  console.log("SHOW INGREDIENTS PAGE FUNCTION INITITATED");
  homeSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");
  recipePage.classList.add("hidden");
  savedRecipePage.classList.remove("hidden");
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
  console.log("SHOW ALL RECIPES PAGE INITIATED")
  homeSection.classList.add("hidden");
  allRecipesSection.classList.remove("hidden");
  recipePage.classList.add("hidden");
  savedRecipePage.classList.add("hidden");
}

function showHomePage() {
  console.log("SHOW HOME PAGE INITIATED")
  allRecipesSection.innerHTML = "";
  homeSection.classList.remove("hidden");
  allRecipesSection.classList.add("hidden");
  recipePage.classList.add("hidden");
  savedRecipePage.classList.add("hidden");
  recipeHeader.innerText="This weeks featured recipes:"
  generateRecipeCards();
  populateAllRecipesPage();
  showFullRecipe();  
}


function populateAllRecipesPage() {
  allRecipesSection.innerHTML = "";  // Clear the existing content
  
  recipeData.forEach((recipe) => {
    const cardHTML = `
      <div class="featured-recipe-box" id="${recipe.id}">
        <img class="card-image" src="${recipe.image}" alt="${recipe.name}">
        <h2 class="card-title">${recipe.name}</h2>
      </div>
    `;
    allRecipesSection.innerHTML += cardHTML;
  });
}

function displayIngredients(selectedRecipe, ingredientsData) {
  console.log("DISPLAY INGREDIENTS FUNCTION INITIATED")
  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.className = "section-title";
  ingredientsTitle.textContent = "Ingredients";

  const ingredientsList = document.createElement("ul");
  ingredientsList.className = "recipe-ingredients";
  
  selectedRecipe.ingredients.forEach((ingredientItem) => {
    const ingredient = ingredientsData.find(
      (data) => data.id === ingredientItem.id
    );

    const listItem = document.createElement("li");
    listItem.textContent = `${ingredient.name}: ${ingredientItem.quantity.amount} ${ingredientItem.quantity.unit}`;
    ingredientsList.appendChild(listItem);
  });
  return { ingredientsTitle, ingredientsList };
}

function calculateRecipeCost(selectedRecipe, ingredientsData) {
  let totalCost = 0;

  selectedRecipe.ingredients.forEach((ingredientItem) => {
    const ingredientData = ingredientsData.find(
      (data) => data.id === ingredientItem.id
    );

    if (ingredientData) {
      totalCost += ingredientData.estimatedCostInCents * ingredientItem.quantity.amount;
    }
  });

  return totalCost / 100;
}


function showFullRecipe(selectedRecipe) {
  console.log("SHOW FULL RECIPE FUNCTION INITIATED");
  recipePage.innerHTML = `
    <div class="full-recipe-view">
      <img class="recipe-image" src="${selectedRecipe.image}" alt="${selectedRecipe.name}">
      <h2 class="card-title">${selectedRecipe.name}</h2>
      <button class="save-button">SAVE TO RECIPE</button>
      <h3 class="instructions-title">Instructions</h3>
      <ul class="recipe-instructions">
        ${selectedRecipe.instructions.map(instruction => `<li>${instruction.instruction}</li>`).join('')}
      </ul>
      ${displayIngredients(selectedRecipe, ingredientsData).ingredientsTitle.outerHTML}
      ${displayIngredients(selectedRecipe, ingredientsData).ingredientsList.outerHTML}
      <p class="recipe-total-cost">Total Cost: $${calculateRecipeCost(selectedRecipe, ingredientsData).toFixed(2)}</p>
      <h3 class="tags-title">Tags</h3>
      <ul class="recipe-tags">
        ${selectedRecipe.tags.map(tag => `<li>${tag}</li>`).join('')}
      </ul>
    </div>
  `;
}

//vvvvv This only works on the main 
function findRecipeById(event) {
  console.log("FIND RECIPE BY ID INITIATED")
  const recipeId = +event.target.closest(".featured-recipe-box").id;
  const selectedRecipe = recipeData.find((recipe) => recipe.id === recipeId);

  if (selectedRecipe) {
    console.log("selected recipe: ", selectedRecipe)
    showFullRecipe(selectedRecipe);
  } 
}


function generateRecipeCards() {
  featuredRecipesSection.innerHTML = "";  // Clear the existing content
  
  for (let i = 0; i < 3 && i < recipeData.length; i++) {
    const recipe = recipeData[i];
    
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
  const user = usersData.find(user => user.id === userId);
  const recipe = recipeData.find(recipe => recipe.id === recipeId);
  
  if (user && recipe) {
    if (!user.recipesToCook.some(r => r.id === recipeId)) {
      user.recipesToCook.push(recipe);
    }
  }
}


//this is a copy and paste that is dedicated towards searches
function filteredRecipeCards(recipeInput) {
  console.log("FILTERED RECIPE CARDS INITIATED")
  resetFilteredResultsPage()
 
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
// This will save recipes to the user and push it into the recipes to cook array
function saveRecipeToUser(user, recipe) {
  console.log("SAVE RECIPE TO USER INITIATED")
  const newRecipe = {
    id: recipe.id,
    image: recipe.image,
    name: recipe.name,
    ingredients: recipe.ingredients.map(ingredient => {
      const { id, quantity } = ingredient;
      const { amount, unit } = quantity;
      const ingredientData = ingredientsData.find(data => data.id === id);
      return {
        id,
        name: ingredientData ? ingredientData.name : 'Unknown',
        amount,
        unit
      };
    }),
    instructions: recipe.instructions.map(instruction => instruction.instruction),
    tags: recipe.tags
  };

  const isDuplicate = user.recipesToCook.some(savedRecipe => savedRecipe.id === newRecipe.id);

  if (!isDuplicate) {
    user.recipesToCook.push(newRecipe);
  }
}


function getRandomUser(){
  const index = getRandomInt(usersData.length)
  const randomUser = usersData[index]
  return randomUser
}


function displayUserRecipes(userName) {
  const user = usersData.find(user => user.name === userName);
  
  if (user) {
    savedRecipePage.innerHTML = '';
    
    user.recipesToCook.forEach(recipe => {
      const recipeElement = document.createElement('div');
      recipeElement.classList.add('recipe-item');
      
      recipeElement.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
        <h2>${recipe.name}</h2>
        <h3>Ingredients:</h3>
        <ul>
          ${recipe.ingredients.map(ingredient => `<li>${ingredient.amount} ${ingredient.unit} ${ingredient.name}</li>`).join('')}
        </ul>
        <h3>Instructions:</h3>
        <ol>
          ${recipe.instructions.map(instruction => `<li>${instruction}</li>`)}
        </ol>
        <h3>Tags:</h3>
        <ul>
          ${recipe.tags.map(tag => `<li>${tag}</li>`).join('')}
        </ul>
      `;
      
      savedRecipePage.appendChild(recipeElement);
    });
  } else {
    savedRecipePage.innerHTML = '<p>No recipes saved yet.</p>';
  }
}

