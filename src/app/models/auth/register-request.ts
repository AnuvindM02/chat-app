export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    middleName: string|null;
    lastName: string|null;
}