export interface AuthResponse {
  name: string
  token: string
}

export interface ErrorResponse {
  message: string
  error: string
  statusCode: number
}

export interface AuthState {
  user?: AuthResponse
  status: 'checking' | 'authenticated' | 'not-authenticated'
  message?: string
}
