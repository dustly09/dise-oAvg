$(function () {
    inicializarEventos();
    manejarCookiesYUsuario();
    limpiarReservaAlSalirLogo();

    // Verifica en qué página está el usuario y ejecuta funciones específicas
    if (window.location.pathname.includes("mostrarCoches.html") || window.location.pathname.includes("cochesDisponibles.html")) {
        actualizarUbicacion();
    }

    if (window.location.pathname.includes("confirmaReserva.html")) {
        limpiarReservaAlSalir();
    }

    if (window.location.pathname.includes("detallesAlquiler.html")) {
        gestionarUbicacion();
    }

    if (window.location.pathname.includes("lugarDeRecogida.html")) {
        inicializarSeleccionSucursal();
    }

    if (window.location.pathname.includes("pago.html")) {
        manejarPago();
    }

    if (window.location.pathname.includes("perfilUsuario.html")) {
        manejarPerfilUsuario();
    }

    if (window.location.pathname.includes("vistaInicioSesion.html")) {
        manejarAccesoUsuario();
    }
    

    if (window.location.pathname.includes("vistaRegistro.html")) {
        manejarRegistroUsuario();
    }

    // Si el usuario viene desde la página de pago, marca que debe redirigir después de iniciar sesión
    if (document.referrer.includes("pago.html")) {
        localStorage.setItem("redirigirDespuesDeLogin", "true");
    }
});

function inicializarEventos() {
    // Limpia datos de la reserva al cerrar sesión
    $("#salir").on("click", function () {
        localStorage.removeItem("sucursalSeleccionada");
        localStorage.removeItem("sucursalDevolucion");
        localStorage.removeItem("seleccionandoDevolucion");
    });

    // Mostrar aviso de cookies y redirigir a la página principal
    $("#enseñarCookies").on("click", function (e) {
        e.preventDefault();
        localStorage.setItem("mostrarCookies", "true");
        window.location.href = "../index.html";
    });

    // Mostrar el modal de cookies
    $("#mostrarCookiesModal").on("click", function (e) {
        e.preventDefault();
        $("#cookieModal").fadeIn();
    });

    // Aceptar cookies y cerrar el modal
    $("#aceptarCookies").on("click", function () {
        localStorage.setItem("cookiesAceptadas", "true");
        $("#cookieModal").fadeOut();
    });

    // Rechazar cookies y cerrar el modal
    $("#rechazarCookies").on("click", function () {
        localStorage.setItem("cookiesAceptadas", "false");
        $("#cookieModal").fadeOut();
    });

    // Configurar el icono de usuario según el estado de sesión
    if (localStorage.getItem("usuarioLogueado") == "true") {
        if (window.location.pathname.includes("index.html") || window.location.pathname == "/") {
            $("#usuarioIcono").attr("href", "vistas/perfilUsuario.html");
        } else {
            $("#usuarioIcono").attr("href", "perfilUsuario.html");
        }
    } else {
        if (window.location.pathname.includes("index.html") || window.location.pathname == "/") {
            $("#usuarioIcono").attr("href", "vistas/vistaInicioSesion.html");
        } else {
            $("#usuarioIcono").attr("href", "vistaInicioSesion.html");
        }
    }

    // Manejo del menú hamburguesa
    $('#menuHamburguesa').on('click', function () {
        $('#menuNavegacion').toggleClass('mostrar');
        $('body').css('overflow', function (index, value) {
            return value == 'hidden' ? '' : 'hidden';
        });
    });

    // Inicializar el slider si está en la página principal
    if (window.location.pathname.includes("index.html") || window.location.pathname == "/") {
        $("#lightSlider").lightSlider({
            item: 1,
            speed: 1000,
            auto: true,
            loop: true,
            pause: 3000
        });
    }
}

function manejarCookiesYUsuario() {
    let cookiesAceptadas = localStorage.getItem("cookiesAceptadas");

    // Mostrar el modal de cookies si el usuario no ha decidido aún
    if (cookiesAceptadas == null) {
        $("#cookieModal").fadeIn();
    } else {
        $("#cookieModal").hide();
    }

    // Verificar si se debe mostrar el modal de cookies nuevamente
    if (localStorage.getItem("mostrarCookies") == "true") {
        $("#cookieModal").fadeIn();
        localStorage.removeItem("mostrarCookies");
    }
}


