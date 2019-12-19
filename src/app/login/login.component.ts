import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../localStorageService';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
export interface IUser {
  id?: number;
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LocalStorageService: LocalStorageService<IUser>;
  currentUser: IUser = null;
  user: IUser = {username: '', password: ''};
  constructor(private router: Router, private toastService: ToastService) {
    this.LocalStorageService = new LocalStorageService('user');
   }

  ngOnInit() {
    this.currentUser = this.LocalStorageService.getItemsFromLocalStorage();
    console.log('this.currentUser....', this.currentUser);
    if(this.currentUser != null) {
      this.router.navigate(['contacts']);
    }
  }

  login(user: IUser) {
    console.log('from login user: ', user);
    const defaultUser: IUser = {username: "mgilletteberg", password: "mike6286"};
    if(user.username !== '' && user.password !== '') {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
        // log the user in
        // store user in localStorage
        this.LocalStorageService.saveItemsToLocalStorage(user);
        // navigate to contacts page
        this.router.navigate(['contacts', user]);
      } else {
         //show error toast user
      this.toastService.showToast('danger', 'Login failed! Please check your username or password',  2000,);
      }
    } else {
       //show error toast user
       this.toastService.showToast('danger', 'Login failed! Please specify username or password',  2000,);
    }
  }
}
