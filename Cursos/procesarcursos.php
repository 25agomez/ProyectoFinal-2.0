<?php
include '../database.php';

$CODIGOCURSO = trim($_POST['CODIGOCURSO'] ?? '');
$NOMBRE = trim($_POST['NOMBRE'] ?? '');
$CREDITOS = trim($_POST['CREDITOS'] ?? '');
$REQUISITO = trim($_POST['REQUISITO'] ?? '');
$CUATRIMESTRE = trim($_POST['CUATRIMESTRE'] ?? '');
$action = $_POST['action'] ?? '';

$errores = [];
if ($NOMBRE === '')  $errores[] = 'El nombre es obligatorio.';
if ($REQUISITO === '')  $errores[] = 'Los requisito son obligatorios.';
if ($CODIGOCURSO === '')  $errores[] = 'El código del curso es obligatorio.';
if ($CREDITOS === '')  $errores[] = 'Los créditos son obligatorios.';
if ($CUATRIMESTRE === '')  $errores[] = 'El cuatrimestre es obligatorio.';
if (!is_numeric($CREDITOS)) $errores[] = 'Los créditos deben ser un número.';

if (count($errores) > 0) {
  foreach ($errores as $err) {
    echo "<p style='color:red;'>$err</p>";
  }
  echo "<p><a href='cursos-index.php'>Volver</a></p>";
  exit;
}

$sql  = "INSERT INTO cursos (CODIGOCURSO, NOMBRE, CREDITOS, REQUISITO, CUATRIMESTRE) VALUES (:CODIGOCURSO, :NOMBRE, :CREDITOS, :REQUISITO, :CUATRIMESTRE)";
$stmt = $pdo->prepare($sql);
$stmt->execute([':CODIGOCURSO' => $CODIGOCURSO, ':NOMBRE' => $NOMBRE, ':CREDITOS' => $CREDITOS, ':REQUISITO' => $REQUISITO, ':CUATRIMESTRE' => $CUATRIMESTRE]);

header('Location: cursos-index.php');
exit;
?>