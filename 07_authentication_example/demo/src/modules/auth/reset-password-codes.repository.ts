import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class ResetPasswordCodesRepository {
  private keyPrefix = 'reset-pass-codes';

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCode(userId: string, code: string, ttl: number) {
    await this.deleteCodes(userId);

    return this.cacheManager.set(this.getKey(userId, code), userId, {
      ttl: ttl,
    });
  }

  async getUserId(code: string) {
    const keys: string[] = await this.cacheManager.store.keys(
      this.getKey('*', code),
    );
    const key = keys[0];
    return this.cacheManager.get<string>(key);
  }

  async deleteCodes(userId: string) {
    const keys: string[] = await this.cacheManager.store.keys(
      this.getKey(userId, '*'),
    );
    await Promise.all(keys.map((key) => this.cacheManager.del(key)));
  }

  private getKey(userId: string, code: string) {
    return `${this.keyPrefix}:${code}:${userId}`;
  }
}
