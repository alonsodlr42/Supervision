import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
    private _listners = new Subject<any>();

    listen(): Observable<any> {
        return this._listners.asObservable();
    }

    push(filterBy: string) {
        localStorage.removeItem('userActive');
        this._listners.next(filterBy);
    }

}