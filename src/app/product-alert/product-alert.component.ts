import { Component, EventEmitter, Input, Output } from '@angular/core';
import { producss } from '../products/interface';

@Component({
  selector: 'app-product-alert',
  templateUrl: './product-alert.component.html',
  styleUrls: ['./product-alert.component.css']
})
export class ProductAlertComponent {

  @Input() product! : producss
  @Output() notify = new EventEmitter();

}
