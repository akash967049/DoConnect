import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";


@Injectable()
export class NotificationService{
    constructor(private toastr: ToastrService){}

    // to Show Success notification

    showSuccess(massage: string, title: string){
        this.toastr.success(massage,title);
    }

    // to Show Error notification

    showError(massage: string, title: string){
        this.toastr.error(massage, title);
    }

    // to Show Info notification

    showInfo(massage: string, title: string){
        this.toastr.info(massage, title);
    }
}