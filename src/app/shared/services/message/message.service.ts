import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../../models/message.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

    options = {
        enableHtml: true,
        closeButton: true
    }

    constructor(private toastService: ToastrService, private translateService: TranslateService) {
    }

    showError(message: Message) {
        this.toastService.error('<br>' + message.error || message.text, message.code + ' - ' + message.title || this.translateService.instant('message.error') + message.code, this.options);
    }

}
