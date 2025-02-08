import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutFormComponent,
    children: [
      { path: '', redirectTo: 'shipping', pathMatch: 'full' },
      { path: 'shipping', component: ShippingAddressComponent },
      { path: 'payment', component: PaymentMethodComponent },
      { path: 'summary', component: OrderSummaryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
