import {Injectable} from "@angular/core";

@Injectable()
export class OneSignalServices {

  oneSignalId: any; // store OneSignalId in localStorage
  //userSession: any; // User Session management token

  private OneSignal:any;
  constructor() {
    console.log('OneSignal Service Init', !!this.OneSignal);
  }

  // Call this method to start the onesignal process.
  public init(appid,externalUserId,appname) {
    this.OneSignal ? console.log('Already Initialized') : this.addScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js', (callback) => {
      console.log('OneSignal Script Loaded');
      this.initOneSignal(appid,externalUserId,appname);
    })
  }

  public removeExternalId(){
    this.OneSignal.push(function() {
      this.OneSignal.removeExternalUserId();
    });
  }

  private addScript(fileSrc, callback) {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = callback;
    script.src = fileSrc;
    head.appendChild(script);
  }

  private initOneSignal(appid,externalUserId,appname) {
    let OneSignal = window['OneSignal'] || [];
    this.OneSignal=OneSignal;
    OneSignal.sendTag('appname', appname, (tagsSent) => {
      console.log('OneSignal Tag Sent', tagsSent);
    });
    console.log('Init OneSignal');

    OneSignal.push(function () {
      OneSignal.init({
        appId: appid,
        autoRegister: true,
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      });
      OneSignal.showNativePrompt();
      OneSignal.setExternalUserId(externalUserId);
    });

    console.log('OneSignal Initialized');
    this.checkIfSubscribed();
  }



  private subscribe() {
    let OneSignal=this.OneSignal;
    OneSignal.push(() => {
      console.log('Register For Push');
      OneSignal.push(['registerForPushNotifications']);
      OneSignal.on('subscriptionChange', (isSubscribed) => {
        console.log('The user\'s subscription state is now:', isSubscribed);
        // this.listenForNotification();
        OneSignal.getUserId().then((userId) => {
          console.log('User ID is', userId);
          this.oneSignalId = userId;
          //this.updateLocalUserProfile();
        });
      });
    });
  }

  /*  listenForNotification() {
      console.log('Initalize Listener');
      this.OneSignal.on('notificationDisplay', (event) => {
        console.log('OneSignal notification displayed:', event);
        this.listenForNotification();
      });
    }*/

  private getUserID() {
    this.OneSignal.getUserId().then((userId) => {
      console.log('User ID is', userId);
      this.oneSignalId = userId;
    });
  }

  private checkIfSubscribed() {
    this.OneSignal.push(() => {
      /* These examples are all valid */
      this.OneSignal.isPushNotificationsEnabled((isEnabled) => {
        if (isEnabled) {
          console.log('Push notifications are enabled!');
          this.getUserID();
        } else {
          console.log('Push notifications are not enabled yet.');
          this.subscribe();
        }
      }, (error) => {
        console.log('Push permission not granted');
      });
    });
  }

  /*  updateLocalUserProfile() {
      // Store OneSignal ID in your server for sending push notificatios.
    }*/
}


