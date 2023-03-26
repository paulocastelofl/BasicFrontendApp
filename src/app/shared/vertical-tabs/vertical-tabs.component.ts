import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vertical-tabs',
  templateUrl: './vertical-tabs.component.html',
  styleUrls: ['./vertical-tabs.component.scss']
})
export class VerticalTabsComponent implements OnInit {

  public isTabSelect: string;

  @Input() listTabs = [];
  @Output() answerIsSelectTab = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.isSelectTab(this.listTabs[0])
  }

  isSelectTab(tab){
    this.isTabSelect = tab;
    this.answerIsSelectTab.emit(this.isTabSelect)
  }
}
