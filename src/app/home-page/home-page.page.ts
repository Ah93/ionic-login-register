import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  userEmail: string;
  constructor(public router: Router, public NavCtrl: NavController, public fAuth: AngularFireAuth
    ) { }

  ngOnInit() {
    //this.logout();
    this.userDetailsd();
  }
  userDetails() {
    return this.fAuth.user
  }
  userDetailsd() {
    this.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.NavCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })
  }

  
  logout() {
    return this.fAuth.auth.signOut().then(() => {
      //localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }
}
