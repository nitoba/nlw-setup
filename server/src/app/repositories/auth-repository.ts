import { RegisterUserRequest } from '../dto/register-user-request'
import { User } from '../entities/user'

export abstract class AuthRepository {
  abstract registerUser(data: RegisterUserRequest): Promise<User | null>
}
