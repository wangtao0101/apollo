user_module.controller('UserController',
                      ['$scope', '$window', 'toastr', 'AppUtil', 'UserService',
                       UserController]);

function UserController($scope, $window, toastr, AppUtil, UserService) {

    $scope.user = {};
    
    $scope.createOrUpdateUser = function () {
        UserService.createOrUpdateUser($scope.user).then(function (result) {
            toastr.success("User created successfully");
        }, function (result) {
            AppUtil.showErrorMsg(result, "User creation failed");
        })

    }
}
