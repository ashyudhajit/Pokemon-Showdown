'use strict';

global.isDev = function (user) {
	if (!user) return;
	if (typeof user === 'Object') user = user.userid;
	let dev = Db('devs').get(toId(user));
	if (dev === 1) return true;
	return false;
};

exports.commands = {
	dev: {
		give: function (target, room, user) {
			if (!this.can('declare')) return false;
			let devUser = toId(target);
		    if (!target || target.indexOf(',') < 0) ;
            let parts = target.split(',');
	     	let username = parts[0];
		    if (!devUser) return this.parse('/help dev');
			if (isDev(devUser)) return this.errorReply(devUser + ' is already a dev.');
			Db('devs').set(devUser, 1);
		if (Users.get(username)) Users(username).popup("|modal||html|You have recieved DEV status from <font color=" + Wisp.hashColor(user.name) + "'>" + user.name  + "</font>" );
			this.privateModCommand("(" +user.name + "has given DEV status to " + username + ")");
		},
		take: function (target, room, user) {
			if (!this.can('declare')) return false;
			let devUser = toId(target);
			if (!target || target.indexOf(',') < 0) ;
            let parts = target.split(',');
	     	let username = parts[0];
			if (!devUser) return this.parse('/help dev');
			if (!isDev(devUser)) return this.errorReply(devUser + ' is not a dev.');
			Db('devs').delete(devUser);
			if (Users.get(username)) Users(username).popup("|modal||html| Your DEV status have been removed by <font color ='" + Wisp.hashColor(user.name) + "'>"+ user.name + "</font>");
			this.privateModCommand("(" + devUser + '\'s dev status has been taken by ' + user.name + ")");
		},
		list: function (target, room, user) {
			if (!this.runBroadcast()) return ;
			if (!Object.keys(Db('devs').object()).length) return this.errorReply('There seems to be no user with dev status.');
			this.sendReplyBox('<center><b><u>DEV Users</u></b></center><br /><br />' + Object.keys(Db('devs').object()).join('<br />'));
		},
	},
};
