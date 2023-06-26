const validateEmail = (email) => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        return 'El email es obligatorio y debe tener un formato válido.';
    }
    return '';
};


const validatePassword = (password) => {

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

const validatePhone = (phone) => {

    const phonePattern = /^\+\d{2} \d{3} \d{3} \d{3}$/;
    if (!phone || !phonePattern.test(phone)) {
        return 'El teléfono es obligatorio y debe tener el formato (+XX) XXX XXX XXX.';
    }
    return '';
};

const validateName = (name) => {

    if (!name || name.length < 2 || name.length > 10) {
        return 'El nombre es obligatorio y debe tener una longitud entre 2 y 10 caracteres.';
    }
    return '';
};

const validateDescription = (description) => {

    if (!description || description.length <= 50) {
        return 'El texto es obligatorio y debe tener una longitud máxima de 50 caracteres.';
    }
    return '';
};

const validatePrice = (price) => {

    if (!price || price < 0 || price > 1000) {
        return 'El precio es obligatorio y debe tener un valor entre 0 y 1000.';
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

    validateDescription,
    validatePrice,
    validateEmail,
    validatePassword,
    validatePhone,
    validateUser,
    validateName,
    validarObligatorio,
    validarSinNumeros,
    validarLongitud

}