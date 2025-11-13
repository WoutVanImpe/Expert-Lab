import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Car } from './components/car/car.component';
import { WebsocketService } from '../../services/controller/websocket';
import { Subscription } from 'rxjs';

@Component({
  selector: 'controller-page',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.module.scss'],
  imports: [Car],
})
export class ControllerPage implements OnInit, OnDestroy {
  carX: number = 0;
  carY: number = 0;
  carSpeed: number = 5;

  public joystickPosition: { x: number | null; y: number | null } = { x: null, y: null };

  private positionSubscription: Subscription | undefined;

  private readonly cdRef = inject(ChangeDetectorRef);

  constructor(private readonly websocketService: WebsocketService) {}

  ngOnInit() {
    this.positionSubscription = this.websocketService.getMessages().subscribe({
      next: (position) => {
        this.joystickPosition = position;
      },
      error: (err) => {
        console.error('Verbinding mislukt:', err);
      },
    });
    this.driveCar();
  }

  ngOnDestroy() {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

  driveCar() {
    if (this.joystickPosition.x != null && this.joystickPosition.y != null) {
      this.carX = this.carX + this.carSpeed * this.joystickPosition.x;
      this.carY = this.carY + this.carSpeed * this.joystickPosition.y;
    }
    this.cdRef.detectChanges();

    console.log('x' + this.carX + ' - y ' + this.carY);

    requestAnimationFrame(() => this.driveCar());
  }
}
