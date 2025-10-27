import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="contenedor">
      <h1>{{ mensaje }}</h1>
    </div>
  `,
  styles: [`
    .contenedor {
      text-align: center;
      margin-top: 50px;
      font-family: Arial, sans-serif;
      color: #007ACC;
    }
  `]
})
export class AppComponent {
  mensaje: string = 'Hola mundo en angular';
}
