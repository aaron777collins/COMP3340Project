import { ObjectID } from "bson";

export type ItemModel = {
    _id: ObjectID;
    name: string;
    price: number;
    rating: number;
    description: string;
}