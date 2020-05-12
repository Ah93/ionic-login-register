import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { RegisterData } from 'src/models/registerData/register-data-interface';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    registerData = {} as RegisterData;
    
    registerData$: AngularFireList<any>;
  constructor(public NavCtrl: NavController,  private database: AngularFireDatabase, public fAuth: AngularFireAuth) { 
         this.registerData$ = this.database.list('users');
  }

  ngOnInit() {
  }

  // addUserData(registerData: RegisterData){
  //    this.registerData$.push({
  //      name: this.registerData.name,
  //      age: Number(this.registerData.age),
  //      username: this.registerData.username,
  //      password: this.registerData.password
  //    });

  //    this.registerData = {} as RegisterData;
     
  //    this.NavCtrl.pop();
  // }

  async register() {
    try {
      var r = await this.fAuth.auth.createUserWithEmailAndPassword(
        this.registerData.email,
        this.registerData.password
      );
      if (r) {
        console.log("Successfully registered!");
        this.NavCtrl.navigateRoot('/login');
      }

    } catch (err) {
      console.error(err);
    }
  }

}
