import ping from "./misc/ping";
import mapper from "./user/mapper";
import choose from "./fun/choose";
import yesno from "./fun/yesno";
import coinflip from "./fun/coinflip";
import roll from "./fun/roll";
import revolver from "./fun/revolver";
import owoify from "./fun/owoify";
import pun from "./fun/pun";
import participant from "./contests/participant";
import spectator from "./contests/spectator";
import purge from "./management/purge";
import send from "./management/send";
import osuset from "./user/osuset";
import mapsetrank from "./user/mapsetrank";
import help from "./misc/help";
import setprefix from "./management/setprefix";
import cooldown from "./management/cooldown";
import quotes from "./management/quotes";
import logging from "./management/logging";
import player from "./user/player";
import eval from "./dev/eval";
import serverlist from "./dev/serverlist";
import repeat from "./dev/repeat";
import avatar from "./misc/avatar";
import embeds from "./management/embeds";
import recent from "./user/recent";
import verification from "./management/verification";

const commands: any = {
	ping: ping,
	mapper: mapper,
	choose: choose,
	yesno: yesno,
	participant: participant,
	spectator: spectator,
	purge: purge,
	send: send,
	osuset: osuset,
	mapsetrank: mapsetrank,
	help: help,
	setprefix: setprefix,
	quotes: quotes,
	cooldown: cooldown,
	logging: logging,
	player: player,
	eval: eval,
	avatar: avatar,
	serverlist: serverlist,
	coinflip: coinflip,
	roll: roll,
	revolver: revolver,
	owoify: owoify,
	pun: pun,
	repeat: repeat,
	embeds: embeds,
	rs: recent,
	verification: verification,
};

export default commands;
