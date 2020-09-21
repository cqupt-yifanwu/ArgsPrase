module.exports = class Args {
    constructor (argsText, schema) {
        this.originCommands = argsText
        this.finnalArgsMap = {} // 经过scheme处理过的结构
        this.schemaInstance = schema
    }

    // 分割字符串 得到 split finnalArgsMap
    commandSplit() {
        if (!this.originCommands) {
            console.log('请输入命令')
            throw new Error('没有输入命令')
        }

        const splitArray = this.originCommands.trim().split('-').splice(1)

        for (let i = 0, length = splitArray.length; i < length; i ++) {
            const value = this.schemaInstance.prase(splitArray[i])

            // 说明用户输入不对
            if (!value) {
                throw new Error('输入有误')
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
            throw new Error("您查询的命令不在")
        }

        if (!this.finnalArgsMap[type]) {
            console.log('抱歉，查询不到该命令')
            throw new Error("抱歉，查询不到该命令")
        }

        console.log('type: ' +type + ', value: ' + this.finnalArgsMap[type].join(','))
        return this.finnalArgsMap[type]
    }
}