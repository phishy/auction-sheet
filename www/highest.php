<?php

require __DIR__ . '/../vendor/autoload.php';
include 'functions.php';

$sheet = $_GET['sheet'];
$spreadsheetId = $_GET['doc'];

if (!$sheet || !$spreadsheetId) {
    die('Missing sheet or doc');
}

$highest = getHighestBid($spreadsheetId, $sheet);
print json_encode(['highestBid' => $highest]);
