/**
 * Created by edsson on 6/09/18.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stockFilter',
    pure: false
})
export class StockFilter implements PipeTransform {
    transform(items: any[], filter: Object): any {
        if (!items) {
            return items;
        }
        return items.filter(item => item.stockContenido > 0);
    }
}