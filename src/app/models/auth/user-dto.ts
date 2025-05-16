export interface UserDto {
    userId: number;
    firstName: string;
    middleName: string | null;
    email: string;
    lastName: string | null;
    createdAt: Date;
}