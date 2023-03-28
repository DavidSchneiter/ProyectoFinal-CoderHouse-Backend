import { MongoDBContainer } from "../../Containers/MongoDBContainer";
import { Mensaje } from "../../models";

export class MensajesMongo extends MongoDBContainer {
    constructor() {
        super(Mensaje);
    }
}
