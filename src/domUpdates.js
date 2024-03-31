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

//TO DO: This function will initiate to present all saved recipes
// viewRecipesToCookSection.addEventListener("click", (e) => {
//   viewRecipesToCookSection()
// })


//Read: SAVE BUTTON event listener
//1) This Function needs to be in a GLOBAL variable because the "Save Button" isn't built until AFTER the recipe cards are generated
//2) Because this querySelector is built locally, this function listens to a "click" at ANY point in time to see if the event is ON the button that would potentially be built. 
saveRecipeButton.addEventListener("click", (e) => {
  if (e.target.classList.contains("save-button")) console.log("SAVE BUTTON INITIATED")
  saveRecipeToUser(user, recipe)
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
  console.log("SHOW INGREDIENTS PAGE FUNCTION INITITATED")
  homeSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");
  recipePage.classList.add("hidden");
  savedRecipePage.classList.remove("hidden");
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
  console.log("POPULATE ALL RECIPES PAGE INITIATED")

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

    const saveButton = document.createElement("button")
    saveButton.className = "save-button"
    saveButton.textContent = "SAVE TO RECIPE"

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(saveButton);

    card.addEventListener("click", () => {
      findRecipeById(recipe.id);
    });

    allRecipesSection.appendChild(card);
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
  console.log("SHOW FULL RECIPE FUNCTION INITIATED")
  recipePage.innerHTML = "";

  const fullRecipe = document.createElement("div");
  fullRecipe.className = "full-recipe-view";

  const image = document.createElement("img");
  image.className = "recipe-image";
  image.src = selectedRecipe.image;
  image.alt = selectedRecipe.name;
  console.log("Selected Recipe: ", selectedRecipe)

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = selectedRecipe.name;

  const saveButton = document.createElement("button")
  saveButton.className = "save-button"
  saveButton.textContent = "SAVE TO RECIPE"
  
  const instructionsTitle = document.createElement("h3");
  instructionsTitle.className = "instructions-title";
  instructionsTitle.textContent = "Instructions";
  
  const instructionsList = document.createElement("ul");
  instructionsList.className = "recipe-instructions";
  selectedRecipe.instructions.forEach((instruction) => {
    const listItem = document.createElement("li");
    listItem.textContent = instruction.instruction;
    instructionsList.appendChild(listItem);
  });

  //Self note: These are blocks of HTML produced from the function
  const { ingredientsTitle, ingredientsList } = displayIngredients(selectedRecipe, ingredientsData);
  const totalCost = calculateRecipeCost(selectedRecipe, ingredientsData);
  const totalCostElement = document.createElement("p");
  totalCostElement.className = "recipe-total-cost";
  totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;

  const tagsTitle = document.createElement("h3");
  tagsTitle.className = "tags-title";
  tagsTitle.textContent = "Tags";

  const tagsList = document.createElement("ul");
  tagsList.className = "recipe-tags";
  selectedRecipe.tags.forEach((tag) => {
    const listItem = document.createElement("li");
    listItem.textContent = tag;
    tagsList.appendChild(listItem);
  });

  
  fullRecipe.appendChild(image);
  fullRecipe.appendChild(title);
  fullRecipe.appendChild(saveButton);
  fullRecipe.appendChild(instructionsTitle);
  fullRecipe.appendChild(instructionsList);
  fullRecipe.appendChild(tagsTitle);
  fullRecipe.appendChild(tagsList);
  fullRecipe.appendChild(ingredientsTitle);
  fullRecipe.appendChild(ingredientsList);
  fullRecipe.appendChild(totalCostElement);
  recipePage.appendChild(fullRecipe);
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
  console.log("GENERATE RECIPE CARDS INITIATED")
  featuredRecipesSection.innerHTML = "";

  // Display only the first 3 recipes
  for (let i = 0; i < 3 && i < recipeData.length; i++) {
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

    const saveButton = document.createElement("button")
    saveButton.className = "save-button"
    saveButton.textContent = "SAVE TO RECIPE"

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(saveButton);

    featuredRecipesSection.appendChild(card);
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
//  Here is an Example of how to use the handleRecipeClick function with a  recipe cards data id and users id attributes
// <div class="recipe-card" data-id="595736" data-user="Saige O'Kon">
//     <!-- card content -->
// </div>

// document.querySelectorAll('.recipe-card').forEach(card => {
//   card.addEventListener('click', handleRecipeClick);
// }); you can probably manipulate this all to work with a little heart image or something similar on the recipe card

function getRandomUser(){
  const index = getRandomInt(usersData.length)
  const randomUser = usersData[index]
  return randomUser
}

// this will handle the recipe click you'll just have to modify
function handleRecipeClick(event) {
  console.log("HANDLE RECIPE CLICK INITIATED")
  const recipeId = parseInt(event.currentTarget.getAttribute('data-id'));
  const recipe = recipeData.find(recipe => recipe.id === recipeId);
  const userName = event.currentTarget.getAttribute('data-user');
  const user = usersData.find(user => user.name === userName);

  if (recipe && user) {
    saveRecipeToUser(user, recipe);
    console.log(`Recipe ${recipe.name} saved to ${user.name}'s recipesToCook`);
  } else {
    console.error('Recipe or user not found');
  }
}

// This function is to display saved recipes in the savedRecipePage section I added to HTML
function displayUserRecipes(userName) {
  const user = usersData.find(user => user.name === userName);
  const recipesSection = document.getElementById('userRecipes'); // Assuming you have a div with id 'userRecipes' to display the recipes
  
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
          ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
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