import {Injectable} from "@angular/core";
import {Platform} from 'ionic-angular';
export class PlatformInfo{
    public static isWeb:boolean;
    constructor(public platform:Platform){
    }

    public isWeb():boolean{
        return this.platform.is(<string>Platforms.WEB);
    }
    public isAndroid():boolean{
        return this.platform.is(<string>Platforms.ANDROID);
    }

    public isIos():boolean{
        return this.platform.is(<string>Platforms.IOS);
    }
  public isNative():boolean{
    return this.isIos()||this.isAndroid();
  }

}
enum Platforms{
    IOS="ios",
    ANDROID="android",
    WEB="core",
    IPHONE="iphone",
}
