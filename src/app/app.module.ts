import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipeSquareComponent } from "./recipe-square/recipe-square.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { UserComponent } from "./user/user.component";
import { CreateRecipeComponent } from "./create-recipe/create-recipe.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule
} from "@angular/material";

import { PostCreateComponent } from "./posts/post-create/post-create.component";

import { PostListComponent } from "./posts/post-list/post-list.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "recipe/:id", component: RecipeComponent },
  { path: "user/:id", component: UserComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "newRecipe", component: CreateRecipeComponent },
  { path: "", component: PostListComponent },
  { path: "create", component: PostCreateComponent, canActivate: [AuthGuard] },
  {
    path: "edit/:postId",
    component: PostCreateComponent,
    canActivate: [AuthGuard]
  },

  // {
  //   path: "heroes",
  //   component: HeroListComponent,
  //   data: { title: "Heroes List" }
  // },
  {
    path: "",
    redirectTo: "/",
    pathMatch: "full"
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecipeComponent,
    RecipeSquareComponent,
    PageNotFoundComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    CreateRecipeComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
