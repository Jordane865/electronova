<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$usersFile = __DIR__ . '/users.json';
$users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

$body     = json_decode(file_get_contents('php://input'), true);
$email    = strtolower(trim($body['email']    ?? ''));
$prenom   = trim($body['prenom']   ?? '');
$nom      = trim($body['nom']      ?? '');
$googleId = trim($body['googleId'] ?? '');
$picture  = trim($body['picture']  ?? '');

if (!$email || !$googleId) {
  echo json_encode(['ok' => false, 'message' => 'Données Google invalides.']);
  exit;
}

// Cherche si un compte existe déjà avec cet email ou ce googleId
$existingIndex = -1;
foreach ($users as $i => $u) {
  if ($u['email'] === $email || ($u['googleId'] ?? '') === $googleId) {
    $existingIndex = $i;
    break;
  }
}

if ($existingIndex >= 0) {
  // Compte existant → met à jour les infos Google et connecte
  $users[$existingIndex]['googleId'] = $googleId;
  $users[$existingIndex]['picture']  = $picture;
  $users[$existingIndex]['isGoogle'] = true;
  file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));

  $user = $users[$existingIndex];
  unset($user['password']);
  echo json_encode(['ok' => true, 'user' => $user, 'isNew' => false]);

} else {
  // Nouveau compte → crée automatiquement
  $newUser = [
    'id'        => uniqid('g_', true),
    'prenom'    => $prenom,
    'nom'       => $nom,
    'email'     => $email,
    'password'  => null,       // pas de mot de passe pour les comptes Google
    'googleId'  => $googleId,
    'picture'   => $picture,
    'isGoogle'  => true,
    'newsletter'=> false,
    'createdAt' => date('c'),
  ];

  $users[] = $newUser;
  file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));

  unset($newUser['password']);
  echo json_encode(['ok' => true, 'user' => $newUser, 'isNew' => true]);
}
