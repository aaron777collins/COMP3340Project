import { ObjectID } from "bson";

export type ItemModel = {
    _id: ObjectID;
    name: string;
    price: number;
    description: string;
}