export class NewUserDto {
  name: string;
  email: string;
  password?: string;
}

export class ExistingUserDto {
  email: string;
  password?: string;
}
