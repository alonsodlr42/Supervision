import {Injectable} from "@angular/core";
import {Nav} from "ionic-angular";
import {SQLiteObject} from "@ionic-native/sqlite";
import {PlatformInfo} from "./platformInfo";

@Injectable()
export class SessionData {
  public static macorinaDB:SQLiteObject=null;
  public static cuentaslogged:any=[];
  public static cuentaRegistro:any={};
  public static navSession:Nav;
  public static clavePrograma;
  public static claveAsignacion;
  public static tabHistory:any=[];
  public static flagParent:boolean=false;
  public static direccionSucursal:any={};
  public static telefonoAsignacion:any=null;
/*  public static asignacion:any={};*/
  public static isPop:boolean=false;
  public static fechaSelected:any;
  public static platformInfo:PlatformInfo;
  public static  items:any=[];
  public static categorias:any=[];
  public static version='1.0.0';
}
