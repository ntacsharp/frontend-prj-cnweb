export class Profile{

    constructor(public id: string,
        public userId: string,
        public name: string,
        public imageUrl: string,
        public createdAt: Date,
        public updatedAt: Date){
             this.id = id;
             this.name = name;
             this.imageUrl = imageUrl;
             this.createdAt = createdAt;
             this.updatedAt = updatedAt;
        }
}