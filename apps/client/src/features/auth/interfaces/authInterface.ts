export interface AuthResponse {
  name: string
  token: string
} 

export interface AuthState {
  user?: AuthResponse
  status: 'checking' | 'authenticated' | 'not-authenticated'
  message?: string
}