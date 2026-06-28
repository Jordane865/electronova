<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$usersFile = __DIR__ . '/users.json';

$users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

$body     = json_decode(file_get_contents('php://input'), true);
$email    = strtolower(trim($body['email'] ?? ''));
$password = $body['password'] ?? '';

if (!$email || !$password) {
  echo json_encode(['ok' => false, 'message' => 'Email et mot de passe requis.']);
  exit;
}

// Cherche l'utilisateur
$found = null;
foreach ($users as $u) {
  if ($u['email'] === $email && password_verify($password, $u['password'])) {
    $found = $u;
    break;
  }
}

if (!$found) {
  echo json_encode(['ok' => false, 'message' => 'Email ou mot de passe incorrect.']);
  exit;
}

// Renvoie les infos sans le mot de passe
unset($found['password']);
echo json_encode(['ok' => true, 'user' => $found]);