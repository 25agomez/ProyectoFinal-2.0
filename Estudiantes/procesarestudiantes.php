<?php
include '../database.php';

$codigoestudiante = trim($_POST['codigoestudiante'] ?? '');
$nombre = trim($_POST['nombre'] ?? '');
$apellido1 = trim($_POST['apellido1'] ?? '');
$apellido2 = trim($_POST['apellido2'] ?? '');
$email = trim($_POST['email'] ?? '');
$telefono = trim($_POST['telefono'] ?? '');
$carrera = trim($_POST['carrera'] ?? '');
$action = $_POST['action'] ?? '';

$errores = [];
if ($nombre === '')  $errores[] = 'El nombre es obligatorio.';
if ($apellido1 === '')  $errores[] = 'El primer apellido es obligatorio.';
if ($apellido2 === '')  $errores[] = 'El segundo apellido es obligatorio.';
if ($codigoestudiante === '')  $errores[] = 'El código del estudiante es obligatorio.';
if ($email === '')  $errores[] = 'El email es obligatorio.';
if ($telefono === '')  $errores[] = 'El teléfono es obligatorio.';
if ($carrera === '')  $errores[] = 'La carrera es obligatoria.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errores[] = 'Email inválido.';
if (!is_numeric($telefono)) $errores[] = 'El teléfono debe ser un número.';

if (count($errores) > 0) {
  foreach ($errores as $err) {
    echo "<p style='color:red;'>$err</p>";
  }
  echo "<p><a href='estudiantes-index.php'>Volver</a></p>";
  exit;
}

$sql  = "INSERT INTO estudiantes (codigoestudiante, nombre, apellido1, apellido2, email, telefono, carrera) VALUES (:codigoestudiante, :nombre, :apellido1, :apellido2, :email, :telefono, :carrera)";
$stmt = $pdo->prepare($sql);
$stmt->execute([':codigoestudiante' => $codigoestudiante, ':nombre' => $nombre, ':apellido1' => $apellido1, ':apellido2' => $apellido2, ':email' => $email, ':telefono' => $telefono, ':carrera' => $carrera]);

header('Location: estudiantes-index.php');
exit;
?>