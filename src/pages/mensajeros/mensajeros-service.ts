import {Injectable} from "@angular/core";
import {HttpWrapper} from "../../app/common/http-wrapper";
@Injectable()
export class MensajerosService {

    constructor(private httpr: HttpWrapper) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DetalleEntregaPage');
    }

  getRepartidoresByPrograma(idRepartidor:any){
    var url="/ventas/pedidos/repartidor/"+idRepartidor;
    return this.httpr.post(url).then(
      response => {
        return response as any[];
      }
    );
  }
}
