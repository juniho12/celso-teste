export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateGitHubUsername(username: string): ValidationResult {
  if (!username.trim()) {
    return { valid: false, error: "Username não pode estar vazio" };
  }

  if (username.length > 39) {
    return { valid: false, error: "Username não pode ter mais de 39 caracteres" };
  }

  const githubUsernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
  
  if (!githubUsernameRegex.test(username)) {
    return { 
      valid: false, 
      error: "Username inválido. Use apenas letras, números e hífens (não pode começar/terminar com hífen)" 
    };
  }

  if (username.includes("--")) {
    return { valid: false, error: "Username não pode ter hífens consecutivos" };
  }

  return { valid: true };
}
