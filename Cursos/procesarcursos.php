<?php
include '../database.php';

$codicurso = trim($_POST['codicurso'] ?? '');
$nombre = trim($_POST['nombre'] ?? '');
$creditos = trim($_POST['creditos'] ?? '');
$requisito = trim($_POST['requisito'] ?? '');
$cuatrimestre = trim($_POST['cuatrimestre'] ?? '');
$action = $_POST['action'] ?? '';

$errores = [];
if ($nombre === '')  $errores[] = 'El nombre es obligatorio.';
if ($requisito === '')  $errores[] = 'Los requisito son obligatorios.';
if ($codicurso === '')  $errores[] = 'El código del curso es obligatorio.';
if ($creditos === '')  $errores[] = 'Los créditos son obligatorios.';
if ($cuatrimestre === '')  $errores[] = 'El cuatrimestre es obligatorio.';
if (!is_numeric($creditos)) $errores[] = 'Los créditos deben ser un número.';

if (count($errores) > 0) {
  foreach ($errores as $err) {
    echo "<p style='color:red;'>$err</p>";
  }
  echo "<p><a href='cursos-index.php'>Volver</a></p>";
  exit;
}

$sql  = "INSERT INTO cursos (codicurso, nombre, creditos, requisito, cuatrimestre) VALUES (:codicurso, :nombre, :creditos, :requisito, :cuatrimestre)";
$stmt = $pdo->prepare($sql);
$stmt->execute([':codicurso' => $codicurso, ':nombre' => $nombre, ':creditos' => $creditos, ':requisito' => $requisito, ':cuatrimestre' => $cuatrimestre]);

header('Location: cursos-index.php');
exit;
?>