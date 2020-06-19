import {Pipe} from '@angular/core';

@Pipe({
    name: 'precio'
})
export class PrecioPipe {
    transform(value: string, args) {

        value = value.toString();

        if (value == null || value == ''){
            return value;
        }
        let valor = '';
        let arrStr = value.split('.');
        let enteros = arrStr[0];
        let decimales = null;

        if(arrStr.length > 0){
            decimales = arrStr[1];
        }

        for(let i=enteros.length; i > 0; i = i-3){
            // if ((enteros.length/3) > 1){
                valor = enteros.substring(i-3, i) + ',' + valor;
            // }
        }

        valor=valor.substring(0, valor.length-1)

        if(decimales != null && decimales != ''){
            if(decimales.length==1){
                decimales = decimales + '0';
            } else if (decimales.length>1){
                decimales = decimales.substring(0,2);
            }
        } else {
            decimales = '00'
        }

        if(enteros == null || enteros == ''){
            enteros = '0';
        }

        return '$' + valor + '.' + decimales;
    }
}