import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  number = signal<number | null>(null);

  async generateNumber()
  {
    const bridge = (window as any).HybridWebView;

    if (!bridge) {
      console.error("HybridWebView is unavailable!");
      return;
    }

    this.number.set(await bridge.InvokeDotNet("GenerateNumber"));
  }
  
}
