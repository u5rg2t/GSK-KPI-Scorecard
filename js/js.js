// Global var to store the KPI content..
var arr = [];

$(function() {
    // jQuery is ready.
	
	// Prep for additional functionality in future..
	var scope = "Global"  // OR "EA" OR "AMA"
	
	// Let's get the single, most recent KPI record for any given scope
	$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: "KPI Scorecard",
		RowLimit: 1,
		CAMLViewFields: "<ViewFields>"
			+ "<FieldRef Name='Month' />"
			+ "<FieldRef Name='Year' />"
			+ "<FieldRef Name='_x0031__x0020__x002d__x0020_Oper' />"
			+ "<FieldRef Name='_x0031__x0020__x002d__x0020_Sale' />"
			+ "<FieldRef Name='_x0031__x0020__x002d__x0020_Work' />"
			+ "<FieldRef Name='_x0032__x0020__x002d__x0020_Empl' />"
			+ "<FieldRef Name='_x0032__x0020__x002d__x0020_Top_' />"
			+ "<FieldRef Name='_x0033__x0020__x002d__x0020_Bran' />"
			+ "<FieldRef Name='_x0033__x0020__x002d__x0020_Mark' />"
			+ "<FieldRef Name='_x0034__x0020__x002d__x0020_Inno' />"
			+ "<FieldRef Name='_x0034__x0020__x002d__x0020_Key_' />"					
			+ "<FieldRef Name='_x0035__x0020__x002d__x0020_Chan' />"
			+ "<FieldRef Name='_x0035__x0020__x002d__x0020_Expe' />"
			+ "<FieldRef Name='_x0035__x0020__x002d__x0020_Sale' />"
			+ "<FieldRef Name='_x0036__x0020__x002d__x0020_COGS' />"
			+ "<FieldRef Name='_x0036__x0020__x002d__x0020_On_x' />"
			+ "<FieldRef Name='_x0036__x0020__x002d__x0020_reli' />"					
		+ "</ViewFields>",
		CAMLQuery: "<Query><Where><Or><Eq><FieldRef Name=\"Title\"></FieldRef><Value Type=\"Text\">" + scope + "</Value></Eq><IsNotNull><FieldRef Name=\"Title\"></FieldRef></IsNotNull></Or></Where></Query>",
		completefunc: function (xData, Status) {
			
			var quantity = $(xData.responseXML).SPFilterNode("z:row").length;
			
			$(xData.responseXML).SPFilterNode("z:row").each(function(id) {
				theMessage = '{'

				theMessage += '"Month":' + JSON.stringify($(this).attr("ows_Month")) + ',';
				theMessage += '"Year":' + JSON.stringify($(this).attr("ows_Year")) + ',';
				theMessage += '"a1":' + JSON.stringify($(this).attr("ows__x0031__x0020__x002d__x0020_Sale")) + ',';
				theMessage += '"a2":' + JSON.stringify($(this).attr("ows__x0031__x0020__x002d__x0020_Oper"))  + ',';
				theMessage += '"a3":' + JSON.stringify($(this).attr("ows__x0031__x0020__x002d__x0020_Work")) + ',';
				theMessage += '"b1":' + JSON.stringify($(this).attr("ows__x0032__x0020__x002d__x0020_Empl")) + ',';
				theMessage += '"b2":' + JSON.stringify($(this).attr("ows__x0032__x0020__x002d__x0020_Top_")) + ',';
				theMessage += '"c1":' + JSON.stringify($(this).attr("ows__x0033__x0020__x002d__x0020_Mark"))  + ',';
				theMessage += '"c2":' + JSON.stringify($(this).attr("ows__x0033__x0020__x002d__x0020_Bran")) + ',';
				theMessage += '"d1":' + JSON.stringify($(this).attr("ows__x0034__x0020__x002d__x0020_Inno")) + ',';
				theMessage += '"d2":' + JSON.stringify($(this).attr("ows__x0034__x0020__x002d__x0020_Key_"))  + ',';
				theMessage += '"e1":' + JSON.stringify($(this).attr("ows__x0035__x0020__x002d__x0020_Chan"))  + ',';
				theMessage += '"e2":' + JSON.stringify($(this).attr("ows__x0035__x0020__x002d__x0020_Expe"))  + ',';
				theMessage += '"e3":' + JSON.stringify($(this).attr("ows__x0035__x0020__x002d__x0020_Sale"))  + ',';
				theMessage += '"f1":' + JSON.stringify($(this).attr("ows__x0036__x0020__x002d__x0020_On_x"))  + ',';
				theMessage += '"f2":' + JSON.stringify($(this).attr("ows__x0036__x0020__x002d__x0020_COGS"))  + ',';
				theMessage += '"f3":' + JSON.stringify($(this).attr("ows__x0036__x0020__x002d__x0020_reli"));				
							
				theMessage += "}";

				var obj = jQuery.parseJSON(theMessage);
				
				arr.push(obj);

			});
			
			// 1. Render the header
			populateTitles();
			
			// 2. Prepare the page with the KPIs
			populateData();
				
		}
	});	
	


    var $dialog1 = $(".text-white").dialog({
		autoOpen: false,
		title: 'Understanding the KPIs',
		height: 574,
		width: 1100,		
		modal: true,
             show: {
                 effect: "fade",
                 duration: 300
             },
             hide: {
                 effect: "fade",
                 duration: 500
             },		
		buttons: {
			Ok: function() {
			  $( this ).dialog( "close" );
			}
		}			
    });	
	
    var $dialog2 = $(".text-orange").dialog({
		autoOpen: false,
		title: 'Understanding the KPIs',
		height: 493,
		width: 1100,		
		modal: true,
             show: {
                 effect: "fade",
                 duration: 300
             },
             hide: {
                 effect: "fade",
                 duration: 500
             },		
		buttons: {
			Ok: function() {
			  $( this ).dialog( "close" );
			}
		}			
    });	
	
    var $dialog3 = $(".text-purple").dialog({
		autoOpen: false,
		title: 'Understanding the KPIs',
		height: 415,
		width: 1100,		
		modal: true,
             show: {
                 effect: "fade",
                 duration: 300
             },
             hide: {
                 effect: "fade",
                 duration: 500
             },		
		buttons: {
			Ok: function() {
			  $( this ).dialog( "close" );
			}
		}			
    });		

    var $dialog4 = $(".text-teal").dialog({
		autoOpen: false,
		title: 'Understanding the KPIs',
		height: 590,
		width: 1100,		
		modal: true,
             show: {
                 effect: "fade",
                 duration: 300
             },
             hide: {
                 effect: "fade",
                 duration: 500
             },		
		buttons: {
			Ok: function() {
			  $( this ).dialog( "close" );
			}
		}			
    });		
	
	var $dialog5 = $(".text-red").dialog({
		autoOpen: false,
		title: 'Understanding the KPIs',
		height: 614,
		width: 1100,		
		modal: true,
             show: {
                 effect: "fade",
                 duration: 300
             },
             hide: {
                 effect: "fade",
                 duration: 500
             },		
		buttons: {
			Ok: function() {
			  $( this ).dialog( "close" );
			}
		}			
    });	
	
	var $dialog6 = $(".text-green").dialog({
		autoOpen: false,
		title: 'Understanding the KPIs',
		height: 632,
		width: 1100,		
		modal: true,
             show: {
                 effect: "fade",
                 duration: 300
             },
             hide: {
                 effect: "fade",
                 duration: 500
             },		
		buttons: {
			Ok: function() {
			  $( this ).dialog( "close" );
			}
		}			
    });		
	
	$("ul.growthlevers li:nth-child(1) .top img").click(function(){
		$dialog1.dialog('open');	
	});	
	$("ul.growthlevers li:nth-child(2) .top img").click(function(){
		$dialog6.dialog('open');	
	});
	$("ul.growthlevers li:nth-child(3) .top img").click(function(){
		$dialog2.dialog('open');	
	});	
	$("ul.growthlevers li:nth-child(4) .top img").click(function(){
		$dialog3.dialog('open');	
	});
	$("ul.growthlevers li:nth-child(5) .top img").click(function(){
		$dialog4.dialog('open');	
	});	
	$("ul.growthlevers li:nth-child(6) .top img").click(function(){
		$dialog5.dialog('open');	
	});
});

function showdiv(thediv){
	$(thediv).fadeIn( 100 );
}
function hidediv(thediv){
	$(thediv).fadeOut( 20 );
	
}

function populateTitles(){
	$(".wrapper .header h3").html(arr[0].Month + " " + arr[0].Year);	
}

function populateData(){	
		renderIcon("1-1", arr[0].a1);
		renderIcon("1-2", arr[0].a2);
		renderIcon("1-3", arr[0].a3);
		renderIcon("2-1", arr[0].b1);
		renderIcon("2-2", arr[0].b2);
		renderIcon("3-1", arr[0].c1);
		renderIcon("3-2", arr[0].c2);
		renderIcon("4-1", arr[0].d1);
		renderIcon("4-2", arr[0].d2);
		renderIcon("5-1", arr[0].e1);
		renderIcon("5-2", arr[0].e2);
		renderIcon("5-3", arr[0].e3);
		renderIcon("6-1", arr[0].f1);		
		renderIcon("6-2", arr[0].f2);		
		renderIcon("6-3", arr[0].f3);		
}

function renderIcon(imgID, status){
	$("#" + imgID).attr("src", "../Documents/DigitalComms/KPI%20scorecard/img/" + status + ".jpg");
}
