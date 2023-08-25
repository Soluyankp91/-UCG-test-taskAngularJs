const userListController = [
  "$scope",
  "User",
  function ($scope, { User }) {
    $scope.users = User.query();
  },
];
export default userListController;
