export interface GetUsersRequest {
    cursor: string | null;
    limit: number;
    search: string | null;
}