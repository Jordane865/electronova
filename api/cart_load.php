<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$userId = preg_replace('/[^a-zA-Z0-9_\-]/', '', $_GET['userId'] ?? '');

if (!$userId) {
  echo json_encode([]);
  exit;
}

$file = __DIR__ . '/carts/' . $userId . '.json';
echo file_exists($file) ? file_get_contents($file) : '[]';