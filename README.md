# Just Cook It!

This single-page application was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.25. for the SoftUni Angular exam (April 2022).

## Public Part

Guest users can visit the Home Page, the About Page, see the recipe previews on the Recipes Page and the recipe details on the Recipe Page.

In order to gain access to more functionality, guest users can register and log in from the Register/Login Page.

## Private Part

### Recipes

Authenticated users can post their own recipe from the New-Recipe Page. They can like and unlike recipes created by other users, as well as edit and delete their own recipes.

### Account

They can view their account details on the Account Page.

From the Edit Account Page they can edit their account information (username or email), access the Change Password Page or delete their account.

### My Recipes & My Favorites

A list of the user's recipes, as well as one of the recipes the user has liked, is available both from the header navigation of the page and from the Account Page.

## Back End

The application communicates with a REST API written in NodeJS and using Express. MongoDB and Mongoose take care of the data storage.