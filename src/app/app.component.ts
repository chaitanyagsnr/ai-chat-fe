import { Component } from '@angular/core';
import { LlamaApiService } from './llama-api.service';
import { LlamaChat } from './llamachat.model';
import * as marked from 'marked';
import { TextStreamService } from './text-stream.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ai-chat';
  query = '';
  output = '';

  constructor(
    private llamaService: LlamaApiService,
    private textStreamService: TextStreamService
  ) {}

  public search() {
    const llamaChat: LlamaChat = new LlamaChat(this.query);
    this.llamaService.postData(llamaChat).subscribe(async (res) => {
      const output = await marked.parse(res.response);
      this.textStreamService.streamText(output).subscribe((char) => {
        this.output += char;
      });
    });
  }
}
