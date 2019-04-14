import { Component, OnInit } from '@angular/core';
import { serverUrl } from "../config/config";
import { HttpClient } from "@angular/common/http";
import { SharedService } from "../shared.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalContent} from "../modal-window/modal-window.component";

@Component({
  selector: 'app-main',
  templateUrl: "main.component.html",
  styleUrls: ["main.component.css"]
})
export class MainComponent implements OnInit {
  public images = null;

  modalWindowIsOpen = false;

  ss = null;

  constructor(private http: HttpClient,
              ss: SharedService,
              private modalService: NgbModal) {
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

  openModal(image, images) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.image = image;
    modalRef.componentInstance.images = images;
  }

}
