import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-coupon-code',
  templateUrl: './coupon-code.component.html',
  styleUrls: ['./coupon-code.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CouponCodeComponent,
      multi: true
    }
  ]
})
export class CouponCodeComponent implements ControlValueAccessor {
  value: string = '';
  disabled: boolean = false;
  
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

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouch();
  }

  applyCoupon(): void {
    console.log('Aplicando cupom:', this.value);
  }
}
