import { expect } from "chai";
import {
  findRecipeTags,
  searchRecipeName as searchRecipeName,
  createRecipesNeeded,
  calculateRecipeCost,
  getRecipeInstructions,
} from "../src/recipes";
import ingredientsData from "../src/data/ingredients";
import constants from "./test-prompts";
import recipeArray from "./test-array"


describe("Recipe Tag", () => {
 it("Should return a filtered list of recipes based on a tag", () => {
    const recipe = findRecipeTags(recipeArray, "sauce");
    expect(recipe[0].name).to.deep.equal("Dirty Steve's Original Wing Sauce");
  });

  it("Should return a filtered list of recipes based on a tag regardless of case sensitivity", () => {
    const recipe = findRecipeTags(recipeArray, "sauce");
    expect(recipe[0].name).to.deep.equal("Dirty Steve's Original Wing Sauce");
  });

  it.skip("Should return an empty array if nothing is found", () => {
    const recipe = findRecipeTags(recipeArray, "sace");
    expect(recipe[0].name).to.deep.equal(null);
  });


  describe("Recipe Ingredient", () => {
  it("Should return a filtered list of recipes based on a tag", () => {
    const recipe = searchRecipeName(recipeArray, "Salad");
    expect(recipe).to.deep.equal(constants.saladArray);
    });
  });

  it("Should account for case sensitivity and spacing", () => {
    const recipe = searchRecipeName(recipeArray, "sala ");
    expect(recipe).to.deep.equal(constants.saladArray);
  });
});


describe("Recipe Ingredient List", () => {
  it("Should create a list of ingredients for a given recipe ID", () => {
    const ingredients = createRecipesNeeded(
      595736,
      recipeArray,
      ingredientsData
    );
    expect(ingredients).to.deep.equal(constants.expectedIngredients);
  });

  it("Should calculate the cost of a given recipe’s ingredients", () => {
    const cost = calculateRecipeCost(595736, recipeArray, ingredientsData);
    expect(cost).to.equal(177.76);
  });

  it("Should return the directions / instructions for a given recipe", () => {
    const instructions = getRecipeInstructions(595736, recipeArray);
    expect(instructions).to.deep.equal(constants.recipeTemplate);
  });
});

//<><><><><>TO DO: Create Filter for two tags<><><><><>
