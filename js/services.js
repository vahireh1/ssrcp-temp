const reqHandler = new ReqHandler();
var base64String;
var userObj;
var selectedBookId;
var idx;
var books = [];

function login() {
	var user = {
	            "emailAddress": $("#inputEmail").val(),
	            "password": $("#inputPassword").val()
	            }
	reqHandler.post({url:"/login", data:user}, function(resp){
	   if(resp.status == "Success" ){
	     var user = resp.result[0];
	     $.session.set("token", user.token);
	     $.session.set("userId", user.userId);
	     $.session.set("emailAddress", user.emailAddress);
	     $.session.set("userName", user.userName);
	     $.session.set("phoneNumber", user.phoneNumber);
	     window.location.href = '/home';
	   } else{
	        $("#errorLoginMess").css("display","block");
	        $("#errorLoginMess").html(JSON.stringify(resp.error));
	        setTimeout(function(){$("#errorLoginMess").css("display","none"); }, 6000);
	    }
	});
}

function getTilesList(callback){
    reqHandler.get({url: '/tileModels'}, function(resp){
        if(resp.status == "Success"){
            var formattedData = "";
            var result = resp.result;
            $.each(result, function(i, item) {
                formattedData = formattedData + '<option value='+result[i].tileModelId+'>'+result[i].tileModelName +'</option>';
            });
            callback('<option selected value="">Tile Models</option>'+formattedData); 
        } else{
            callback("Error in retrieving tileModelId Data.....!"); 
          }
      });
}

function addProductionLog() { 
	var productionObj = {
		"tileModelId": $("#tileModels").val(),
		"comments": $("#textarea1").val(),
		"quantity": $("#qtty").val(),
	};
	reqHandler.post({url: '/productionLog', data: productionObj}, function (resp) {
		if(resp.status == 'Success'){
			$("#successMess").show();
			$("#successMess").hide(3000);
		} else {
			console.log(resp);
		}
	});
}


// function addTileImage() {

		// var tileImageDescription = CKEDITOR.instances.tileImageDescription.getData();
		// var tileImageObj = {
		// 	'createdBy': localStorage.getItem('bs_userId'),
		// 	'tileImage': $('#bookName').val(),
			// 'publisher': $('#publisher').val(),
			// 'authorName1': $('#authorName1').val(),
			// 'authorName2': $('#authorName2').val(),
			// 'language': $('#language').val(),
			// 'genre': $('#genre').val(),
			// 'isFavourite': $('#isFavourite').val(),
			// 'isRecommends': $('#isRecommends').val(),
			// 'bookDescription': bookDescription,
			// 'NoOfPages': $('#NoOfPages').val(),
			// 'bookMarkPage': $('#bookMarkPage').val(),
			// 'actualPrice': $('#actualPrice').val(),
			// 'boughtPrice': $('#boughtPrice').val(),
			// 'isbn': $('#isbn').val(),
	// 		 'tileImageImage': cup
	// 	};
	// 	reqHandler.post({ url: '/tileImage', data: bookObj }, function (response) {
	// 		if (response.error) {
	// 			alert(JSON.stringify(response.error));
	// 		} else {
	// 			alert('book added successfully');
	// 		}
	// 	});
	// }
	

// function addBook() {

// 	var bookDescription = CKEDITOR.instances.bookDescription.getData();

// 	var bookObj = {
// 		'createdBy': localStorage.getItem('bs_userId'),
// 		'bookName': $('#bookName').val(),
// 		'publisher': $('#publisher').val(),
// 		'authorName1': $('#authorName1').val(),
// 		'authorName2': $('#authorName2').val(),
// 		'language': $('#language').val(),
// 		'genre': $('#genre').val(),
// 		'isFavourite': $('#isFavourite').val(),
// 		'isRecommends': $('#isRecommends').val(),
// 		'bookDescription': bookDescription,
// 		'NoOfPages': $('#NoOfPages').val(),
// 		'bookMarkPage': $('#bookMarkPage').val(),
// 		'actualPrice': $('#actualPrice').val(),
// 		'boughtPrice': $('#boughtPrice').val(),
// 		'isbn': $('#isbn').val(),
// 		'bookImage': base64String
// 	};
// 	reqHandler.post({ url: '/book', data: bookObj }, function (response) {
// 		if (response.error) {
// 			alert(JSON.stringify(response.error));
// 		} else {
// 			alert('book added successfully');
// 		}
// 	});
// }

// function openBookDetails(bookId) {
// 	selectedBookId = bookId;
// 	reqHandler.get({ url: '/book/' + bookId }, function (response) {
// 		if (response.error) {
// 			alert(JSON.stringify(response.error));
// 		} else {
// 			console.log(response);
// 			var bookRecord = response.result[0];
// 			$('#bookModal').modal('show');
// 			$('#bookImgDB').attr('src', bookRecord.bookImage);
// 			$('#bookNameDB').val(bookRecord.bookName);
// 			$('#publisherDB').val(bookRecord.publisher);
// 			$('#authorName1DB').val(bookRecord.authorName1);
// 			$('#authorName2DB').val(bookRecord.authorName2);
// 			$('#languageDB').val(bookRecord.language);
// 			$('#genreDB').val(bookRecord.genre);
// 			if (bookRecord.isFavourite) {
// 				$('#isFavouriteDB').val('true');
// 			} else {
// 				$('#isFavouriteDB').val('false');
// 			}
// 			if (bookRecord.isRecommends) {
// 				$('#isRecommendsDB').val('true');
// 			} else {
// 				$('#isRecommendsDB').val('false');
// 			}
// 			CKEDITOR.instances.bookDescriptionDB.setData(bookRecord.bookDescription);
// 			$('#actualPriceDB').val(bookRecord.actualPrice);
// 			$('#boughtPriceDB').val(bookRecord.boughtPrice);
// 			$('#NoOfPagesDB').val(bookRecord.NoOfPages);
// 			$('#bookMarkPageDB').val(bookRecord.bookMarkPage);
// 			$('#isbnDB').val(bookRecord.isbn);
// 		}
// 	});
// }

// function updateBook() {

// 	var bookDescription = CKEDITOR.instances.bookDescriptionDB.getData();

// 	var bookObj = {
// 		'bookId': selectedBookId,
// 		'updatedBy': localStorage.getItem('bs_userId'),
// 		'bookName': $('#bookNameDB').val(),
// 		'publisher': $('#publisherDB').val(),
// 		'authorName1': $('#authorName1DB').val(),
// 		'authorName2': $('#authorName2DB').val(),
// 		'language': $('#languageDB').val(),
// 		'genre': $('#genreDB').val(),
// 		'isFavourite': $('#isFavouriteDB').val(),
// 		'isRecommends': $('#isRecommendsDB').val(),
// 		'bookDescription': bookDescription,
// 		'NoOfPages': $('#NoOfPagesDB').val(),
// 		'bookMarkPage': $('#bookMarkPageDB').val(),
// 		'actualPrice': $('#actualPriceDB').val(),
// 		'boughtPrice': $('#boughtPriceDB').val(),
// 		'isbn': $('#isbnDB').val()
// 	};
// 	reqHandler.put({ url: '/book', data: bookObj }, function (response) {
// 		if (response.error) {
// 			alert(JSON.stringify(response.error));
// 		} else {
// 			alert('book updated successfully');
// 		}
// 	});
// }

// function encodeImagetoBase64(element) {
// 	var file = element.files[0];
// 	var reader = new FileReader();
// 	reader.onloadend = function () {
// 		base64String = reader.result;
// 	}
// 	reader.readAsDataURL(file);
// }