import { ButtonInteraction, MessageActionRow, MessageButton } from "discord.js";
import { guilds } from "../../../database";
import parseMessagePlaceholderFromMember from "../../../helpers/text/parseMessagePlaceholderFromMember";

export default async (interaction: ButtonInteraction) => {
	interaction.deferred
		? undefined
		: await interaction.deferReply({ ephemeral: true });

	const interactionAuthor = interaction.customId.split("|").pop();

	if (interactionAuthor != interaction.user.id)
		return interaction.editReply("**You can't use this!**");

	const guild = await guilds.findById(interaction.guildId);

	if (!guild) return;

	const fakeVerificationButton = new MessageButton({
		type: "BUTTON",
		label: "Send verification link",
		style: "SUCCESS",
		emoji: "982656610285527114",
		customId: "fakebutton",
	});

	const fakeVerificationButtonRow = new MessageActionRow().addComponents(
		fakeVerificationButton
	);

	const member = interaction.guild?.members.cache.get(interaction.user.id);

	if (!member) return;

	return interaction.editReply({
		content: parseMessagePlaceholderFromMember(
			guild.verification.message,
			member,
			guild
		),
		components: [fakeVerificationButtonRow],
	});
};
