(function (global) {

var dc = {};

// Aapke project me ye file hai
var homeHtml = "food-snippet.html";

var allCategoriesUrl =
  "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
var menuItemsUrl =
  "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}'
// with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string.replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};

// --------- Module 5 Code Starts Here ---------

// STEP 1: Choose a random category
function chooseRandomCategory(categories) {
  var randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex].short_name;
}

// STEP 2: Replace placeholder {{randomCategoryShortName}}
function substituteCategoryShortName(snippet, shortName) {
  return snippet.replace("{{randomCategoryShortName}}", "'" + shortName + "'");
}

// --------- Module 5 Code Ends Here ---------

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

  // On first load, show home view
  showLoading("#main-content");

  // STEP 3: Get categories
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    function (categories) {

      // STEP 4: Get food-snippet.html
      $ajaxUtils.sendGetRequest(
        homeHtml,
        function (homeHtmlResponse) {
          // STEP 5: Insert random category into snippet
          var randomCategoryShortName = chooseRandomCategory(categories);
          var homeHtmlToInsertIntoMainPage =
            substituteCategoryShortName(homeHtmlResponse, randomCategoryShortName);
          insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
        },
        false);
    });
});

global.$dc = dc;

})(window);
