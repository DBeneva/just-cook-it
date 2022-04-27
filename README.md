# Just Cook It!

A single-page application created for the SoftUni Angular exam (April 2022)

## Public Part

Guest users can visit the Home Page, the About Page and browse through all recipe previews on the Recipes Page.

In order to gain access to more functionality, guest users can register and log in from the Register/Login Page.

## Private Part

Authenticated users can view recipe details on the Recipe Page and post their own recipe from the New-Recipe Page. They can like and unlike recipes created by other users, as well as edit and delete their own recipes.

They can view their account details on the Account Page.

From the Edit Account Page they can edit their account information (username or email), access the Change Password Page or delete their account.

A list of the user's recipes, as well as one of the recipes the user has liked, is available both from the header navigation of the page and from the Account Page.

## Back End

The application communicates with a REST API written in NodeJS and using Express. MongoDB and Mongoose take care of the data storage.