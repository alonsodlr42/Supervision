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
import {Utils} from "../../app/common/utils";
import {Mensajeros} from "../../app/common/mensajeros";

@Component({
  selector: 'page-entregas',
  templateUrl: 'mensajeros.html',
})
export class EntregasPage {
  namePage;
  ordenHeader;
  optionSeletced = "todos";
  activo: number = 0;
  inactivo: number = 0;
  mensajeros: any;
  detalleRep: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mensajerosService: MensajerosService,
              public platform: Platform, public loadingController: LoadingController) {
    this.mensajeros = JSON.parse(localStorage.getItem('repartidores'));
    if (this.mensajeros) {
      for (let i of this.mensajeros) {
        if (i.numeroDePedidos >= 1) {
          this.activo = this.activo + 1;
        } else {
          this.inactivo = this.inactivo + 1;
        }
      }
    }
    /*console.log(':::',this.mensajeros)*/

    this.namePage = 'Mensajeros';
    this.ordenHeader = 'Mensajeros';

  }

  ionViewDidLoad() {

  }

  async seleccionaPerfil(user) {
    const loading = this.loadingController.create({
      content: 'Espere un momento...'
    });
    loading.present();
    let data: any;
    this.mensajerosService.getRepartidoresByPrograma(user.cuentaRepartidor.id).then(
      response => {
        this.detalleRep = response;
        data = {
          user: user,
          detalles: this.detalleRep
        }
        loading.dismiss();
        this.navCtrl.push(DetalleEntregaPage, data);
        console.log('::detalleRep::', this.detalleRep)
      }
    ).catch(err => {
      console.log('Error: ', err);
      Utils.doAlert('Ocurrió un error en la consulta de los repartidores');
    });
  }

}


