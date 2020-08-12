import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {HttpWrapper} from "./http-wrapper";
import * as moment from 'moment';

@Injectable()
export class CommonService {

  constructor(private httpr:HttpWrapper) {

  }

  getCuentasUserLogged(){
    var url="/flink/getCuentasByUserName"+"?userName="+this.httpr.getUserName();
    return this.httpr.post(url).then(
      response => {
        return response as any[];
      }
    );
  }

  getRepartidoresByPrograma(idPrograma:any){
    var url="/users/repartidores/numero/pedidos/"+idPrograma;
    return this.httpr.post(url).then(
      response => {
        return response as any[];
      }
    );
  }

  getTemaByPrograma(idPrograma:any){
    var url="/flink/getTemaIon2ByPrograma/"+idPrograma;
    return this.httpr.post(url).then(
        response => {
          return response as any[];
        }
    );

  }
  getAsignacion(clavePrograma:any){
      return this.httpr.post("/flink/asignacion/"+clavePrograma).then(
          response =>{
              return response as any;
          });
  }
  nativeWindow() : any {
      return _window();
  }

  getAsignacionByClavePrograma(clavePrograma: any) {
    return this.httpr.post("/flink/asignacion/getAsignacionByClavePrograma/" + clavePrograma).then(
      response => {
        return response as any;
      });
  }
}

function _window() : any {
    // return the global native browser window object
    return window;
}
Date.prototype.toJSON = function(){ return moment(this).format("YYYY-MM-DD HH:mm:ss"); };

