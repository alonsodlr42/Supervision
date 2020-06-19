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

    cuentas = SessionData.cuentaslogged;
    urlImgPrefix = Settings.urlImgPrefix;

    coment: any = '';

    hayPedidos: boolean;
    urlPrefix = Settings.urlImgPrefix;

    listB64Image: any;

    incidencia: boolean;

    optionsLaunchNavigator: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public entregasService: EntregasService, public modalCtrl: ModalController, private launchNavigator: LaunchNavigator, public toastCtrl: ToastController, public platform: Platform) {
        this.namePage = 'DetalleEntregas';
        this.pedidoSeleccionado = navParams.data;
        this.listB64Image = [];
        this.incidencia = true;

        if(platform.is('ios')){
            this.optionsLaunchNavigator = {
                start: 'Mexico, CDMX',
                app: launchNavigator.APP.APPLE_MAPS
            };
        } else {
            this.optionsLaunchNavigator = {
                start: 'Mexico, CDMX',
                app: launchNavigator.APP.GOOGLE_MAPS
            };
        }
    }

    ionViewDidLoad() {
    }

    ionViewDidEnter(){
    }


    ionViewWillEnter(){
        this.entregasService.obtenerIncidencia(this.pedidoSeleccionado.id).then(response => {
            if(response.exitoso){
                let incidenciaTemp = response.datos;
                if(incidenciaTemp.urlImagenes){
                    incidenciaTemp.urlImagenes = incidenciaTemp.urlImagenes.replace(/\/macorina/g, this.urlImgPrefix).replace('[', '').replace(']', '').replace(/ /g, '').split(",");
                }
                if(this.pedidoSeleccionado.incidencias.length > 0){
                    if(this.pedidoSeleccionado.incidencias[this.pedidoSeleccionado.incidencias.length-1].id != incidenciaTemp.id){
                        this.pedidoSeleccionado.incidencias.push(incidenciaTemp);
                    }
                } else if (this.pedidoSeleccionado.incidencias.length == 0){
                    this.pedidoSeleccionado.incidencias.push(incidenciaTemp);
                }
            }
        });
    }

    goEntregar() {
      if(this.pedidoSeleccionado.estatus!="ASIG_ENTREGA"){
        Utils.doAlert("Solo se posible entregar un pedido si esta asignado ");
        return;
      }
        let comentario = this.coment;
      let pedidoEntrega = {
        'idsCuentas':  this.cuentas.map(cuenta => cuenta.id),
        "comentarios": comentario,
        "idPedido": this.pedidoSeleccionado.id
      };

        this.entregasService.entregarPedido(pedidoEntrega).then(response => {
            console.log("entregarPedido", response.datos, pedidoEntrega.idPedido, this.pedidoSeleccionado.id);
            this.presentToast('El pedido se ha entregado!');
            this.navCtrl.pop();
        }).catch(error => {
            console.log('hubo un error');
        });
        this.coment = '';
    }

    presentToast(mensaje: string) {
        const toast = this.toastCtrl.create({
            message: mensaje,
            duration: 2000
        });
        toast.present();
    }

    actualizarIncidencia() {
      if(this.pedidoSeleccionado.estatus!="ASIG_ENTREGA"){
        Utils.doAlert("Solo es posible actualizar incidencias de un pedido asignado ");
        return;
      }
        this.navCtrl.push(AgregarIncidenciaPage, {idPedido: this.pedidoSeleccionado.id});
    }

    mostrarImagenes(incidencia: any){
        console.log('mostrarImagenes...');
        const modal = this.modalCtrl.create(ModalImgPage, incidencia);
        modal.present();
    }

    geolocalizar(direccion: string){
   /*   if (SessionData.platformInfo.isNative()) {
        this.launchNavigator.navigate(direccion, this.optionsLaunchNavigator)
          .then(
            success => console.log('Launched navigator'),
            error => console.log('Error launching navigator', error)
          );
      }else{*/
        window.open(direccion,'_system','location=yes');
     // }
    }

    goBack() {
        this.navCtrl.pop();
    }

}
