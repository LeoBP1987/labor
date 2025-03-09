

export const useGetDataAtual = () => {

    const dataAtual = new Date();
    const dataAmanha = new Date(dataAtual);
    dataAmanha.setDate(dataAmanha.getDate() + 1);

    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    
    const dia_hoje = String(dataAtual.getDate()).padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia_hoje}`;

    const dia_amanha = String(dataAmanha.getDate()).padStart(2, '0');
    const dataFormatadaAmanha = `${ano}-${mes}-${dia_amanha}`

    return { dataFormatada, dataFormatadaAmanha }
}


