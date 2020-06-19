import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, Platform} from "ionic-angular";
import {CambioPass3} from "../cambio-pass-3/cambio-pass-3";
import {CambioPassService} from "../cambio-pass-service";
import {Utils} from "../../../app/common/utils";

@Component({
  selector: 'page-cambio-pass-2',
  templateUrl: 'cambio-pass-2.html',
})
export class CambioPass2 {
  data:any={};
  username:any;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              private cambioPassService: CambioPassService, public platform: Platform) {
      this.username = this.navParams.get('username');
      platform.ready().then((readySource) => {
          this.platform.registerBackButtonAction(() => {
              this.headerOrButtonAndroidBack();
          }, 0);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambioPass2');
  }
  goPaso3(){
      console.log('Redireccionando ...');
      this.loading_start();
      var request={username:this.username,passwordTemporal:this.data.clave};
      this.cambioPassService.verificaPassTemporal(request).then(
          response => {
              console.log('Response...', response);
              if(response.exitoso){
                  this.navCtrl.push(CambioPass3,{
                      username:this.username,
                      passwordTemporal:this.data.clave
                  });
              }else{
                  Utils.presentToast(response.mensaje, {durations:3500,position:'top'});
                  this.data.clave='';
              }
              this.loading_stop();
          }
      ).catch(err=> {
          this.loading_stop();
          console.log(err);
      });
  }
  headerOrButtonAndroidBack(){
      this.username='';
      this.data.clave='';
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
