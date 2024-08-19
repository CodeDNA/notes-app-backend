import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  userId: string;

  @Expose()
  userName: string;

  @Expose()
  firstName: string;

  @Expose()
  middleName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: number;

  @Expose()
  isDeleted: boolean;

  @Expose()
  groups: string[];
}
