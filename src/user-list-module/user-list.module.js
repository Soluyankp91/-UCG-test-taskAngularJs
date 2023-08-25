import angular from "angular";
import userListController from "./user-list.controller";
import template from "./user-list.template.html";
import userList from "./user-list.template.html";
import ngResource from "angular-resource";
import coreUserModule from "../core/user.module";

const userListModule = angular.module("user-list-module", [
  ngResource,
  coreUserModule.name,
]);

userListModule.controller("userListController", userListController);
userListModule.component("userList", {
  template: template,
  controller: "userListController",
});
export default userListModule;
