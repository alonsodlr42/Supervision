import {Injectable} from "@angular/core";
import {Headers, Http, ResponseContentType, RequestOptionsArgs} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Utils} from "./utils";
import {Settings} from "./settings";

@Injectable()
export class HttpWrapper {

  /*private headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
   static  urlPrefix:string="/lealtad";*/

  public headers = new Headers({'Content-Type': 'application/json; charset=utf-8','j_username':'','j_password':''});
  public headersWeb = new Headers({'Content-Type': 'application/json; charset=utf-8'});


  private options:RequestOptionsArgs={headers: this.headers,responseType:ResponseContentType.Json,withCredentials: false};

  private optionsWeb:RequestOptionsArgs={headers: this.headersWeb,responseType:ResponseContentType.Json};
  constructor(private http: Http, private utils:Utils) { }


  post(url: string, body?: any, options?: RequestOptionsArgs): any{
    let optionsSend:RequestOptionsArgs;
    url=Settings.urlPrefix+url;
    optionsSend=this.options;

    return this.http.post(url, body, Object.assign(options?options:{},optionsSend)).toPromise()
      .then(
        response => {
          Utils.hideLoading();
          return response.json();
        }
      ).catch(this.handleError);
  }

    get(url: string, body?: any, options?: RequestOptionsArgs): any{
        return this.http.get(url);
    }

  getUserName(){
    var values=this.headers.getAll('j_username');
    if(values){
      return values[0].trim();
    }
    return null;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    Utils.hideLoading();
    return Promise.reject(error.message || error);
  }


}
