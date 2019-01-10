import {Injectable, OnInit} from '@angular/core';
import {merge, Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService implements OnInit {

  private online = new Subject<boolean>();

  ngOnInit(): void {
    window.addEventListener('offline', () => this.online.next(false));
    window.addEventListener('online', () => this.online.next(true));
  }

  isOnline(): Observable<boolean> {
    return merge(
      of(window.navigator.onLine),
      this.online
    );
  }

}
