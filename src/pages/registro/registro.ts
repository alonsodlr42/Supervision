import { Component } from '@angular/core';
import {App, LoadingController, NavController, NavParams, Platform} from "ionic-angular";
import {Login} from "../login/login";
import {RegistroService} from "./registro-service";
import {Utils} from "../../app/common/utils";
import {ConfirmacionRegistro} from "./confirmacion-registro/confirmacion-registro";
import {SessionData} from "../../app/common/session-data";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
  host: {
      '(window:resize)': 'onResize($event)'
  }
})
export class Registro {
  cuenta: any = {};
  clienteRequest: any = {};
  loading: any;
  initWidth:any;
  initHeight:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private registroService: RegistroService, public platform: Platform,
              public appCtrl: App, public loadingCtrl: LoadingController) {
      platform.ready().then((readySource) => {
          this.initWidth=platform.width();
          this.initHeight=platform.height();
      });

  }
  onResize(event){
      this.initWidth=event.target.innerWidth;
      this.initHeight=event.target.innerHeight;
  }
  createCount(form):void{
      if(form.valid){
          if(this.cuenta.password==this.cuenta.confirmPassword){
              this.clienteRequest.nombre=this.cuenta.nombre;
              this.clienteRequest.apPaterno=this.cuenta.apellidoPatern;
              //this.clienteRequest.apMaterno=this.cuenta.apellidoMatern;
              this.clienteRequest.telefono=this.cuenta.telefono;
              this.clienteRequest.email=this.cuenta.email;
              this.clienteRequest.password=this.cuenta.password;
              this.clienteRequest.passwordConf=this.cuenta.confirmPassword;
              this.clienteRequest.clavePrograma=SessionData.clavePrograma;
              this.loading_start();
              this.registroService.guardar(this.clienteRequest).then(
                  response => {
                      console.log('Response...', response);
                      if(!response.exitoso){
                          Utils.doAlert(response.mensaje);
                      }else{
                          //Utils.doAlert("Bienvenido(a) :"+response.mensaje);
                          SessionData.cuentaRegistro=this.cuenta;
                          console.log("Redirigiendo a confirmacion...");
                          this.cuenta={};
                          this.navCtrl.setRoot(ConfirmacionRegistro);
                      }
                      this.loading_stop();
                  }
              ).catch(err=> {
                  console.log(err);
                  this.loading_stop();
              });
          }else{
              Utils.doAlert({title:'Error',message:"Las contraseñas no coinciden"})
          }
      }else{
          console.log(form);
          if(form.controls.email.invalid && !form.controls.nombre.invalid && !form.controls.apellidoPatern.invalid && !form.controls.telefono.invalid && !form.controls.password.invalid && !form.controls.confirmPassword.invalid){
              Utils.doAlert({title:'Error',message:"Todos los campos son obligatorios, verifique su correo"})
          }else{
              Utils.doAlert({title:'Error',message:"Todos los campos son obligatorios"})
          }
      }
  }
  goLogin() {
    console.log("Redirigiendo a Login...");
    this.cuenta={};
    this.navCtrl.setRoot(Login);
  }
  back(){
      this.navCtrl.setRoot(HomePage);
  }
  backPages(){
      let nav = this.appCtrl.getActiveNavs()[0];
      let currentPage=nav.getActive();
      console.log(currentPage.name);
      if (currentPage.name=='Registro') {
          console.log("Regresando al home...");
          this.navCtrl.setRoot(HomePage);
      }
  }
  goAviso(){
      console.log("Redirigiendo...");
      window.open('https://871ced4ed4505b0342d9-2b3cc6d30cfadc353fd9a5935c9700e4.ssl.cf1.rackcdn.com/Aviso_de_Privacidad_Flink2Go.pdf','_system','location=yes');
  }
  goTerminos(){
      console.log("Redirigiendo...");
      window.open('https://871ced4ed4505b0342d9-2b3cc6d30cfadc353fd9a5935c9700e4.ssl.cf1.rackcdn.com/Terminos_y_Condiciones_Flink2Go.pdf','_system','location=yes');
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
