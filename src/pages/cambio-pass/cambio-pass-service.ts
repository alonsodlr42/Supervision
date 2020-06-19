import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {HttpWrapper} from "../../app/common/http-wrapper";


@Injectable()
export class CambioPassService {

    constructor(private httpr: HttpWrapper) {
    }

    enviarInstrucciones(email) {
        return this.httpr.post("/resetPassword/send/pass-temporal", JSON.stringify(email)).then(
            response => {
                return response as any;
            });
    }
    verificaPassTemporal(request) {
        return this.httpr.post("/resetPassword/verifica/pass-temporal", JSON.stringify(request)).then(
            response => {
                return response as any;
            });
    }

    setNewPassword(request) {
        return this.httpr.post("/resetPassword/new/password", JSON.stringify(request)).then(
            response => {
                return response as any;
            });
    }

}