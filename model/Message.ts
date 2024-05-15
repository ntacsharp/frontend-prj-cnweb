
export class Message {
    constructor (public id:string, public content: string,public fileUrl: string | null, public memberId: string,
        public channelId: string, public deleted : boolean, public createdAt : Date, public updatedAt : Date){
            this.id = id;
            this.content = content;
            this.fileUrl = fileUrl;
            this.memberId = memberId;
            this.channelId = channelId;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }
    
}