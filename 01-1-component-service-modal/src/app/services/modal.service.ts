import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ModalConfig {
  component: any;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new BehaviorSubject<ModalConfig | null>(null);

  openModal(config: ModalConfig): void {
    try {
      this.modalState.next(config);
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  }

  closeModal(): void {
    try {
      this.modalState.next(null);
    } catch (error) {
      console.error('Error closing modal:', error);
    }
  }

  getModalState(): Observable<ModalConfig | null> {
    return this.modalState.asObservable();
  }
}