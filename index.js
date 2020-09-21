const Schema = require('./src/Schema')
const SchemaFlag = require('./src/SchemaFlag')
const Args = require('./src/Args')
const readline = require('readline-sync')

const main = () => {
    const schema = new Schema()

    const lFlag = new SchemaFlag('Boolean', false)
    const pFlag = new SchemaFlag('Number', 0)
    const dFlag = new SchemaFlag('String', '')

    schema.addSchema('l', lFlag)
    schema.addSchema('p', pFlag)
    schema.addSchema('d', dFlag)

    const commands = readline.question('请输入命令： ')

    console.log(commands)

    const args = new Args(commands, schema)

    while ((query = (readline.question('请输入要查询的命令，退出请输入exit： '))) !== 'exit') {
        args.getValueOf(query)
    }
}


main()