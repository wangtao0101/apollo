open_manage_module.controller('OpenManageController',
                              ['$scope', 'toastr', 'AppUtil', 'OrganizationService', 'ConsumerService', 'PermissionService',
                               OpenManageController]);

function OpenManageController($scope, toastr, AppUtil, OrganizationService, ConsumerService, PermissionService) {

    var $orgWidget = $('#organization');

    $scope.consumer = {};
    $scope.consumerRole = {
        type: 'NamespaceRole'
    };

    $scope.submitBtnDisabled = false;
    $scope.userSelectWidgetId = 'toAssignMasterRoleUser';

    $scope.getTokenByAppId = getTokenByAppId;
    $scope.createConsumer = createConsumer;
    $scope.assignRoleToConsumer = assignRoleToConsumer;

    init();

    function init() {
        initOrganization();
        initPermission();

    }

    function initOrganization() {
        OrganizationService.find_organizations().then(function (result) {
            var organizations = [];
            result.forEach(function (item) {
                var org = {};
                org.id = item.orgId;
                org.text = item.orgName + '(' + item.orgId + ')';
                org.name = item.orgName;
                organizations.push(org);
            });
            $orgWidget.select2({
                                   placeholder: 'Please select department',
                                   width: '100%',
                                   data: organizations
                               });
        }, function (result) {
            toastr.error(AppUtil.errorMsg(result), "load organizations error");
        });
    }

    function initPermission() {
        PermissionService.has_root_permission()
            .then(function (result) {
                  $scope.isRootUser = result.hasPermission;
            })
    }

    function getTokenByAppId() {
        if (!$scope.consumer.appId) {
            toastr.warning("Please enter appId");
            return;
        }

        ConsumerService.getConsumerTokenByAppId($scope.consumer.appId)
            .then(function (consumerToken) {

                if (consumerToken.token) {
                    $scope.consumerToken = consumerToken;
                    $scope.consumerRole.token = consumerToken.token;
                } else {
                    $scope.consumerToken = {token: 'App(' + $scope.consumer.appId + ')Not created, please create first'};
                }
            })
    }

    function createConsumer() {
        $scope.submitBtnDisabled = true;

        if (!$scope.consumer.appId) {
            toastr.warning("Please enter appId");
            return;
        }
        var selectedOrg = $orgWidget.select2('data')[0];

        if (!selectedOrg.id) {
            toastr.warning("Please select department");
            return;
        }

        $scope.consumer.orgId = selectedOrg.id;
        $scope.consumer.orgName = selectedOrg.name;

        // owner
        var owner = $('.ownerSelector').select2('data')[0];
        if (!owner) {
            toastr.warning("Please select application leader");
            return;
        }
        $scope.consumer.ownerName = owner.id;

        ConsumerService.createConsumer($scope.consumer)
            .then(function (consumerToken) {
                toastr.success("Created Successfully");
                $scope.consumerToken = consumerToken;
                $scope.consumerRole.token = consumerToken.token;
                $scope.submitBtnDisabled = false;
                $scope.consumer = {};
            }, function (response) {
                AppUtil.showErrorMsg(response, "Creation Failed");
                $scope.submitBtnDisabled = false;
            })

    }

    function assignRoleToConsumer() {
        ConsumerService.assignRoleToConsumer($scope.consumerRole.token,
                                             $scope.consumerRole.type,
                                             $scope.consumerRole.appId,
                                             $scope.consumerRole.namespaceName)
            .then(function (consumerRoles) {
                toastr.success("Assignment succeeded");
            }, function (response) {
                AppUtil.showErrorMsg(response, "Assignment failed");
            })
    }
    
}
