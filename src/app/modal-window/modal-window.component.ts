import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: "modal-window.component.html",
  styleUrls: ["modal-window.component.scss"]
})
export class NgbdModalContent {
  @Input() image;
  @Input() images;

  constructor(public activeModal: NgbActiveModal) {
  }

  buttonClickPrev() {
    for (var i = 0; i < this.images.length; i++) {
      if (this.images[i].id == this.image.id) {
        var num = i - 1;

        if (num < 0) {
          console.log(this.images.length + num);
          this.image = this.images[this.images.length + num];
        } else {
          this.image = this.images[num];
        }

        break
      }
    }
  }

  buttonClickNext() {
    for (var i = 0; i < this.images.length; i++) {
      if (this.images[i].id == this.image.id) {
        var num = i + 1;

        if (num > this.images.length - 1) {
          num = 0;
        }

        this.image = this.images[num];
        break
      }
    }
  }
}
