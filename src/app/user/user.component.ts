import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Router } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  userId: string;
  email: string;
  recipes: object[];
  async getUserInfo() {
    let res = await fetch(
      "http://localhost:3000/api/user/" + localStorage.getItem("userId")
    );
    let data = await res.json();
    return data;
  }

  async getUserInfoAsync() {
    // var res = await fetch("http://localhost:3000");
    var query = localStorage.getItem("userId");

    let res = await fetch("http://localhost:3000/api/user/" + query);
    var data = res.json();

    return data;

    // let data = res.json();

    // this.recipes = data;
  }

  ngOnInit() {
    if (localStorage.getItem("userId") == null) {
      this.router.navigate(["/login"]);
    }
    this.userId = localStorage.getItem("userId");
    this.getUserInfoAsync().then(data => {
      this.recipes = data.data.recipes;
    });
    console.log(this.recipes);
  }
}
