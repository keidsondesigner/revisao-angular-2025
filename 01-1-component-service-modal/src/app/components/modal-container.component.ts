import {
  Component,
  OnInit,
  ViewContainerRef,
  ComponentRef,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService, ModalConfig } from '../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-container',
  template: `
    <div class="modal-backdrop" *ngIf="isModalOpen" (click)="closeModal()"></div>
    <ng-container #modalContent></ng-container>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  private modalSubscription: Subscription | undefined;
  private currentComponentRef: ComponentRef<any> | null = null;
  isModalOpen: boolean = false;

  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.modalSubscription = this.modalService
      .getModalState()
      .subscribe((config: ModalConfig | null) => {
        try {
          this.viewContainerRef.clear();
          if (config) {
            this.currentComponentRef = this.viewContainerRef.createComponent(
              config.component
            );
            if (config.data) {
              Object.assign(this.currentComponentRef.instance, config.data);
            }
            this.isModalOpen = true;
          } else {
            this.isModalOpen = false;
          }
        } catch (error) {
          console.error('Error in modal container:', error);
          this.isModalOpen = false;
        }
      });
  }

  ngOnDestroy() {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
