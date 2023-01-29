import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RevokedTokensRepository {
  private keyPrefix = 'rev-tokens';

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setRevokedPair(pairId: string, ttl: number) {
    return this.cacheManager.set(this.getKey(pairId), true, { ttl: ttl });
  }

  async getRevokedPair(pairId: string) {
    return this.cacheManager.get(this.getKey(pairId));
  }

  private getKey(pairId: string) {
    return `${this.keyPrefix}:${pairId}`;
  }
}