function actualizarUbicacion() {
    // Obtiene las ubicaciones seleccionadas desde localStorage
    let sucursal = localStorage.getItem("sucursalSeleccionada");
    let devolucion = localStorage.getItem("sucursalDevolucion");

    // Mapea nombres de sucursales con sus ubicaciones completas
    let sucursalTexto = {
        malaga: "Malaga Aeropuerto",
        barcelona: "Barcelona Aeropuerto T1",
        madrid: "Madrid Atocha Estacion"
    };

    let textoUbicacion = "Seleccionar ubicación";

    // Asigna la ubicación seleccionada si existe
    if (sucursal) {
        textoUbicacion = sucursalTexto[sucursal] || "Seleccionar ubicación";
    }

    // Si hay un lugar de devolución, lo agrega al texto de ubicación
    if (devolucion) {
        textoUbicacion += " - " + (sucursalTexto[devolucion] || "Otra ubicación");
    }

    // Actualiza el texto de la ubicación en la interfaz
    $(".volverDetalles span:first").text(textoUbicacion);
}

function limpiarReservaAlSalir() {
    // Borra datos de la reserva cuando se confirma una acción (ej. reserva)
    $(".botonConfirmarCuadrado").on("click", function () {
        localStorage.removeItem("sucursalSeleccionada");
        localStorage.removeItem("sucursalDevolucion");
        localStorage.removeItem("seleccionandoDevolucion");
    });

    // Borra datos de la reserva cuando se hace clic en el primer enlace del menú de navegación
    $("#menuNavegacion a:first").on("click", function () {
        localStorage.removeItem("sucursalSeleccionada");
        localStorage.removeItem("sucursalDevolucion");
        localStorage.removeItem("seleccionandoDevolucion");
    });

    localStorage.setItem("redirigirDespuesDeLogin", "false");
}



function limpiarReservaAlSalirLogo() {
    // Borra datos de la reserva cuando el usuario hace clic en el logo
    $(".logo").on("click", function () {
        localStorage.removeItem("sucursalSeleccionada");
        localStorage.removeItem("sucursalDevolucion");
        localStorage.removeItem("seleccionandoDevolucion");
    });

    // Borra datos de la reserva cuando se hace clic en el primer enlace del menú de navegación
    $("#menuNavegacion a:first").on("click", function () {
        localStorage.removeItem("sucursalSeleccionada");
        localStorage.removeItem("sucursalDevolucion");
        localStorage.removeItem("seleccionandoDevolucion");
    });

    localStorage.setItem("redirigirDespuesDeLogin", "false");
}

function gestionarUbicacion() {
    // Obtiene las ubicaciones desde localStorage
    let sucursal = localStorage.getItem("sucursalSeleccionada");
    let devolucion = localStorage.getItem("sucursalDevolucion");

    // Guarda en localStorage que se está seleccionando una ubicación de devolución
    $("#aLugar").on("click", function () {
        localStorage.setItem("seleccionandoDevolucion", "true");
    });

    let sucursalTexto = {
        malaga: "Malaga Aeropuerto",
        barcelona: "Barcelona Aeropuerto T1",
        madrid: "Madrid Atocha Estacion"
    };

    // Actualiza el enlace de la sucursal principal
    if (sucursal) {
        $("#ubicacion a").text(sucursalTexto[sucursal] || "Seleccionar sucursal");
    } else {
        $("#ubicacion a").text("Seleccionar sucursal");
    }

    // Si hay una sucursal de devolución, la agrega a la interfaz
    if (devolucion) {
        $("#aLugar").remove(); // Elimina el enlace de selección de devolución

        let devolucionNav = `
        <nav class="ubicacion" id="ubicacionDevolucion">
            <img alt="lupa" src='../img/Iconos/Ubicacion.svg' />
            <a href="lugarDeRecogida.html">${sucursalTexto[devolucion] || "Otra ubicación"}</a>
        </nav>`;

        $("#ubicacion").after(devolucionNav);
    }

    // Evento para redirigir a la selección de ubicación o devolución
    $(document).on("click", "#ubicacion a, #ubicacionDevolucion a", function (e) {
        e.preventDefault();

        // Determina si el clic es en una ubicación de devolución
        let esDevolucion = $(this).parent().attr("id") == "ubicacionDevolucion";
        localStorage.setItem("seleccionandoDevolucion", esDevolucion ? "true" : "false");

        window.location.href = "lugarDeRecogida.html";
    });
}


function inicializarSeleccionSucursal() {
    // Maneja la selección de sucursal o devolución según el estado guardado en localStorage
    $(".sucursal").on("click", function () {
        let sucursalId = $(this).attr("id");

        if (localStorage.getItem("seleccionandoDevolucion") == "true") {
            localStorage.setItem("sucursalDevolucion", sucursalId);
            localStorage.setItem("seleccionandoDevolucion", "false");
        } else {
            localStorage.setItem("sucursalSeleccionada", sucursalId);
        }
    });
}

