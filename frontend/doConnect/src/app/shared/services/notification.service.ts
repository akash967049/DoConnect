import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";


@Injectable()
export class NotificationService{
    constructor(private toastr: ToastrService){

    }

    showSuccess(massage: string, title: string){
        this.toastr.success(massage,title);
    }

    showError(massage: string, title: string){
        this.toastr.error(massage, title);
    }

    showInfo(massage: string, title: string){
        this.toastr.info(massage, title);
    }
}