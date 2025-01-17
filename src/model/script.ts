import { db, Model } from '@App/model/model';
import { Script } from './do/script';

export class ScriptModel extends Model<Script> {

    public tableName = 'scripts';

    constructor() {
        super();
        this.table = db.table(this.tableName);
    }

    public findByName(name: string) {
        return this.findOne({ name: name });
    }

    public findByNameAndNamespace(name: string, namespace?: string) {
        if (namespace) {
            return this.findOne({ name: name, namespace: namespace });
        }
        return this.findOne({ name: name });
    }

    public findByUUID(uuid: string) {
        return this.findOne({ uuid: uuid });
    }

    public findByUUIDAndSubscribeUrl(uuid: string, suburl: string) {
        return this.findOne({ subscribeUrl: suburl, uuid: uuid });
    }

    public findByOriginAndSubscribeUrl(origin: string, suburl: string) {
        return this.findOne({ subscribeUrl: suburl, origin: origin });
    }
}

