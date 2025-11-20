export type AuthUser = {
  token: string;
  userName: string;
};

export type LoginRequest = {
  userName: string;
  password: string;
};

export type RegisterRequest = {
  userName: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  expiresAt: string; // backend sends ISO string
  userName: string;
};
