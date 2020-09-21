export default class SchemaFlag {
    constructor (type, defaultValue) {
        this.type = type
        this.default = defaultValue
    }

    getType() {
        return this.type
    }

    getDefaultValue() {
        return this.default
    }
}