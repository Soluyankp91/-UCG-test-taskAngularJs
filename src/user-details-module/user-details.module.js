import angular from "angular";
import userDetailsController from "./user-details.controller";
import template from "./user-details.template.html";
import coreUserModule from "../core/user.module";

const userDetailsModule = angular.module("user-details-module", [
  coreUserModule.name,
]);

userDetailsModule
  .controller("userDetailsController", userDetailsController)
  .component("userDetails", {
    template: template,
    controller: "userDetailsController",
  });
export default userDetailsModule;
