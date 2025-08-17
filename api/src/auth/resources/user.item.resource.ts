import { User } from '../entities/user.entity';

export const UserItemResource = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    dni: user.dni,
    reset_password_token: user.resetPasswordToken,
  };
};
