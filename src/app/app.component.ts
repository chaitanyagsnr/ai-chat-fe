import { Component } from '@angular/core'
import { LlamaApiService } from './llama-api.service';
import { LlamaChat } from './llamachat.model';
import * as marked from 'marked';
import { DomSanitizer } from '@angular/platform-browser';
import { TextStreamService } from './text-stream.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'llamaai-chat';
  query = '';
  output = '';

  constructor(private llamaService: LlamaApiService, private textStreamService: TextStreamService) {}

  public search() {
    console.log(this.query);
    const llamaChat: LlamaChat = new LlamaChat(this.query);
    this.llamaService.postData(llamaChat).subscribe(async res => {
      const output = await marked.parse(res.response);
      this.textStreamService.streamText(output).subscribe(char => {
        this.output += char;
      })
      // console.log(this.output);
    });
  }
}
