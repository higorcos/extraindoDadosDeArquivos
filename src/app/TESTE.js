// Função para converter data Excel para data JavaScript
function excelDateToJSDate(serial) {
  const excelEpoch = new Date(1899, 11, 30); // Data de início do Excel
  const jsDate = new Date(excelEpoch.getTime() + serial * 86400000); // 86400000 ms em um dia
  return jsDate;
}

// Função para formatar data JavaScript para o formato brasileiro (dd/mm/yyyy)
function formatDateToBrazilian(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são baseados em zero
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Função para converter data Excel para o formato brasileiro
function convertExcelDateToBrazilian(serial) {
  const jsDate = excelDateToJSDate(serial);
  return formatDateToBrazilian(jsDate);
}

// Dados de exemplo
const values = [7642283000114, 4, 2024, 1, "ABRAAO FERREIRA DE ALENCAR JUNIOR", "2303937302", "193", 1 ,"VEREADOR", 4, 44197, 45297, 20, 9, 8474.4, 3064.89, 111120, 1, "CÂMARA MUNICIPAL 120"]


// Iterar sobre os valores e converter datas Excel para o formato brasileiro
values.forEach(value => {
  if (!isNaN(value) && Number.isInteger(parseFloat(value))) {
      const serial = parseInt(value, 10);
      if (serial > 0 && serial < 2958465) { // Intervalo de datas válidas no Excel
          const brazilianDate = convertExcelDateToBrazilian(serial);
          console.log(`Valor Excel: ${serial} -> Data Brasileira: ${brazilianDate}`);
      }
  }
});
