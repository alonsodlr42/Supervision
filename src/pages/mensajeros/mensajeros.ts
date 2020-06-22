import {Component} from '@angular/core';
import {
    IonicPage,
    MenuController,
    NavController,
    NavParams,
    LoadingController,
    Loading, ToastController, Platform
} from 'ionic-angular';
import {MensajerosService} from './mensajeros-service';
import {DetalleEntregaPage} from '../detalle-mensajero/detalle-mensajero';
import {SessionData} from "../../app/common/session-data";
import {Settings} from "../../app/common/settings";
import {LaunchNavigator} from "@ionic-native/launch-navigator";
import * as moment from "moment";
import {Utils} from "../../app/common/utils";
import {Mensajeros} from "../../app/common/mensajeros";

const NO_IMAGE: string = 'assets/img/no-image.jpg';

@Component({
    selector: 'page-entregas',
    templateUrl: 'mensajeros.html',
})
export class EntregasPage {
    namePage;
    ordenHeader;
    cuentas = SessionData.cuentaslogged;
    urlImgPrefix = Settings.urlImgPrefix;
    urlPrefix = Settings.urlImgPrefix;
    loading: Loading;
    optionSeletced="todos";
    activo:number=0;
    inactivo:number=0;
    mensajeros=[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private entregasService: MensajerosService, public menuCtrl: MenuController, public loadingCtrl: LoadingController, private launchNavigator: LaunchNavigator, public platform: Platform) {
        this.mensajeros = Mensajeros.mensajeros;
        for(let i of this.mensajeros){
          if(i.actividad == true){
            this.activo ++;
          }else {
            this.inactivo ++;
          }
        }
        this.namePage = 'Mensajeros';
        this.ordenHeader = 'Mensajeros';

    }

    ionViewDidLoad() {

    }

    seleccionaPerfil(user){
      this.navCtrl.push(DetalleEntregaPage, user);
    }
}


