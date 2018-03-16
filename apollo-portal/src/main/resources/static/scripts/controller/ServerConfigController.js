server_config_module.controller('ServerConfigController',
                                ['$scope', '$window', 'toastr', 'ServerConfigService', 'AppUtil',
                                 function ($scope, $window, toastr, ServerConfigService, AppUtil) {

                                     $scope.serverConfig = {};

                                     $scope.create = function () {
                                         ServerConfigService.create($scope.serverConfig).then(function (result) {
                                             toastr.success("Added Successfully");
                                         }, function (result) {
                                             toastr.error(AppUtil.errorMsg(result), "Failed to add");
                                         });
                                     };

                                 }]);
