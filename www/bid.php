<?php

require __DIR__ . '/../vendor/autoload.php';
include 'functions.php';

$sheet = @$_GET['sheet'];
$spreadsheetId = @$_GET['doc'];

if (!$sheet || !$spreadsheetId) {
  die('Missing sheet or doc');
}

placeBid($spreadsheetId, $sheet);
print json_encode([]);
