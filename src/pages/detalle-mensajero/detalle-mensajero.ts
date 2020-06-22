import {Component} from '@angular/core';
import {ModalController, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {SessionData} from "../../app/common/session-data";
import {Settings} from "../../app/common/settings";
import {EntregasService} from "../entregas/entregas-service";
import {AgregarIncidenciaPage} from "../agregar-incidencia/agregar-incidencia";
import {ModalImgPage} from "../modal-img/modal-img";
import {LaunchNavigator} from '@ionic-native/launch-navigator';
import {Utils} from "../../app/common/utils";

@Component({
    selector: 'page-detalle-entrega',
    templateUrl: 'detalle-entrega.html'
})
export class DetalleEntregaPage {

    namePage: string;
    pedidoSeleccionado: any;
    optionSeletced="Activas";
    constructor(public navCtrl: NavController, public navParams: NavParams, public entregasService: EntregasService, public modalCtrl: ModalController, private launchNavigator: LaunchNavigator, public toastCtrl: ToastController, public platform: Platform) {
        this.namePage = 'DetalleMensajero';
        this.pedidoSeleccionado = navParams.data;
        console.log(this.pedidoSeleccionado);

    }

    ionViewDidLoad() {
    }

    goBack() {
        this.navCtrl.pop();
    }

}
