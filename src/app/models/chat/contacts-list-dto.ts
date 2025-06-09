import { ContactDto } from "./contact-dto";

export interface ContactsListDto {
    users: ContactDto[];
    nextCursor: Date | null;
}