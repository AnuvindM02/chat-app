import { UserDto } from "./user-dto";

export interface GetUsersResponse{
    users: UserDto[];
    nextCursor: Date | null;
}