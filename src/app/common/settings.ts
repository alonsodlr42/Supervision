import {Injectable} from "@angular/core";

@Injectable()
export class Settings {

    public static clavePrograma;
  //static urlPrefix: string = "http://localhost:9080/itemssender-services/rest";
    static urlPrefix: string = "https://yebolatam.com/itemssender-services/rest";
    static  urlImgPrefix:string="https://yebolatam.com/itemssender-services";
    static ONESIGNAL_APP_ID="2cb381a1-44ad-4aa3-8e5c-a0776166dfe8";
    static APP_NAME='entregas';
    pass=''
    static ROLE_ADMIN = 'ROLE_ADMIN';
}
