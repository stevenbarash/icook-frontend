import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Recipe } from "../models/Recipe";

var ObjectID = require("bson-objectid");

@Component({
  selector: "app-create-recipe",
  templateUrl: "./create-recipe.component.html",
  styleUrls: ["./create-recipe.component.css"]
})
export class CreateRecipeComponent implements OnInit {
  newRecipe: Recipe = {
    nutrition: {},
    _id: "",
    thumbsDown: [],
    thumbsUp: [],
    name: "",
    userId: "",
    intro: "",
    ingredients: [],
    directions: [],
    servings: 0,
    image: "",
    __v: 0
  };
  @ViewChild("ingredientInput", { static: false }) ingredientInput: ElementRef;
  @ViewChild("directionInput", { static: false }) directionInput: ElementRef;
  @ViewChild("introInput", { static: false }) introInput: ElementRef;
  @ViewChild("nameInput", { static: false }) nameInput: ElementRef;
  @ViewChild("servingsInput", { static: false }) servingsInput: ElementRef;
  @ViewChild("caloriesInput", { static: false }) caloriesInput: ElementRef;
  @ViewChild("ingredientQuantityInput", { static: false })
  ingredientQuantityInput: ElementRef;

  addIngredient() {
    this.newRecipe.ingredients.push({
      ingredient: this.ingredientInput.nativeElement.value,
      quantity: this.ingredientQuantityInput.nativeElement.value
    });
    this.ingredientInput.nativeElement.value = "";
    this.ingredientQuantityInput.nativeElement.value = "";
  }

  addDirection() {
    this.newRecipe.directions.push({
      direction: this.directionInput.nativeElement.value
    });
    this.directionInput.nativeElement.value = "";
  }

  constructor() {}
  saveRecipe() {
    this.newRecipe.name = this.nameInput.nativeElement.value;
    this.newRecipe.servings = this.servingsInput.nativeElement.value;
    this.newRecipe.intro = this.introInput.nativeElement.value;
    this.newRecipe.image =
      "https://pitt.box.com/shared/static/1x19swwtrs2em9o75j02e8w9c8nkqi3l.png";
    //TODO change to actual ID of currently logged in user
    this.newRecipe.userId = "5deb662f1c9d440000844437";

    this.newRecipe.nutrition = {
      calories: this.caloriesInput.nativeElement.value
    };
    //set id of recipe to generated uuid
    (async () => {
      const rawResponse = await fetch("http://localhost:3000/api/recipe", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.newRecipe)
      });
      const content = await rawResponse.json();

      console.log(content);
    })();
  }

  ngOnInit() {
    this.newRecipe._id = ObjectID();
  }
}
