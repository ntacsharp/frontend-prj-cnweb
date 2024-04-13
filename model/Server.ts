export class Server {
    constructor(public id : string,public name: string,public inviteCode : string,
       public profileId : string,public createdAt : Date,public  updatedAt : Date,){

        id = id;
        name = name;
        inviteCode = inviteCode;
        profileId = profileId;
        createdAt = createdAt;
        updatedAt = updatedAt;

    }
}