import ping from "./misc/ping";
import mapper from "./user/mapper";
import choose from "./fun/choose";
import yesno from "./fun/yesno";
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
	cooldown: cooldown
};

export default commands;
