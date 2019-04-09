import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: "main.component.html",
  styleUrls: ["main.component.css"]
})
export class MainComponent implements OnInit {

  firstWhiteRectangle: false;
  secondWhiteRectangle: false;
  thirdWhiteRectangle: false;

  @ViewChild('whiteRectangle1') whiteRectangle1: ElementRef;
  @ViewChild('whiteRectangle2') whiteRectangle2: ElementRef;
  @ViewChild('whiteRectangle3') whiteRectangle3: ElementRef;

  @ViewChild('smile1') smile1: ElementRef;

  constructor() {
  }

  smileClick(smileNumber) {
    console.log(111);
    console.log(smileNumber);

    this.whiteRectangle1.nativeElement.append(this.smile1.nativeElement);

    console.log(1);
  }

  ngOnInit() {
  }

}
