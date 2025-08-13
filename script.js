document.getElementById("login-button").addEventListener("click", function(event) {
    event.preventDefault(); // Evita el envío del formulario

    const usuario = document.getElementById("Usuario").value.trim();

    if (usuario === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Por favor, ingresa un nombre de usuario.",
            heightAuto: false,
        });
    }  else if (usuario === "admin") {
        // Redirige a otra página
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: `Bienvenido, ${usuario}`,
            heightAuto: false,
        }).then((result) => {
            // Redirige a la página principal después de mostrar el mensaje
            if (result.isConfirmed) {
                window.location.href = "Principal/principal-index.html";
            }
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: "Usuario incorrecto.",
            heightAuto: false,
        });
    }
});