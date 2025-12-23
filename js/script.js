// Configuração dos salários mínimos
const salarioMinimo = {
  br: 1518,
  pt: 870,
  usa: 1160,
};

// Elementos da interface
const botaoCalcular = document.getElementById("calculate");
const resultado = document.getElementById("resultado");

// Função para formatar moeda
const formatarMoeda = (valor, local, moeda) => {
  return new Intl.NumberFormat(local, {
    style: "currency",
    currency: moeda,
  }).format(valor);
};

// Inicializa os valores de referência no rodapé
document.getElementById("salarioMinimo-br").textContent = formatarMoeda(
  salarioMinimo.br,
  "pt-BR",
  "BRL"
);
document.getElementById("salarioMinimo-pt").textContent = formatarMoeda(
  salarioMinimo.pt,
  "pt-PT",
  "EUR"
);
document.getElementById("salarioMinimo-usa").textContent = formatarMoeda(
  salarioMinimo.usa,
  "en-US",
  "USD"
);

// Define a cor baseada no peso no bolso
const definirCor = (p) => {
  if (p <= 50) return "#1e8e3e"; // Verde
  if (p <= 75) return "#fbbc04"; // Amarelo
  if (p <= 100) return "#d93025"; // Vermelho
  return "#9c27b0"; // Roxo (Crítico)
};

botaoCalcular.addEventListener("click", function () {
  // Lista de campos para processar
  const dados = [
    {
      id: "produto-br",
      label: "No Brasil",
      salario: salarioMinimo.br,
      local: "pt-BR",
      moeda: "BRL",
    },
    {
      id: "produto-pt",
      label: "Em Portugal",
      salario: salarioMinimo.pt,
      local: "pt-PT",
      moeda: "EUR",
    },
    {
      id: "produto-usa",
      label: "Nos EUA",
      salario: salarioMinimo.usa,
      local: "en-US",
      moeda: "USD",
    },
  ];

  resultado.innerHTML = ""; // Limpa resultados anteriores
  let algumPreenchido = false;

  dados.forEach((item) => {
    const inputVal = document.getElementById(item.id).value;
    const valor = Number(inputVal);

    if (valor > 0) {
      algumPreenchido = true;
      const percentual = (valor / item.salario) * 100;
      const cor = definirCor(percentual);

      // Cria a estrutura do card inspirada na lista enviada
      const cardId = `fill-${item.id}`;
      resultado.innerHTML += `
        <div class="card">
          <div class="info-local">
            <h4>${item.label}</h4>
            <div class="valor-moeda">${formatarMoeda(
              valor,
              item.local,
              item.moeda
            )}</div>
          </div>
          
          <div class="porcentagem" style="color: ${cor}">
            ${percentual.toFixed(2)}%
          </div>
          
          <div class="container-barra">
            <div class="progress-bar">
              <div class="progress-fill" id="${cardId}" style="background-color: ${cor};"></div>
            </div>
            <div class="legenda-barra">do salário mínimo mensal</div>
          </div>
        </div>
      `;

      // Pequeno delay para garantir que o CSS renderizou antes de animar a barra
      setTimeout(() => {
        const barra = document.getElementById(cardId);
        if (barra) barra.style.width = `${Math.min(percentual, 100)}%`;
      }, 50);
    }
  });

  if (!algumPreenchido) {
    alert("Por favor, insira o valor de pelo menos um produto.");
  }
});
