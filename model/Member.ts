import { MemberRole } from "./MemberRole";

export class Member {
    constructor(public id: string, public role:MemberRole,public profileId:string,public serverId:string, private createdAt: Date, private updatedAt: Date,) {
        id = id;
        role = role;
        profileId =profileId;
        serverId = serverId;
        createdAt = createdAt;
        updatedAt = updatedAt;
    }
}