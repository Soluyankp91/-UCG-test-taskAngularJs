import angular from "angular";
import template from "./form.template.html";

const coreUserModule = angular
  .module("coreUserModule", [])
  .factory("User", [
    "$resource",
    function ($resource) {
      return {
        User: $resource(
          "data/users.json",
          {},
          {
            query: { method: "Get", params: {}, isArray: true },
          }
        ),
        UserExist: $resource(
          "data/users/isExist",
          {},
          {
            query: { method: "Post", params: {} },
          }
        ),
        UserCreate: $resource(
          "data/users/create",
          {},
          {
            query: { method: "Post", params: {} },
          }
        ),
        UserDelete: $resource(
          "data/users/:userId",
          {},
          {
            query: {
              method: "Delete",
              params: {
                userId: "@userId",
              },
            },
          }
        ),
        UserUpdate: $resource(
          "data/users/:userId",
          {},
          {
            query: {
              method: "Put",
              params: {
                userId: "@userId",
              },
            },
          }
        ),
      };
    },
  ])
  .directive("userExist", [
    "User",
    "$q",
    function ({ UserExist }, $q) {
      return {
        require: "ngModel",
        link: function (scope, element, attrs, ngModel) {
          ngModel.$asyncValidators.userExist = function (
            modelValue,
            viewValue
          ) {
            let def = $q.defer();
            return UserExist.query({ userName: viewValue }).$promise.then(
              (result) => {
                if (!result.isExist) {
                  return true;
                } else if (result.isExist && result.item.id === scope.user.id) {
                  return true;
                } else if (result.isExist && result.item.id !== scope.user.id) {
                  return $q.reject();
                }
              }
            );
          };
        },
      };
    },
  ])
  .directive("passwordMatch", function () {
    return {
      require: "ngModel",
      scope: {
        password: "=passwordMatch",
      },
      link: function (scope, element, attributes, ngModel) {
        ngModel.$validators.passwordMatch = function (modelValue) {
          return modelValue == scope.password;
        };

        scope.$watch("password", function () {
          ngModel.$validate();
        });
      },
    };
  })
  .directive("userForm", function () {
    return {
      scope: {
        user: "=user",
        userForm: "=form",
      },
      restrict: "E",
      template: template,
    };
  });

export default coreUserModule;
