import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-recipe-square",
  templateUrl: "./recipe-square.component.html",
  styleUrls: ["./recipe-square.component.css"]
})
export class RecipeSquareComponent implements OnInit {
  // recipes = MOCKRECIPES;
  @Input() _id: string;
  @Input() name: string;
  @Input() image: string;
  @Input() userId: string;
  @Input() thumbsUp: object[];
  @Input() thumbsDown: object[];
  likes = 0;
  constructor() {}

  addThumbsUp() {
    //TODO add current session user
    fetch(
      "http://localhost:3000/api/recipe/" +
        this._id +
        "/thumbsUp/5deb662f1c9d440000844437",
      { method: "PATCH" }
    );
  }
  addThumbsDown() {
    //TODO add current session user
    fetch(
      "http://localhost:3000/api/recipe/" +
        this._id +
        "/thumbsDown/5deb662f1c9d440000844437"
    );
  }

  ngOnInit() {
    this.likes = this.thumbsUp.length - this.thumbsDown.length;
  }
}
