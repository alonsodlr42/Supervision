import {Injectable} from "@angular/core";
import {HttpWrapper} from "../../app/common/http-wrapper";
@Injectable()
export class EntregasService {

    constructor(private httpr: HttpWrapper) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DetalleEntregaPage');
    }

    getImagenProducto(sku: string) {
        return this.httpr.post("/cp/getImagenProducto?sku=" + sku);
        // return this.httpr.post("/pdv/imagenes/preview/"+nombreImagen);
    }

    getImagen(idImagen: string) {
        return this.httpr.get(idImagen);
    }

    /*
    *
    */

    getPedidosDisponibles(idsCuentas:any[], fecha: string) {
      let request={idsCuentas:idsCuentas,fechaInicio:fecha,fechaFin:fecha};
        return this.httpr.post("/cp/getPedidosDisponibles",request);
    }
  getMisPedidos(idsCuentas:any[], fecha: string) {
    let request={idsCuentas:idsCuentas,fechaInicio:fecha,fechaFin:fecha};
    return this.httpr.post("/cp/getPedidosRepartidor",request);
  }
  tomarPedido(body: any) {
    return this.httpr.post("/cp/tomarPedido", body);
  }

    entregarPedido(body: any) {
        return this.httpr.post("/cp/entregarPedido", body);
    }

    subirImagen(base64Image, filename, width, height) {
        console.log('entre a subirImagen ', filename, width, height);
        let body = {
            'base64Image' :base64Image,
            'filename': filename,
            'width': width,
            'height': height
        };
        return this.httpr.post('/pdv/imagenes/uploadImage', body);
    }

    agregarIncidencia(body: any){
        return this.httpr.post('/cp/agregarIncidencia', body);
    }

    obtenerIncidencia(idPedido: string){
        return this.httpr.post('/cp/obtenerIncidencia?idPedido=' + idPedido);
    }
}
