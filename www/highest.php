<?php

require __DIR__ . '/vendor/autoload.php';
include 'client.php';

$sheet = $_GET['sku'];
$spreadsheetId = $_GET['id'];

if (!$sheet || !$spreadsheetId) {
  die('Missing id or sku');
}

$client = getClient();
$service = new Google_Service_Sheets($client);

$range = $sheet;
$response = $service->spreadsheets_values->get($spreadsheetId, $range);
$values = $response->getValues();

$highest = null;

if (empty($values)) {
    print "No data found.\n";
} else {
    foreach ($values as $row) {
      @list($first, $last, $email, $bid) = $row;
      if ($bid > $highest) {
        $highest = $bid;
      }
    }
}

print json_encode(['highestBid' => $highest]);
