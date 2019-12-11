import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @ViewChild("searchBox", { static: false }) searchBox: ElementRef;
  @ViewChild("errText", { static: false }) errText: ElementRef;

  recipes = [];
  constructor() {}

  async getAllRecipes() {
    var res = await fetch("http://localhost:3000/api/recipe/all");
    var data = res.json();
    return data;
  }

  async getResultsAsync() {
    // var res = await fetch("http://localhost:3000");
    var query = this.searchBox.nativeElement.value;

    let res = await fetch(
      "http://localhost:3000/api/search/recipe?text=" + query
    );
    var data = res.json();

    return data;

    // let data = res.json();

    // this.recipes = data;
  }

  ngOnInit() {
    this.getAllRecipes().then(data => {
      this.recipes = data.data;
    });
    if (this.recipes.length == 0) {
      this.errText.nativeElement.innerHTML = "404:Error retrieving recipes...";
    } else {
      this.errText.nativeElement.innerHTML = "";
    }
    // this.recipes.sort((a, b) => {
    //   return a.thumbsUp.count - b.thumbsDown.count;
    // });

    // console.log("poo" + this.recipes);
  }
  getResults() {
    this.getResultsAsync().then(data => {
      this.recipes = data.data;
      if (data.data.length == 0) {
        this.errText.nativeElement.innerHTML = "Did not find any results...";
      } else {
        this.errText.nativeElement.innerHTML = "";
      }
    });
  }
}
