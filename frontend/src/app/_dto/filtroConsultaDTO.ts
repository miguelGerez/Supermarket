export class FiltroConsultaDTO {
    dni: string;
    nameCompleto: string;

    constructor(dni: string, nameCompleto: string) {
        this.dni = dni;
        this.nameCompleto = nameCompleto;
    }
}
