import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoldSpanPipe } from 'app/core/pipes/bold-span.pipes';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule
  ],
  providers: [BoldSpanPipe],
})
export class SharedModule { }
