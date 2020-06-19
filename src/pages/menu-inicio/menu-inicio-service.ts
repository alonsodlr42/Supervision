import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {HttpWrapper} from "../../app/common/http-wrapper";


@Injectable()
export class MenuInicioService {

    constructor(private httpr:HttpWrapper) { }

    getImagenProducto(idPrograma: string) {
        return this.httpr.post("/cp/getImagenProducto?idPrograma="+idPrograma);
    }

    getItems(consultaItemsRequest:any){
        return this.httpr.post("/productos/items",JSON.stringify(consultaItemsRequest)).then(
            response =>{
                return response as any;
            });
    }

    getCategorias(clavePrograma:any){
        return this.httpr.post("/productos/lista/categorias/"+clavePrograma+"?onlyInProgram=true&onlyVisibles=true").then(
            response =>{
                return response as any;
            });
    }

    updateIdsItemsFavoritos(cuenta:any){
        return this.httpr.post("/users/guardar",JSON.stringify(cuenta)).then(
            response =>{
                return response as any;
            });
    }

    getRoles(user_name: string){
        return this.httpr.post("/cp/getRoles?user_name=" + user_name);
    }

}