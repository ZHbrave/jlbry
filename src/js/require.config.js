require.config({
    baseUrl: "/",
    paths:{
        "jquery":"libs/jquery/jquery-3.2.1",
        "header":"js/model/header",
        "url":"js/model/url",
        "cookie":"libs/jquery-plugins/jquery.cookie"    
    },
    //垫片，
    shim:{
        "cookie":{
            deps:['jquery']
        }
    }
})
// require.config({
//     baseUrl: "/",
//     paths: {
//         "jquery": "libs/jquery/jquery-3.2.1",
//         "header": "js/model/header",
//         "url": "js/model/url",
//         "cookie": "libs/jquery-plugins/jquery.cookie"
//     },
//     shim: {
//         "cookie" : {
//             deps: ['jquery']
//         }
//     }
// })