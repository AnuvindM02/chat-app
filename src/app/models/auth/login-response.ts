export interface LoginResponse {
    firstname: string;
    middlename?: string;
    lastname?: string;
    userId: number;
    token: string;
    refreshToken?:string;
}