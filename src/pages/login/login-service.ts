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
  roleAdmin=false;
  constructor(private httpr: HttpWrapper, private commonsService: CommonService, private oneSignalServices: OneSignalServices) {
  }

  validateUser(user) {
    return this.httpr.post("/flink/validateUser", JSON.stringify(user)).then(
      response => {
        return response as any;
      });
  }

  loginFunc(user: any, saveUser: boolean, goCallback: () => void, failCallback?: (err) => void) {
    this.httpr.headers.set('j_username', user.username);
    this.httpr.headers.set('j_password', user.password);
    /*console.log("Iniciar sesion");*/
    /*console.log(this.httpr.headers);*/
    /*this.validateUserRole(user);*/
    this.validateUser(user).then(
      response => {
        let rolesPromise = this.httpr.post("/cp/getRoles?user_name="+user.username)
        Promise.all([null,rolesPromise]).then(responses => {
          const rolesResponse = responses[1];
          if (rolesResponse.exitoso) {
            const roles = rolesResponse.datos || [];
            const roleAdmin = roles.filter(rol => {
              return rol.name === Settings.ROLE_ADMIN;
            });
            if (roleAdmin && roleAdmin.length > 0 && roleAdmin[0].id) {
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
                /*console.log("Response1: ", response);*/
                sessionStorage.setItem('j_username', user.username);
                sessionStorage.setItem('j_password', user.password);
                this.procesaValidateUsrRep(response, goCallback);
              }
              localStorage.setItem('userActive', 'true');
            } else {
              Utils.doAlert({title: 'Atención', message: 'Usuario sin privilegios de administrador'});
            }
          }
        })
      }).catch(err => {
      console.error(err);
      if (failCallback) {
        failCallback(err);
      } else {
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

  getRepartidores(idPrograma: any, goCallback: () => void) {
    this.commonsService.getRepartidoresByPrograma(idPrograma).then(
      response => {
        localStorage.setItem('repartidores', JSON.stringify(response));
        goCallback();
      }
    ).catch(err => {
      console.log('Error: ', err);
      Utils.doAlert('Ocurrió un error en la consulta de los repartidores');
    });
  }

  procesaValidateUsrRep(response: any, goCallback: () => void) {
    if (response.exitoso === true) {
      this.commonsService.getCuentasUserLogged().then(
        cuentas => {
          /*console.log('Buscando cuentas...');*/
          this.selectcuentas(cuentas);
          localStorage.setItem('session_data', JSON.stringify(cuentas[0]));
          this.getRepartidores(cuentas[0].programa.id, goCallback)
          /*console.log(cuentas);*/
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
