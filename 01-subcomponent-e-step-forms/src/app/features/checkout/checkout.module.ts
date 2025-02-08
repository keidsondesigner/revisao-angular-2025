import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CouponCodeComponent } from './components/coupon-code/coupon-code.component';

@NgModule({
  declarations: [
    CheckoutFormComponent,
    ShippingAddressComponent,
    PaymentMethodComponent,
    OrderSummaryComponent,
    CouponCodeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
