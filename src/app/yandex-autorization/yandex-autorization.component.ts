import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { serverUrl, yandexDiskUrl, yandexDiskRedirectUrl } from "../config/config";
import { CookieService } from "ngx-cookie-service";
import { SharedService } from '../shared.service';

@Component({
    selector: "app-yandex-autorization",
    templateUrl: "yandex-autorization.component.html",
    styleUrls: ["yandex-autorization.component.css"]
})
export class YandexAutorizationComponent implements OnInit {
    yandexAuthUrl = "https://oauth.yandex.ru/authorize?" +
        "response_type=token" +
        "&client_id=5a58fbfa8c2e413091acf54202975c48" +
        "&redirect_uri=" + yandexDiskRedirectUrl;

    userToken = null;

    ss = null;

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                ss: SharedService) {
        this.ss = ss;
    }

    sentDataToMainComponent(data) {
        this.ss.send(data);
    }

    ngOnInit() {
        this.userToken = this.cookieService.get("Token");

        if (this.userToken) {
            console.log("Authorized, cookie", this.userToken);

            if (document.location.hash) {
                document.location.replace(yandexDiskRedirectUrl);
            }
            // может быть их много ...
            this.getImagesFromUserYandexDisk();
        } else {
            if (document.location.hash) {
                this.userToken = /access_token=([^&]+)/.exec(document.location.hash)[1];

                this.cookieService.set("Token", this.userToken);

                console.log("Authorized by service");

                document.location.replace(yandexDiskRedirectUrl);

                this.createUser();

                this.getImagesFromUserYandexDisk();
            } else {
                console.log("Not authorized")
            }
        }
    }

    public initYandexAutorization() {
        window.open(this.yandexAuthUrl, "_self");
    }

    createUser() {
        var url = serverUrl + "/users/" + this.userToken;

        this.http.post(url, {})
            .subscribe(
                data => {
                },
                err => console.log(err),
                () => console.log("ok, createUser"),
            );
    }

    parseYandexDiskResponse(yandexResponseObject) {
        console.log('start, parseYandexDiskResponse');

        var yandexDiskImageItems = yandexResponseObject._embedded.items;

        var updateImagesRequest = {
            "images": [],
        };

        yandexDiskImageItems.forEach(function (item) {
            updateImagesRequest.images.push({
                "image_name": item.name,
                "image_url": item.file,
                "resource_id": item.resource_id,
            })
        });

        this.updateImages(updateImagesRequest)
    }

    getImagesFromUserYandexDisk() {
        console.log("start, getImagesFromUserYandexDisk");

        var url = yandexDiskUrl;

        url += "&limit=100";

        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "OAuth " + this.userToken,
        });

        let options = {
            headers: headers
        };

        this.http.get(url, options)
            .subscribe(
                data => this.parseYandexDiskResponse(data),
                err => console.log(err),
                () => console.log("ok, getImagesFromUserYandexDisk")
            );
    }

    updateImages(updateImagesRequest) {
        console.log('start, updateImages');

        var url = serverUrl + "/images/" + this.userToken;

        this.http.post(url, updateImagesRequest)
            .subscribe(
                data => this.sentDataToMainComponent("load"),
                err => console.log(err),
                () => function () {
                    console.log("ok, updateImages");
                }
            );
    }
}
