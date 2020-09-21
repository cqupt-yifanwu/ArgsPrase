export default class Schema {
    constructor () {
        this.schemaList = {}
    }

    addSchema (name, schemaFlag) {
        name = name.toLowerCase()
        this.schemaList[name] = schemaFlag
    }

    deleteSchema (name) {
        name = name.toLowerCase()

        if (!this.schemaList[name]) {
            console.log('该属性不存在')
            return
        }

        delete this.schemaList[name]
    }

    getType(name) {
        name = name.toLowerCase()

        if (!this.schemaList[name]) {
            console.log('该属性不存在')
            return false
        }

        return this.schemaList[name]
    }

    // 解析命令，并校验合法性
    prase(array) {
        const splitArray = array.trim().split(/\s+/)
        const key = splitArray[0].trim()
        if (!key || !this.getType(key)) {
            console.log('输入命令有误')
            return false
        }

        const flagSchema = this.getType(key)

        // 遍历后面的值，并校验合法性
        const valueList = []
        // 启用默认值
        if (splitArray.length < 2) {
            valueList.push(flagSchema.getDefaultValue())
            return {
                key,
                valueList
            }
        }

        // 遍历
        for (let i = 1, len = splitArray.length; i < len; i ++) {
            const valueItem = splitArray[i].trim()
            const type = flagSchema.getType()

            if (type === 'Boolean' && (valueItem === 'true' || valueItem === 'false')) {
                valueList.push(valueItem === 'true')
                continue
            }

            if (type === 'Number' && Number(valueItem) !== NaN) {
                valueList.push(Number(valueItem))
                continue
            }

            if (type === 'String' && valueItem) {
                valueList.push(valueItem)
                continue
            }

            // 处理报错情况
            console.log('您输入的值类型不属于' + type)
            return false
        }

        return {
            key,
            valueList
        }
    }
}