import { UserDto } from "../auth/user-dto";

export interface ContactDto extends UserDto {
    conversationId: string;
}