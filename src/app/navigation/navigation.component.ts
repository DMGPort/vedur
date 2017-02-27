import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private dialog: MdDialog,
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  openLogin(){
    this.dialog.closeAll();
    this.dialog.open(LoginComponent);
  }
  
  logout(){
    this.accountService.logout();
  }

}
