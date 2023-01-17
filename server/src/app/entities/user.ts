export interface UserProps {
  id: string
  name: string
  email: string
  avatar_url?: string
  created_at?: Date
  updated_at?: Date
}

export class User {
  private props: UserProps

  constructor(props: UserProps) {
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
    }
  }

  get id(): string {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get avatar_url(): string | undefined {
    return this.props.avatar_url
  }

  get createdAt(): Date | undefined {
    return this.props.created_at
  }

  set name(value: string) {
    this.props.name = value
  }

  set email(value: string) {
    this.props.email = value
  }

  set avatar_url(value: string | undefined) {
    this.props.avatar_url = value
  }
}
