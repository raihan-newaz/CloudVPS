type RateLimitOptions = {
  interval: number; // in milliseconds (e.g. 60000 = 1 minute)
  maxTrackedIps?: number;
};

export function createRateLimiter(options: RateLimitOptions) {
  const cache = new Map<string, { count: number; expiresAt: number }>();
  const maxTracked = options.maxTrackedIps || 10000;

  return {
    check: (ip: string, limit: number): { success: boolean; remaining: number } => {
      const now = Date.now();
      const record = cache.get(ip);

      // Periodic garbage collection of expired tokens
      if (cache.size > maxTracked) {
        for (const [key, value] of cache.entries()) {
          if (value.expiresAt < now) {
            cache.delete(key);
          }
        }
      }

      if (!record || record.expiresAt < now) {
        cache.set(ip, { count: 1, expiresAt: now + options.interval });
        return { success: true, remaining: limit - 1 };
      }

      if (record.count >= limit) {
        return { success: false, remaining: 0 };
      }

      record.count += 1;
      return { success: true, remaining: limit - record.count };
    },
  };
}

export function getClientIp(headers: Headers): string {
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0];
    if (first) return first.trim();
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "anonymous-client";
}
