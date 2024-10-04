
export function FormatData(data:any, keys:any){
    var resultString = [];

    for (const i in data) {
      const newData = keys
        .map((key:any) => {
          let value = data[i][key];
          if (key.toLocaleUpperCase().includes("DATAADMISSAO")||key.toLocaleUpperCase().includes("DATA")) {
            // se for data
            const newFormatDate = dateRender(value);
            value = newFormatDate;
          }

          if(key.toLocaleUpperCase().includes("MES_PERIODO")){
            value = nameMonth(value)
          }

          if (key.toLocaleUpperCase().includes("CNPJ")) {
            // se for cnpj

            if (value != undefined || value != null) {
              value = value.replace(
                /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                "$1.$2.$3/$4-$5"
              );
            } else {
              value = "";
            }
          }
          if (key.toLocaleUpperCase().includes("CPF")) {
            // se for cnpj

            if (value != undefined || value != null) {
              value = value.replace(
                /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
                "***.$2.$3.**-**"
              );
            } else {
              value = "";
            }
          }

          if (
            typeof value != "string" &&
            (key.toLocaleUpperCase().includes("VALOR")||
             key.toLocaleUpperCase().includes("VALORBRUTO")||
             key.toLocaleUpperCase().includes("VALORLIQUIDO")||
             key.toLocaleUpperCase().includes("VALORDESCONTO")||
             key.toLocaleUpperCase().includes("VALOR_TOTAL")
            )
          ) {
            //se não for string

            value = moneyFormat(value);
          } else if (typeof value != "string") {
            if (value != undefined || value != null) {
              value = value.toString();
            } else {
              value = "";
            }
          }
          return { [key]: value };
        })
        .reduce((prev:any, next:any) => {
          return { ...prev, ...next };
        }, {});
      resultString.push(newData);
    }
    return resultString;
};
function moneyFormat(money:any){
    if (money == "") {
      return money;
    } else {
      var format = { minimumFractionDigits: 2, currency: "BRL" };
      return money.toLocaleString("pt-BR", format);
    }
};
function dateRender(dateReq:any){
   
    const date:any = new Date(dateReq);
    if (dateReq != "") {
      date.setDate(date.getDate());

      let day:any = date.getDate();
      if (date.getDate() < 10) {
        day = "0" + date.getDate();
      }
      const formatDate =
        day + "/" + formatMonth(date.getMonth()) + "/" + date.getFullYear();
      return formatDate;
    } else {
      return "";
    }
};

export function formatMonth(month:string){
  const nameMonth:any = {
    0: "01",
    1: "02",
    2: "03",
    3: "04",
    4: "05",
    5: "06",
    6: "07",
    7: "08",
    8: "09",
    9: "10",
    10: "11",
    11: "12",
  };
  return nameMonth[month]
}

export function nameMonth(month:string){
  const nameMonth: any = {
    '01': "Janeiro",
    '02': "Fevereiro",
    '03': "Março",
    '04': "Abril",
    '05': "Maio",
    '06': "Junho",
    '07': "Julho",
    '08': "Agosto",
    '09': "Setembro",
    '10': "Outubro",
    '11': "Novembro",
    '12': "Dezembro"
};

  return nameMonth[month]
}
