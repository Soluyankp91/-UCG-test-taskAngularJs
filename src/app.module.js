// import userListModule from "./user-list-module/user-list.module";
import angular from "angular";

import AppController from "./app.controller";
import template from "./app.template.html";
import userListModule from "./user-list-module/user-list.module";
import AngularRoute from "angular-route";
import UIRouter from "@uirouter/angularjs";
import userDetailsModule from "./user-details-module/user-details.module";
import coreUserModule from "./core/user.module";
import userCreateModule from "./user-create-module/user.create.module";
import index from "./index.css";

const appModule = angular.module("ngApp", [
  AngularRoute,
  UIRouter,
  coreUserModule.name,
  userListModule.name,
  userDetailsModule.name,
  userCreateModule.name,
]);
appModule.config([
  "$routeProvider",
  "$stateProvider",

  function config($routeProvider, $stateProvider) {
    $stateProvider.state("firstState", {
      url: "/home/users",
      template: "<user-list></user-list>",
    });
    $stateProvider.state("secondState", {
      url: "/home/users/:userId",
      template: "<user-details></user-details>",
    });
    $stateProvider.state("thirdState", {
      url: "/home/users/create",
      template: "<user-create></user-create>",
    });
  },
]);
appModule.controller("AppController", AppController);
appModule.component("app", {
  template: template,
  controller: "AppController",
});
