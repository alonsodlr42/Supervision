import {Component, ViewChild} from '@angular/core';
import { Device } from '@ionic-native/device';
import {App, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SessionData} from "./common/session-data";
import {HttpWrapper} from "./common/http-wrapper";
import {CommonService} from "./common/common-service";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {LoginServices} from "../pages/login/login-service";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {PlatformInfo} from "./common/platformInfo";
import {Login} from "../pages/login/login";
import {MenuInicio} from "../pages/menu-inicio/menu-inicio";
import {Utils} from "./common/utils";
import {OneSignalServices} from "../pages/notificaciones/onesignal-service";
import {EntregasPage} from "../pages/mensajeros/mensajeros";
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;
    @ViewChild(Nav) nav: Nav;
    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public httpr: HttpWrapper, public commonService: CommonService,
                private sqlite: SQLite, private loginServices: LoginServices, public appCtrl: App, private screenOrientation: ScreenOrientation,private device: Device,private utils:Utils, private  oneSignalServices:OneSignalServices) {

      //this.getDataByUrl();
      this.initializeApp();
    }

/*  getDataByUrl() {
    let clavePrograma = '';
    let url = window.location.search.substring(1);
    let params = url.split("&");
    for (let i = 0; i < params.length; i++) {
      let param = params[i].split("=");
      if (param[0].indexOf("cp") != -1) {
        clavePrograma = param[1];
        break;
      }
    }
    if (clavePrograma) {
      this.getAsignacionByClavePrograma(clavePrograma).then(() => {
        this.initializeApp()
      });
    }

  }*/
/*  getAsignacionByClavePrograma(clavePrograma:any){
    return this.commonService.getAsignacionByClavePrograma(clavePrograma).then(
      response => {
        if(response.exitoso){
          SessionData.asignacion=response.datos;
          SessionData.clavePrograma=clavePrograma;
          SessionData.claveAsignacion=SessionData.asignacion.clave;
        }else{
          var options={durations:5000,position:'top',dismissOnPageChange:false};
          Utils.presentToast(response.mensaje, options);
          console.error('Error: ', response.mensaje);
        }
      }
    ).catch(err=> {
      console.log('Error: ', err);
    });
  }*/
    initializeApp() {
        this.platform.ready().then(() => {
            SessionData.platformInfo=new PlatformInfo(this.platform);
            SessionData.navSession = this.nav;
            this.statusBar.styleDefault();
            this.statusBar.overlaysWebView(false);
            if (this.device.platform=='Android'||this.device.platform=='iOS') {
                console.log('########## soy dispositivo %o',this.device.platform);
                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            }


            let username=sessionStorage.getItem('j_username');
            let password=sessionStorage.getItem('j_password');
            if(username&&password) {
              this.autologin(username, password);
            }else{
              this.rootPage = Login;
              localStorage.removeItem('userActive');
            }
        });
    }
  autologin(username: String, password: String) {
    /*console.log("autologin  username=%s,password=%s ", username, password);*/
    let user: any = {username: username, password: password};

    this.loginServices.loginFunc(user, false, () => {
      this.splashScreen.hide();
      this.rootPage = EntregasPage;
    }, (err) => {
      this.splashScreen.hide();
      if (err.status==401||(err.statusText.indexOf('Bad credentials') != -1 || err.statusText.indexOf('No Autorizado') != -1 || err.statusText.indexOf('Unauthorized') != -1)) {
        console.log("::: ::: :::LOGOUT");
        this.logoutDevice();
        setTimeout(()=>{
          var options={durations:5000,position:'top',dismissOnPageChange:false};
          Utils.presentToast("Usuario o contraseña incorrectos.", options);
        },500);
      }
    });

  }

  logoutDevice(){
    if (SessionData.macorinaDB != null) {
      SessionData.macorinaDB.executeSql('DELETE FROM  user', []).then(
        () => {
          console.log("Se borraron registros de tabla user");
          this.logOut();
        },
        error => {
          console.log(error);
          alert("Error al limpiar datos del usuario");
        }
      )
    } else {
      this.logOut();
    }
  }
  logOut() {
    this.cleanHeaders();
    this.appCtrl.getRootNavs()[0].setRoot(Login);
    this.splashScreen.show();
    sessionStorage.removeItem('j_username');
    sessionStorage.removeItem('j_password');
    this.oneSignalServices.removeExternalId();
    window.location.reload();
  }
  cleanHeaders() {
    console.log('Limpiando headers...');
    this.httpr.headers.set('j_username', '');
    this.httpr.headers.set('j_password', '');
  }


}

