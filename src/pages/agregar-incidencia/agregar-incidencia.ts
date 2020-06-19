import {Component} from '@angular/core';
import {Loading, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {EntregasService} from "../entregas/entregas-service";
import Compressor from 'compressorjs';
import {SessionData} from "../../app/common/session-data";

@Component({
    selector: 'page-agregar-incidencia',
    templateUrl: 'agregar-incidencia.html',
})
export class AgregarIncidenciaPage {
    namePage: string;
    listB64Image: any;
    coment: any = '';
    selectOptions: any;
    tipoIncidente: any;
    idPedido: string;

    callback;
    loading: Loading;

    constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private entregasService: EntregasService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
        let params = this.navParams.data;
        this.idPedido = params.idPedido;
        this.callback = params.callback;
        console.log('callback', this.callback);

        this.namePage = 'Incidencias';
        this.listB64Image = [];

        this.selectOptions = {
            title: 'Tipo incidente',
            subTitle: 'Seleccione el tipo del incidente',
            mode: 'md'
        };
    }



    ionViewDidLoad() {
        console.log('ionViewDidLoad AgregarIncidenciaPage');
    }

    tomarFoto() {
        console.log('tomarFoto...');

        if(this.listB64Image.length >= 3){
            this.presentToast('Solo puedes adjuntar hasta 3 imágenes');
            return;
        }

        let options: CameraOptions = {
            quality: 100,
            // destinationType: this.camera.DestinationType.FILE_URI,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 512,
            targetHeight: 512
        };

        this.camera.getPicture(options).then((imageData) => {
            // let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.listB64Image.push(imageData);
            // this.entregasService.subirImagen(imageData, 'img001.jpeg', 512, 512)
            // .then(response => {
            //     console.log('response',JSON.stringify(response), response.uuid, response.url);
            // }).catch( errorr => {
            //     console.error('ocurrio un error en subir image');
            // });
        }, (err) => {
            // Handle error
            console.error('ocurrio un erroir');
        });

        console.log('termine de tomar foto')
    }

  public getB64FromFile(file: File, callback,failCallback): void {
    const fileReader: FileReader = new FileReader();
    fileReader.onloadend = (x) => {
      const urlB64 = fileReader.result.toString();
      const b64 = urlB64.substring(urlB64.indexOf('base64,') + 7);
      if (callback) {
        callback(b64);
      }
    };
    fileReader.onerror = (event) => {
      fileReader.abort();
      console.error("Error de lectura de archivo ",event);
      failCallback("No pudo obtenerse la imagen, intente de nuevo. Causa: "+event.message);
    };
    new Compressor(file, {
      quality: 0.8,
      maxHeight:512,
      maxWidth:512,
      success(result) {
        fileReader.readAsDataURL(result);
      },
      error(err) {
        console.error("Error en compressor ",err);
        failCallback("Error al redimensionar la imagen, intente de nuevo. Causa: "+err.message);
      },
    });

  }


  takePicture(fileList: FileList) {
    const self = this;
    if(fileList.length>1){
      self.presentToast("ERROR: Solo se pueden agregar 1 imagen, revise por favor");
      return;
    }
    const file = fileList[0];
    if(!file.type.startsWith('image/')){
      self.presentToast("ERROR: Solo se pueden agregar imagenes, revise por favor");
      return;
    }

    this.getB64FromFile(file, (b64) => {
      self.listB64Image.push(b64);
    },(msg) =>{
      self.presentToast("ERROR: "+msg);
    });
  }


    presentToast(mensaje: string) {
        const toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000
        });
        toast.present();
    }

    agregarIncidencia() {

        if(!this.tipoIncidente){
            this.presentToast('Ingrese por lo menos el tipo de incidencia.');
            return;
        }

        let urlsImagenes = new Array();
        let tamanio = this.listB64Image.length;

        this.loading = this.loadingCtrl.create({content: 'Por favor espere...'});
        this.loading.present();

        for(let idx in this.listB64Image){

            this.entregasService.subirImagen(this.listB64Image[idx],'img0'+idx, 512, 512 )
                .then(response => {
                    console.log('response',JSON.stringify(response), response.uuid, response.url);
                    urlsImagenes.push(response.url);

                    if(!this.tipoIncidente){
                        this.tipoIncidente = 'OTROS';
                    }

                    if(urlsImagenes.length == tamanio){
                        let body = {
                            'idPedido' :this.idPedido,
                            'idsCuentas':  SessionData.cuentaslogged.map(cuenta => cuenta.id),
                            'tipo': this.tipoIncidente,
                            'comentario': this.coment,
                            'urlImagenes': urlsImagenes
                        };
                        this.entregasService.agregarIncidencia(body).then(response => {
                            this.loading.dismiss();
                            console.log('response agregarIncidencia :: ', response.datos);
                            this.navCtrl.pop();
                        });
                    }

                }).catch( errorr => {
                console.error('ocurrio un error en subir image');

            });
        }

        if(tamanio==0){
            let body = {
                'idPedido' :this.idPedido,
                'idsCuentas': SessionData.cuentaslogged.map(cuenta => cuenta.id),
                'tipo': this.tipoIncidente,
                'comentario': this.coment
            };
            this.entregasService.agregarIncidencia(body).then(response => {
                this.loading.dismiss();
                console.log('response agregarIncidencia :: ', response.datos);
                this.navCtrl.pop();
            }).catch( error => {
                this.loading.dismiss();
                console.error('error agregarIncidencia :: ', error);
            });
        }
    }


    goBack() {
        this.navCtrl.pop();
    }

}
