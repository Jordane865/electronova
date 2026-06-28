<?php
// ╔══════════════════════════════════════════════════════╗
// ║         ElectroNova — google_callback.php            ║
// ║     Reçoit le code OAuth Google et crée/connecte    ║
// ╚══════════════════════════════════════════════════════╝

$clientId     = '302027868157-p2d2elj3m28a9hd51521a4369r38n7oj.apps.googleusercontent.com';
$clientSecret = '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'; // ← à remplir
$redirectUri  = 'http://localhost/commerce/api/google_callback.php';
$usersFile    = __DIR__ . '/users.json';

// Erreur renvoyée par Google
if (isset($_GET['error'])) {
  header('Location: ../login.html?error=google_denied');
  exit;
}

// Code OAuth manquant
if (!isset($_GET['code'])) {
  header('Location: ../login.html?error=no_code');
  exit;
}

// ── Échange le code contre un access token ─────────────
$tokenResponse = file_get_contents('https://oauth2.googleapis.com/token', false, stream_context_create([
  'http' => [
    'method'  => 'POST',
    'header'  => 'Content-Type: application/x-www-form-urlencoded',
    'content' => http_build_query([
      'code'          => $_GET['code'],
      'client_id'     => $clientId,
      'client_secret' => $clientSecret,
      'redirect_uri'  => $redirectUri,
      'grant_type'    => 'authorization_code',
    ]),
  ]
]));

if (!$tokenResponse) {
  header('Location: ../login.html?error=token_failed');
  exit;
}

$tokenData   = json_decode($tokenResponse, true);
$accessToken = $tokenData['access_token'] ?? null;

if (!$accessToken) {
  header('Location: ../login.html?error=no_token');
  exit;
}

// ── Récupère les infos du compte Google ────────────────
$userInfoResponse = file_get_contents('https://www.googleapis.com/oauth2/v2/userinfo', false, stream_context_create([
  'http' => [
    'header' => "Authorization: Bearer $accessToken",
  ]
]));

if (!$userInfoResponse) {
  header('Location: ../login.html?error=userinfo_failed');
  exit;
}

$googleUser = json_decode($userInfoResponse, true);
$email      = strtolower(trim($googleUser['email']   ?? ''));
$prenom     = trim($googleUser['given_name']  ?? '');
$nom        = trim($googleUser['family_name'] ?? '');
$googleId   = trim($googleUser['id']          ?? '');
$picture    = trim($googleUser['picture']     ?? '');

if (!$email || !$googleId) {
  header('Location: ../login.html?error=invalid_google_data');
  exit;
}

// ── Crée ou connecte le compte ─────────────────────────
$users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

$existingIndex = -1;
foreach ($users as $i => $u) {
  if ($u['email'] === $email || ($u['googleId'] ?? '') === $googleId) {
    $existingIndex = $i;
    break;
  }
}

if ($existingIndex >= 0) {
  // Compte existant → mise à jour infos Google
  $users[$existingIndex]['googleId'] = $googleId;
  $users[$existingIndex]['picture']  = $picture;
  $users[$existingIndex]['isGoogle'] = true;
  file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
  $user = $users[$existingIndex];
} else {
  // Nouveau compte Google
  $user = [
    'id'        => uniqid('g_', true),
    'prenom'    => $prenom ?: 'Utilisateur',
    'nom'       => $nom    ?: '',
    'email'     => $email,
    'password'  => null,
    'googleId'  => $googleId,
    'picture'   => $picture,
    'isGoogle'  => true,
    'newsletter'=> false,
    'createdAt' => date('c'),
  ];
  $users[] = $user;
  file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
}

// Retire le mot de passe avant d'envoyer au client
unset($user['password']);

// ── Passe la session via JavaScript ───────────────────
$userJson = json_encode($user);
?>
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Connexion...</title></head>
<body>
<script>
  // Sauvegarde la session dans localStorage (persistant)
  localStorage.setItem('electroNova_session', <?= json_encode($userJson) ?>);

  // Redirige vers l'accueil
  window.location.href = '../index.html';
</script>
<p>Connexion en cours, veuillez patienter...</p>
</body>
</html>
