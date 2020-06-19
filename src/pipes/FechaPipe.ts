import {Pipe} from '@angular/core';

@Pipe({
    name: 'fecha'
})
export class FechaPipe {
    transform(value: string, args) {

        value = value.toString();

        if (value == null || value == ''){
            return value;
        }

        let dia = value.split(' ')[0].split('-')[2];
        let mes = value.split(' ')[0].split('-')[1];
        let ano = value.split(' ')[0].split('-')[0];

        let nombreMes;
        if( +mes == 1){
            nombreMes = 'Enero'
        } else if( +mes == 2){
            nombreMes = 'Febrero'
        } else if( +mes == 3){
            nombreMes = 'Marzo'
        } else if( +mes == 4){
            nombreMes = 'Abril'
        } else if( +mes == 5){
            nombreMes = 'Mayo'
        } else if( +mes == 6){
            nombreMes = 'Junio'
        } else if( +mes == 7){
            nombreMes = 'Julio'
        } else if( +mes == 8){
            nombreMes = 'Agosto'
        } else if( +mes == 9){
            nombreMes = 'Septiembre'
        } else if( +mes == 10){
            nombreMes = 'Octubre'
        } else if( +mes == 11){
            nombreMes = 'Noviembre'
        } else if( +mes == 12){
            nombreMes = 'Diciembre'
        } else {
            nombreMes = '';
        }

        let  hora = '';
        if(args){
            hora = value.split(' ')[1].split(':')[0] + ':' + value.split(' ')[1].split(':')[1] + ' hrs.';
        }

        return +dia + ' ' + nombreMes + ' ' + ano + ' ' + hora;
    }
}