<?php
include '../database.php';

$codigoprofesor = trim($_POST['codigoprofesor'] ?? '');
$nombre = trim($_POST['nombre'] ?? '');
$apellido1 = trim($_POST['apellido1'] ?? '');
$apellido2 = trim($_POST['apellido2'] ?? '');
$email = trim($_POST['email'] ?? '');
$telefono = trim($_POST['telefono'] ?? '');
$cursoimparte = trim($_POST['cursoimparte'] ?? '');
$action = $_POST['action'] ?? '';

$errores = [];
if ($nombre === '')  $errores[] = 'El nombre es obligatorio.';
if ($apellido1 === '')  $errores[] = 'El primer apellido es obligatorio.';
if ($apellido2 === '')  $errores[] = 'El segundo apellido es obligatorio.';
if ($codigoprofesor === '')  $errores[] = 'El código del profesor es obligatorio.';
if ($email === '')  $errores[] = 'El email es obligatorio.';
if ($telefono === '')  $errores[] = 'El teléfono es obligatorio.';
if ($cursoimparte === '')  $errores[] = 'El curso que imparte es obligatorio.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errores[] = 'Email inválido.';
if (!is_numeric($telefono)) $errores[] = 'El teléfono debe ser un número.';


if (count($errores) > 0) {
  foreach ($errores as $err) {
    echo "<p style='color:red;'>$err</p>";
  }
  echo "<p><a href='profesores-index.php'>Volver</a></p>";
  exit;
}

$sql  = "INSERT INTO profesores (codigoprofesor, nombre, apellido1, apellido2, email, telefono, cursoimparte) VALUES (:codigoprofesor, :nombre, :apellido1, :apellido2, :email, :telefono, :cursoimparte)";
$stmt = $pdo->prepare($sql);
$stmt->execute([':codigoprofesor' => $codigoprofesor, ':nombre' => $nombre, ':apellido1' => $apellido1, ':apellido2' => $apellido2, ':email' => $email, ':telefono' => $telefono, ':cursoimparte' => $cursoimparte]);

header('Location: profesores-index.php');
exit;
?>