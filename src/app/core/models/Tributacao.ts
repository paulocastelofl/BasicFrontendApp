interface ITributacao {
    id?: number;
    nome: string;
    codigo: string;
    dtModificacao: string;
    aliquotaIcms: DoubleRange;
    aliquotaMva: DoubleRange;
    aliquotaReducao: DoubleRange;
    coeficienteLei2826: DoubleRange;
    coeficienteNormal: DoubleRange;

}
