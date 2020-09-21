import Schema from './Schema'
import SchemaFlag from './SchemaFlag'
import Args from './Args'

const main = () => {
    const schema = new Schema()

    const lFlag = new SchemaFlag('Boolean', false)
    const pFlag = new SchemaFlag('Number', 0)
    const dFlag = new SchemaFlag('String', '')

    schema.addSchema('l', lFlag)
    schema.addSchema('p', pFlag)
    schema.addSchema('d', dFlag)

    const commands = '-p 8080 -l true -d /usr/code'

    const args = new Args(commands, schema)

    args.getValueOf('l')
}

main()