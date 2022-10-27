import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';
  @Output() search = new EventEmitter<string>();
  @Output() category = new EventEmitter<string>();
  @Output() reset = new EventEmitter<void>();

  constructor() { }

  clickSearch() {
    this.search.emit(this.query);
  }

  clickCategory(category: string) {
    this.category.emit(category);
  }

  clickReset() {
    this.reset.emit();
  }

}
