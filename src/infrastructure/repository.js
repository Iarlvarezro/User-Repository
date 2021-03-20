export class Repository {
    constructor(client, hash, type) {
        this._client = client;
        this._hash = hash;
        this._type = type;
    }
    _getHash(id) {
        return `${this._hash}:${id}`;
    }
    _getHashEmail(email) {
        return `email:${email}`;
    }
    async add(entity) {
        const {email,id} = entity;
        await this._client.multi()
            .set(this._getHash(id), JSON.stringify(entity))
            .set(this._getHashEmail(email),JSON.stringify({id}))
            .exec()
        return entity;
    }
    async update(entity) {
        await this._set(entity);
        return entity;
    }
    remove(entity){
        return this._client.del(this._getHash(entity.id));
    }
    async findById(id){
        // map
        const res = await this._client.get(this._getHash(id));
        if (!res) {
            return null;
        }
        return this._createDomainInstance(res);
    }
    async findByEmail(email) {
        const res = await this._client.get(this._getHashEmail(email));
        if(!res){
            return null;
        }
        const {id} = JSON.parse(res);
        return this.findById(id)
    }
    _set(entity){
        return this._client.set(this._getHash(entity.id), JSON.stringify(entity));
    }
    _createDomainInstance(stringData){
        const instance = Object.create(this._type.prototype);
        Object.assign(instance, JSON.parse(stringData));
        return instance;
    }
}