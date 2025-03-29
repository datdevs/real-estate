import { HttpContextToken } from '@angular/common/http';

export const CACHING_TTL = new HttpContextToken<number>(() => 30000);

export const CACHING_ENABLED = new HttpContextToken<boolean>(() => false);

export const CACHING_CLEAR = new HttpContextToken<boolean>(() => false);

export const enum OPERATION_STATE {
  Idle = 'idle',
  Success = 'success',
  Failure = 'failure',
}
