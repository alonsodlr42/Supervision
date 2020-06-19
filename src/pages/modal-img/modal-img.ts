import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Settings} from "../../app/common/settings";

@Component({
    selector: 'page-modal-img',
    templateUrl: 'modal-img.html',
})
export class ModalImgPage {

    namePage: string;
    incidencia: any;
    urlImgs: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
      let url=Settings.urlPrefix.replace("/rest", "");
      this.urlImgs=Settings.urlImgPrefix?Settings.urlImgPrefix:url;
        this.incidencia = navParams.data;
        this.namePage = 'modal';
    }

    ionViewDidLoad() {
    }

    goBack() {
        this.navCtrl.pop();
    }
}
