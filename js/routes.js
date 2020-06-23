Path.map("#/logout").to(function () {
   
    window.location.href = '/';
});

Path.map("#/thoughts").to(function () {
	console.log('in ::::::');
	 var reqHandler = new ReqHandler();
	 reqHandler.post({url: '/ui/associate', data: {}}, function(response) {
	     console.log(JSON.stringify(response, null, 0));
	 });
    $('#main').load('views/thoughts.html');
});

Path.map("#/team").to(function () {
    $('#main').load('views/team.html');
});

Path.map('#/contact').to(function () {
    $('#main').load('views/contact.html');
});

Path.listen();
