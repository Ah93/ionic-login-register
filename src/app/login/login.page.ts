import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { RegisterData } from 'src/models/registerData/register-data-interface';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  registerData = {} as RegisterData;
  constructor(public NavCtrl: NavController,  private database: AngularFireDatabase, public fAuth: AngularFireAuth, public alertController: AlertController) { }

  async login() {
    try {
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.registerData.email,
        this.registerData.password
      );
      if (r) {
        console.log("Successfully logged in!");
        this.NavCtrl.navigateRoot('/home-page');
      }else{
        this.presentAlert();
        //console.log("Invalid username and password!");
      }

    } catch (err) {
      this.presentAlert();
      console.error("Invalid username and password" + err);
    }
  }
  ngOnInit() {
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: 'Invalid username and password!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
