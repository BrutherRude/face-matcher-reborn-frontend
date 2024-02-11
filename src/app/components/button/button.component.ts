import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() label: string = "";
  @Input() callback: Function = (args?:any) => {};
  @Input() type : string = "submit"

  execute() {
    this.callback();
  }

}
