import axios from "axios";

const rateLimiter = (() => {
  const requestCounts = new Map<string, { count: number; timestamp: number }>();
  const maxRequests = 3;
  const timeWindow = 60000;

  const canMakeRequest = (key: string): boolean => {
    const now = Date.now();
    const record = requestCounts.get(key);

    if (!record) {
      requestCounts.set(key, { count: 1, timestamp: now });
      return true;
    }

    if (now - record.timestamp > timeWindow) {
      requestCounts.set(key, { count: 1, timestamp: now });
      return true;
    }

    if (record.count >= maxRequests) {
      return false;
    }

    record.count++;
    return true;
  };

  const getRemainingRequests = (key: string): number => {
    const record = requestCounts.get(key);
    if (!record) return maxRequests;
    
    const now = Date.now();
    if (now - record.timestamp > timeWindow) {
      return maxRequests;
    }
    
    return Math.max(0, maxRequests - record.count);
  };

  return {
    canMakeRequest,
    getRemainingRequests
  };
})();

export const githubClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
  },
});

githubClient.interceptors.request.use(
  (config) => {
    const requestKey = config.params?.q || config.url || 'default';
    
    if (!rateLimiter.canMakeRequest(requestKey)) {
      const remaining = rateLimiter.getRemainingRequests(requestKey);
      throw new Error(
        `Rate limit excedido. Você atingiu o limite de 3 requisições por minuto. Aguarde antes de tentar novamente.`
      );
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
