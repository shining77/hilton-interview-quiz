const CryptoJS = require('crypto-js');
export const md5 = str => CryptoJS.MD5(str).toString().toUpperCase();
export const cryptoPasswd = (username, passwd) => {
	return md5(`${username}${md5(passwd)}`);
}

/**
 * 日期格式化
 */
export function dateFormat(date, format = 'yyyy-MM-dd hh:mm:ss') {
	date = new Date(date);
	if (date !== 'Invalid Date') {
		var o = {
			'M+': date.getMonth() + 1, // month
			'd+': date.getDate(), // day
			'h+': date.getHours(), // hour
			'm+': date.getMinutes(), // minute
			's+': date.getSeconds(), // second
			'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
			S: date.getMilliseconds(), // millisecond
		};
		if (/(y+)/.test(format)) {
			format = format.replace(
				RegExp.$1,
				(date.getFullYear() + '').substr(4 - RegExp.$1.length),
			);
		}
		for (var k in o) {
			if (new RegExp('(' + k + ')').test(format)) {
				format = format.replace(
					RegExp.$1,
					RegExp.$1.length === 1
						? o[k]
						: ('00' + o[k]).substr(('' + o[k]).length),
				);
			}
		}
		return format;
	}
	return '';
}
