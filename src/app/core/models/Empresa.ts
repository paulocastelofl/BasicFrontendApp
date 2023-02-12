
interface Empresa {
    id: number;
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    inscricaoMunicipal: string;
    despachante: boolean;
    importador: boolean;
    exportador: boolean;
    inscricaoSuframa: string;
    idPais: number;
    aprovaRegistroDI: boolean;
    atividadeEconomica: string;
    cnae: string;
    numeroDeCadastroNoMA: string;
    despachantePadrao: string;
    prazoDiasCEMercanteCritico: number;
    centroDeCusto: string;
    cadastroDeItens: boolean;
    atualizarItens: boolean;
    cadastroDeFornecedoresFabricantes: boolean;
    atualizarFornecedoresFabricantes: boolean;
    controlarDemurrage: boolean;
    controlarCEMercantes: boolean;
    controlarCambio: boolean;
    segurado: boolean;
    idEmpresa: number;
    status: boolean;
}