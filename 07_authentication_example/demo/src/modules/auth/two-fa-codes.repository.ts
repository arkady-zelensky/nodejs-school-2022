import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { TwoFaTypes } from "./types/two-fa-types.enum";

@Injectable()
export class TwoFaCodesRepository {
  private keyPrefix = "two-fa-codes";

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCode(userId: string, type: TwoFaTypes, code: string, ttl: number) {
    return this.cacheManager.set(this.getKey(userId, type, code), userId, {
      ttl: ttl,
    });
  }

  async getUserId(type: TwoFaTypes, code: string) {
    const keys: string[] = await this.cacheManager.store.keys(
      this.getKey("*", type, code)
    );
    const key = keys[0];
    return this.cacheManager.get<string>(key);
  }

  async deleteCode(userId: string, type: TwoFaTypes, code: string) {
    const keys: string[] = await this.cacheManager.store.keys(
      this.getKey(userId, type, code)
    );
    await Promise.all(keys.map((key) => this.cacheManager.del(key)));
  }

  private getKey(userId: string, type: TwoFaTypes, code: string) {
    return `${this.keyPrefix}:${type}:${code}:${userId}`;
  }
}
