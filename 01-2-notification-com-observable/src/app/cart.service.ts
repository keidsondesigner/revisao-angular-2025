import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'cartItems';
  private cartClearTimer?: ReturnType<typeof setTimeout>;
  
  private cartItems = new BehaviorSubject<Product[]>(this.loadCartItems());
  private cartQuantity = new BehaviorSubject<number>(this.loadCartItems().length);
  private isTimerActive = new BehaviorSubject<boolean>(false);

  cartItems$ = this.cartItems.asObservable();
  cartQuantity$ = this.cartQuantity.asObservable();
  isTimerActive$ = this.isTimerActive.asObservable();

  private loadCartItems(): Product[] {
    const storedItems = localStorage.getItem(this.CART_STORAGE_KEY);
    return storedItems ? JSON.parse(storedItems) : [];
  }

  private saveCartItems(items: Product[]) {
    const serializedItems = JSON.stringify(items);
    localStorage.setItem(this.CART_STORAGE_KEY, serializedItems);
  }

  addToCart(product: Product) {
    const currentItems = this.cartItems.getValue();
    const newItems = [...currentItems, product];
    this.cartItems.next(newItems);
    this.cartQuantity.next(newItems.length);
    this.saveCartItems(newItems);
    this.startClearCartTimer();
  }

  clearCart() {
    this.cartItems.next([]);
    this.cartQuantity.next(0);
    localStorage.removeItem(this.CART_STORAGE_KEY);
    if (this.cartClearTimer) {
      // verifica se existe um timer ativo para cancelá-lo, quando limpamos o carrinho manualmente.
      // Se existir, [clearTimeout()] cancela o timer antigo, para evitar múltiplos timers rodando ao mesmo tempo.
    // Impede que o código dentro do setTimeout seja executado
      clearTimeout(this.cartClearTimer);
      this.isTimerActive.next(false);
    }
  }

  startClearCartTimer() { 
    // verifica se já existe um timer ativo antes de criar um novo. 
    // Se existir, [clearTimeout()] cancela o timer antigo, para evitar múltiplos timers rodando ao mesmo tempo.
    // Impede que o código dentro do setTimeout seja executado
    if (this.cartClearTimer) {
      clearTimeout(this.cartClearTimer);
    }
    
    this.isTimerActive.next(true);
    
    this.cartClearTimer = setTimeout(() => {
      if (this.cartItems.getValue().length > 0) {
        // verifica se o carrinho ainda tem itens, se sim, limpa.
        this.clearCart(); 
        console.log(`Carrinho limpo automaticamente em menos de 1 minutos`);
      }
      this.isTimerActive.next(false);
    }, 5000); // em segundos 
  }

  // startClearCartTimer(minutes: number = 5) {
  //   if (this.cartClearTimer) {
  //     clearTimeout(this.cartClearTimer);
  //   }
    
  //   this.isTimerActive.next(true);
    
  //   this.cartClearTimer = setTimeout(() => {
  //     if (this.cartItems.getValue().length > 0) {
  //       this.clearCart();
  //       console.log(`Carrinho limpo automaticamente após ${minutes} minutos`);
  //     }
  //     this.isTimerActive.next(false);
  //   }, minutes * 60 * 1000); // em minutos
  // }

}