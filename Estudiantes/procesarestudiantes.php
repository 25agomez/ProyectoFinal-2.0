<?php
include '../database.php';

$CODIGOESTUDIANTE = trim($_POST['CODIGOESTUDIANTE'] ?? '');
$NOMBRE = trim($_POST['NOMBRE'] ?? '');
$APELLIDO1 = trim($_POST['APELLIDO1'] ?? '');
$APELLIDO2 = trim($_POST['APELLIDO2'] ?? '');
$EMAIL = trim($_POST['EMAIL'] ?? '');
$TELEFONO = trim($_POST['TELEFONO'] ?? '');
$CARRERA = trim($_POST['CARRERA'] ?? '');
$action = $_POST['action'] ?? '';

$errores = [];
if ($NOMBRE === '')  $errores[] = 'El nombre es obligatorio.';
if ($APELLIDO1 === '')  $errores[] = 'El primer apellido es obligatorio.';
if ($APELLIDO2 === '')  $errores[] = 'El segundo apellido es obligatorio.';
if ($CODIGOESTUDIANTE === '')  $errores[] = 'El código del estudiante es obligatorio.';
if ($EMAIL === '')  $errores[] = 'El email es obligatorio.';
if ($TELEFONO === '')  $errores[] = 'El teléfono es obligatorio.';
if ($CARRERA === '')  $errores[] = 'La carrera es obligatoria.';
if (!filter_var($EMAIL, FILTER_VALIDATE_EMAIL)) $errores[] = 'Email inválido.';
if (!is_numeric($TELEFONO)) $errores[] = 'El teléfono debe ser un número.';

if (count($errores) > 0) {
  foreach ($errores as $err) {
    echo "<p style='color:red;'>$err</p>";
  }
  echo "<p><a href='estudiantes-index.php'>Volver</a></p>";
  exit;
}

$sql  = "INSERT INTO estudiantes (CODIGOESTUDIANTE, NOMBRE, APELLIDO1, APELLIDO2, EMAIL, TELEFONO, CARRERA) VALUES (:CODIGOESTUDIANTE, :NOMBRE, :APELLIDO1, :APELLIDO2, :EMAIL, :TELEFONO, :CARRERA)";
$stmt = $pdo->prepare($sql);
$stmt->execute([':CODIGOESTUDIANTE' => $CODIGOESTUDIANTE, ':NOMBRE' => $NOMBRE, ':APELLIDO1' => $APELLIDO1, ':APELLIDO2' => $APELLIDO2, ':EMAIL' => $EMAIL, ':TELEFONO' => $TELEFONO, ':CARRERA' => $CARRERA]);

header('Location: estudiantes-index.php');
exit;
?>