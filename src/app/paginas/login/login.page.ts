import { GeneralService } from './../../servicios/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private GeneralService: GeneralService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.username = this.username.trim();
    this.password = this.password.trim();
    if (this.username && this.password) {
      this.GeneralService.irA('/principal');
     
    }
   
  }

  goToRegister() {
    this.GeneralService.irA('/register');


  }

  goToForgotPassword() {
    this.GeneralService.irA('/forgot');

  }


  goToLogin() {
    console.log('go to login');
    this.GeneralService.irA('/principal');
    
  }
}
