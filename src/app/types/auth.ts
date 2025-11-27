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
  userName: string;
  expiresAt: string;
};
