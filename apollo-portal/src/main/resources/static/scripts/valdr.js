app_module.config(appValdr);
setting_module.config(appValdr);

function appValdr(valdrProvider) {
    valdrProvider.addConstraints({
                                     'App': {
                                         'appId': {
                                             'size': {
                                                 'max': 32,
                                                 'message': 'The length of AppId should be no longer than 32 characters'
                                             },
                                             'required': {
                                                 'message': 'AppId cannot be null'
                                             }
                                         },
                                         'appName': {
                                             'size': {
                                                 'max': 128,
                                                 'message': 'Application name should be no longer than 128 characters'
                                             },
                                             'required': {
                                                 'message': 'Application name cannot be null'
                                             }
                                         }
                                     }
                                 })
}

cluster_module.config(function (valdrProvider) {
    valdrProvider.addConstraints({
                                     'Cluster': {
                                         'clusterName': {
                                             'size': {
                                                 'max': 32,
                                                 'message': 'Colony name should be no longer than 32 characters'
                                             },
                                             'required': {
                                                 'message': 'Colony name cannot be null'
                                             }
                                         }
                                     }
                                 })
});

namespace_module.config(function (valdrProvider) {
    valdrProvider.addConstraints({
                                     'AppNamespace': {
                                         'namespaceName': {
                                             'size': {
                                                 'max': 32,
                                                 'message': 'The name of Namespace should be no longer than 32 characters'
                                             },
                                             'required': {
                                                 'message': 'The name of Namespace cannot be null'
                                             }
                                         },
                                         'comment': {
                                             'size': {
                                                 'max': 64,
                                                 'message': 'Memo should be no longer than 64 characters'
                                             }
                                         }
                                     }
                                 })
});

application_module.config(function (valdrProvider) {
    valdrProvider.addConstraints({
                                     'Item': {
                                         'key': {
                                             'size': {
                                                 'max': 128,
                                                 'message': 'The length of Key should be no longer than 128 characters'
                                             },
                                             'required': {
                                                 'message': 'Key cannot be null'
                                             }
                                         }, 
                                         'value': {
                                             'required': {
                                                 'message': 'value cannot be null'
                                             }
                                         },
                                         'comment': {
                                             'size': {
                                                 'max': 64,
                                                 'message': 'Memo should be no longer than 64 characters'
                                             }
                                         }
                                     },
                                     'Release': {
                                         'releaseName': {
                                             'size': {
                                                 'max': 64,
                                                 'message': 'Release Name should be no longer than 64 characters'
                                             },
                                             'required': {
                                                 'message': 'Release Name cannot be null'
                                             }
                                         },
                                         'comment': {
                                             'size': {
                                                 'max': 64,
                                                 'message': 'Memo should be no longer than 64 characters'
                                             }
                                         }
                                     }
                                 })
});


