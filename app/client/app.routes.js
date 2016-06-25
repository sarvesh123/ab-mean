"use strict";
var router_1 = require('@angular/router');
var login_1 = require('./components/login/login');
exports.routes = [
    { path: 'login', component: login_1.Login },
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map