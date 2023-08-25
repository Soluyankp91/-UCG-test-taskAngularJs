import angular from "angular";
import template from "./user-create.template.html";
import coreUserModule from "../core/user.module";
import userCreateController from "./user-create.controller";

const userCreateModule = angular.module("user-create-module", [
  coreUserModule.name,
]);

userCreateModule
  .controller("userCreateController", userCreateController)
  .component("userCreate", {
    template: template,
    controller: "userCreateController",
  });
export default userCreateModule;
