import { QatUserResponse, UserActivityResponse } from "../../types/qat";
import { UserResponse } from "../../types/user";
import { CommandInteraction, Message, MessageEmbed } from "discord.js";
import parseUsergroup from "../../helpers/osu/player/getHighestUsergroup";
import getUniqueMappersNumber from "../../helpers/qat/getters/mappers/getUniqueMappersNumber";
import getTop3Mappers from "../../helpers/qat/getters/mappers/getTop3Mappers";
import getTop3Genres from "../../helpers/qat/getters/genres/getTop3Genres";
import getTop3Languages from "../../helpers/qat/getters/languages/getTop3Languages";
import calculateDuration from "../../helpers/text/calculateDuration";
import getRequestStatus from "../../helpers/qat/getters/requestStatus/getRequestStatus";
import abbreviation from "../../helpers/text/abbreviation";
import getEmoji from "../../helpers/text/getEmoji";
import parseResets from "../../helpers/qat/getters/resets/parseResets";

//! if you're re-adding QA info, check other warning comments and remove the regular /* */ comments
// TODO: add BN finder count IF you're re-adding QA info

export default {
	reply: (
		osuUser: UserResponse,
		qatUser: QatUserResponse,
		activity: UserActivityResponse,
		command: CommandInteraction
	) => {
		const usergroup = parseUsergroup(osuUser.data); // ? Get the highest usergroup

		const latestNom =
			activity.data.uniqueNominations[
				activity.data.uniqueNominations.length - 1
			];

		let reqStatus = "";
		if (qatUser.data.requestStatus.length > 0) {
			if (qatUser.data.requestStatus.includes("closed")) {
				reqStatus = "🔴 Closed";
			} else {
				reqStatus = `🟢 Open (${getRequestStatus(qatUser.data)})`;
			}
		} else {
			reqStatus = "⚪ Unknown";
		}

		const modeIcons = qatUser.data.modes
			.map((mode: string) => {
				return `${getEmoji(mode)} `;
			})
			.join("")
			.trim();

		let e = new MessageEmbed()
			.setAuthor({
				name: `${osuUser.data.username} • BN/NAT info`,
				url: `https://osu.ppy.sh/users/${osuUser.data.id}`,
				iconURL: usergroup.icon,
			})
			.setThumbnail(`https://a.ppy.sh/${osuUser.data.id}`)
			.setColor(usergroup.colour)
			.setDescription(
				`showing **[${abbreviation(
					osuUser.data.username
				)}](https://bn.mappersguild.com/users?id=${
					qatUser.data.id
				})** ${modeIcons} BN website info from the last **90** days.`
			)
			.addField("Request Status", `${reqStatus}`, true);

		e.addField(
			`BN${qatUser.data.natDuration ? "/NAT" : ""} for`,
			`${
				qatUser.data.natDuration
					? `🟠 ${calculateDuration(qatUser.data.natDuration)}\n`
					: ""
			}🟣 ${calculateDuration(qatUser.data.bnDuration)}`,
			true
		);

		e.addFields(
			{
				name: "Mappers",
                // sorry for whoever has to read this idk
				value: `🗺️ ${getUniqueMappersNumber(activity).toString()} ${
					getUniqueMappersNumber(activity)
						? `(${Math.floor(
								(getUniqueMappersNumber(activity) /
									activity.data.uniqueNominations.length) *
									100
						  )}%)`
						: ""
				}`,
				inline: true,
			},
			{
				name: "Nominations",
				value: `💭 ${activity.data.uniqueNominations.length.toString()}`,
				inline: true,
			},
			/*{
				// https://stackoverflow.com/a/66487097/16164887
				name: "\u200b",
				value: "\u200b",
				inline: true,
			},*/
			{
				name: "Resets Received",
				value: `${parseResets(
					activity.data.nominationsDisqualified,
					activity.data.nominationsPopped
				)}`,
				inline: true,
			},
			{
				name: "Resets Given",
				value: `${parseResets(
					activity.data.disqualifications,
					activity.data.pops
				)}`,
				inline: true,
			},
			/*{
				name: "\u200b",
				value: "\u200b",
				inline: true,
			},
			{
				name: "QA Checks",
				value: `${activity.data.qualityAssuranceChecks.length}`,
				inline: true,
			},
			{
				name: "DQ'd QA Checks",
				value: `${activity.data.disqualifiedQualityAssuranceChecks.length}`,
				inline: true,
			},
			{
				name: "\u200b",
				value: "\u200b",
				inline: true,
			},*/
			{
				name: "Top Mappers",
				value: `${getTop3Mappers(activity).toString()}`,
				inline: true,
			},
			{
				name: "Top Genres",
				value: `${getTop3Genres(activity).toString()}`,
				inline: true,
			},
			{
				name: "Top Languages",
				value: `${getTop3Languages(activity).toString()}`,
				inline: true,
			}
		);

		if (latestNom) {
			let nomMessage = latestNom.content
				? latestNom.content.replace(/\r?\n|\r/g, " ")
				: "";
			//truncate nomMessage
			if (nomMessage.length > 60) {
				nomMessage = nomMessage.substring(0, 57) + "...";
			}

			e.addField(
				"Latest Nomination",
				`[${latestNom.artistTitle}](https://osu.ppy.sh/beatmapsets/${latestNom.beatmapsetId})`,
				true
			).setImage(
				`https://assets.ppy.sh/beatmaps/${latestNom.beatmapsetId}/covers/cover.jpg`
			);

			// only load footer when there's a nom message
			if (latestNom.content) {
				e.setFooter({
					text: `${osuUser.data.username} "${nomMessage}"`,
					iconURL: `https://a.ppy.sh/${osuUser.data.id}`,
				});
			}
		}

		command.editReply({
			embeds: [e],
		});
	},
};
