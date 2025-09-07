export class CustomError extends Error{
    constructor(mensaje, errorCode, detalles) {
        super(mensaje);
        this.name = 'Custom error';
        this.code = errorCode;
        this.detalles = detalles;
    }
}