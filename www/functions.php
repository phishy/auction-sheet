<?php

require __DIR__ . '/../vendor/autoload.php';
include 'client.php';

function getHighestBid($spreadsheetId, $sheet)
{
    $range = $sheet;
    $client = getClient();
    $service = new Google_Service_Sheets($client);
    $response = $service->spreadsheets_values->get($spreadsheetId, $range);
    $values = (array) $response->getValues();

    $highest = null;

    foreach ($values as $row) {
        @list($first, $last, $email, $bid) = $row;
        if ($bid > $highest) {
            $highest = $bid;
        }
    }
    return $highest;
}

function placeBid($spreadsheetId, $sheet)
{
    $range = $sheet;
    $json = json_decode(file_get_contents('php://input'), true);
    $data = [
        @$json['first_name'],
        @$json['last_name'],
        @$json['email'],
        @$json['bid'],
    ];

    $client = getClient();
    $service = new Google_Service_Sheets($client);

    $range = $sheet;
    $requestBody = new Google_Service_Sheets_ValueRange(['values' => [$data]]);
    $params = [
        'valueInputOption' => 'USER_ENTERED',
    ];
    return $service->spreadsheets_values->append($spreadsheetId, $range, $requestBody, $params);
}
