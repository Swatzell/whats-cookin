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

  
  export function saveRecipeToServer(userId, recipeId) {
    const requestBody = {
      userID: userId,
      recipeID: recipeId,
    };
  
    console.log("Sending request:", requestBody); 
  
    return fetch("http://localhost:3001/api/v1/usersRecipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
    .then(response => {
      console.log("Received response:", response); 
      return response.json();
    })
    .then(data => {
      console.log("Received data:", data);
      return data;
    })
    .catch(error => {
      console.error("Error:", error);
      throw error;
    });
  }