function manejarPago() {
    $(".botonConfirmar").on("click", function (e) {
        e.preventDefault();

        let formulario = $("form")[0];

        // Limpia mensajes de error previos
        $(".error-message").text("");
        $(".pagoInput").removeClass("campoInvalido");

        let isValid = true;

        // Valida los campos requeridos del formulario
        $(formulario).find(":input[required]").each(function() {
            if (!this.checkValidity()) {
                isValid = false;
                $(this).addClass("campoInvalido");

                let errorMessage = this.validationMessage;

                if (this.validity.patternMismatch) {
                    errorMessage = this.title; // Mensaje personalizado para errores de patrón
                }

                $(this).next('.error-message').text(errorMessage);
            }
        });

        // Si el formulario es válido, verifica si el usuario está logueado
        if (isValid) {
            let logueado = localStorage.getItem("usuarioLogueado");

            if (logueado === "true") {
                // Usuario logueado, redirigir a la confirmación de reserva
                window.location.href = "confirmaReserva.html";
            } else {
                // Usuario no logueado, guardar intención de pago y redirigir al login
                localStorage.setItem("redirigirDespuesDeLogin", "true");
                window.location.href = "vistaInicioSesion.html";
            }
        }
    });
}


function manejarPerfilUsuario() {
    // Cierra la sesión del usuario y redirige a la página principal
    $("#cerrarSesion").on("click", function (e) {
        e.preventDefault();
        localStorage.setItem("usuarioLogueado", "false");
        window.location.href = "../index.html";
    });
}

function manejarAccesoUsuario() {
    $(".botonConfirmarCuadrado").on("click", function (e) {
        e.preventDefault();

        let formulario = $("#loginForm")[0];

        // Limpia mensajes de error previos
        $(".error-message").text("");
        $(".pagoInput").removeClass("campoInvalido");

        let isValid = true;

        // Valida los campos del formulario de inicio de sesión
        $(formulario).find(":input[required]").each(function () {
            if (!this.checkValidity()) {
                isValid = false;
                $(this).addClass("campoInvalido");

                let errorMessage = this.validationMessage;

                if (this.validity.patternMismatch) {
                    errorMessage = "Utiliza un formato que coincida con el solicitado: " + this.title;
                }

                $(this).next('.error-message').text(errorMessage);
            }
        });

        if (isValid) {
            localStorage.setItem("usuarioLogueado", "true");

            // Si el usuario fue redirigido desde la página de pago, lo regresa a la confirmación de reserva
            let redirigirPago = localStorage.getItem("redirigirDespuesDeLogin");

            if (redirigirPago == "true") {
                localStorage.removeItem("redirigirDespuesDeLogin");
                window.location.href = "confirmaReserva.html";
            } else {
                window.location.href = "../index.html";
            }
        }
    });
}


function manejarRegistroUsuario() {
    $(".botonConfirmarCuadrado").on("click", function (e) {
        e.preventDefault(); // Previene el envío del formulario por defecto

        let formulario = $("form")[0];

        // Limpia mensajes de error previos y clases de validación
        $(".error-message").text("");
        $(".inputRegistro").removeClass("campoInvalido");

        let isValid = true;

        // Valida todos los campos requeridos en el formulario
        $(formulario).find(":input[required]").each(function() {
            if (!this.checkValidity()) {
                isValid = false;
                $(this).addClass("campoInvalido"); // Marca el campo como inválido visualmente

                let errorMessage = this.validationMessage;

                // Mensaje personalizado si el campo no cumple con un patrón específico
                if (this.validity.patternMismatch) {
                    errorMessage = "Utiliza un formato que coincida con el solicitado: " + this.title;
                }

                $(this).next('.error-message').text(errorMessage); // Muestra el mensaje de error
            }
        });

        // Si todos los campos son válidos, redirige al usuario a la página principal
        if (isValid) {
            localStorage.setItem("usuarioLogueado", "true");

            // Si el usuario fue redirigido desde la página de pago, lo regresa a la confirmación de reserva
            let redirigirPago = localStorage.getItem("redirigirDespuesDeLogin");

            if (redirigirPago == "true") {
                localStorage.removeItem("redirigirDespuesDeLogin");
                window.location.href = "confirmaReserva.html";
            } else {
                window.location.href = "../index.html";
            }
        }
    });
}
