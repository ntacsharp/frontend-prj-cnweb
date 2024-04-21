import { MemberRole } from "./MemberRole";

export class Member {

    constructor(public id : string,public profileId : string, public serverId : string, public createdAt : Date, public updatedAt : Date, public role : MemberRole) {
        this.id = id;
        this.profileId = profileId;
        this.serverId = serverId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.role = role;
    }
}