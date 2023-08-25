const userCreateController = [
  "User",
  "$scope",
  "$location",
  function ({ UserCreate }, $scope, $location) {
    $scope.user = {};
    $scope.createUser = function () {
      UserCreate.query({ user: $scope.user }, function (res) {
        $location.path("/home/users");
      });
    };
  },
];
export default userCreateController;
