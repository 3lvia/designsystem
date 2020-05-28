import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    headerWarning = {
        show: true,
        closable: true
    };

    sideBar = {
        show: true
    };
}
