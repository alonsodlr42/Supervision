import {Component} from '@angular/core';
import {
    IonicPage,
    MenuController,
    NavController,
    NavParams,
    LoadingController,
    Loading, ToastController, Platform
} from 'ionic-angular';
import {EntregasService} from './entregas-service';
import {DetalleEntregaPage} from '../detalle-entrega/detalle-entrega';
import {SessionData} from "../../app/common/session-data";
import {Settings} from "../../app/common/settings";
import {LaunchNavigator} from "@ionic-native/launch-navigator";
import * as moment from "moment";
import {Utils} from "../../app/common/utils";
import {Mensajeros} from "../../app/common/mensajeros";

const NO_IMAGE: string = 'assets/img/no-image.jpg';

@Component({
    selector: 'page-entregas',
    templateUrl: 'entregas.html',
})
export class EntregasPage {
    namePage;
    ordenHeader;
    cuentas = SessionData.cuentaslogged;
    urlImgPrefix = Settings.urlImgPrefix;

    pedidosDisponibles: any;
    pedidosDisponiblesFiltro: any;

    mispedidos: any;
    mispedidosFiltro: any;

    pedidoSeleccionado: any;
    searchQuery: string;

    minDate: any;
    maxDate: any;
    fechaGeneracion: any;

    coment: any = '';

    hayPedidos: boolean;
    urlPrefix = Settings.urlImgPrefix;

    loading: Loading;

    listB64Image: any;
    optionSeletced="todos";
    classSelected="tabSelected";

    activo:number=0;
    inactivo:number=0;

    optionsLaunchNavigator: any;

    mensajeros=[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private entregasService: EntregasService, public menuCtrl: MenuController, public loadingCtrl: LoadingController, private launchNavigator: LaunchNavigator, public platform: Platform) {
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

        this.minDate = this.obtenerFechaActual();
        this.maxDate = new Date().getFullYear() + 1;
       /* 2020-05-05T01:49:22.599Z*/
        this.fechaGeneracion = moment(new Date()).format("YYYY-MM-DD"); //new Date('2018/12/10').toISOString();
        this.pedidosDisponibles = [];
        this.pedidosDisponiblesFiltro = [];
        this.mispedidos=[];
        this.mispedidosFiltro=[];
        this.searchQuery = '';
        this.listB64Image = [];
        setTimeout(() => {
          this.loading = this.loadingCtrl.create({content: 'Por favor espere...'});
          /*this.loading.present();*/
          this.getPedidosDisponibles();
          this.getMisPedidos(this.fechaGeneracion);
        },15000);
    }

    ionViewDidLoad() {

    }

    seleccionaPerfil(user){
      this.navCtrl.push(DetalleEntregaPage, user);
    }

    ionViewDidEnter() {
        this.loading = this.loadingCtrl.create({content: 'Por favor espere...'});
        /*this.loading.present();*/
        this.getPedidosDisponibles();
        this.getMisPedidos(this.fechaGeneracion);
        this.searchQuery = '';
    }

    changeDate(_event) {
        // console.log('changeDate : ' + this.fechaGeneracion);
        this.loading = this.loadingCtrl.create({content: 'Por favor espere...'});
        /*this.loading.present();*/
        this.pedidoSeleccionado = null;
        this.getMisPedidos(this.fechaGeneracion);
        this.searchQuery = '';
    }

    seleccionarPedido(pedido, cambiar?) {
        // this.pedidoSelectedFalse();
        pedido.venta.selected = true;
        this.pedidoSeleccionado = pedido;
        for (let detalle of this.pedidoSeleccionado.venta.detalle) {

            if (detalle.referencia.includes('ROOT')) {
                if (detalle.item.producto.nombreImagen) {
                    if (detalle.item.producto.nombreImagen.includes('no-image.jpg')) {
                        detalle.item.producto.nombreImagen = NO_IMAGE;
                    } else if (!detalle.item.producto.nombreImagen.includes(this.urlPrefix)) {
                        detalle.item.producto.nombreImagen = this.urlPrefix + '/' + detalle.item.producto.nombreImagen.substring(7);
                        this.entregasService.getImagen(detalle.item.producto.nombreImagen);
                    }
                } else {
                    detalle.item.producto.nombreImagen = NO_IMAGE;
                }


            }
        }
        this.coment = '';
        console.log('itemSeleccionado', pedido);

        if (cambiar) {
            this.navCtrl.push(DetalleEntregaPage, this.pedidoSeleccionado);
        }
    }


