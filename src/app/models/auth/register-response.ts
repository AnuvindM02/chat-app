export interface RegisterResponse {
    firstName: string;
    middleName?: string;
    lastName?: string;
    userId: number;
    email: string;
    token: string;
    refreshToken?: string;
}