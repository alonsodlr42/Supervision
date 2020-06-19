import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {HttpWrapper} from "../../app/common/http-wrapper";
import {SessionData} from "../../app/common/session-data";
import {Utils} from "../../app/common/utils";
import {CommonService} from "../../app/common/common-service";
import {OneSignalServices} from "../notificaciones/onesignal-service";
import {Settings} from "../../app/common/settings";

@Injectable()
export class LoginServices {

    constructor(private httpr: HttpWrapper, private commonsService: CommonService,private oneSignalServices:OneSignalServices) {
    }

    validateUser(user) {
        return this.httpr.post("/flink/validateUser", JSON.stringify(user)).then(
            response => {
                return response as any;
            });
    }

       loginFunc(user: any, saveUser: boolean, goCallback: () => void, failCallback?: (err) => void) {
        console.log("Iniciar sesion");
        this.httpr.headers.set('j_username', user.username);
        this.httpr.headers.set('j_password', user.password);
        console.log(this.httpr.headers);
        this.validateUser(user).then(
            response => {
                if (SessionData.macorinaDB != null && saveUser) {
                    SessionData.macorinaDB.executeSql('INSERT INTO USER (username,password) VALUES (?,?) ', [user.username, user.password]).then(
                        resp => {
                            console.log(resp);
                            this.procesaValidateUsrRep(response, goCallback);
                        },
                        error => {
                            console.log(error);
                            alert("Error al guardar usuario en db local");
                        }
                    )
                } else {
                    console.log("Response: ", response);
                    sessionStorage.setItem('j_username', user.username);
                    sessionStorage.setItem('j_password', user.password);
                    this.procesaValidateUsrRep(response, goCallback);
                }
                localStorage.setItem('userActive', 'true');
            }).catch(err => {
                console.error(err);
                if(failCallback){
                    failCallback(err);
                }else{
                  if (err.status == 401 || (err.statusText.indexOf('Bad credentials') != -1 || err.statusText.indexOf('No Autorizado') != -1 || err.statusText.indexOf('Unauthorized') != -1)) {
                    Utils.doAlert({title: 'Error', message: 'Usuario o contraseña incorrectos'});
                  } else {
                    Utils.doAlert({
                      title: 'Error',
                      message: '<p>Ha ocurrido un error con el servidor int&eacute;ntelo m&aacute;s tarde</p>'
                    });
                  }
                }

        });
    }

    procesaValidateUsrRep(response: any, goCallback: () => void) {
        if (response.exitoso === true) {
            this.commonsService.getCuentasUserLogged().then(
                cuentas => {
                    console.log('Buscando cuentas...');
                    this.selectcuentas(cuentas);
                    console.log(cuentas);
                    goCallback();
                }
            ).catch(err => {
                console.log('Error: ', err);
                Utils.doAlert('Ocurrió un error en la consulta de cuentas');
            });
          /*let externalIdForNotif=Settings.APP_NAME+"_"+SessionData.asignacion.id;
          this.oneSignalServices.init(Settings.ONESIGNAL_APP_ID,externalIdForNotif,Settings.APP_NAME);
          */
        } else {
            console.log("No hay datos");
        }
    }

    selectcuentas(cuentas) {
        if (cuentas) {
            SessionData.cuentaslogged = cuentas;
        }
    }

}
