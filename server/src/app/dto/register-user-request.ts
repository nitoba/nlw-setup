export interface RegisterUserRequest {
  user: {
    name?: string
    email: string
    avatar_url?: string
  }
  account: {
    provider: 'google'
    access_token?: string
    refresh_token?: string
    expires_at?: number
  }
}