    getPedidosDisponibles() {
      let fecha = moment(new Date()).format("YYYY-MM-DD");
        // console.log('getPedidos')
      const cuentasIds = this.cuentas.map(cuenta => cuenta.id);
      /*this.loading.present();*/
        this.entregasService.getPedidosDisponibles(cuentasIds, fecha).then(response => {
            this.pedidosDisponibles = response.datos;
            this.pedidosDisponiblesFiltro = this.pedidosDisponibles;
            if (this.pedidosDisponibles.length > 0) {
                this.hayPedidos = true;
                this.contarUnidadesDelPedido(this.pedidosDisponibles);
                this.seleccionarPedido(this.pedidosDisponibles[0]);
            } else {
                this.hayPedidos = false;
            }
            console.log("pedidos disponibles", this.pedidosDisponibles);
            /*this.loading.dismiss();*/
        }).catch(error => {
          console.error('hubo un error',error);
          Utils.doAlert("Algo salio mal en la consulta de pedidos disponibles");
        });
    }
  getMisPedidos(fecha: string) {
    // console.log('getPedidos')
    const cuentasIds = this.cuentas.map(cuenta => cuenta.id);
    this.entregasService.getMisPedidos(cuentasIds, fecha).then(response => {
      this.mispedidos = response.datos;
      this.mispedidosFiltro = this.mispedidos;
      if (this.mispedidos.length > 0) {
        this.contarUnidadesDelPedido(this.mispedidos);
      }
      console.log("mis pedidos", this.mispedidosFiltro);
      /*this.loading.dismiss();*/
    }).catch(error => {
      console.error('hubo un error',error);
      Utils.doAlert("Algo salio mal en la consulta de mis pedidos");
    });
  }

    contarUnidadesDelPedido(pedidos) {
        for (let pedido of pedidos) {
            pedido.venta.cantidad = 0;
            let hrefDir = this.obtenerHref(pedido.ubicacionEntrega);
            console.log("###### hrefDir=%o",hrefDir);
            pedido.href = hrefDir.href;
            pedido.direccion = hrefDir.direccion;

            for (let incidencia of pedido.incidencias) {
                if(incidencia.urlImagenes){
                    incidencia.urlImagenes = incidencia.urlImagenes.replace(/\/macorina/g, this.urlImgPrefix).replace('[', '').replace(']', '').replace(/ /g, '').split(",");
                    // console.log('incidencias', incidencia.urlImagenes);
                }
            }

            if (pedido.venta.estatusEntregado != 'ENTREGADO' && pedido.venta.estatusEntregado != 'PENDIENTE') {
                pedido.venta.estatusEmpacado = 'SINENTREGAR';
            }
            for (let detalle of pedido.venta.detalle) {
                detalle.mostrarNotas = false;
                if (detalle.referencia.includes('CHILD')) {
                    for (let detallePedido of pedido.venta.detalle) {
                        let referenciaROOT = detalle.referencia.replace(/CHILD/, 'ROOT');
                        if (detallePedido.referencia.includes(referenciaROOT)) {
                            if (!detallePedido.modificadores) {
                                detallePedido.modificadores = [];
                            }

                            for (let respuesta of detallePedido.respuestas) {
                                if (respuesta.infoAdicional != respuesta.valor) {
                                    if (respuesta.valor == detalle.item.producto.sku) {
                                        detalle.notas = respuesta.infoAdicional;
                                        break;
                                    }
                                }
                            }

                            detallePedido.modificadores.push(detalle);
                            break;
                        }
                    }
                } else {
                    pedido.venta.cantidad += +detalle.cantidad;
                }
            }
        }
    }

  obtenerHref(ubicacion) {
      console.log("##### ubicacion  pedido '%o'",ubicacion);
    let href = '';
    let direccion = '';
 /*   if (ubicacion.nombre) {
      direccion = direccion + ubicacion.nombre + ' ';
    }*/

    if (ubicacion.direccion) {
      href = href + ubicacion.direccion;
      direccion = direccion + ubicacion.direccion + ' ';
    }
    if (ubicacion.nunExterior) {
      href = href + ' ' + ubicacion.nunExterior;
      direccion = direccion + 'No. ' + ubicacion.nunExterior + ' ';
    }
    /*
    if (ubicacion.numInterior) {
      href = href + '+' + ubicacion.numInterior;
      direccion = direccion + 'Int. ' + ubicacion.numInterior + ' ';
    }*/
    if (ubicacion.colonia && ubicacion.colonia.nombre) {
      href = href + ',' + ubicacion.colonia.nombre;
      direccion = direccion + 'Col. ' + ubicacion.colonia.nombre + ' ';
    }
    if (ubicacion.codigoPostal && ubicacion.codigoPostal.numero) {
      href = href + ',' + ubicacion.codigoPostal.numero;
      direccion = direccion + 'CP. ' + ubicacion.codigoPostal.numero + ' ';
    }else if(ubicacion.colonia &&ubicacion.colonia.codigoPostal&&ubicacion.colonia.codigoPostal.numero){
      href = href + ',' + ubicacion.colonia.codigoPostal.numero;
      direccion = direccion + 'CP. ' + ubicacion.colonia.codigoPostal.numero + ' ';
    }
    if (ubicacion.pais) {
      href = href + ', ' + ubicacion.pais;
    }
    if (ubicacion.coordenadas) {
      href = ubicacion.coordenadas.latitud+','+ubicacion.coordenadas.longitud;
    }
    href = 'https://www.google.com/maps/dir/?api=1&destination=' + href + '&dir_action=navigate';
    let resUbicacionHref = {'href': href, 'direccion': direccion};
    console.info("resUbicacionHref '%o'",resUbicacionHref);
    return resUbicacionHref;
  }

