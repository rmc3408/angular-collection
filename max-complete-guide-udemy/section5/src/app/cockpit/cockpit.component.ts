import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css'
})
export class CockpitComponent {
  @Output() addBlueprint = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() addServer = new EventEmitter<{ serverName: string, serverContent: string }>();
  newServerName = '';
  newServerContent = '';
  @ViewChild('srvCtn') serverContentInput: ElementRef; // local ViewChild from #srvCtn

  onTriggerBlueprint(name?: HTMLInputElement, content?: HTMLInputElement) {
    
    console.log(this.serverContentInput.nativeElement.value)
    
    if (name && content) { // local reference #srvCtn
      this.addBlueprint.emit({
        serverName: name.value,
        serverContent: content.value
      });
    } else {
      this.addBlueprint.emit({
        serverName: this.newServerName,
        serverContent: this.newServerContent
      });
    }
  }

  onTriggerServer() {
    this.addServer.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    });
  }
}