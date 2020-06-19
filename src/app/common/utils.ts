import {AlertController, LoadingController, Loading, ToastController} from "ionic-angular";
import {Injectable} from "@angular/core";

@Injectable()
export class Utils {
  private static  loading:Loading;
  private static  alerCtrl: AlertController;
  private static toastCtrl:ToastController;

  constructor(alerCtrl: AlertController,
               loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    Utils.loading=loadingCtrl.create({content: "Espere for favor..."});
    Utils.alerCtrl=alerCtrl;
    Utils.toastCtrl=toastCtrl;
  }


  static doAlert(options: any) {
    let mensaje:string;
    if(!options){
     mensaje="Error en proceso";
      options="Error en proceso";
   }
    if (typeof options === "string") {
      mensaje=options;
    }else{
      mensaje=options.message;
    }
    let alert = Utils.alerCtrl.create({
      title: options.title ? options.title : 'Aviso',
      message: mensaje,
      buttons: options.buttons ? options.buttons : ['Aceptar']
    });
    alert.present();
  }

  static presentToast(msj,options={durations:null,position:null}):void {
    let toast = this.toastCtrl.create({
      message: msj,
      duration: options.durations?options.durations:2500,
      position:options.position?options.position:'top'
    });
    toast.present();
  }

  static showConfirm(options: any) {
    let confirm = Utils.alerCtrl.create({
      title: options.title,
      message: options.message,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            options.okCallback();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            options.failCallback();
          }
        }
      ]
    });
    confirm.present();
  }


  static showLoading():void{
    this.loading.present();
  }
  static hideLoading():void{
    this.loading.dismiss();
  }
  static cloneObject(obj:any){
    return (JSON.parse(JSON.stringify(obj)));
  }
  static leftpad(data,size) {
    var s = String(data);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }
}