    _contarUnidadesDelPedido() {
        for (let pedido of this.pedidosDisponibles) {
            pedido.venta.cantidad = 0;
            for (let detalle of pedido.detalle) {
                if (!detalle.referencia.includes('CHILD')) {
                    pedido.venta.cantidad += +detalle.cantidad;
                }
            }
        }
    }
    tomarPedido(idPedido){
      let pedidoEntrega = {
        'idsCuentas': this.cuentas.map(cuenta => cuenta.id),
        "idPedido":  idPedido
      };
      this.loading = this.loadingCtrl.create({content: 'Por favor espere...'});
      this.loading.present();

      this.entregasService.tomarPedido(pedidoEntrega).then(response => {
        if(response.exitoso) {
          Utils.presentToast("Se tomo el pedido exitosamente");
          this.getMisPedidos(this.fechaGeneracion);
          this.getPedidosDisponibles();
        }else{
          Utils.doAlert(response.mensaje)
        }
        this.loading.dismiss();
      }).catch(error => {
        console.log('hubo un error',error);
        Utils.doAlert("Ocurrio un error favor de reportar el problema");
        this.loading.dismiss();
      });
    }
    goEntregar() {
        let comentario = this.coment;
        let pedidoEntrega = {
            'idsCuentas': this.cuentas.map(cuenta => cuenta.id),
            "comentarios": comentario,
            "idPedido": this.pedidoSeleccionado.id
        };
        // console.log("goEntregar...");
        this.entregasService.entregarPedido(pedidoEntrega).then(response => {
            console.log("entregarPedido", response.datos, pedidoEntrega.idPedido, this.pedidoSeleccionado.id);
            if (response.datos) {
                for (let pedido of this.pedidosDisponibles) {
                    if (pedido.id == response.datos) {
                        pedido.estatus = 'ENTREGADO';
                        pedido.comentariosEntrega = comentario;
                        break;
                    }
                }
                for (let pedido of this.pedidosDisponiblesFiltro) {
                    if (pedido.id == response.datos) {
                        pedido.estatus = 'ENTREGADO';
                        pedido.comentariosEntrega = comentario;
                        break;
                    }
                }
            }
        }).catch(error => {
            console.log('hubo un error');
        });
        this.coment = '';
    }

    goBack() {
        this.navCtrl.pop();
    }

    obtenerFechaActual(): string {
        let fecha = new Date().getFullYear() + '';
        let fechaActual = new Date();
        if (fechaActual.getMonth() < 10) {
            fecha += '-0';
        } else {
            fecha += '-';
        }
        fecha += (fechaActual.getMonth() + 1);
        if (fechaActual.getDate() < 10) {
            fecha += '-0';
        } else {
            fecha += '-';
        }
        fecha += fechaActual.getDate();
        return fecha;
    }

    geolocalizar(direccion: string){
/*      if (SessionData.platformInfo.isNative()) {
        this.launchNavigator.navigate(direccion, this.optionsLaunchNavigator)
          .then(
            success => console.log('Launched navigator'),
            error => console.log('Error launching navigator', error)
          );
      }else{*/
        window.open(direccion,'_system','location=yes');
     // }


    }

    getDataSearch(ev) {
        // Reset items back to all of the items
        this.pedidosDisponiblesFiltro = this.pedidosDisponibles;

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.pedidosDisponiblesFiltro = this.pedidosDisponiblesFiltro.filter((orden) => {
                val = val.toLowerCase();
                return (orden.venta.folio.indexOf(val) > -1) ||
                    (orden.venta.cuenta.cuentahabiente.nombreCompleto.toLowerCase().indexOf(val) > -1) ||
                    (orden.ubicacionEntrega.codigoPostal.numero.toLowerCase().indexOf(val) > -1) ||
                    (orden.ubicacionEntrega.colonia.nombre.toLowerCase().indexOf(val) > -1);
            })
        }
    }

    onClear(ev) {
        if (this.pedidosDisponibles.length > 0) {
            this.pedidosDisponiblesFiltro = this.pedidosDisponibles;
            this.seleccionarPedido(this.pedidosDisponiblesFiltro[0]);
        }
    }



}


