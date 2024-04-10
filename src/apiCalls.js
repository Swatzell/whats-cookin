// Your fetch requests will live here!

export function fetchUsers() {
    return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
      .then(response => response.json());
  }
  
  export function fetchIngredients() {
    return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
      .then(response => response.json());
  }
  export function fetchRecipes() {
    return fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
      .then(response => response.json());
  }