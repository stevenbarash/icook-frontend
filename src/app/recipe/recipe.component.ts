import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.css"]
})
export class RecipeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  recipeId = this.route.snapshot.paramMap.get("id");

  name = "";
  image = "";
  ingredients = [];
  directions = [];
  intro = "";
  async getRecipe() {
    let res = await fetch("http://localhost:3000/api/recipe/" + this.recipeId);
    let data = await res.json();
    return data;
  }

  ngOnInit() {
    this.getRecipe().then(data => {
      console.log(data);
      this.name = data.data.name;
      this.intro = data.data.intro;
      this.image = data.data.image;
      this.ingredients = data.data.ingredients;
      this.directions = data.data.directions;
    });
  }
}
