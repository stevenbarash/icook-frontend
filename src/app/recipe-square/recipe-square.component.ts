import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-recipe-square",
  templateUrl: "./recipe-square.component.html",
  styleUrls: ["./recipe-square.component.css"]
})
export class RecipeSquareComponent implements OnInit {
  //   [name]="recipe.name"
  // [image]="recipe.image"
  // [userId]="recipe.userId"
  // [thumbsUp]="recipe.thumbsUp"
  // [thumbsDown]="recipe.thumbsDown"

  // recipes = MOCKRECIPES;
  @Input() _id: string;
  name: string;
  image: string;
  userId: string;
  thumbsUp: object[];
  thumbsDown: object[];
  likes = 0;
  isCurrentUser: Boolean = localStorage.getItem("userId") == this.userId;

  constructor() {}

  addThumbsUp() {
    fetch(
      "http://localhost:3000/api/recipe/" +
        this._id +
        "/thumbsUp/" +
        localStorage.userId,
      { method: "PATCH" }
    );
    this.likes = this.thumbsUp.length - this.thumbsDown.length;
    location.reload();
  }
  deleteRecipe() {
    fetch("http://localhost:3000/recipe/" + this._id, { method: "DELETE" });
    location.reload();
  }
  addThumbsDown() {
    fetch(
      "http://localhost:3000/api/recipe/" +
        this._id +
        "/thumbsDown/" +
        localStorage.userId,
      { method: "PATCH" }
    );
    this.likes = this.thumbsUp.length - this.thumbsDown.length;
    location.reload();
  }

  async getRecipe() {
    let res = await fetch("http://localhost:3000/api/recipe/" + this._id);
    let data = await res.json();
    return data;
  }

  ngOnInit() {
    this.getRecipe().then(data => {
      this.name = data.data.name;
      this.image = data.data.image;
      this.userId = data.data.userId;
      this.likes = data.data.thumbsUp.length - data.data.thumbsDown.length;
    });
  }
}
