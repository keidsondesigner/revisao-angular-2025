import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent {
  checkoutForm: FormGroup;
  steps = ['shipping', 'payment', 'summary'];
  currentStepIndex = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      shipping: this.fb.group({}),
      payment: this.fb.group({}),
      coupon: ['']
    });
  }

  get currentStep(): string {
    return this.steps[this.currentStepIndex];
  }

  get canGoBack(): boolean {
    return this.currentStepIndex > 0;
  }

  get canGoForward(): boolean {
    return this.currentStepIndex < this.steps.length - 1;
  }

  goBack() {
    if (this.canGoBack) {
      this.currentStepIndex--;
      this.router.navigate(['checkout', this.currentStep]);
    }
  }

  goForward() {
    if (this.canGoForward) {
      this.currentStepIndex++;
      this.router.navigate(['checkout', this.currentStep]);
    }
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Formulário enviado:', this.checkoutForm.value);
    }
  }
}
