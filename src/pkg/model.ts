import Dexie from "dexie";
import { Page } from "./utils";

export let db = new Dexie("ScriptCat");

export abstract class Model<T> {

    protected table!: Dexie.Table<T, number>;
    protected tableName: string = "";

    public list(query: Dexie.Table<T, number>, page: Page) {
        let collect = query.offset((page.page() - 1) * page.count()).limit(page.count());
        if (page.sort() == "desc") {
            collect = collect.reverse();
        }
        return collect.toArray();
    }

    public find() {
        return this.table;
    }

    public findOne(where: { [key: string]: any }) {
        return this.table.where(where).toArray();
    }

    public save(val: T) {
        let id = <number>(<any>val).id;
        if (id == 0) {
            return this.table.add(val);
        }
        return this.table.update(id, val);
    }

    public findById(id: number) {
        return this.table.get(id);
    }
}