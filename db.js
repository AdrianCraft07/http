"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
module.exports = class DB {
    data;
    constructor() {
        this.data = {};
        this.load();
    }
    load() {
        try {
            this.data = JSON.parse(fs_1.default.readFileSync('./DB.json', 'utf-8'));
        }
        catch (e) { }
        this.save();
    }
    save() {
        fs_1.default.writeFileSync('./DB.json', JSON.stringify(this.data));
    }
    create(db) {
        this.data[db] ||= [];
    }
    add(db, data) {
        data.id = (this.data[db][this.data[db].length - 1] || { id: 0 }).id + 1;
        this.data[db].push(data);
        this.save();
    }
    remove(db, id) {
        this.data[db] = this.data[db].filter(data => data.id !== id);
        this.save();
    }
    edit(db, id, newData) {
        this.data[db] = this.data[db].map(data => {
            if (data.id === id)
                return { ...data, ...newData };
            return data;
        });
        this.save();
    }
    get(db) {
        return this.data[db];
    }
    getItem(db, id) {
        return this.data[db].find(data => data.id === id);
    }
};
