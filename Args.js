export default class Args {
    constructor (argsText, schema) {
        this.originCommands = argsText
        this.finnalArgsMap = {} // 经过scheme处理过的结构
        this.schemaInstance = schema
    }

    // 分割字符串 得到 split finnalArgsMap
    commandSplit() {
        if (!this.originCommands) {
            console.log('请输入命令')
            return false
        }

        const splitArray = this.originCommands.trim().split('-').splice(1)

        for (let i = 0, length = splitArray.length; i < length; i ++) {
            const value = this.schemaInstance.prase(splitArray[i])

            // 说明用户输入不对
            if (!value) {
                return false
            }

            this.finnalArgsMap[value.key] = value.valueList
        }
    }

    getValueOf(type) {
        if (JSON.stringify(this.finnalArgsMap) == '{}') {
            this.commandSplit()
        }

        if (!this.schemaInstance.getType(type)) {
            console.log('您查询的命令不存在')
            return false
        }

        if (!this.finnalArgsMap[type]) {
            console.log('抱歉，查询不到该命令')
            return false
        }

        console.log('type: ' +type + ', value: ' + this.finnalArgsMap[type].join(','))
        return this.finnalArgsMap[type]
    }

}