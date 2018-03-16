login_module.controller('LoginController',
                       ['$scope', '$window', '$location', 'toastr', 'AppUtil',
                        LoginController]);

function LoginController($scope, $window, $location, toastr, AppUtil) {
    if ($location.$$url) {
        var params = AppUtil.parseParams($location.$$url);
        if (params.error) {
            $scope.info = "Username or password is incorrect";
        }
        if (params.logout) {
            $scope.info = "Successfully logged out";
        }
    }

}
