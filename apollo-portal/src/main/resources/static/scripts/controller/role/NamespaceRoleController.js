role_module.controller('NamespaceRoleController',
                       ['$scope', '$location', '$window', 'toastr', 'AppService', 'UserService', 'AppUtil',
                        'PermissionService',
                        function ($scope, $location, $window, toastr, AppService, UserService, AppUtil,
                                  PermissionService) {

                            var params = AppUtil.parseParams($location.$$url);
                            $scope.pageContext = {
                                appId: params.appid,
                                namespaceName: params.namespaceName
                            };

                            $scope.modifyRoleSubmitBtnDisabled = false;
                            $scope.ReleaseRoleSubmitBtnDisabled = false;

                            $scope.releaseRoleWidgetId = 'releaseRoleWidgetId';
                            $scope.modifyRoleWidgetId = 'modifyRoleWidgetId';

                            PermissionService.has_assign_user_permission($scope.pageContext.appId)
                                .then(function (result) {
                                    $scope.hasAssignUserPermission = result.hasPermission;
                                }, function (reslt) {

                                });

                            PermissionService.get_namespace_role_users($scope.pageContext.appId,
                                                                       $scope.pageContext.namespaceName)
                                .then(function (result) {
                                    $scope.rolesAssignedUsers = result;
                                }, function (result) {
                                    toastr.error(AppUtil.errorMsg(result), "An error has occurred while loading the authorized user");
                                });

                            $scope.assignRoleToUser = function (roleType) {
                                if ('ReleaseNamespace' == roleType) {
                                    var user = $('.' + $scope.releaseRoleWidgetId).select2('data')[0];
                                    if (!user) {
                                        toastr.warning("Please select user");
                                        return;
                                    }
                                    $scope.ReleaseRoleSubmitBtnDisabled = true;
                                    var toAssignReleaseNamespaceRoleUser = user.id;
                                    PermissionService.assign_release_namespace_role($scope.pageContext.appId,
                                                                                    $scope.pageContext.namespaceName,
                                                                                    toAssignReleaseNamespaceRoleUser)
                                        .then(function (result) {
                                            toastr.success("Added Successfully");
                                            $scope.ReleaseRoleSubmitBtnDisabled = false;
                                            $scope.rolesAssignedUsers.releaseRoleUsers.push(
                                                {userId: toAssignReleaseNamespaceRoleUser});
                                            $('.' + $scope.releaseRoleWidgetId).select2("val", "");
                                        }, function (result) {
                                            $scope.ReleaseRoleSubmitBtnDisabled = false;
                                            toastr.error(AppUtil.errorMsg(result), "Failed to add");
                                        });
                                } else {
                                    var user = $('.' + $scope.modifyRoleWidgetId).select2('data')[0];
                                    if (!user) {
                                        toastr.warning("Please select user");
                                        return;
                                    }
                                    $scope.modifyRoleSubmitBtnDisabled = true;
                                    var toAssignModifyNamespaceRoleUser = user.id;
                                    PermissionService.assign_modify_namespace_role($scope.pageContext.appId,
                                                                                   $scope.pageContext.namespaceName,
                                                                                   toAssignModifyNamespaceRoleUser)
                                        .then(function (result) {
                                            toastr.success("Added Successfully");
                                            $scope.modifyRoleSubmitBtnDisabled = false;
                                            $scope.rolesAssignedUsers.modifyRoleUsers.push(
                                                {userId: toAssignModifyNamespaceRoleUser});
                                            $('.' + $scope.modifyRoleWidgetId).select2("val", "");
                                        }, function (result) {
                                            $scope.modifyRoleSubmitBtnDisabled = false;
                                            toastr.error(AppUtil.errorMsg(result), "Failed to add");
                                        });
                                }
                            };

                            $scope.removeUserRole = function (roleType, user) {
                                if ('ReleaseNamespace' == roleType) {
                                    PermissionService.remove_release_namespace_role($scope.pageContext.appId,
                                                                                    $scope.pageContext.namespaceName,
                                                                                    user)
                                        .then(function (result) {
                                            toastr.success("Deleted Successfully");
                                            removeUserFromList($scope.rolesAssignedUsers.releaseRoleUsers, user);
                                        }, function (result) {
                                            toastr.error(AppUtil.errorMsg(result), "Failed to delete");
                                        });
                                } else {
                                    PermissionService.remove_modify_namespace_role($scope.pageContext.appId,
                                                                                   $scope.pageContext.namespaceName,
                                                                                   user)
                                        .then(function (result) {
                                            toastr.success("Deleted Successfully");
                                            removeUserFromList($scope.rolesAssignedUsers.modifyRoleUsers, user);
                                        }, function (result) {
                                            toastr.error(AppUtil.errorMsg(result), "Failed to delete");
                                        });
                                }
                            };

                            function removeUserFromList(list, user) {
                                var index = 0;
                                for (var i = 0; i < list.length; i++) {
                                    if (list[i].userId == user) {
                                        index = i;
                                        break;
                                    }
                                }
                                list.splice(index, 1);
                            }

                        }]);
