# remove this file's .txt extension and remove this line of code and you're good to go.
#!/usr/bin/perl -w

use strict;			# come on... this is always a good idea.
use LWP::UserAgent;		# gets us www access.
use URI;			# base uri package.
use URI::QueryParam;		# for handling parameters in url requests.
use XML::XPath;			# XML handling.


# define a URL (including variables).
my $url = new URI("http://portaltnx20.openamplify.com/AmplifyWeb_v30/AmplifyThis");
my %aryParams = (
	# If you don't have an API key, you can register here: http://www.openamplify.com/member/register
    'apiKey' => '7q6yn7fst5vde85kdfgwquqwtt9djrk4',			# Insert your API key here.
    'analysis' => 'all',			# all (default), actions, topics, demographics, styles.
	'outputFormat' => 'xml',		# xml (default), json, dart.
	# select either this option or the following... not both.
	#'inputText' => 'I want to buy some sushi.'  
	'sourceURL' => 'http://www.thejakartapost.com'
);
foreach (keys %aryParams) {
	$url->query_param($_, $aryParams{$_});
}
 
# create UserAgent object.
my $ua = new LWP::UserAgent;
$ua->timeout(60);
 
# do it.
my $request = HTTP::Request->new('POST');
$request->url($url);
 
my $response = $ua->request($request);
 
# response code (like 200, 404, etc): you might want to check this.
my $code = $response->code;

# headers (Server: Apache, Content-Type: text/html, ...): you probably won't need this.
my $headers = $response->headers_as_string;
 
# HTML body: here's what you're looking for.
my $body =  $response->content;

# print the website content.
# print $body . "\n\n";

# let's take apart the XML.
my $xp = XML::XPath->new($body);

print "Topics:\n";
foreach my $topics ($xp->find('//Topic')->get_nodelist){
    print "\t" . $topics->find('Name')->string_value . "\n";
}

print "Actions:\n";
foreach my $actions ($xp->find('//Action')->get_nodelist){
    print "\t" . $actions->find('Name')->string_value . "\n";
}

print "Demographics:\n";
foreach my $demographics ($xp->find('//Demographics')->get_nodelist){
    print "\tAge: " . $demographics->find('Age//Name')->string_value . "\n";
    print "\tGender: " . $demographics->find('Gender//Name')->string_value . "\n";
    print "\tEducation: " . $demographics->find('Education//Name')->string_value . "\n";
}

print "Style:\n";
foreach my $styles ($xp->find('//Styles')->get_nodelist){
    print "\tSlang: " . $styles->find('Slang//Name')->string_value . "\n";
    print "\tFlamboyance: " . $styles->find('Flamboyance//Name')->string_value . "\n";
}