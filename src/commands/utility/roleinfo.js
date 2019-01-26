const { CommandStructures, SwitchbladeEmbed, CommandParameters, MiscUtils } = require('../../')
const { Command, CommandRequirements, RoleParameter } = CommandStructures
const moment = require('moment')
const Color = require('../../utils/Color.js')

module.exports = class RoleInfo extends Command {
  constructor (client) {
    super(client)
    this.name = 'roleinfo'
    this.aliases = ['rolinfo', 'rol', 'ri', 'roli']
    this.category = 'utility'
    this.requirements = new CommandRequirements(this, { guildOnly: true })

    this.parameters = new CommandParameters(this,
      new RoleParameter({ full: true, missingError: 'errors:invalidRole' })
    )
  }

  async run ({ t, author, channel, language }, role) {
    await channel.startTyping()
    moment.locale(language)
    channel.send(
      new SwitchbladeEmbed(author)
        .setDescription(role)
        .setColor(role.color || process.env.EMBED_COLOR)
        .addField(t('commands:roleinfo.id'), role.id, true)
        .addField(t('commands:roleinfo.name'), role.name, true)
        .addField(t('commands:roleinfo.mention'), `\`${role}\``, true)
        .addField(t('commands:roleinfo.createdat'), `${moment(role.createdAt).format('LLL')}\n(${moment(role.createdAt).fromNow()})`, true)
        .addField(t('commands:roleinfo.members'), `**${MiscUtils.formatNumber(role.members.size, language)}** (${t('commands:roleinfo.online', { count: MiscUtils.formatNumber(role.members.filter(m => m.user.presence.status !== 'offline').size, language) })})`, true)
        .addField(t('commands:roleinfo.position'), MiscUtils.formatNumber(role.position, language), true)
        .addField(t('commands:roleinfo.mentionable'), role.mentionable ? t('commands:roleinfo.yes') : t('commands:roleinfo.no'), true)
        .addField(t('commands:roleinfo.hoisted'), role.hoist ? t('commands:roleinfo.yes') : t('commands:roleinfo.no'), true)
        .addField(t('commands:roleinfo.color'), `\`${role.hexColor}\`\n${new Color(role.hexColor).rgb()}`, true)
    ).then(() => channel.stopTyping())
  }
}
