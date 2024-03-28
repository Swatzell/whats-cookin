import recipeData from "./data/recipes";

//NEW QUERYSELECTORS
const homeSection = document.querySelector('.main-page');
const recipesSection = document.getElementById('recipes-section');
const ingredientsSection = document.getElementById('ingredients-section');
const featuredRecipesSection = document.querySelector(".featured-recipes");
const allRecipesSection = document.querySelector(".all-recipes");

// window.addEventListener('DOMContentLoaded', createFeaturedRecipe);



// Function to hide all sections
// function hideAllSections() {
//   homeSection.classList.add('hidden');
//   recipesSection.classList.add('hidden');
//   ingredientsSection.classList.add('hidden');
// }

function hideHomeSection() {
  homeSection.classList.add('hidden');
  allRecipesSection.classList.remove('hidden')
}

// Function to show a specified section
function showSection(section) {
  section.classList.remove('hidden');
}

// Event listener for the navigation links
document.querySelectorAll('.topnav a').forEach(link => {
  link.addEventListener('click', function(event) {
    // Prevent default suggested by chat
    event.preventDefault();
    
    // Invoke hide all sections
    hideHomeSection();
    
    // Once all sections are hidden, immediately show the proper section based on the href attribute
    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    showSection(targetSection);
    console.log(`'NOW YOU"RE ON ${targetSection}'`)
  });
});

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

