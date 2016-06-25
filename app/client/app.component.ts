import {Observable} from "rxjs/Observable.d";
import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';

import {Login} from './components/login/login';
import {User} from './services/user';

@Component({
  selector: 'my-app',
  templateUrl: 'app/client/app.component.html',
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ User ]
})

@Routes([
    { path: '/login', component: Login }
])

export class AppComponent {
  users: Observable<any>;
  constructor(private _user: User) {
    this.users = this._user.getUsers();
  }
}
