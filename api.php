<?php 

  $openAmplifyURL = 'http://portaltnx20.openamplify.com/AmplifyWeb_v30/AmplifyThis'; 

  $apiKey       = $_POST['apiKey']; //'7q6yn7fst5vde85kdfgwquqwtt9djrk4'; 
  $analysis     = $_POST['analysis']; //'all';
  $sourceURL    = $_POST['sourceURL']; //http://www.jakartapost.com';
  $outputFormat = $_POST['outputFormat']; //json';

  $postBody = 'apiKey='         . urlencode($apiKey) . 
              '&analysis='      . urlencode($analysis) .
              '&sourceurl='     . urlencode($sourceURL).
              '&outputFormat='  . urlencode($outputFormat);

  //'&inputText=' . urlencode($inputText);
  $curlHandle = curl_init();

  curl_setopt($curlHandle, CURLOPT_URL, $openAmplifyURL);
  curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curlHandle, CURLOPT_POST, 1);
  curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $postBody);

  $result = curl_exec ($curlHandle);
  curl_close ($curlHandle);

  echo $result; 

  // echo $postBody;
?>