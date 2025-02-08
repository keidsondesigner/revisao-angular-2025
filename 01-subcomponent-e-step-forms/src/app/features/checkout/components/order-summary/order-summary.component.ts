import { Component, OnInit } from '@angular/core';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  items: OrderItem[] = [];
  subtotal: number = 0;
  shipping: number = 0;
  discount: number = 0;
  total: number = 0;

  ngOnInit() {
    // Simulando dados do carrinho
    this.items = [
      { name: 'Produto 1', quantity: 2, price: 99.90 },
      { name: 'Produto 2', quantity: 1, price: 149.90 }
    ];

    this.calculateTotals();
  }

  private calculateTotals() {
    this.subtotal = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    this.shipping = 15.90; // Valor fixo para exemplo
    this.total = this.subtotal + this.shipping - this.discount;
  }
}
