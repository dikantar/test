// Simular una base de datos de usuarios (esto es solo un ejemplo).
const usuarios = [
    { email: 'usuario1@example.com', password: 'clave1', intentosFallidos: 0 },
    { email: 'usuario2@example.com', password: 'clave2', intentosFallidos: 0 }
];

// Función para validar una dirección de correo electrónico
function esDireccionDeCorreoValida(email) {
    // Utilizamos una expresión regular para validar la dirección de correo electrónico.
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

// Manejar el envío del formulario
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verificar las credenciales ingresadas
    const usuario = usuarios.find(user => user.email === email);

    if (usuario && esDireccionDeCorreoValida(email)) {
        if (usuario.intentosFallidos < 3) {
            if (usuario.password === password) {
                // Inicio de sesión exitoso
                usuario.intentosFallidos = 0; // Reiniciar el contador de intentos fallidos
                window.location.href = 'landing.html';
            } else {
                // Contraseña incorrecta
                document.getElementById('result').innerHTML = 'Contraseña incorrecta. Por favor, inténtalo nuevamente.';
                usuario.intentosFallidos++;
            }
        } else {
            // Bloquear la cuenta después de 3 intentos fallidos
            alert('Has excedido el número máximo de intentos. Tu cuenta está bloqueada.');
        }
    } else {
        // Correo electrónico no encontrado o no válido
        document.getElementById('result').innerHTML = 'Correo electrónico no encontrado. Por favor, inténtalo nuevamente.';
    }
});
