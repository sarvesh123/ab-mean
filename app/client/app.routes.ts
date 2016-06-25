import { provideRouter, RouterConfig } from '@angular/router';

import { Login }  from './components/login/login';

export const routes: RouterConfig = [
  { path: 'login', component: Login },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
