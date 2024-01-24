import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BroadcasterService {
  constructor() {}

  private userId = new Subject<boolean>();

  userIdChanged$ = this.userId.asObservable();

  userIDChanged(change: boolean) {
    this.userId.next(change);
  }
}
