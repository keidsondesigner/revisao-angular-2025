import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class ShippingAddressComponent implements OnInit {
  shippingForm!: FormGroup;

  constructor(private parent: FormGroupDirective, private fb: FormBuilder) {}

  ngOnInit() {
    this.shippingForm = this.fb.group({
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });

    this.parent.form.addControl('shipping', this.shippingForm);
  }
}
