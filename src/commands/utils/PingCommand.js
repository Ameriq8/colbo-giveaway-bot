const BaseCommand = require('../../utils/structures/BaseCommand')
const ms = require('ms')

module.exports = class PingCommand extends BaseCommand {
    constructor() {
        super('ping', 'utils', [])
    }

    run(client, message) {
        var date = Date.now()
        message.reply('🏓 Pinging....').then(msg => {
            msg.edit(
                `\`\`\`fix\nPing: ${Math.round(Date.now() - date)}ms\nApi Latency: ${Math.round(client.ws.ping)}ms\nUptime: ${Math.round(
                    client.uptime / (1000 * 60 * 60)
                )}h ${Math.round(client.uptime / (1000 * 60)) % 60}m ${Math.round(client.uptime / 1000) % 60}s \n${ms(client.uptime, {
                    long: true
                })}\`\`\``
            )
        })
    }
}
