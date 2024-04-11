// Your fetch requests will live here!

export function fetchUsers() {
    return fetch("http://localhost:3001/api/v1/users")
      .then(response => response.json());
  }
  
  export function fetchIngredients() {
    return fetch("http://localhost:3001/api/v1/ingredients")
      .then(response => response.json());
  }
  export function fetchRecipes() {
    return fetch("http://localhost:3001/api/v1/recipes")
      .then(response => response.json());
  }

  export function addRecipeToUserCook(userId, recipeId) {
    return fetch("http://localhost:3001/api/v1/usersRecipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userId,
        recipeID: recipeId,
      }),
    })
    .then(response => response.json());
  }