import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, filter, startWith, Subject, takeUntil } from 'rxjs';

interface IFilterOptions {
  name: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  status: boolean | undefined;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  statusList = [
    { value: true, label: 'Ativo' }, 
    { value: false, label: 'Inativo' }
  ];

  // FormControls para cada campo
  nameControl = new FormControl('', { nonNullable: true }); // Garante em tempo de compilação que o valor nunca será nulo
  startDateControl = new FormControl<Date | undefined>(undefined, { nonNullable: true });
  endDateControl = new FormControl<Date | undefined>(undefined, { nonNullable: true });
  statusControl = new FormControl<boolean | null>(null, { nonNullable: true });

  @Output() onFilterApplied = new EventEmitter<IFilterOptions>();

  ngOnInit() {
    // Observar mudanças em todos os controles
    this.nameControl.valueChanges
      .pipe(
        startWith(''),
        takeUntil(this.destroy$), // cancela o observable quando o componente for destruído
        distinctUntilChanged(), // evita emissão duplicadas
      )
      .subscribe(() => this.emitFilters());

    this.startDateControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());

    this.endDateControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());

    this.statusControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private emitFilters() {
    const filterOptions: IFilterOptions = {
      name: this.nameControl.value,
      startDate: this.startDateControl.value || undefined,
      endDate: this.endDateControl.value || undefined,
      status: this.statusControl.value === null ? undefined : this.statusControl.value
    };
    
    console.log('Emitindo filtros:', filterOptions);
    this.onFilterApplied.emit(filterOptions);
  }
}
