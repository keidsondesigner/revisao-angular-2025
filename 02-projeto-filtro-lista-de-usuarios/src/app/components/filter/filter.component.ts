import { Component, EventEmitter, Output } from '@angular/core';

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
export class FilterComponent {
  statusList = [
    { value: true, label: 'Ativo' }, 
    { value: false, label: 'Inativo' }
  ];

  // Como não estou usando <form>formulário,
  // não preciso usar "name" em cada campo do html 
  filterOptions: IFilterOptions = {
    name: '',
    startDate: undefined,
    endDate: undefined,
    status: undefined,
  };

  // Emitindo(enviando) os dados do filtro
  @Output() filterApplied = new EventEmitter<IFilterOptions>();


  constructor() {}


  handleStartDateChange(date: Date) {
    // Pegando o valor do [(ngModel)] com (ngModelChange)
    console.log(date);
  }

  applyFilter() {
    console.log(this.filterOptions);
  }

  onFilterApplied() {
    console.log('onFilterApplied()', this.filterOptions);

    // Emitindo(enviando) os dados do filtro
    this.filterApplied.emit(this.filterOptions);
  }

}
