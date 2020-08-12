import {Component} from "@angular/core";
import {App, LoadingController, NavController, NavParams, Platform} from "ionic-angular";
import {LoginServices} from "./login-service";
import {Utils} from "../../app/common/utils";
import {SessionData} from "../../app/common/session-data";
import {MenuInicio} from "../menu-inicio/menu-inicio";
import {HomePage} from "../home/home";
import {Registro} from "../registro/registro";

import {CambioPass} from "../cambio-pass/cambio-pass";
import {MessageService} from "../../app/MessageService";
import {EntregasPage} from "../mensajeros/mensajeros";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class Login {
  user: any = {username: "", password: ""};
  initWidth: any;
  initHeight: any;
  reacomodo: boolean = false;

  constructor(public platform: Platform,
              public navCtrl: NavController,
              public navParams: NavParams,
              private loginServices: LoginServices,
              public appCtrl: App,
              public messageService: MessageService,
              public loadingController: LoadingController) {
    if (window.screen.width <= 576) {
      this.reacomodo = false;
    } else {
      this.reacomodo = true;
    }
    platform.ready().then((readySource) => {
      this.initWidth = platform.width();
      this.initHeight = platform.height();
      this.messageService.push("redirect:component");
    });

    if (this.navParams.data == null) {
      this.user = {username: '', password: ''};
    } else if (navParams.data != null && localStorage.getItem('userActive') == 'false') {
      const loading = this.loadingController.create({
        content: 'Espere un momento...'
      });
      loading.present();
      this.loginServices.loginFunc(navParams.data, true, () => {
        this.navCtrl.setRoot(EntregasPage);
        localStorage.setItem('userActive', 'false');
      })
      loading.dismiss();
    } else {
      this.user = {username: '', password: ''};
    }

  }

  onResize(event) {
    this.initWidth = event.target.innerWidth;
    this.initHeight = event.target.innerHeight;
  }

  loginFunc(form): void {
    if (form.valid) {
      const loading = this.loadingController.create({
        content: 'Espere un momento...'
      });
      loading.present();
      this.loginServices.loginFunc(this.user, true, () => {
        this.navCtrl.setRoot(EntregasPage);
      })
      loading.dismiss();
    } else {
      Utils.doAlert({title: 'Error', message: 'Usuario y contraseña son requeridos'});
    }
  }

  back() {
    this.user.username = '';
    this.user.password = '';
    this.navCtrl.setRoot(HomePage);
  }

  goRegister() {
    console.log("Redirigiendo a registro...");
    this.navCtrl.setRoot(Registro);
  }

  goRecoverPass() {
    console.log("Redirigiendo a recuperar pass...");
    this.navCtrl.push(CambioPass);
  }
}
