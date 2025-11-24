import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectorRef,
  PLATFORM_ID,
} from '@angular/core'; // PLATFORM_ID toevoegen
import { isPlatformBrowser } from '@angular/common';
import { Car } from './components/car/car.component';
import { WebsocketService } from '../../services/controller/websocket';
import { Subscription } from 'rxjs';

type DirtVars = {
  id: number;
  left: {
    x: number;
    y: number;
  };
  right: {
    x: number;
    y: number;
  };
};

interface DirtOffset {
  l: { x: number; y: number };
  r: { x: number; y: number };
}
const DATA_LEFT: DirtOffset = { l: { x: -10, y: 40 }, r: { x: -10, y: 70 } };
const DATA_RIGHT: DirtOffset = { l: { x: -10, y: 40 }, r: { x: -10, y: 70 } };
const DATA_UP: DirtOffset = { l: { x: -20, y: 60 }, r: { x: 10, y: 60 } };
const DATA_DOWN: DirtOffset = { l: { x: -20, y: 60 }, r: { x: 10, y: 60 } };
const DATA_NONE: DirtOffset = { l: { x: 0, y: 0 }, r: { x: 0, y: 0 } };

@Component({
  selector: 'controller-page',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.module.scss'],
  imports: [Car],
})
export class ControllerPage implements OnInit, OnDestroy {
  carX: number = 500;
  carY: number = 500;
  carRotate: number = 0;
  carSpeed: number = 2;

  dirtInstances: DirtVars[] = [];
  private dirtIdCounter: number = 1;

  public joystickPosition: { x: number | null; y: number | null } = { x: null, y: null };

  private positionSubscription: Subscription | undefined;

  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly KEEP_LAST_VALUE = -999;

  private readonly rotationLUT: number[][] = [
    // X-Index
    /* Y=-2 (Idx 0) */ [315, 338, 0, 23, 45],
    /* Y=-1 (Idx 1) */ [293, 315, 0, 45, 68],
    /* Y= 0 (Idx 2) */ [270, 270, this.KEEP_LAST_VALUE, 90, 90],
    /* Y= 1 (Idx 3) */ [248, 225, 180, 135, 113],
    /* Y= 2 (Idx 4) */ [225, 203, 180, 158, 135],
  ];

  private readonly dirtLUT: DirtOffset[][] = [
    //       X=-2 (L)    X=-1 (L)    X=0 (C)     X=1 (R)     X=2 (R)
    /* Y=-2 (Up) */ [DATA_UP, DATA_UP, DATA_UP, DATA_UP, DATA_UP],
    /* Y=-1 (Up) */ [DATA_UP, DATA_UP, DATA_UP, DATA_UP, DATA_UP],
    /* Y= 0 (C)  */ [DATA_LEFT, DATA_LEFT, DATA_NONE, DATA_RIGHT, DATA_RIGHT],
    /* Y= 1 (Down) */ [DATA_DOWN, DATA_DOWN, DATA_DOWN, DATA_DOWN, DATA_DOWN],
    /* Y= 2 (Down) */ [DATA_DOWN, DATA_DOWN, DATA_DOWN, DATA_DOWN, DATA_DOWN],
  ];

  constructor(private readonly websocketService: WebsocketService) {}

  ngOnInit() {
    this.positionSubscription = this.websocketService.getMessages().subscribe({
      next: (position) => {
        this.joystickPosition = position;

        this.carRotate = this.getRotationFromLUT(
          this.joystickPosition.x,
          this.joystickPosition.y,
          this.carRotate
        );
      },
      error: (err) => {
        console.error('Verbinding mislukt:', err);
      },
    });

    if (isPlatformBrowser(this.platformId)) {
      this.driveCar();
    }
  }

  ngOnDestroy() {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

  driveCar() {
    const isMoving =
      Math.abs(this.joystickPosition.x ?? 0) > 0.1 || Math.abs(this.joystickPosition.y ?? 0) > 0.1;

    if (this.joystickPosition.x != null && this.joystickPosition.y != null) {
      this.carX = this.carX + this.carSpeed * this.joystickPosition.x;
      this.carY = this.carY + this.carSpeed * this.joystickPosition.y;

      if (isMoving && Math.random() > 0.2) {
        this.spawnDirt();
      }
    }

    this.cdRef.markForCheck();

    requestAnimationFrame(() => this.driveCar());
  }

  getRotationFromLUT(x: number | null, y: number | null, currentRotation: number): number {
    if (x === null || y === null) {
      return currentRotation;
    }

    const xIndex = x + 2;
    const yIndex = y + 2;

    const newRotation = this.rotationLUT[yIndex][xIndex];

    if (newRotation === this.KEEP_LAST_VALUE) {
      return currentRotation;
    }

    return newRotation;
  }

  spawnDirt() {
    const xInput = this.joystickPosition.x === null ? 0 : Math.round(this.joystickPosition.x);
    const yInput = this.joystickPosition.y === null ? 0 : Math.round(this.joystickPosition.y);

    const offsetData = this.getOffsetsFromLUT(xInput, yInput);

    if (offsetData === DATA_NONE) return;

    this.dirtInstances.push({
      id: this.dirtIdCounter++,
      left: {
        x: this.carX + offsetData.l.x + (Math.random() * 4 - 2),
        y: this.carY + offsetData.l.y + (Math.random() * 4 - 2),
      },
      right: {
        x: this.carX + offsetData.r.x + (Math.random() * 4 - 2),
        y: this.carY + offsetData.r.y + (Math.random() * 4 - 2),
      },
    });

    this.cleanUpDirtInstances();
  }

  getOffsetsFromLUT(x: number, y: number): DirtOffset {
    const xIndex = Math.max(0, Math.min(4, x + 2));
    const yIndex = Math.max(0, Math.min(4, y + 2));

    return this.dirtLUT[yIndex][xIndex];
  }

  calculateRotatedPosition(
    cx: number,
    cy: number,
    rotation: number,
    offsetX: number,
    offsetY: number
  ) {
    const rad = (rotation * Math.PI) / 180;
    const x = cx + (offsetX * Math.cos(rad) - offsetY * Math.sin(rad));
    const y = cy + (offsetX * Math.sin(rad) + offsetY * Math.cos(rad));

    return { x, y };
  }

  cleanUpDirtInstances() {
    if (this.dirtInstances.length > 50) {
      const deleteCount = this.dirtInstances.length - 50;

      this.dirtInstances.splice(0, deleteCount);
    }
  }
}
