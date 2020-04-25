<?php

require __DIR__ . '/vendor/autoload.php';
include 'client.php';

$sheet = $_GET['sku'];
$spreadsheetId = $_GET['id'];

if (!$sheet || !$spreadsheetId) {
  die('Missing id or sku');
}

$json = file_get_contents('php://input');
$data = array_values(json_decode($json, true));

$client = getClient();
$service = new Google_Service_Sheets($client);

$range = $sheet;
$requestBody = new Google_Service_Sheets_ValueRange(['values' => [$data]]);
$params = [
    'valueInputOption' => 'USER_ENTERED'
];
$response = $service->spreadsheets_values->append($spreadsheetId, $range, $requestBody, $params);

print json_encode([]);
