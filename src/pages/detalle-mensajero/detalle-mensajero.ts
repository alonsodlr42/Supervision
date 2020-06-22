import {Component} from '@angular/core';
import {ModalController, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {SessionData} from "../../app/common/session-data";
import {Settings} from "../../app/common/settings";
import {MensajerosService} from "../mensajeros/mensajeros-service";
import {AgregarIncidenciaPage} from "../agregar-incidencia/agregar-incidencia";
import {ModalImgPage} from "../modal-img/modal-img";
import {LaunchNavigator} from '@ionic-native/launch-navigator';
import {Utils} from "../../app/common/utils";
import {Mensajeros} from "../../app/common/mensajeros";

@Component({
  selector: 'page-detalle-entrega',
  templateUrl: 'detalle-mensajero.html'
})
export class DetalleEntregaPage {
  lista: any;
  activos=[];
  historial=[];
  namePage: string;
  pedidoSeleccionado: any;
  optionSeletced = "Activas";
  hide: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public entregasService: MensajerosService, public modalCtrl: ModalController, private launchNavigator: LaunchNavigator, public toastCtrl: ToastController, public platform: Platform) {
    this.lista = Mensajeros.entregasAc;
    for (let detail of this.lista) {
      detail.hideShow = false;
      if (detail.estatus.id == 'activo') {
        detail.class = 'borde-estatus-ac';
      }
      if (detail.estatus.id == 'Entregado') {
        detail.class = 'borde-estatus-en';
      }
      if (detail.estatus.id == 'Cancelado') {
        detail.class = 'borde-estatus-ca';
      }
    }
    for (let detail of this.lista) {
      if (detail.estatus.id == 'activo') {
        this.activos.push(detail);
      }else{
        this.historial.push(detail);
      }
    }
    this.namePage = 'Detalle de mensajero';
    this.pedidoSeleccionado = navParams.data;

  }

  hideShow(detail) {
    if (detail.hideShow == false) {
      detail.hideShow = true;
    } else {
      detail.hideShow = false;
    }
  }

  ionViewDidLoad() {
  }
}
