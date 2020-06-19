import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, Platform} from "ionic-angular";
import {CambioPass2} from "./cambio-pass-2/cambio-pass-2";
import {CambioPassService} from "./cambio-pass-service";
import {Utils} from "../../app/common/utils";

@Component({
  selector: 'page-cambio-pass',
  templateUrl: 'cambio-pass.html',
})
export class CambioPass {
  data: any ={};
  loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              private cambioPassService: CambioPassService, public platform: Platform) {
      platform.ready().then((readySource) => {
          this.platform.registerBackButtonAction(() => {
              this.headerOrButtonAndroidBack();
          }, 0);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambioPass');
  }

  goPaso2(){
    console.log('Redireccionando ...');
      this.loading_start();
      this.cambioPassService.enviarInstrucciones(this.data.email).then(
          response => {
              if(response.exitoso){
                  Utils.presentToast(response.mensaje, {durations:3500,position:'top'});
                  this.navCtrl.push(CambioPass2,{
                      username:this.data.email
                  });
              }else{
                  if(response.mensaje.indexOf('not found')!=-1){
                      Utils.presentToast("Usuario no registrado", {durations:3500,position:'top'});
                  }else{
                      Utils.presentToast(response.mensaje, {durations:3500,position:'top'});
                  }
              }
              console.log('Response...', response);
              this.loading_stop();
          }
      ).catch(err=> {
          console.log(err);
          Utils.presentToast("Ha ocurrido un error, inténtelo más tarde.", {durations:3500,position:'top'});
          this.loading_stop();
      });
  }
  headerOrButtonAndroidBack(){
      //this.navCtrl.setRoot(CambioPass);
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
