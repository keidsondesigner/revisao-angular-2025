import { Component, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CartService } from './app/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-purple-600 p-4 text-white flex justify-between items-center">
      <h1 class="text-xl">Ecommerce</h1>
      <div class="flex items-center gap-4">
        <div class="relative cursor-pointer">
          <span class="material-icons">shopping_cart</span>
          <span class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {{ cartQuantity$ | async }}
          </span>
        </div>
        <button (click)="clearCart()" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Limpar Carrinho
        </button>
        <button 
          (click)="startTimedClear()" 
          [disabled]="isTimerActive$ | async"
          [class]="(isTimerActive$ | async) ? 
            'bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed' : 
            'bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600'"
        >
          {{ (isTimerActive$ | async) ? 'Limpeza agendada...' : 'Limpar em 5 min' }}
        </button>
        <button class="bg-white text-purple-600 px-4 py-2 rounded">Login</button>
      </div>
    </header>

    <main class="container mx-auto p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-lg shadow-md p-4">
          <img src="https://placehold.co/400" alt="Product" class="w-full h-48 object-cover mb-4">
          <h2 class="text-xl font-bold mb-2">Fantastic Soft Sausages</h2>
          <p class="text-gray-600 mb-4">R$319.00</p>
          <p class="mb-4">28 disponíveis</p>
          <button 
            (click)="addToCart()" 
            class="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </main>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  `]
})
export class App {
  // private cartService = inject(CartService);
  cartQuantity$ = this._cartService.cartQuantity$;
  isTimerActive$ = this._cartService.isTimerActive$;

  constructor(private _cartService: CartService) {}

  addToCart() {
    const product = {
      id: 1,
      name: 'Fantastic Soft Sausages',
      price: 319.00,
      description: 'The automobile layout consists of a front-engine design'
    };
    this._cartService.addToCart(product);
  }

  clearCart() {
    this._cartService.clearCart();
  }

  startTimedClear() {
    this._cartService.startClearCartTimer();
  }
}

bootstrapApplication(App);