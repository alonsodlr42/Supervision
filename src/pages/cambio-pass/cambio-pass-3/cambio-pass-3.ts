import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, Platform} from "ionic-angular";
import {Login} from "../../login/login";
import {CambioPassService} from "../cambio-pass-service";
import {Utils} from "../../../app/common/utils";

@Component({
  selector: 'page-cambio-pass-3',
  templateUrl: 'cambio-pass-3.html',
})
export class CambioPass3 {
  data:any={};
  username:any;
  passwordTemporal:any;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              private cambioPassService: CambioPassService, public platform: Platform) {
      this.username = this.navParams.get('username');
      this.passwordTemporal = this.navParams.get('passwordTemporal');
      platform.ready().then((readySource) => {
          this.platform.registerBackButtonAction(() => {
              this.headerOrButtonAndroidBack();
          }, 0);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambioPass3');
  }
  goLogin() {
    if(this.data.password==this.data.confirmPassword) {
        this.loading_start();
        var request={username:this.username,newPassword:this.data.password,passwordTemporal:this.passwordTemporal};
        this.cambioPassService.setNewPassword(request).then(
            response => {
                if(response.exitoso){
                    Utils.presentToast(response.mensaje, {durations:3500,position:'top'});
                    this.navCtrl.setRoot(Login);
                }else{
                    Utils.presentToast("Ha ocurrido un error, inténtalo más tarde.", {durations:3500,position:'top'});
                    this.navCtrl.setRoot(Login);
                }
                this.loading_stop();
                console.log('Response...', response);
            }
        ).catch(err=> {
            console.log(err);
            this.loading_stop();
        });
    }else{
        Utils.presentToast("Las contraseñas no coinciden, inténtalo de nuevo.", {durations:3500,position:'top'});
    }
  }
  headerOrButtonAndroidBack(){
      this.navCtrl.pop();
  }
  loading_start() {
      this.loading = this.loadingCtrl.create({
          spinner: 'bubbles'
      });
      this.loading.present();
  }
  loading_stop() {
      if(this.loading) {
          this.loading.dismiss();
          this.loading = null;
      }
  }
}
