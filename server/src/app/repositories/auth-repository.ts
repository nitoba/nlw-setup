import { RegisterUserRequest } from '../dto/register-user-request'

export interface AuthRepository {
  registerUser(data: RegisterUserRequest): Promise<void | null>
}
