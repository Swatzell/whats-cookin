import recipeData from "./data/recipes";

//NEW QUERYSELECTORS
const homeSection = document.querySelector('.main-page');
const recipeSection = document.getElementById('recipe-page');
const ingredientsSection = document.getElementById('ingredients-page');
const featuredRecipesSection = document.querySelector(".featured-recipes");
const allRecipesSection = document.querySelector(".all-recipes-page");
const homeButton = document.querySelector(".home-button");
const recipeButton= document.querySelector(".recipe-button");
const ingredientButton = document.querySelector(".ingredients-button")
const savedRecipesSection = document.querySelector(".user-saved-recipes")


// Event listener for the navigation links

  recipeButton.addEventListener('click', function(event) {
    event.preventDefault();
    showAllRecipesPage();})


homeButton.addEventListener('click', function() {
  showHomePage();})

  ingredientButton.addEventListener('click', function() {
    showIngredientsPage();})

  
  
    function showIngredientsPage(){
    homeSection.classList.add('hidden');
    allRecipesSection.classList.add('hidden');
    ingredientsSection.classList.remove('hidden');
    recipeSection.classList.add('hidden');
    savedRecipesSection.classList.add('hidden');
  

  }


function showAllRecipesPage(){
  homeSection.classList.add('hidden');
  allRecipesSection.classList.remove('hidden');
  ingredientsSection.classList.add('hidden');
  recipeSection.classList.add('hidden');
  savedRecipesSection.classList.add('hidden');

}

function showHomePage() {
  homeSection.classList.remove('hidden');
  allRecipesSection.classList.add('hidden');
  ingredientsSection.classList.add('hidden');
  recipeSection.classList.add('hidden');
  savedRecipesSection.classList.add('hidden');

}

// Function to show a specified section
function showHome() {
  section.classList.remove('hidden');
}


    
    // Once all sections are hidden, immediately show the proper section based on the href attribute
//     const targetId = this.getAttribute('href').slice(1);
//     const targetSection = document.getElementById(targetId);
//     showSection(targetSection);
//     console.log(`'NOW YOU"RE ON ${targetSection}'`)
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
  
  // Function to generate recipe cards
  function populateRecipePage() {
    allRecipesSection.innerHTML = "";
    
    recipeData.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "featured-recipe-box";
      
      const image = document.createElement("img");
      image.className = "card-image";
      image.src = recipe.image;
      image.alt = recipe.name;
      
      const title = document.createElement("h2");
      title.className = "card-title";
      title.textContent = recipe.name;
      
      card.appendChild(image);
      card.appendChild(title);
      
      // Add click event listener to navigate to detailed recipe page
      card.addEventListener("click", () => {
        navigateToRecipePage(recipe);
      });
      
      allRecipesSection.appendChild(card);
    });
  }

  function generateRecipeCards() {
    featuredRecipesSection.innerHTML = ""; // Clear existing cards
    
    // Display only the first 3 recipes
    for (let i = 0; i < 3 && i < recipeData.length; i++) {
      const recipe = recipeData[i];
      
      const card = document.createElement("div");
      card.className = "featured-recipe-box";
      
      const image = document.createElement("img");
      image.className = "card-image";
      image.src = recipe.image;
      image.alt = recipe.name;
      
      const title = document.createElement("h2");
      title.className = "card-title";
      title.textContent = recipe.name;
      
      card.appendChild(image);
      card.appendChild(title);
      
      // Add click event listener to navigate to detailed recipe page
      card.addEventListener("click", () => {
        navigateToRecipePage(recipe);
      });
      
      featuredRecipesSection.appendChild(card);
    }
  }

// })

generateRecipeCards()
populateRecipePage()
// export {
  
// }

