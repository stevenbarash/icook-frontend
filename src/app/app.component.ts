import { Component } from "@angular/core";
import { AuthService } from "../app/auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(public authService: AuthService) {
    this.isLoggedIn = localStorage.getItem("userId") == null;
    this.currentUser = localStorage.getItem("userId");
  }

  logout() {
    this.authService.logout();
    location.reload();
  }

  isLoggedIn: Boolean;
  currentUser: string;

  title = "icook-frontend";
}
