import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App
{
  history = signal<{ value: number; source: 'Pseudo' | 'True' }[]>([]);

  number = signal<number | null>(null);

  isLoading = signal(false);

  min = 1;
  max = 100;

  async generateNumber()
  {
    if (!Number.isInteger(this.min) ||
        !Number.isInteger(this.max) ||
        this.min < -2147483648 ||
        this.max >= 2147483647 ||
        this.min > this.max )
    {
      alert("Invalid range! Please enter valid whole numbers.");
      return;
    }

    const bridge = (window as any).HybridWebView;

    if (!bridge) {
      console.error("HybridWebView is unavailable!");
      return;
    }

    const result = await bridge.InvokeDotNet("GenerateNumber", [this.min, this.max]);

    this.number.set(result);

    this.history.update(h => [
      { value: result, source: 'Pseudo' as const},
      ...h
    ].slice(0, 10));
  }
  
  async generateTrueNumber()
  {
    if (!Number.isInteger(this.min) || !Number.isInteger(this.max) ||
      this.min < -1_000_000_000 || this.max > 1_000_000_000 ||
      this.min > this.max) {
      alert("Invalid range for RANDOM.ORG!");
      return;
    }

    this.isLoading.set(true);

    try {
      const bridge = (window as any).HybridWebView;

      const result = await bridge.InvokeDotNet(
        "GenerateTrueNumber",
        [this.min, this.max]
      );

      this.number.set(result);

      this.history.update(h => [
        { value: result, source: 'True' as const},
        ...h
      ].slice(0, 10));

    } catch (error) {
      console.error(error);
      alert("Failed to fetch a number from RANDOM.ORG!");
    }
    finally {
      this.isLoading.set(false);
    }
  }
  
}
