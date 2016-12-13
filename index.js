var output = '';
var src='';
var flickrAPI='';

// The search function 
// call flickr api to search and add new image to html
function search(tagName){
	document.getElementById("search").value = tagName;
	var mdl = document.getElementById("myModal");
	var black_overlay = document.getElementById('shadow');
	black_overlay.style.display = "none";
	mdl.style.display = "none";
	flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key='+ APIKey +'&tags=' + tagName + '&jsoncallback=?';
	document.getElementById("list").innerHTML = '';
	output = '';
	$.getJSON(flickrAPI, function(data) {
		if (data.stat == 'ok') {
			result = data.photos.photo;
			for (var i = 0; i < result.length; i++) {
				console.log(result[i].id);
				src = "https://farm" + result[i].farm + ".staticflickr.com/" + result[i].server + "/" + result[i].id + "_" + result[i].secret +".jpg";
				if (i%3 == 0) {
					output += "<div class=\"img-div\"> <object align=\"left\" class=\"b-left\"><button id=\"" + result[i].id + "\" type=\"button\" onclick=showInfo(this.id)> <img src=" + src + " > </button></object> ";
				} else if (i%3 == 1) {
					output += "<object align=\"center\" class=\"b-center\"><button id=\"" + result[i].id + "\" type=\"button\" onclick=showInfo(this.id)> <img src=" + src + " > </button></object> ";
				} else {
					output += "<object align=\"right\" class=\"b-right\"><button id=\"" + result[i].id + "\" type=\"button\" onclick=showInfo(this.id)> <img src=" + src + " > </button></object> </div>";
				}
			}
			if (i%3 != 0) output += "</div>";
			document.getElementById("list").innerHTML = output;
		}
		else {
			result = null;
		}
	});
}

// The show information function 
// call flickr api and attach the information into information block
function showInfo(clicked_id){
	var getInfoAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&format=json&api_key=" + APIKey + "&photo_id=" + clicked_id + "&jsoncallback=?";
	var mdl = document.getElementById("myModal");
	$.getJSON(getInfoAPI, function(data) {
		if (data.stat == 'ok') {
			result = data.photo;
			document.getElementById("info-title").innerHTML = result.title._content;
			document.getElementById("info-img").innerHTML = document.getElementById(clicked_id).innerHTML;
			document.getElementById("info-img").children[0].id = "little-img";
			var content = document.getElementById("info-content").innerHTML = result.description._content;
			if (content == '')	content = "No Description.";
			tag = result.tags.tag;
			var tag_names = '';
			for(var i=0; i<tag.length; i++){
				tag_names += "<object style=\"color: #0000FF\" onclick=search(\"" + tag[i].raw +"\") class=\"tags\">#" + tag[i].raw + "</object> ";
			}
			document.getElementById("info-tags").innerHTML = tag_names;
		}
		else {
			result = null;
		}
	});
	var black_overlay = document.getElementById('shadow');
	black_overlay.style.display = "block";
	mdl.style.display = "block";
	var span = document.getElementsByClassName("close")[0];
	span.onclick = function(){
		black_overlay.style.display = "none";
		mdl.style.display = "none";
	}
}


