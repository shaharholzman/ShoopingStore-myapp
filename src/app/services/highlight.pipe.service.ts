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
    if (!list) { return []; }
    if (!searchText) { return list; }
    const value = list.replace(
      searchText, `<span style='background-color:yellow'>${searchText}</span>` );
    console.log('value', value);

    return this._sanitizer.bypassSecurityTrustHtml(value);
  }

}
