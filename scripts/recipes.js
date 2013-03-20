var xmlDoc;
var allRecipes;
var showAll;
var resultSet;
var rsIndex;

var http_request = false;


var editRecipe = new Array();
editRecipe['title'] = "";
editRecipe['contr'] = "";
editRecipe['type'] = "";
editRecipe['prepHrs'] = "";
editRecipe['prepMins'] = "";
editRecipe['cookHrs'] = "";
editRecipe['cookMins'] = "";
editRecipe['readyHrs'] = "";
editRecipe['readyMins'] = "";
editRecipe['notes'] = "";
editRecipe['history'] = "";
editRecipe['photo'] = "";

var editIngrs = new Array();
function saveIngrs(ray) {
	for (var s=0; s < ray.length; s++) {
		editIngrs[s] = ray[s];
	}
}

var editDirs = new Array();
function saveDirs(ray) {
	for (var t=0; t < ray.length; t++) {
		editDirs[t] = ray[t];
	}
}

function loadPage(tab, scn) {
	alert("loading page");
	var clickedTab = tab;
	$("div[id^='apTab']").removeClass('selectedTab').addClass('unselectedTab');
	$('#' + clickedTab).addClass('selectedTab');
	var screen = scn;
	var currentURL = "pages/" + screen;
	var makeFrameText = "<iframe id='iFrame' name='iFrame' src='../../scripts/" + currentURL + "' scrolling='no' width='900' height='408' frameborder='0'>Your browser doesn't support iframes.</iframe>";
	var targetDiv = document.getElementById("apFrame");
	targetDiv.innerHTML = makeFrameText;
	var contentFrame = document.getElementById("iFrame");
	//alert(contentFrame.src);
	contentFrame.focus();
}

function showRecipe() {
	$("#apFrame").addClass("translucent");
	$("#apModal").removeClass("modalOff").addClass("modalOn");
	
	$("#modalPrevBtn").unbind().click(function() {
		if (rsIndex > 0) {
			rsIndex--;
			showRecipe();
		}	  
	});
	$("#modalNextBtn").unbind().click(function() {
		if (rsIndex < resultSet.length - 1) {
			rsIndex++;
			showRecipe();
		}	  
	});
	$(document).unbind().keyup(function(e) {
		if (e.keyCode == "39") {
			e.preventDefault();
			$("#modalNextBtn").click();
		} else if (e.keyCode == "37") {
			e.preventDefault();
			$("#modalPrevBtn").click();
		}
	});
	
	$("#modalReturnBtn").click(function() {
		$("#apFrame").removeClass("translucent");
		$("#apModal").removeClass("modalOn").addClass("modalOff");
	});
									  
	var title_text = resultSet[rsIndex].firstChild.lastChild.nodeValue;
	var contr_text = resultSet[rsIndex].attributes.getNamedItem("contributer").value;
	var type_text = resultSet[rsIndex].attributes.getNamedItem("type").value;	
	var prephr_text = resultSet[rsIndex].attributes.getNamedItem("prephr").value;	
	var prepmin_text = resultSet[rsIndex].attributes.getNamedItem("prepmin").value;	
	var cookhr_text = resultSet[rsIndex].attributes.getNamedItem("cookhr").value;	
	var cookmin_text = resultSet[rsIndex].attributes.getNamedItem("cookmin").value;	
	var readyhr_text = resultSet[rsIndex].attributes.getNamedItem("readyhr").value;	
	var readymin_text = resultSet[rsIndex].attributes.getNamedItem("readymin").value;	
	var note_text = resultSet[rsIndex].getElementsByTagName("note")[0].lastChild.nodeValue;
	var history_text = resultSet[rsIndex].getElementsByTagName("history")[0].lastChild.nodeValue;
	var photo_text = resultSet[rsIndex].getElementsByTagName("photo")[0].lastChild.nodeValue;

	var modalText = "<strong>Title:  " + title_text + "</strong><br/>";	
	modalText += "<strong>Type:</strong>  " + type_text + "<br/>";
	modalText += "<strong>Contributor:</strong>  " + contr_text + "<p></p>";
	
	modalText += "<p><strong>Prep time:</strong>  " + prephr_text + " hr(s), " + prepmin_text + " min(s)<br/>";
	modalText += "<strong>Cook time:</strong>  " + cookhr_text + " hr(s), " + cookmin_text + " min(s)<br/>";
	modalText += "<strong>Ready time:</strong>  " + readyhr_text + " hr(s), " + readymin_text + " min(s)</p>";
	
	modalText += "<p><strong>Ingredients:</strong><br/>";
	var ingrSet = resultSet[rsIndex].getElementsByTagName("ingr");
	for (var i=0; i<ingrSet.length; i++) {
		var ingrQty = ingrSet[i].attributes.getNamedItem("quantity").value;
		var ingrMeasure = ingrSet[i].attributes.getNamedItem("measure").value;
		var ingrItem = ingrSet[i].lastChild.nodeValue;
		modalText += "&nbsp;&nbsp;&nbsp;&nbsp;" + ingrQty + " " + ingrMeasure + " &nbsp;" + ingrItem + "<br/>";
	}
	modalText += "</p>";
	
	modalText += "<p><strong>Directions:</strong><br/>";
	var dirSet = resultSet[rsIndex].getElementsByTagName("dir");
	for (var j=0; j<dirSet.length; j++) {
		var dirOrder = dirSet[j].attributes.getNamedItem("order").value;
		var dirAction = dirSet[j].lastChild.nodeValue;
		modalText += "&nbsp;&nbsp;&nbsp;&nbsp;" + dirOrder + ". " + dirAction + "<br/>";
	}
	modalText += "</p>";
	
	modalText += "<strong>Note:</strong>&nbsp; " + note_text + "<br/>";	
	modalText += "<strong>History:</strong>&nbsp; " + history_text + "<br/>";
	modalText += "<p></p>";
	
	$("#apModalText").html(modalText).animate({scrollTop:0}, 'fast');
	
	var imageURL = "../images/" + photo_text;
	$("#modalImage").attr("src", imageURL);
	
	$("#modalReturnBtn").focus();
}
