import {Component} from "@angular/core";
import {App, NavController, NavParams, Platform, LoadingController} from "ionic-angular";
import {SessionData} from "../../app/common/session-data";
import {Login} from "../login/login";
import {Utils} from "../../app/common/utils";
import {MenuInicioService} from "./menu-inicio-service";
import {Settings} from "../../app/common/settings";
import {EntregasPage} from "../mensajeros/mensajeros";
import {HttpWrapper} from "../../app/common/http-wrapper";

@Component({
  selector: 'page-menu-inicio',
  templateUrl: 'menu-inicio.html',
})
export class MenuInicio{
    namePage:any='';
    version:any=SessionData.version;
    items:any=[];
    categorias:any=[];
    url:any='';
    urlImgs:any='';
    loading: any;
    user_name=sessionStorage.getItem('j_username');
    roles: string[] = [];
    logo: string;
    rol: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public appCtrl:App, public platform: Platform, private menuService:MenuInicioService, public loadingCtrl: LoadingController,public httpr: HttpWrapper) {

        this.loading = this.loadingCtrl.create({
            content: 'Por favor espere...'
        });

        this.loading.present();

        this.namePage='Control de mensajeros';
        this.url=Settings.urlPrefix.replace("/rest", "");
        this.urlImgs=Settings.urlImgPrefix?Settings.urlImgPrefix:this.url;


/*        if(localStorage.getItem('logoFecha') && localStorage.getItem('logo')){
            let fechaLogo = new Date(localStorage.getItem('logoFecha')).getTime();
            let today = new Date().getTime();
            // console.log(fechaLogo, today);
            if((today-fechaLogo) > (1000*60*60*24*2)){
                menuService.getImagenProducto(SessionData.cuentalogged.programa.id).then(response=>{
                    if(response.datos.dataB64){
                        localStorage.setItem('logo', 'data:image/png;base64,' + response.datos.dataB64);
                        localStorage.setItem('logoFecha', new Date().toISOString());
                    }
                });
            }
        }
        else{
            menuService.getImagenProducto(SessionData.cuentalogged.programa.id).then(response=>{
                if(response.datos.dataB64){
                    localStorage.setItem('logo', 'data:image/png;base64,' + response.datos.dataB64);
                    localStorage.setItem('logoFecha', new Date().toISOString());
                }
            });
        }*/


        menuService.getRoles(this.user_name).then(response => {
            // console.log('getRoles', response.datos);

           /* for(let rol of response.datos){
                this.roles.push(rol.name);
            }
            console.log('getRoles', this.roles);

            if(this.roles.indexOf('OPERADOR_ENTREGA') >= 0){
                SessionData.cuentalogged.rol = 'OPERADOR_ENTREGA';
                this.rol = 'OPERADOR_ENTREGA';
            }*/
          this.rol = 'OPERADOR_ENTREGA';
        });

    }

    getLogo(){
        return localStorage.getItem('logo');
    }

    ionViewDidLoad() {
        this.loading.dismiss();
    }

    goEntregas(){
        //console.log("Redirigiendo a empacado...");
        this.navCtrl.push(EntregasPage);
    }


}
