import { Component, OnInit } from '@angular/core';
import { serverUrl } from "../config/config";
import { HttpClient } from "@angular/common/http";
import { SharedService } from "../shared.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from "../modal-window/modal-window.component";

@Component({
    selector: 'app-main',
    templateUrl: "main.component.html",
    styleUrls: ["main.component.css"]
})
export class MainComponent implements OnInit {
    dropDownSortElems = [
        {
            "name": "Название (по возрастанию)",
            "sort_param": "image_name,ASC",
        },
        {
            "name": "Название (по убыванию)",
            "sort_param": "image_name,DESC",
        },
        {
            "name": "Рейтинг (во возрастанию)",
            "sort_param": "rate,ASC",
        },
        {
            "name": "Рейтинг (по убыванию)",
            "sort_param": "rate,DESC",
        }
    ];

    public images = null;

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
        console.log(data);
        this.images = data.result;
    }

    processingCommandFromAnotherComponent(command) {
        if (command === "load") {
            this.getAllImages();
            return
        }

        if (command.includes("load_by_sort_param:")) {
            var sortParam = command.replace("load_by_sort_param:", "");

            this.getAllSortedByParamImages(sortParam);
            return;
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

    public getAllSortedByParamImages(sortParam) {
        var url = serverUrl + "/images_sort/" + sortParam;

        this.http.get(url)
            .subscribe(
                data => this.processingGetAllImagesResult(data),
                err => console.log(err),
                () => console.log("ok, getAllSortedByParamImages")
            );
    }

    openModal(image, images) {
        const modalRef = this.modalService.open(NgbdModalContent);
        modalRef.componentInstance.image = image;
        modalRef.componentInstance.images = images;
    }
}
