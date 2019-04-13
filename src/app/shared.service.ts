import { Injectable, Output, EventEmitter } from '@angular/core';


@Injectable()
export class SharedService {
    @Output() fire: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    send(send) {
        this.fire.emit(send);
    }

    getEmittedValue() {
        return this.fire;
    };
}
