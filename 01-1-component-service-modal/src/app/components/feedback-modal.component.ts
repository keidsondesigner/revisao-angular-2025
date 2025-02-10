import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../services/modal.service';
import { BehaviorSubject, Subject } from 'rxjs';

const emojis = ['😞', '😕', '😐', '🙂', '😄'];

@Component({
  selector: 'app-feedback-modal',
  template: `
    <div class="modal">
      <div class="w-full max-w-md mx-auto">
        <div class="card-header">
          <h1 class="text-center">Como foi sua experiência?</h1>
          <a (click)="close()">X</a>
        </div>
        <form (ngSubmit)="handleSubmit()">
          <div class="card-content space-y-4">
            <div class="flex justify-between">
              <span *ngFor="let emoji of emojis; let i = index"
                      (click)="handleEmojiClick(i)"
                      class="emojis text-4xl transition-transform"
                      [ngClass]="{'scale-125': (rating$ | async) === i, 'opacity-50': (rating$ | async) !== i}">
                {{ emoji }}
              </span>
            </div>
            <textarea
              placeholder="Conte-nos sobre sua experiência..."
              [value]="comment$ | async"
              (input)="handleCommentChange($event)"
              rows="3"
              class="w-full">
            </textarea>
          </div>
          <div class="card-footer">
            <button 
              type="submit" 
              class="w-full" 
              [disabled]="(rating$ | async) === -1 || (comment$ | async)!.length <= 5">
              Enviar Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `.card {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 16px;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }

    .card-header {
      display: flex;
      margin-bottom: 16px;
      align-items: center;
      justify-content: space-between;
      gap: 30px
    }

    .card-header h1 {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }

    .card-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .emojis {
      cursor: pointer;
    }

    .flex {
      display: flex;
      justify-content: space-between;
    }

    .text-4xl {
      font-size: 2rem;
    }

    .transition-transform {
      transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
    }

    .scale-125 {
      transform: scale(1.25);
    }

    .opacity-50 {
      opacity: 0.5;
    }

    .resize-none {
      resize: none;
      width: 100%;
      padding: 8px;
      font-size: 1rem;
      border-radius: 4px;
      border: 1px solid #ccc;
    }

    .card-footer {
      margin-top: 16px;
    }

    button {
      background-color: #007bff;
      color: #fff;
      padding: 12px;
      font-size: 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    button:hover:enabled {
      background-color: #0056b3;
    }
  `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export class FeedbackModalComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  rating$ = new BehaviorSubject<number>(-1);
  comment$ = new BehaviorSubject<string>('');

  emojis = emojis;

  constructor(private modalService: ModalService) {}

  close() {
    this.modalService.closeModal();
  }

  handleSubmit(): void {
    if (this.rating$.value !== -1) {
      console.log('Feedback enviado:', {
        rating: this.rating$.value + 1,
        comment: this.comment$.value,
      });
      this.rating$.next(-1);
      this.comment$.next('');
    }
  }

  handleEmojiClick(index: number): void {
    this.rating$.next(index);
  }

  handleCommentChange(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.comment$.next(value);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
