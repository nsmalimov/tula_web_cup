import { Component, OnInit } from '@angular/core';
import { serverUrl } from "../config/config";
import { HttpClient } from "@angular/common/http";
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-main',
  templateUrl: "main.component.html",
  styleUrls: ["main.component.css"]
})
export class MainComponent implements OnInit {
  public images = null;

  ss = null;

  constructor(private http: HttpClient,
              ss: SharedService) {
    this.ss = ss;
  }

  ngOnInit() {
    this.getAllImages();

    this.ss.getEmittedValue().subscribe(
        item => this.processingCommandFromAnotherComponent(item));
  }

  processingGetAllImagesResult(data) {
    this.images = data.result;
  }

  processingCommandFromAnotherComponent(command) {
    if (command === "load") {
      this.getAllImages();
    }
  }

  public getAllImages() {
    var url = serverUrl + "/images";

    this.http.get(url)
        .subscribe(
            data => this.processingGetAllImagesResult(data),
            err => console.log(err),
            () => console.log("ok, getAllImages")
        );
  }

}
