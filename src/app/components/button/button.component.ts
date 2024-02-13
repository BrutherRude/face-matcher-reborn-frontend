import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  providers: [
    AuthService
  ]
})
export class ButtonComponent {

  constructor() {}

  @Input() label: string = "";
  @Input() callback: (() => void) | undefined;
  @Input() type : string = "submit"

  execute() {
    if(this.callback) {
      this.callback();
    }

  }

}
