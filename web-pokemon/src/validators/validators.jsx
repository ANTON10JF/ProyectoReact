const validateEmail = (form) => {
    const { email } = form;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        return 'El email es obligatorio y debe tener un formato válido.';
    }
    return '';
};


const validatePassword = (form) => {
    const { password } = form;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!$%&]).{8,}$/;
    if (
        !password ||
        password.length < 8 ||
        !passwordPattern.test(password)
    ) {
        return 'La contraseña es obligatoria y debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial (!,$,%&).';
    }
    return '';
};

const validatePhone = (form) => {
    const { phone } = form;
    const phonePattern = /^\+\d{2} \d{3} \d{3} \d{3}$/;
    if (!phone || !phonePattern.test(phone)) {
        return 'El teléfono es obligatorio y debe tener el formato (+XX) XXX XXX XXX.';
    }
    return '';
};

const validateUser = (form) => {
    const { user } = form;
    if (!user || user.length < 2 || user.length > 10) {
        return 'El usuario es obligatorio y debe tener una longitud entre 2 y 10 caracteres.';
    }
    return '';
};

const validateName = (form) => {
    const { name } = form;
    if (!name || name.length > 50) {
        return 'El nombre es obligatorio y debe tener una longitud máxima de 50 caracteres.';
    }
    return '';
};



/*  */


function validarObligatorio(campo, rename) {
    if (!campo) {
        return `${rename} es obligatorio.`;
    }

    return ''; // Es válido
}

function validarSinNumeros(campo, rename) {
    const regex = /^[^\d]+$/;

    if (!(regex.test(campo))) {

        return `${rename} no acepta numeros.`;
    }

    return ''; // Es válido
}

function validarLongitud(campo, rename, longitud) {
    if (campo.length > longitud) {
        return `${rename} no puede tener más de ${longitud} caracteres.`;
    }

    return ''; // Es válido
}

/*  */

export {
    validateEmail,
    validatePassword,
    validatePhone,
    validateUser,
    validateName,
    validarObligatorio,
    validarSinNumeros,
    validarLongitud
}