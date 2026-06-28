<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$body   = json_decode(file_get_contents('php://input'), true);
$userId = preg_replace('/[^a-zA-Z0-9_\-]/', '', $body['userId'] ?? '');
$items  = $body['items'] ?? [];

if (!$userId) {
  echo json_encode(['ok' => false, 'message' => 'Utilisateur non identifié.']);
  exit;
}

$dir  = __DIR__ . '/carts';
if (!is_dir($dir)) mkdir($dir, 0755, true);

$file = $dir . '/' . $userId . '.json';
file_put_contents($file, json_encode($items, JSON_PRETTY_PRINT));

echo json_encode(['ok' => true]);