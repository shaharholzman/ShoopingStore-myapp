import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserService } from './user.service';


@Pipe({
  name: 'highlight'
})

@Injectable({
  providedIn: 'root'
})


export class HighlightPipeService implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer, public su:UserService) { }

  transform(list = this.su.productsOfCart, searchText: string): any {

    if (!list) { 
      return []; }
    if (!searchText) {
      return list  }

    if( /^[A-Z]/.test(searchText)){
      const value = list.replace(
        searchText, `<span style='background-color:yellow'>${searchText.toUpperCase().substring(0,1) + searchText.substring(1).toLowerCase()}</span>` );
        console.log('value', value);
        return this._sanitizer.bypassSecurityTrustHtml(value);

      }else{
        let x =  searchText.toUpperCase().substring(0,1) + searchText.substring(1).toLowerCase()
        const value = list.replace(
        x, `<span style='background-color:yellow'>${x.toUpperCase().substring(0,1) + x.substring(1).toLowerCase()}</span>` );
        console.log('value', value,x);
        return this._sanitizer.bypassSecurityTrustHtml(value);
      }


  }

}
