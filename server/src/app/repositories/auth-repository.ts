import { RegisterUserRequest } from '../dto/register-user-request'
import { User } from '../entities/user'

export interface AuthRepository {
  registerUser(data: RegisterUserRequest): Promise<User | null>
}
