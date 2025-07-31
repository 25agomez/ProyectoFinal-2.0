<?php include '../database.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Proyecto Final</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

</head>

<body>
    <section class="layout">
        <div class="header">
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="../Principal/principal-index.html">
                    <img src="../images/PLATAFORMA-VIRTUAL.png" width="100" height="35" alt="">
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link" id="Inicio" href="../Principal/principal-index.html"><i class="fa-solid fa-house"></i> Inicio</a>
                        <a class="nav-link" id="Cursos" href="../Cursos/cursos-index.php"><i class="fa-solid fa-book"></i>
                            Cursos</a>
                        <a class="nav-link" id="Estudiantes" href="../Estudiantes/estudiantes-index.php"><i
                                class="fa-solid fa-user-graduate"></i> Estudiantes</a>
                        <a class="nav-link" id="Profesores" href="../Profesores/profesores-index.php"><i
                                class="fa-solid fa-chalkboard-teacher"></i> Profesores</a>
                    </div>
                </div>
            </nav>
        </div>
        <div class="leftSide">
            <nav class="nav flex-column">
                <a class="nav-link" href="https://uc.ac.cr/"><i class="fa-solid fa-building"></i> Sobre UC</a>
                <a class="nav-link" href="https://uc.ac.cr/grados-academicos/"><i
                        class="fa-solid fa-graduation-cap"></i>
                    Carreras</a>
                <a class="nav-link" href="mailto:soporte@uc.ac.cr"><i class="fa-solid fa-headset"></i> Soporte
                    Técnico</a>
                <a class="nav-link" href="https://uc.ac.cr/contacto/"><i class="fa-solid fa-envelope"></i>
                    Contáctenos</a>
                <a class="nav-link" href="../login-index.html"><i class="fa-solid fa-door-open"></i> Cerrar Sesión</a>
            </nav>
        </div>
        <div class="body">
            <div class="container">
                <form action="procesarcursos.php" method="POST">
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label>Nombre</label>
                            <input type="text" class="form-control" id="estudianteNombre" name="NOMBRE" required>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Primer Apellido</label>
                            <input type="text" class="form-control" id="estudianteApellido1" name="APELLIDO1" required>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Segundo Apellido</label>
                            <input type="text" class="form-control" id="estudianteApellido2" name="APELLIDO2" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label>Código del Estudiante</label>
                            <input type="text" class="form-control" id="estudianteCodigo" name="CODIGOESTUDIANTE" required>
                        </div>
                        <div class="form-group col-md-3">
                            <label>Teléfono</label>
                            <input type="phone" class="form-control" id="estudianteTelefono" name="TELEFONO" required>
                        </div>
                        <div class="form-group col-md-3">
                            <label>Email</label>
                            <input type="email" class="form-control" id="estudianteEmail" name="EMAIL" required>
                        </div>
                        <div class="form-group col-md-3">
                            <label>Carrera</label>
                            <input type="text" class="form-control" id="estudianteCarrera" name="CARRERA" required>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" id="botonCrear">Crear Estudiante</button>
                </form>

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido1</th>
                            <th scope="col">Apellido2</th>
                            <th scope="col">Email</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Carrera</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            $stmt = $pdo->query("SELECT * FROM estudiantes ORDER BY ID ASC");
                            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                                echo "<tr>
                                            <td>{$row['ID']}</td>
                                            <td>".htmlspecialchars($row['CODIGOESTUDIANTE'])."</td>
                                            <td>".htmlspecialchars($row['NOMBRE'])."</td>
                                            <td>".htmlspecialchars($row['APELLIDO1'])."</td>
                                            <td>".htmlspecialchars($row['APELLIDO2'])."</td>
                                            <td>".htmlspecialchars($row['EMAIL'])."</td>
                                            <td>".htmlspecialchars($row['TELEFONO'])."</td>
                                            <td>".htmlspecialchars($row['CARRERA'])."</td>
                                        </tr>";
                            }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="footer">
            <p>
                © 2025 Plataforma Universidad Central. Todos los derechos reservados.
            </p>
        </div>
    </section>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct"
        crossorigin="anonymous"></script>
</body>

</html>