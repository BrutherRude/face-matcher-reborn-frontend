import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true,
};

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() multiple: boolean = false;
  @Input() hideInput: boolean = false;
  @Input() id: string = 'input-field' + Math.floor(Math.random() * 1000);
  @Input() accept: string = '';

  value: string = '';

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  onInputChange(event: any): void {
    this.onChange(event.target.value);
    this.onTouch();
  }
}
