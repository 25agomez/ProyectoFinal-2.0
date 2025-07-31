<?php
include '../database.php';

$CODIGOPROFESOR = trim($_POST['CODIGOPROFESOR'] ?? '');
$NOMBRE = trim($_POST['NOMBRE'] ?? '');
$APELLIDO1 = trim($_POST['APELLIDO1'] ?? '');
$APELLIDO2 = trim($_POST['APELLIDO2'] ?? '');
$EMAIL = trim($_POST['EMAIL'] ?? '');
$TELEFONO = trim($_POST['TELEFONO'] ?? '');
$CURSOIMPARTE = trim($_POST['CURSOIMPARTE'] ?? '');
$action = $_POST['action'] ?? '';

$errores = [];
if ($NOMBRE === '')  $errores[] = 'El nombre es obligatorio.';
if ($APELLIDO1 === '')  $errores[] = 'El primer apellido es obligatorio.';
if ($APELLIDO2 === '')  $errores[] = 'El segundo apellido es obligatorio.';
if ($CODIGOPROFESOR === '')  $errores[] = 'El código del profesor es obligatorio.';
if ($EMAIL === '')  $errores[] = 'El email es obligatorio.';
if ($TELEFONO === '')  $errores[] = 'El teléfono es obligatorio.';
if ($CURSOIMPARTE === '')  $errores[] = 'El curso que imparte es obligatorio.';
if (!filter_var($EMAIL, FILTER_VALIDATE_EMAIL)) $errores[] = 'Email inválido.';
if (!is_numeric($TELEFONO)) $errores[] = 'El teléfono debe ser un número.';


if (count($errores) > 0) {
  foreach ($errores as $err) {
    echo "<p style='color:red;'>$err</p>";
  }
  echo "<p><a href='profesores-index.php'>Volver</a></p>";
  exit;
}

$sql  = "INSERT INTO profesores (CODIGOPROFESOR, NOMBRE, APELLIDO1, APELLIDO2, EMAIL, TELEFONO, CURSOIMPARTE) VALUES (:CODIGOPROFESOR, :NOMBRE, :APELLIDO1, :APELLIDO2, :EMAIL, :TELEFONO, :CURSOIMPARTE)";
$stmt = $pdo->prepare($sql);
$stmt->execute([':CODIGOPROFESOR' => $CODIGOPROFESOR, ':NOMBRE' => $NOMBRE, ':APELLIDO1' => $APELLIDO1, ':APELLIDO2' => $APELLIDO2, ':EMAIL' => $EMAIL, ':TELEFONO' => $TELEFONO, ':CURSOIMPARTE' => $CURSOIMPARTE]);

header('Location: profesores-index.php');
exit;
?>