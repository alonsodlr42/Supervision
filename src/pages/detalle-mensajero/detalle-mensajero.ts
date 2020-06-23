import {Component} from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {MensajerosService} from "../mensajeros/mensajeros-service";
import {Mensajeros} from "../../app/common/mensajeros";

@Component({
  selector: 'page-detalle-entrega',
  templateUrl: 'detalle-mensajero.html'
})
export class DetalleEntregaPage {
  lista: any;
  activos = [];
  historial = [];
  listDelivery=[];
  listMensajeria=[];
  namePage: string;
  pedidoSeleccionado: any;
  optionSeletced = "Activas";
  hide: boolean = false;
  pageActiva: number = 1;
  pageHistorial: number = 1;
  pageHistorialDev: number = 1;
  pageHistorialMsg: number = 1;

  opcionSeleccionado='all';

  cantidadHistorial:number=0;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public entregasService: MensajerosService, public platform: Platform) {
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
      } else {
        this.historial.push(detail);
      }
    }
    for(let detail of this.historial){
      if(detail.tipo == 'Delivery'){
        this.listDelivery.push(detail);
      }
      if(detail.tipo == 'Mensajería'){
        this.listMensajeria.push(detail);
      }
    }
    this.cantidadHistorial=this.historial.length;
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

  cambioFiltro(){
    if(this.opcionSeleccionado=='all'){
      this.cantidadHistorial=this.historial.length;
    }
    if(this.opcionSeleccionado=='dev'){
      this.cantidadHistorial=this.listDelivery.length;
    }
    if(this.opcionSeleccionado=='msg'){
      this.cantidadHistorial=this.listMensajeria.length;
    }
  }

  detalleHistorial(detalle) {
    let detalles = detalle.detalle.toString();
    this.alertas('Detalle', detalles);
  }

  alertas(titulo, msg) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle:msg,

      mode: 'ios',
      buttons: [
        {
          text: 'ACEPTAR',
          handler: data => {
          }
        }
      ]
    });
    alert.present();
  }
}
