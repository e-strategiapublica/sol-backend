export class UserUpdateResponseDto {
  constructor(
    public _id: string,
    public email: string,
    public name?: string,
  ) {}
}
