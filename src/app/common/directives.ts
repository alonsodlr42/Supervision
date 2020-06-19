
import {Directive,Input, ElementRef, TemplateRef, ViewContainerRef } from "@angular/core";
import {AbstractControl, FormControl, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";
import {SessionData} from "./session-data";

@Directive({
    selector: '[myEmail][ngModel]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true}
    ]
})
export class EmailValidator implements Validator {
    validator:ValidatorFn;

    constructor() {
        this.validator = emailValidatorFactory();
    }

    validate(c:FormControl) {
        return this.validator(c);
    }
}

function emailValidatorFactory():ValidatorFn {
    return (c:AbstractControl) => {
        let exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = exp.test(c.value);
        if (typeof c.value === 'undefined' || !c.value || c.value == '') {
            isValid = true;
        }
        return isValid ? null : {myEmail: true};
    }
}




@Directive({
    selector: '[ifWeb]'
})
export class IfWebDirective {

    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {
    }
    @Input()
    set ifWeb(c) {
        if(SessionData.platformInfo.isWeb()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}

@Directive({
    selector: '[ifMobile]'
})
export class IfMobileDirective {

    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {
    }
    @Input()
    set ifMobile(c) {
        if(!SessionData.platformInfo.isWeb()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}