import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-b',
  templateUrl: './panel-b.component.html',
  styleUrls: ['./panel-b.component.css']
})
export class PanelBComponent implements OnInit {

  public slideIndex:number = 1;

  constructor() { }

showSlides(slideIndex);


// slide pic
showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {this.slideIndex = 1}
  if (n < 1) {this.slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].className += "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[this.slideIndex-1].className += "block";
  dots[this.slideIndex-1].className += " active";
}

  currentSlide(n) {
  this.showSlides(this.slideIndex = n);
  }


  ngOnInit() {
  }

}
