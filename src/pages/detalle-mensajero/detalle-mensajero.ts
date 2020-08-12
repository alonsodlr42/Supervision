import {Component} from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {MensajerosService} from "../mensajeros/mensajeros-service";
import {Mensajeros} from "../../app/common/mensajeros";
import {Utils} from "../../app/common/utils";

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

  detalleRep:any;
  dataSession:any;
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public mensajerosService: MensajerosService, public platform: Platform) {
    this.dataSession=JSON.parse(localStorage.getItem('session_data'));
    this.pedidoSeleccionado = navParams.data;
    console.log('this.pedidoSeleccionado',this.pedidoSeleccionado)

    //lista produccion
    /*this.lista = this.pedidoSeleccionado.detalles;*/

    //lista prueba
    this.lista = Mensajeros.mensajeros;

    //asigno un color al pedido dependiendo de su estatus
    for (let detail of this.lista) {
      detail.hideShow = false;
      detail.tipo = 'Delivery';
      detail.local=this.dataSession.programa.nombre;
      if (detail.estatus == 'ASIG_ENTREGA') {
        detail.class = 'borde-estatus-ac';
      }
      if (detail.estatus == 'ENTREGADO') {
        detail.class = 'borde-estatus-en';
      }
      if (detail.estatus == 'CANCELADO') {
        detail.class = 'borde-estatus-ca';
      }
    }

    console.log('this',this.lista)

    for (let detail of this.lista) {
      if (detail.estatus == 'ASIG_ENTREGA') {
        this.activos.push(detail);
      } else {
        this.historial.push(detail);
      }
    }

    console.log('activos',this.activos)
    console.log('historial',this.historial)

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

  obtengoFecha(val){
    let date = new Date(val)

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if(month < 10 && day>9){
      return `${year}:0${month}:${day}`;
    }else if(month < 10 && day<10){
      return `${year}:0${month}:0${day}`;
    }else{
      return `${year}:${month}:${day}`
    }
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
