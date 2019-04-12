import { Component, OnInit } from '@angular/core';
import { serverUrl } from "../config/config";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: "main.component.html",
  styleUrls: ["main.component.css"]
})
export class MainComponent implements OnInit {
  images = null;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getAllImages();
  }

  processingGetAllImagesResult(data) {
    this.images = data.result;

    console.log(this.images);
  }

  getAllImages() {
    var url = serverUrl + "/images";

    console.log(url);

    this.http.get(url)
        .subscribe(
            data => this.processingGetAllImagesResult(data),
            err => console.log(err),
            () => {}
        );
  }

}
