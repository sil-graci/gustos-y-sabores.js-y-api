const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input, #formulario textarea');

const expresiones = {
  name: /^[a-zA-ZÀ-ÿ]{3,}\s[a-zA-ZÀ-ÿ\s]{1,20}$/,
  mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  // con /s para que permita salto de línea
  message:/^.{8,1500}$/s 
};

let campos = {
  name: false,
  mail: false,
  message: false
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "name":
      validarCampo(expresiones.name, e.target, 'name');
      break;
    case "mail":
      validarCampo(expresiones.mail, e.target, 'mail');
      break;
    case "message":
      validarCampo(expresiones.message, e.target, 'message');
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  const grupo = document.getElementById(`grupo__${campo}`);
  const icono = document.querySelector(`#grupo__${campo} i`);
  const mensajeError = document.querySelector(`#grupo__${campo} .formulario__input-error`);

  if (expresion.test(input.value)) {
    grupo.classList.remove('formulario__grupo-incorrecto');
    grupo.classList.add('formulario__grupo-correcto');
    icono.classList.add('fa-check-circle');
    icono.classList.remove('fa-times-circle');
    mensajeError.classList.remove('formulario__input-error-activo');
    campos[campo] = true;
  } else {
    grupo.classList.add('formulario__grupo-incorrecto');
    grupo.classList.remove('formulario__grupo-correcto');
    icono.classList.add('fa-times-circle');
    icono.classList.remove('fa-check-circle');
    mensajeError.classList.add('formulario__input-error-activo');
    campos[campo] = false;
  }
};

// Event listeners para cada input y textarea
inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});

// Validación en el evento submit
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const terminos = document.getElementById('terminos');
  const mensajeExito = document.getElementById('formulario__mensaje-exito');
  const mensajeError = document.getElementById('formulario__mensaje');

  // Verificar que todos los campos sean válidos y que se hayan aceptado los términos
  if (campos.name && campos.mail && campos.message && terminos.checked) {
    
    mensajeExito.classList.add('formulario__mensaje-exito-activo');
    setTimeout(() => {
      mensajeExito.classList.remove('formulario__mensaje-exito-activo');
    }, 5000);

    document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
      icono.classList.remove('formulario__grupo-correcto');
    });

    // Ocultar el mensaje de error, si estaba visible
    mensajeError.classList.remove('formulario__mensaje-activo');
	// Restablecer el estado de validación de los campos a falso después de enviar
	campos = {
		name: false,
		mail: false,
		message: false
		};
    // formulario.submit();
    formulario.reset();
  } else {
    // Mostrar el mensaje de error si faltan campos por completar correctamente
    mensajeError.classList.add('formulario__mensaje-activo');
  }
});
