module.exports = function(app) {
	require('./user/user')(app);
	require('./tileModel/tileModel')(app);
	require('./productionLog/productionLog')(app);
	require('./sales/sales')(app);
};
