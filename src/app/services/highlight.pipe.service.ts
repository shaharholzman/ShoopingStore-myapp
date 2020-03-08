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

  console.log(list)
  console.log( /^[A-Z]/.test( searchText))
    if (!list) { 
      console.log('ddd')
      return []; }
    if (!searchText) {
      console.log('')

      return list  }

    if( !/^[A-Z]/.test(searchText)){
        let x =  searchText.toUpperCase().substring(0,1) + searchText.substring(1).toLowerCase()
      const value = list.replace(
        x, `<span style='background-color:yellow'>${x.toUpperCase().substring(0,1) + x.substring(1).toLowerCase()}</span>` );
        console.log('value', value);
        return this._sanitizer.bypassSecurityTrustHtml(value);

      }else{
              const value = list.replace(
        searchText, `<span style='background-color:yellow'>${searchText.toUpperCase().substring(0,1) + searchText.substring(1).toLowerCase()}</span>` );
        console.log('value', value);
        return this._sanitizer.bypassSecurityTrustHtml(value);

      }


  }

}
