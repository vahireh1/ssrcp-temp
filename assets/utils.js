var crypto = require('crypto');

module.exports.utils = {
							CONSTANTS: require('./constants').CONSTANTS,
							mongoUtils: require('./mongoUtils').mongoUtils,
							validate: require('./validate').validate,
							cloneObject: function(object) {
								 var cloneObject = {};
								 Object.keys(object).forEach(function(key) {
								 	cloneObject[key] = object[key];
								 });	
					    		return cloneObject;
							},
							encryptText: function(text) {
								return crypto.createHash('md5').update(text+'').digest("hex");
							},
							formatText: function(text) {
								var result = text;
								for (var i = 1; i < arguments.length; i += 1) {
									var re = new RegExp('\\{' + (i-1) + '\\}', 'g');
									result = result.replace(re, arguments[i]);
								}
								return result;
							},
							getSystemTime: function() {
								//return new Date().getTime();
								var date = new Date();
								var yyyy = date.getFullYear().toString();
						        var MM = ("0" + (date.getMonth() + 1)).slice(-2);
						        var dd = ("0" + (date.getDate())).slice(-2);
						        var hh = ("0" + (date.getHours())).slice(-2);
						        var mm = ("0" + (date.getMinutes())).slice(-2);
						        var ss = ("0" + (date.getSeconds())).slice(-2);

						        return yyyy + MM + dd+  hh + mm + ss;
							},
							getDateBeforeNDays: function(date, nDays, isBegining) {
								let beforeDate = new Date(date.setDate(date.getDate() - nDays))
								var yyyy = beforeDate.getFullYear().toString();
						        var MM = ("0" + (beforeDate.getMonth() + 1)).slice(-2);
						        var dd = ("0" + (beforeDate.getDate())).slice(-2);
						        var hh = ("0" + (beforeDate.getHours())).slice(-2);
						        var mm = ("0" + (beforeDate.getMinutes())).slice(-2);
						        var ss = ("0" + (beforeDate.getSeconds())).slice(-2);

						        if (isBegining) {
						        	return yyyy + MM + dd+  '00' + '00' + '00';
						        } else {
						        	return yyyy + MM + dd+  hh + mm + ss;
						        }						        
							},
							getRandomNumber: function() {
								//generates 8 digit random integer as string
								return Math.floor((Math.random() * 100000000) + 9999999).toString();
							},
							isNumber: function(n) { 
								return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
							},
							getNoReadsNotification: function() {
								return '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"><div style="background-color:#69c0e2;width:80%; margin-left:auto; margin-right:auto; margin-bottom: 10px; border: 1px solid transparent; border-radius: 4px;"><h2 style="color:white;text-align: center;">Bookshelf</h4></div><div style="width:80%; margin-left:auto; margin-right:auto; padding: 15px; margin-bottom: 20px; border: 1px solid transparent; border-radius: 4px;""><div style="font-family: Arial; border-color: #bce8f1;"><div style="vertical-align:middle; text-align:center;"><h2 style="color:#e62626">Your one stop place to manage your readings & books.!</h2><h5 style="color:#1d757d">Leverage the power of accesing your books online</h5><p style="color:#1d757d; text-align:left;">Congratulations!</p ><p style="color:#1d757d">Dear <b>{0}</b> Your world of books missed you yesterday, Why dont you go ahead and continue your readings for your favourite books which are waiting for you. </p><a style="text-decoration: none; color: #337ab7;"" href="{1}" target="_blank"><p>Login to add your readlog</p></a><p style="font-size:0.8em; color:#A9A9A9; text-decoration:none;">If you are not the one who created account with us, please report this by going to this link <a style="text-decoration:none;" href="#">Report</a></p><hr/><a style="font-size:0.8em; color:#3b5998; text-decoration:none;" href="#"> <i class="fa fa-facebook-official"></i> </a> | <a style="font-size:0.8em; color:#55acee; text-decoration:none;" href="#"> <i class="fa fa-twitter-square"></i> </a> |<a style="font-size:0.8em; color:#dc4e41; text-decoration:none;" href="#"> <i class="fa fa-google-plus-square"</i> </a></div></div></div>';
							},
							getWeeklyNotification: function() {
								return '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"><div style="background-color:#69c0e2;width:80%; margin-left:auto; margin-right:auto; margin-bottom: 10px; border: 1px solid transparent; border-radius: 4px;"><h2 style="color:white;text-align: center;">Bookshelf</h4></div><div style="width:80%; margin-left:auto; margin-right:auto; padding: 15px; margin-bottom: 20px; border: 1px solid transparent; border-radius: 4px;""><div style="font-family: Arial; border-color: #bce8f1;"><div style="vertical-align:middle; text-align:center;"><h2 style="color:#e62626">Your one stop place to manage your readings & books.!</h2><h5 style="color:#1d757d">Leverage the power of accesing your books online</h5><p style="color:#1d757d; text-align:left;">Congratulations!</p ><p style="color:#1d757d">Dear <b>{0}</b> Hope you are reading awesome. Below are the quick insights of your account in the past week.</p><br/>{1}<a style="text-decoration: none; color: #337ab7;"" href="{2}" target="_blank"><p>Login to add your readlog</p></a><p style="font-size:0.8em; color:#A9A9A9; text-decoration:none;">If you are not the one who created account with us, please report this by going to this link <a style="text-decoration:none;" href="#">Report</a></p><hr/><a style="font-size:0.8em; color:#3b5998; text-decoration:none;" href="#"> <i class="fa fa-facebook-official"></i> </a> | <a style="font-size:0.8em; color:#55acee; text-decoration:none;" href="#"> <i class="fa fa-twitter-square"></i> </a> |<a style="font-size:0.8em; color:#dc4e41; text-decoration:none;" href="#"> <i class="fa fa-google-plus-square"</i> </a></div></div></div>';
							}					
						};

