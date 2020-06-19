import {Component, Input} from '@angular/core';
import {App, IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {SessionData} from "../../app/common/session-data";
import {Utils} from "../../app/common/utils";
import {Login} from "../login/login";
import {HttpWrapper} from "../../app/common/http-wrapper";

@Component({
  selector: 'page-header',
  templateUrl: 'header.html',
})
export class HeaderPage {
  cuenta:any;
  @Input() isOrdenDiaPage:boolean=false;
  @Input() isProduccionPage:boolean=false;
  @Input() isEmpacadoPage:boolean=false;
  @Input() namePage:any=null;
  @Input() ordenHeader:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App, public platform: Platform, public menuCtrl: MenuController,public httpr: HttpWrapper) {
    //console.log("cuentalogged: ", SessionData.cuentalogged);
    this.cuenta=SessionData.cuentaslogged[0];
  }

  ionViewDidLoad() {
  }

  openMenu() {

  }
  exitConfirm(){
    console.log("Exit...");
    Utils.showConfirm({
      title: "Cerrar sesión", message: "¿Estás seguro que deseas cerrar tu sesión?", okCallback: () => {
        localStorage.removeItem('logo');
        sessionStorage.removeItem('j_username');
        sessionStorage.removeItem('j_password');
        this.httpr.headers.set('j_username', '');
        this.httpr.headers.set('j_password', '');
        this.navCtrl.setRoot(Login);
      }, failCallback: () => {

      }
    });
  }

}
