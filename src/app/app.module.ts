import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {AutoCompleteModule} from 'ionic2-auto-complete';
import {MyApp} from './app.component';
import {Login} from "../pages/login/login";
import {NgCalendarModule} from "ionic2-calendar";
import {HttpWrapper} from "./common/http-wrapper";
import {CommonService} from "./common/common-service";
import {Utils} from "./common/utils";
import {LoginServices} from "../pages/login/login-service";
import {OneSignalServices} from "../pages/notificaciones/onesignal-service";
import {HttpModule} from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import {EmailValidator, IfWebDirective, IfMobileDirective} from "./common/directives";
import {SQLite} from "@ionic-native/sqlite";
import {CardIO} from '@ionic-native/card-io';
import {Settings} from "./common/settings";
import {CallNumber} from "@ionic-native/call-number";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {Device} from '@ionic-native/device';
import {Screenshot} from "@ionic-native/screenshot";
import {OrderModule} from "ngx-order-pipe";
import es from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import {StockFilter} from "./common/pipes";
import {MenuInicio} from "../pages/menu-inicio/menu-inicio";
import {HeaderPage} from "../pages/header/header";
import {MenuInicioService} from "../pages/menu-inicio/menu-inicio-service";
import {EntregasPage} from "../pages/mensajeros/mensajeros";
import {DetalleEntregaPage} from "../pages/detalle-mensajero/detalle-mensajero";
import {AgregarIncidenciaPage} from "../pages/agregar-incidencia/agregar-incidencia";
import {MensajerosService} from '../pages/mensajeros/mensajeros-service';
import {ModalImgPage} from '../pages/modal-img/modal-img';
import {CambioPass} from '../pages/cambio-pass/cambio-pass';
import {CambioPass2} from '../pages/cambio-pass/cambio-pass-2/cambio-pass-2';
import {CambioPass3} from '../pages/cambio-pass/cambio-pass-3/cambio-pass-3';
import {CambioPassService} from '../pages/cambio-pass/cambio-pass-service';
import {HomePage} from '../pages/home/home';
import {Registro} from '../pages/registro/registro';
import {ConfirmacionRegistro} from '../pages/registro/confirmacion-registro/confirmacion-registro';
import {MessageService} from '../app/MessageService';
import { Camera } from '@ionic-native/camera';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import {PrecioPipe} from '../pipes/PrecioPipe';
import {FechaPipe} from '../pipes/FechaPipe';

registerLocaleData(es);

@NgModule({
  declarations: [
    MyApp,
    Login,
    EmailValidator,
    IfWebDirective,
    IfMobileDirective,
    StockFilter,
    MenuInicio,
    HeaderPage,
    EntregasPage,
    DetalleEntregaPage,
    AgregarIncidenciaPage,
    ModalImgPage,
    CambioPass,
    CambioPass2,
    CambioPass3,
    HomePage,
    Registro,
    ConfirmacionRegistro,
    PrecioPipe,
    FechaPipe
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp, {
        scrollPadding: false,
        scrollAssist: true,
        autoFocusAssist: false,
        monthNames:['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
      cancelText:'Cancelar',
      doneText:'Continuar'
    }),//,{mode:'ios'}),
    HttpModule,
    HttpClientModule,
    OrderModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    MenuInicio,
    HeaderPage,
    EntregasPage,
    DetalleEntregaPage,
    AgregarIncidenciaPage,
    ModalImgPage,
    CambioPass,
    CambioPass2,
    CambioPass3,
    HomePage,
    Registro,
    ConfirmacionRegistro
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: 'es-ES'},
    Settings,
    Utils,
    HttpWrapper,
    CommonService,
    LoginServices,
    OneSignalServices,
    CambioPassService,
    MenuInicioService,
    MensajerosService,
    MessageService,
    SQLite,
    CardIO,
    CallNumber,
    ScreenOrientation,
    Device,
    Screenshot,
    Camera,
    LaunchNavigator,
    PrecioPipe,
    FechaPipe
  ]
})
export class AppModule {
}
