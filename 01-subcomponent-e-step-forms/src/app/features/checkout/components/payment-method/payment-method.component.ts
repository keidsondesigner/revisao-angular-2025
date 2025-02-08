import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class PaymentMethodComponent implements OnInit {
  paymentForm!: FormGroup;
  paymentMethods = [
    { value: 'credit', label: 'Cartão de Crédito' },
    { value: 'debit', label: 'Cartão de Débito' },
    { value: 'pix', label: 'PIX' }
  ];

  constructor(private parent: FormGroupDirective, private fb: FormBuilder) {}

  ngOnInit() {
    this.paymentForm = this.fb.group({
      method: ['', Validators.required],
      cardNumber: [''],
      cardName: [''],
      expiryDate: [''],
      cvv: ['']
    });

    this.parent.form.addControl('payment', this.paymentForm);

    // Atualiza validações baseado no método de pagamento
    this.paymentForm.get('method')?.valueChanges.subscribe(method => {
      const cardControls = ['cardNumber', 'cardName', 'expiryDate', 'cvv'];
      
      if (method === 'credit' || method === 'debit') {
        cardControls.forEach(control => {
          this.paymentForm.get(control)?.setValidators([Validators.required]);
        });
      } else {
        cardControls.forEach(control => {
          this.paymentForm.get(control)?.clearValidators();
        });
      }
      
      this.paymentForm.updateValueAndValidity();
    });
  }
}
