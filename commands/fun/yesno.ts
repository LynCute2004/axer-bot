import { Client, Message } from "discord.js";
import { parseTextFile } from "../../helpers/text/processText";

export default {
	name: "yesno",
	help: {
		description: "Yes or no? I can help you decide!",
		syntax: "{prefix}yesno `option`",
		example: "{prefix}yesno `axer cringe?`",
	},
	category: "fun",
	run: async (bot: Client, message: Message, args: string[]) => {
		const phrases = await parseTextFile(
			__dirname.concat("/../../responses/text/yesno.txt")
		);

		if (args.length < 1) {
			message.channel.send("waht is your question you dumbass");
			return;
		}

		const res = phrases[Math.floor(Math.random() * phrases.length)];

		message.channel.send(res);
	},
};
