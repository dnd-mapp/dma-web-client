import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'dma-root',
    imports: [RouterOutlet],
    templateUrl: './root.component.html',
    styleUrl: './root.component.scss',
})
export class RootComponent {
    protected readonly title = signal('dma-web-client');
}
