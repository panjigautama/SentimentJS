$(document).ready(function() {
      
	$("#content").hide();

	var contentAlert = function( message, alertType )
	{
		$("#contentAlert").html('<div class="alert alert-'+ alertType +'">  <button type="button" class="close" data-dismiss="alert">&times;</button>' + message + '</div>');
	}

	var loadingAlert = function( message )
	{
		$("#contentAlert").html('<small>amplifying ' + message + ', please wait a moment .. </small><br><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div>');
	}

	// Generating Table and Chart
	var generateDemographicTable = function( data )
	{
		var content = '<h4 class="alert alert-info">Demographics</h4>';

		var tableHead = '<table class="table table-bordered table-hover"> <thead><tr><th>Age</th><th>Gender</th><th>Education</th><th>Language</th></tr></thead><tbody>';
		var row = "<tr>";
		row += "<td>" + data.Age.Name + '</td>';
		row += "<td>" + data.Gender.Name + ' </td>';
		row += "<td>" + data.Education.Name + '</td>';
		row += "<td>" + data.Language.Name + '</td>';
		row += "</tr>";

		content += tableHead;
		content += row;
		content += "</tbody></table>";

		$("#table_demographic").html( content );
	}

	var colorPredict = function( value )
	{
		if( value > 0 )
		{
			return "green";
		}
		else if( value < 0 )
		{
			return "red";
		}
		else
		{
			return "black";
		}
	}

	var generateTableTopTopics = function( data )
	{
		var content = '<h4 class="alert alert-info">Top Topics</h4>';
		var tableHead = '<table class="table table-bordered table-hover"> <thead><tr><th>Topic</th><th>Polarity</th></tr></thead><tbody>';
		var row = "";

		row += "<tr>";
		row += "<td></td>";
		row += "<td><strong>Max</strong></td>";
		row += "<td><strong>Mean</strong></td>";
		row += "<td><strong>Min</strong></td>";
		row += "</tr>";

		for( var i = 0; i < data.length; i++ )
		{
			var temps = data[i];

			row += "<tr>";
			row += "<td>" + temps.Topic.Name + "</td>";
			row += "<td>" + '<span style="color:'+  colorPredict(temps.Polarity.Max.Value) + '">' + temps.Polarity.Max.Value + "</span>" + "</td>";
			row += "<td>" + '<span style="color:'+  colorPredict(temps.Polarity.Mean.Value) + '">' + temps.Polarity.Mean.Value + "</span>" + "</td>";
			row += "<td>" + '<span style="color:'+  colorPredict(temps.Polarity.Min.Value) + '">' + temps.Polarity.Min.Value + "</span>" + "</td>";
			row += "</tr>";
		}

		content += tableHead;
		content += row;
		content += "</tbody></table>";

		$("#table_toptopics").html( content );
	}

	var generateStyleTable = function( data )
	{
		var content = '<h4 class="alert alert-info">Source Styles</h4>';

		var tableHead = '<table class="table table-bordered table-hover"> <thead><tr><th>Type</th><th>Name</th><th>Value</th></tr></thead><tbody>';
		var row = "<tr>";

		row += "<td>Contrast</td>";
		row += "<td>" + data.Contrast.Name + "</td>";
		row += "<td>" + '<span style="color:'+  colorPredict(data.Contrast.Value) + '">' + data.Contrast.Value + "</span>" + "</td>";
		row += "</tr>";

		row += "<td>Decisiveness</td>";
		row += "<td>" + data.Decisiveness.Name + "</td>";
		row += "<td>" + '<span style="color:'+  colorPredict(data.Decisiveness.Value) + '">' + data.Decisiveness.Value + "</span>" + "</td>";
		row += "</tr>";

		row += "<td>Flamboyance</td>";
		row += "<td>" + data.Flamboyance.Name + "</td>";
		row += "<td>" + '<span style="color:'+  colorPredict(data.Flamboyance.Value) + '">' + data.Flamboyance.Value + "</span>" + "</td>";
		row += "</tr>";

		row += "<td>OfferingGuidance</td>";
		row += "<td>" + data.OfferingGuidance.Name + "</td>";
		row += "<td>" + '<span style="color:'+  colorPredict(data.OfferingGuidance.Value) + '">' + data.OfferingGuidance.Value + "</span>" + "</td>";
		row += "</tr>";

		row += "<td>RequestingGuidance</td>";
		row += "<td>" + data.RequestingGuidance.Name + "</td>";
		row += "<td>" + '<span style="color:'+  colorPredict(data.RequestingGuidance.Value) + '">' + data.RequestingGuidance.Value + "</span>" + "</td>";
		row += "</tr>";

		row += "<td>Slang</td>";
		row += "<td>" + data.Slang.Name + "</td>";
		row += "<td>" + '<span style="color:'+  colorPredict(data.Slang.Value) + '">' + data.Slang.Value + "</span>" + "</td>";
		row += "</tr>";

		content += tableHead;
		content += row;
		content += "</tbody></table>";

		$("#table_styles").html( content );
	}

	var generateActionStyleTable = function( data )
	{
		var content = '<h4 class="alert alert-info">Styles of Action</h4>';

		var tableHead = '<table class="table table-bordered table-hover"> <thead><tr><th>Action</th><th>Type</th><th>Decisiveness</th><th>Temporality</th><th>Offering Guidance</th><th>Requesting Guidance</th></tr></thead><tbody>';
		
		var row = "";

		for( var i = 0; i < data.length; i++ )
		{
			var temps = data[i];

			var openColumn = "<td>"
			var closeColumn = "</td>"

			row += "<tr>";

			row += openColumn;
			if( temps.Action != undefined)
				 row += temps.Action.Name 
			row += closeColumn;

			row += openColumn;
			if( temps.ActionType.Result != undefined)
				 row += temps.ActionType.Result.Name 
			row += closeColumn;

			row += openColumn;
			if( temps.Decisiveness != undefined)
				 row += temps.Decisiveness.Name 
			row += closeColumn;

			row += openColumn;
			if( temps.TemporalityResult.Temporality != undefined)
				 row += temps.TemporalityResult.Temporality.Name 
			row += closeColumn;

			row += openColumn;
			if( temps.OfferingGuidance != undefined)
				 row += temps.OfferingGuidance.Name 
			row += closeColumn;

			row += openColumn;
			if( temps.RequestingGuidance != undefined)
				 row += temps.RequestingGuidance.Name 
			row += closeColumn;

			row += "</tr>";
		}

		content += tableHead;
		content += row;
		content += "</tbody></table>";
		$("#table_actionstyles").html( content );
	}

	var generateTopicIntentionsChart = function( data )
	{		
		// get data
		var Topics = new Array();
		var TopicsData = new Array();

		for( var  i = 0; i < data.Domains.length; i++ )
		{
			var temp = data.Domains[i];
			Topics[i] = temp.Domain.Name;
			TopicsData[i] = temp.Domain.Value;
		}

		var data = {
			labels : Topics,
			datasets : [
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : TopicsData
				}
			]
		}

		var options = { scaleShowLabels : true };

		var ctx = $("#chart_topicsintention").get(0).getContext("2d");
		var topicintentionChart = new Chart(ctx).Radar( data, options );

	}

	var generateActionsChart = function( data )
	{
		// get data
		var Topics = new Array();
		var TopicsData = new Array();

		for( var  i = 0; i < data.TopActions.length; i++ )
		{
			var temp = data.TopActions[i];
			Topics[i] = temp.Action.Name;
			TopicsData[i] = temp.Action.Value;
		}

		var data = {
			labels : Topics,
			datasets : [
				{
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					data : TopicsData
				}
			]
		}

		var options = { scaleShowLabels : true };

		var ctx = $("#chart_actions").get(0).getContext("2d");
		var toptopicsChart = new Chart(ctx).Bar( data, options );

	}

	var testGenerate = function()
	{
		var data = '{"ns2:AmplifyResponse":{"AmplifyReturn":{"Topics":{"Domains":[{"Domain":{"Name":"\nInternet","Value":7.07},"Subdomains":{"DomainResult":{"Domain":{"Name":"Web","Value":7.07},"Subdomains":null}}},{"Domain":{"Name":"Business","Value":5.39},"Subdomains":[{"Domain":{"Name":"advertising","Value":4.04},"Subdomains":[{"Domain":{"Name":"advertisement","Value":2.69},"Subdomains":null},{"Domain":{"Name":"endorsement","Value":1.35},"Subdomains":null}]},{"Domain":{"Name":"banking","Value":1.35},"Subdomains":{"DomainResult":{"Domain":{"Name":"endorsement","Value":1.35},"Subdomains":null}}}]},{"Domain":{"Name":"Science","Value":2.69},"Subdomains":{"DomainResult":{"Domain":{"Name":"mathematics","Value":2.69},"Subdomains":{"DomainResult":{"Domain":{"Name":"statistic","Value":2.69},"Subdomains":null}}}}}],"TopTopics":[{"Topic":{"Name":"Web","Value":7.07},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"Web","Value":7.07}},"TopicDescription":{"Result":{"Name":"an often-transparent graphic image","Value":1.00}},"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Positive","Value":0.71},"Max":{"Name":"Positive","Value":0.94}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Topic":{"Name":"beacon","Value":6.06},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"beacon","Value":6.06}},"TopicDescription":{"Result":{"Name":"an often-transparent graphic image","Value":1.00}},"Polarity":{"Min":{"Name":"Positive","Value":0.94},"Mean":{"Name":"Positive","Value":0.94},"Max":{"Name":"Positive","Value":0.94}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Topic":{"Name":"quot","Value":4.71},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"quot","Value":4.71}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Negative","Value":-0.60},"Mean":{"Name":"Negative","Value":-0.34},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Topic":{"Name":"cookie","Value":4.71},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"cookie","Value":4.71}},"TopicDescription":{"Result":{"Name":"small text files","Value":1.00}},"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Positive","Value":0.63},"Max":{"Name":"Positive","Value":0.94}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Topic":{"Name":"information","Value":4.38},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"information","Value":4.38}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Positive","Value":0.49},"Max":{"Name":"Positive","Value":0.80}},"OfferingGuidance":{"Name":"A Lot","Value":3.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Topic":{"Name":"Sedo","Value":3.03},"NamedEntityType":[{"Name":"Type","Value":"NamedEntity"},{"Name":"SubType","Value":"unknown"}],"TopicInstance":{"Result":{"Name":"Sedo","Value":3.03}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Topic":{"Name":"domain owner","Value":3.03},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"domain owner","Value":3.03}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Topic":{"Name":"domain jakartapost.com","Value":3.03},"NamedEntityType":null,"TopicInstance":[{"Name":"domain","Value":1.68},{"Name":"domain jakartapost.com","Value":1.35}],"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Topic":{"Name":"website","Value":2.69},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"website","Value":2.69}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Positive","Value":0.47},"Max":{"Name":"Positive","Value":0.94}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Topic":{"Name":"statistic","Value":2.69},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"statistic","Value":2.69}},"TopicDescription":{"Result":{"Name":"anonymous","Value":1.00}},"Polarity":{"Min":{"Name":"Positive","Value":0.94},"Mean":{"Name":"Positive","Value":0.94},"Max":{"Name":"Positive","Value":0.94}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}}],"ProperNouns":[{"Topic":{"Name":"Sedo","Value":3.03},"NamedEntityType":[{"Name":"Type","Value":"NamedEntity"},{"Name":"SubType","Value":"unknown"}],"TopicInstance":{"Result":{"Name":"Sedo","Value":3.03}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Topic":{"Name":"Reference","Value":2.02},"NamedEntityType":[{"Name":"Type","Value":"NamedEntity"},{"Name":"SubType","Value":"unknown"}],"TopicInstance":{"Result":{"Name":"Reference","Value":2.02}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Topic":{"Name":"Search","Value":1.01},"NamedEntityType":[{"Name":"Type","Value":"Product"},{"Name":"SubType","Value":"entertainment"}],"TopicInstance":{"Result":{"Name":"Search","Value":1.01}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Topic":{"Name":"Sedo&apos;s","Value":1.01},"NamedEntityType":[{"Name":"Type","Value":"NamedEntity"},{"Name":"SubType","Value":"unknown"}],"TopicInstance":{"Result":{"Name":"Sedo&apos;s","Value":1.01}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Topic":{"Name":"Websearch","Value":1.01},"NamedEntityType":[{"Name":"Type","Value":"NamedEntity"},{"Name":"SubType","Value":"unknown"}],"TopicInstance":{"Result":{"Name":"Websearch","Value":1.01}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}}],"Locations":null},"Actions":{"TopActions":[{"Action":{"Name":"buy this domain","Value":7.89},"ActionType":{"Result":{"Name":"buy","Value":1.00}},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Action":{"Name":"consent to this privacy policy","Value":7.89},"ActionType":{"Result":{"Name":"say","Value":1.00}},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Action":{"Name":"like information","Value":7.89},"ActionType":{"Result":{"Name":"like","Value":1.00}},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"A Lot","Value":3.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Action":{"Name":"not control trade mark","Value":7.89},"ActionType":{"Result":{"Name":"other","Value":-1.00}},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Action":{"Name":"use click","Value":7.89},"ActionType":{"Result":{"Name":"use","Value":1.00}},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"A Lot","Value":3.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Action":{"Name":"visit this website","Value":7.89},"ActionType":{"Result":{"Name":"travel","Value":1.00}},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Action":{"Name":"allow third-party advertising companies","Value":5.26},"ActionType":{"Result":{"Name":"other","Value":1.00}},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Action":{"Name":"create","Value":5.26},"ActionType":{"Result":{"Name":"create","Value":1.00}},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Action":{"Name":"gather","Value":5.26},"ActionType":{"Result":{"Name":"other","Value":1.00}},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Past","Value":1.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}},{"Action":{"Name":"maintain no relationship","Value":5.26},"ActionType":{"Result":{"Name":"defend","Value":1.00}},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}}]},"TopicIntentions":{"Domains":[{"Domain":{"Name":"Internet","Value":7.07},"Subdomains":{"DomainResult":{"Domain":{"Name":"Web","Value":7.07},"Subdomains":null}}},{"Domain":{"Name":"Business","Value":5.39},"Subdomains":[{"Domain":{"Name":"advertising","Value":4.04},"Subdomains":[{"Domain":{"Name":"advertisement","Value":2.69},"Subdomains":null},{"Domain":{"Name":"endorsement","Value":1.35},"Subdomains":null}]},{"Domain":{"Name":"banking","Value":1.35},"Subdomains":{"DomainResult":{"Domain":{"Name":"endorsement","Value":1.35},"Subdomains":null}}}]},{"Domain":{"Name":"Science","Value":2.69},"Subdomains":{"DomainResult":{"Domain":{"Name":"mathematics","Value":2.69},"Subdomains":{"DomainResult":{"Domain":{"Name":"statistic","Value":2.69},"Subdomains":null}}}}}],"TopTopics":[{"Topic":{"Name":"Web","Value":7.07},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"Web","Value":7.07}},"TopicDescription":{"Result":{"Name":"an often-transparent graphic image","Value":1.00}},"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Positive","Value":0.71},"Max":{"Name":"Positive","Value":0.94}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":{"TopicActionTypeResult":{"ActionType":{"Name":"use","Value":5.26},"TopicRoles":{"TopicRoleResult":{"TopicRole":{"Name":"Object","Value":5.26},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}}}}}},{"Topic":{"Name":"beacon","Value":6.06},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"beacon","Value":6.06}},"TopicDescription":{"Result":{"Name":"an often-transparent graphic image","Value":1.00}},"Polarity":{"Min":{"Name":"Positive","Value":0.94},"Mean":{"Name":"Positive","Value":0.94},"Max":{"Name":"Positive","Value":0.94}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":{"TopicActionTypeResult":{"ActionType":{"Name":"use","Value":5.26},"TopicRoles":{"TopicRoleResult":{"TopicRole":{"Name":"Object","Value":5.26},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}}}}}},{"Topic":{"Name":"quot","Value":4.71},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"quot","Value":4.71}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Negative","Value":-0.60},"Mean":{"Name":"Negative","Value":-0.34},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":null},{"Topic":{"Name":"cookie","Value":4.71},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"cookie","Value":4.71}},"TopicDescription":{"Result":{"Name":"small text files","Value":1.00}},"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Positive","Value":0.63},"Max":{"Name":"Positive","Value":0.94}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":{"TopicActionTypeResult":{"ActionType":{"Name":"use","Value":5.26},"TopicRoles":{"TopicRoleResult":{"TopicRole":{"Name":"Object","Value":5.26},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}}}}}},{"Topic":{"Name":"information","Value":4.38},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"information","Value":4.38}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Positive","Value":0.49},"Max":{"Name":"Positive","Value":0.80}},"OfferingGuidance":{"Name":"A Lot","Value":3.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":{"TopicActionTypeResult":{"ActionType":{"Name":"like","Value":7.89},"TopicRoles":{"TopicRoleResult":{"TopicRole":{"Name":"Object","Value":7.89},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"A Lot","Value":3.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}}}}}},{"Topic":{"Name":"Sedo","Value":3.03},"NamedEntityType":[{"Name":"Type","Value":"NamedEntity"},{"Name":"SubType","Value":"unknown"}],"TopicInstance":{"Result":{"Name":"Sedo","Value":3.03}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":{"TopicActionTypeResult":{"ActionType":{"Name":"defend","Value":5.26},"TopicRoles":{"TopicRoleResult":{"TopicRole":{"Name":"Subject","Value":5.26},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}}}}}},{"Topic":{"Name":"domain owner","Value":3.03},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"domain owner","Value":3.03}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":{"TopicActionTypeResult":{"ActionType":{"Name":"defend","Value":5.26},"TopicRoles":{"TopicRoleResult":{"TopicRole":{"Name":"Subject","Value":5.26},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}}}}}},{"Topic":{"Name":"domain jakartapost.com","Value":3.03},"NamedEntityType":null,"TopicInstance":[{"Name":"domain","Value":1.68},{"Name":"domain jakartapost.com","Value":1.35}],"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":{"TopicActionTypeResult":{"ActionType":{"Name":"buy","Value":7.89},"TopicRoles":{"TopicRoleResult":{"TopicRole":{"Name":"Object","Value":7.89},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}}}}}},{"Topic":{"Name":"website","Value":2.69},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"website","Value":2.69}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Positive","Value":0.47},"Max":{"Name":"Positive","Value":0.94}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":{"TopicActionTypeResult":{"ActionType":{"Name":"travel","Value":7.89},"TopicRoles":{"TopicRoleResult":{"TopicRole":{"Name":"Object","Value":7.89},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}}}}}},{"Topic":{"Name":"statistic","Value":2.69},"NamedEntityType":null,"TopicInstance":{"Result":{"Name":"statistic","Value":2.69}},"TopicDescription":{"Result":{"Name":"anonymous","Value":1.00}},"Polarity":{"Min":{"Name":"Positive","Value":0.94},"Mean":{"Name":"Positive","Value":0.94},"Max":{"Name":"Positive","Value":0.94}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":null}],"ProperNouns":[{"Topic":{"Name":"Sedo","Value":3.03},"NamedEntityType":[{"Name":"Type","Value":"NamedEntity"},{"Name":"SubType","Value":"unknown"}],"TopicInstance":{"Result":{"Name":"Sedo","Value":3.03}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":{"TopicActionTypeResult":{"ActionType":{"Name":"defend","Value":5.26},"TopicRoles":{"TopicRoleResult":{"TopicRole":{"Name":"Subject","Value":5.26},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00}}}}}},{"Topic":{"Name":"Reference","Value":2.02},"NamedEntityType":[{"Name":"Type","Value":"NamedEntity"},{"Name":"SubType","Value":"unknown"}],"TopicInstance":{"Result":{"Name":"Reference","Value":2.02}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"To Some Extent","Value":2.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":null},{"Topic":{"Name":"Search","Value":1.01},"NamedEntityType":[{"Name":"Type","Value":"Product"},{"Name":"SubType","Value":"entertainment"}],"TopicInstance":{"Result":{"Name":"Search","Value":1.01}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":null},{"Topic":{"Name":"Sedo&apos;s","Value":1.01},"NamedEntityType":[{"Name":"Type","Value":"NamedEntity"},{"Name":"SubType","Value":"unknown"}],"TopicInstance":{"Result":{"Name":"Sedo&apos;s","Value":1.01}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":null},{"Topic":{"Name":"Websearch","Value":1.01},"NamedEntityType":[{"Name":"Type","Value":"NamedEntity"},{"Name":"SubType","Value":"unknown"}],"TopicInstance":{"Result":{"Name":"Websearch","Value":1.01}},"TopicDescription":null,"Polarity":{"Min":{"Name":"Neutral","Value":0.00},"Mean":{"Name":"Neutral","Value":0.00},"Max":{"Name":"Neutral","Value":0.00}},"OfferingGuidance":{"Name":"Not At All","Value":1.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"TopicIntention":null}],"Locations":null},"Demographics":{"Age":{"Name":"Adult","Value":-0.01},"Gender":{"Name":"Neutral","Value":0.00},"Education":{"Name":"Secondary","Value":2.00},"Language":{"Name":"English","Value":22.41}},"Styles":{"Polarity":{"Min":{"Name":"Negative","Value":-0.60},"Mean":{"Name":"Positive","Value":0.13},"Max":{"Name":"Positive","Value":0.94}},"OfferingGuidance":{"Name":"A Lot","Value":3.00},"RequestingGuidance":{"Name":"Not At All","Value":1.00},"Decisiveness":{"Name":"Low","Value":1.00},"TemporalityResult":{"Temporality":{"Name":"Present","Value":3.00}},"Slang":{"Name":"No Slang","Value":0.00},"Flamboyance":{"Name":"Somewhat Flamboyant","Value":3.00},"Contrast":{"Name":"Not At All","Value":1.60}},"Search":null,"RequestInfo":{"Version":{"VersionNumber":3.00,"BuildDate":"Dec 13 2012"},"paramList":{"SearchTerms":null,"MaxActionResult":10.00,"SourceURL":"http://www.jakartapost.com","AmpliverseID":null,"Scoring":null,"Cache":"disable","OptimiseRespTime":"enable","MaxTopicResult":10.00,"SortOrder":null,"Selector":null,"RequestID":"0e0b47e1-c542-475f-a909-35d70343f325","CallBackUrl":null,"PassThru":null,"X-Params":[{"Name":"ipaddress","Value":"36.73.69.197"},{"Name":"analysis","Value":"all"},{"Name":"formatRequest","Value":"json"},{"Name":"polarityProcess","Value":"chunked"},{"Name":"actionverseID","Value":0.00},{"Name":"polarverseID","Value":0.00},{"Name":"aliasverseID","Value":0.00},{"Name":"spiderRequest","Value":"Y"},{"Name":"textSizeUnstripped","Value":21856.00},{"Name":"textSizeStripped","Value":2041.00},{"Name":"elapsedTime","Value":15907.00},{"Name":"serverIP","Value":null}]},"textInput":"Buy this domain The domain jakartapost.com may be for sale by its owner! jakartapost.com Search Related Searches Websearch Results This page provided to the domain owner free by Sedo&apos;s� Dom"}}}}';
		data = data.replace( "ns2:AmplifyResponse" , "AmplifyResponse" );
		data = data.replace(/\n/g, "<br>");
		data = data.replace(/\\/g, "\\\\");

		var responseObj = JSON && JSON.parse(data) || $.parseJSON(data);
		// console.log(responseObj);

		var resultObj = responseObj.AmplifyResponse.AmplifyReturn;

		generateDemographicTable( resultObj.Demographics );
		generateTopicIntentionsChart( resultObj.TopicIntentions );
		generateActionsChart( resultObj.Actions );
		generateStyleTable( resultObj.Styles );
		generateActionStyleTable( resultObj.Actions.TopActions );
		generateTableTopTopics( resultObj.Topics.TopTopics );

		$("#content").show();
	}

      $("#amplify_button").click(function(){

      		// get input
      		var SourceURL = $("#amplify_input").val();

      		if( SourceURL.indexOf("http") == -1 )
      		{
      			SourceURL = "http://" + SourceURL;
      		}

      		//  OpenAmplify Constant
      		var APIKey 			= "7q6yn7fst5vde85kdfgwquqwtt9djrk4";
      		var APIURL 			= "http://portaltnx20.openamplify.com/AmplifyWeb_v30/AmplifyThis";
      		var AnalysisType 	= "all";
      		var OutputFormat	= "json";
      		var OpenAmplifyURL 	= APIURL 
					      		+ "?" + "analysis=" + AnalysisType 
					      		+ "&" + "apiKey=" + APIKey 
					      		+ "&" + "sourceurl=" + SourceURL
					      		+ "&" + "outputFormat=" + OutputFormat;

			// testGenerate();
			loadingAlert( SourceURL );
			var postData = 	{
								apiKey : APIKey,
								analysis : AnalysisType,
								sourceURL : SourceURL, 
								outputFormat : OutputFormat
							}

			// console.log(postData);

			var jqxhr = $.post("api.php", postData, function( response , status ) {

				contentAlert( "<h4>Analyzed !</h4>", "success" );

			 	// console.log("status : " + status);
				response = response.replace(/\n/g, "<br>");
				response = response.replace(/\\/g, "\\\\");

				var temps = response.split( "AmplifyReturn" );

				if( temps[1] === undefined )
				{
				  	// console.log(response);
					contentAlert( "<h4>Request Failed !</h4>Source is not suitable for sentiment analysis" , "error" );
				}
				else
				{
					$("#source").html( SourceURL );

					response = '{"AmplifyReturn' + temps[1];
					response = response.substr( 0, response.length-1 );

				  	// console.log(response);

				  	var responseObj = JSON && JSON.parse(response) || $.parseJSON(response);
				  	// console.log(responseObj);

					var resultObj = responseObj.AmplifyReturn;

				  	// show results !
					generateDemographicTable( resultObj.Demographics );
					generateTopicIntentionsChart( resultObj.TopicIntentions );
					generateActionsChart( resultObj.Actions );
					generateStyleTable( resultObj.Styles );
					generateActionStyleTable( resultObj.Actions.TopActions );
					generateTableTopTopics( resultObj.Topics.TopTopics );
					$("#content").show();
				}

			})
			jqxhr.fail(function( response ) { contentAlert( "<h4>Request Failed !</h4>Amplify failed please try again with another source or re-check your source", "error" ); console.log(response); })

      });

});