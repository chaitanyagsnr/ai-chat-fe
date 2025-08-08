import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { LlamaApiService } from './llama-api.service';
import { LlamaChat } from './llamachat.model';
import * as marked from 'marked';
import { TextStreamService } from './text-stream.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewChecked {
  title = 'ai-chat';
  query = '';
  output = '';
  isSending = false;

  @ViewChild('chatHistory') chatHistory!: ElementRef;

  constructor(
    private llamaService: LlamaApiService,
    private textStreamService: TextStreamService
  ) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.chatHistory) {
      const card = this.chatHistory.nativeElement.querySelector('mat-card-content');
      if (card) {
        card.scrollTop = card.scrollHeight;
      }
    }
  }

  public async search() {
    this.isSending = true; // Set active state
    const llamaChat: LlamaChat = new LlamaChat(this.query);
    this.llamaService.postData(llamaChat).subscribe(async (res) => {
      const output = await marked.parse(res.response);
      this.textStreamService.streamText(output).subscribe((char) => {
        this.output += char;
      });
      this.isSending = false; // Remove active state after response
    });
  }
}
