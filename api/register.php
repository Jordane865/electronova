<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$usersFile = __DIR__ . '/users.json';

// Lit les utilisateurs existants
$users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

$body = json_decode(file_get_contents('php://input'), true);
$prenom     = trim($body['prenom'] ?? '');
$nom        = trim($body['nom'] ?? '');
$email      = strtolower(trim($body['email'] ?? ''));
$password   = $body['password'] ?? '';
$newsletter = (bool)($body['newsletter'] ?? false);

// Validations
if (!$prenom || !$nom || !$email || !$password) {
  echo json_encode(['ok' => false, 'message' => 'Tous les champs sont obligatoires.']);
  exit;
}

if (strlen($password) < 8) {
  echo json_encode(['ok' => false, 'message' => 'Le mot de passe doit contenir au moins 8 caractères.']);
  exit;
}

// Vérifie si l'email existe déjà
foreach ($users as $u) {
  if ($u['email'] === $email) {
    echo json_encode(['ok' => false, 'message' => 'Un compte avec cet email existe déjà.']);
    exit;
  }
}

// Crée le nouveau compte
$newUser = [
  'id'         => uniqid('u_', true),
  'prenom'     => $prenom,
  'nom'        => $nom,
  'email'      => $email,
  'password'   => password_hash($password, PASSWORD_BCRYPT), // ✅ mot de passe chiffré
  'newsletter' => $newsletter,
  'createdAt'  => date('c')
];

$users[] = $newUser;
file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));

// Renvoie les infos sans le mot de passe
unset($newUser['password']);
echo json_encode(['ok' => true, 'user' => $newUser]);