import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private websocket: WebSocket | undefined;
  private messages: Subject<any> = new Subject();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.connect();
  }

  private connect() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      return;
    }

    if (this.websocket) {
      this.websocket.close();
      this.websocket = undefined;
    }

    this.websocket = new WebSocket('ws://10.2.58.10:8080');

    this.websocket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.websocket.onmessage = (event) => {
      this.messages.next(JSON.parse(event.data));
    };

    this.websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.messages.error(error);
    };

    this.websocket.onclose = () => {
      console.log('WebSocket connection closed');
      this.websocket = undefined;
      this.messages = new Subject<any>();
    };
  }

  public sendMessage(message: any) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.websocket?.readyState === WebSocket.OPEN) {
      this.websocket?.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not open. Message not sent:', message);
    }
  }

  public getMessages(): Observable<any> {
    return this.messages.asObservable().pipe(filter((message) => message !== null));
  }

  public disconnect() {
    if (isPlatformBrowser(this.platformId)) {
      this.websocket?.close();
    }
  }
}
