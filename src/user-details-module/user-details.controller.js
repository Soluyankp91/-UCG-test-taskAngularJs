const userDetailsController = [
  "$stateParams",
  "$scope",
  "User",
  "$location",
  function ($stateParams, $scope, { User, UserDelete, UserUpdate }, $location) {
    User.get(
      { userId: $stateParams.userId },
      function (user) {
        $scope.user = user;
      },
      function (err) {
        if (err.status === 404) {
          $scope.error = true;
          $scope.errorMessage = err.data.message;
        }
      }
    );
    $scope.deleteUser = function () {
      UserDelete.query({ userId: $scope.user.id }, function () {
        $location.path("/home/users");
      });
    };
    $scope.updateUser = function () {
      UserUpdate.query(
        { userId: $scope.user.id },
        { updatedUser: $scope.user },
        function (res) {
          $location.path("/home/users");
        }
      );
    };
  },
];
export default userDetailsController;
