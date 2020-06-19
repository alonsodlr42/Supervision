import {AfterViewInit, Component} from '@angular/core';
import {AlertController, NavController, NavParams, Platform} from "ionic-angular";
import {SessionData} from "../../../app/common/session-data";
import {MenuInicio} from "../../menu-inicio/menu-inicio";
import {LoginServices} from "../../login/login-service";
import {EntregasPage} from "../../entregas/entregas";

@Component({
  selector: 'page-confirmacion-registro',
  templateUrl: 'confirmacion-registro.html',
  host: {
      '(window:resize)': 'onResize($event)'
  }
})
export class ConfirmacionRegistro implements AfterViewInit{
  cuenta: any = {};
  initWidth:any;
  initHeight:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loginServices: LoginServices,
              public platform: Platform) {
      this.cuenta=SessionData.cuentaRegistro;
      platform.ready().then((readySource) => {
          this.initWidth=platform.width();
          this.initHeight=platform.height();
      });
  }

  ngAfterViewInit() {
      setTimeout(()=>{
          this.showAlert();
          //Utils.doAlert({title: "<p style='font-size: x-small'>Cuenta creada exitosamente</p>", message: "<p style='font-size: small'>¡Gracias por registrarte en Mäcorina!</p><p>Tu cuenta qued&oacute; registrada con: </p>"+this.cuenta.email})
      },500);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmacionRegistro');
  }

  onResize(event){
      this.initWidth=event.target.innerWidth;
      this.initHeight=event.target.innerHeight;
  }

  goInicio() {
    console.log("Redirigiendo a Inicio...");
    let user:any={};
    user.username=this.cuenta.email;
    user.password=this.cuenta.password;
          this.loginServices.loginFunc(user,true,()=>{
              this.navCtrl.setRoot(EntregasPage);
          })
  }

    showAlert() {
        let alert = this.alertCtrl.create({
            title: "<p style='font-size: xx-small'>Cuenta creada exitosamente</p>",
            subTitle: "<p style='font-size: small'>¡Gracias por registrarte! Tu cuenta qued&oacute; registrada con: </p>"+this.cuenta.email,
            buttons: [{
                text: 'OK',
                handler: data => {
                    //this.navCtrl.setRoot(HomePage);
                    this.goInicio();
                }
            }],
            enableBackdropDismiss: false
        });
        alert.present();
    }

}
