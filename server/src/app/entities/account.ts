export interface AccountProps {
  id: string
  user_id: string
  provider: 'google'
  access_token?: string
  refresh_token?: string
  expires_at?: number
}

export class Account {
  private props: AccountProps

  constructor(props: AccountProps) {
    this.props = props
  }

  get id(): string {
    return this.props.id
  }

  get user_id(): string {
    return this.props.user_id
  }

  get provider() {
    return this.props.provider
  }

  get access_token(): string | undefined {
    return this.props.access_token
  }

  get refresh_token(): string | undefined {
    return this.props.refresh_token
  }

  get expires_at(): number | undefined {
    return this.props.expires_at
  }

  set provider(value: 'google') {
    this.props.provider = value
  }

  set access_token(value: string | undefined) {
    this.props.access_token = value
  }

  set refresh_token(value: string | undefined) {
    this.props.refresh_token = value
  }

  set expires_at(value: number | undefined) {
    this.props.expires_at = value
  }
}
