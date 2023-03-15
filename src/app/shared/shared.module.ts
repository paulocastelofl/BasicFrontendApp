import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoldSpanPipe } from 'app/core/pipes/bold-span.pipes';
import { VerticalTabsComponent } from './vertical-tabs/vertical-tabs.component';


@NgModule({
  declarations: [
    VerticalTabsComponent,
    BoldSpanPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [VerticalTabsComponent, BoldSpanPipe],
  providers: [],
})
export class SharedModule { }
