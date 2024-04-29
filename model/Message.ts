
export class Message {
    constructor (public id:string, public content: string,public fileUrl: string | null, public memberId: string,
        public channelId: string, public deleted : boolean, public createAt : Date, public updatedAt : Date){
            this.id = id;
            this.content = content;
            this.fileUrl = fileUrl;
            this.memberId = memberId;
            this.channelId = channelId;
            this.createAt = createAt;
            this.updatedAt = updatedAt;
        }
    
}