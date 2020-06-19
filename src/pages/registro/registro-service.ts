import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {HttpWrapper} from "../../app/common/http-wrapper";


@Injectable()
export class RegistroService {

    constructor(private httpr:HttpWrapper) { }

    guardar(clienteRequest:any){
        return this.httpr.post("/auto/clientes/guardar",JSON.stringify(clienteRequest)).then(
            response =>{
                return response as any;
            });
    }

}