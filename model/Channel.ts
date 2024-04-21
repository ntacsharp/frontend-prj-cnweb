import { ChannelType } from "./ChannelType";

export class Channel {
    constructor(public id: string, public name: string, public type: ChannelType, public serverId: string, private createdAt: Date, private updatedAt: Date,) {
        id = id;
        name = name;
        type = type;
        serverId = serverId;
        createdAt = createdAt;
        updatedAt = updatedAt;
    }
}