import { Component } from '@angular/core';
import {App, NavController, Platform} from 'ionic-angular';
import {Login} from "../login/login";
import {Registro} from "../registro/registro";
import {MessageService} from "../../app/MessageService";
import {MenuInicio} from "../menu-inicio/menu-inicio";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  host: {
      '(window:resize)': 'onResize($event)'
  }
})
export class HomePage {
  dataPlatform:any={};
  myScreen:any={};
  initWidth:any;
  initHeight:any;
  constructor(public navCtrl: NavController,public platform: Platform, public appCtrl: App,messageService:MessageService) {
      platform.ready().then((readySource) => {
          this.initWidth=platform.width();
          this.initHeight=platform.height();
          messageService.push("redirect:component");
      });
  }

    back() {
        this.navCtrl.setRoot(MenuInicio);
    }

  onResize(event){
        this.initWidth=event.target.innerWidth;
        this.initHeight=event.target.innerHeight;
        //console.log(this.initWidth,this.initHeight);
  }
  goLogin() {
    console.log("Redirigiendo a login...");
    this.navCtrl.setRoot(Login);
  }
  goRegister() {
    console.log("Redirigiendo a registro...");
    this.navCtrl.setRoot(Registro);
  }
}
