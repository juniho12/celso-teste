import axios from "axios";


const rateLimiter = (() => {
  const requestCounts = new Map<string, { count: number; timestamp: number }>();
  const maxRequests = 3;
  const timeWindow = 60000;

  const canMakeRequest = (query: string): boolean => {
    const now = Date.now();
    const record = requestCounts.get(query);

    if (!record) {
      requestCounts.set(query, { count: 1, timestamp: now });
      return true;
    }

    if (now - record.timestamp > timeWindow) {
      requestCounts.set(query, { count: 1, timestamp: now });
      return true;
    }

    if (record.count >= maxRequests) {
      return false;
    }

    record.count++;
    return true;
  };

  const getRemainingRequests = (query: string): number => {
    const record = requestCounts.get(query);
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

export const repositorySearchClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
  },
});

repositorySearchClient.interceptors.request.use(
  (config) => {
    const query = config.params?.q;
    
    if (query && !rateLimiter.canMakeRequest(query)) {
      const remaining = rateLimiter.getRemainingRequests(query);
      throw new Error(
        `Rate limit excedido. Você atingiu o limite de 3 requisições por pesquisa. Aguarde 1 minuto para tentar novamente.`
      );
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);