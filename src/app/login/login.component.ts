import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  loginGoogle(){
    this.accountService.preLogin();
  }
  loginFacebook(){
    this.accountService.facebook();
  }

}