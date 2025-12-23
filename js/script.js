// Salários mínimos de referência
const salarioMinimo = {
  br: 1518,
  pt: 870,
};

// Elementos da interface
const inputSalarioMinimoBR = document.getElementById("salarioMinimo-br");
const inputSalarioMinimoPT = document.getElementById("salarioMinimo-pt");
const produtoBR = document.getElementById("produto-br");
const produtoPT = document.getElementById("produto-pt");
const botaoCalcular = document.getElementById("calculate");
const resultado = document.getElementById("resultado");

// Função para formatar moeda
const formatarMoeda = (valor, local, moeda) => {
  return new Intl.NumberFormat(local, {
    style: "currency",
    currency: moeda,
  }).format(valor);
};

// Exibe salários de referência no rodapé ao carregar a página
if (inputSalarioMinimoBR)
  inputSalarioMinimoBR.textContent = formatarMoeda(
    salarioMinimo.br,
    "pt-BR",
    "BRL"
  );
if (inputSalarioMinimoPT)
  inputSalarioMinimoPT.textContent = formatarMoeda(
    salarioMinimo.pt,
    "pt-PT",
    "EUR"
  );

// Função para definir a cor dinâmica baseada no percentual
const definirCor = (p) => {
  if (p <= 50) return "#1e8e3e"; // Verde (baixo impacto)
  if (p <= 75) return "#fbbc04"; // Amarelo (médio impacto)
  if (p <= 100) return "#d93025"; // Vermelho (alto impacto)
  return "#9c27b0"; // Roxo (crítico / acima de 100%)
};

// Evento de clique para o cálculo
botaoCalcular.addEventListener("click", function () {
  const valorProdutoBR = Number(produtoBR.value);
  const valorProdutoPT = Number(produtoPT.value);

  // Validação simples
  if (valorProdutoBR <= 0 && valorProdutoPT <= 0) {
    alert("Por favor, insira o valor de pelo menos um produto.");
    return;
  }

  // Limpa os cards anteriores
  resultado.innerHTML = "";

  // Array de objetos para facilitar a criação dos cards via loop
  const configuracao = [
    {
      label: "No Brasil",
      valor: valorProdutoBR,
      salario: salarioMinimo.br,
      local: "pt-BR",
      moeda: "BRL",
    },
    {
      label: "Em Portugal",
      valor: valorProdutoPT,
      salario: salarioMinimo.pt,
      local: "pt-PT",
      moeda: "EUR",
    },
  ];

  configuracao.forEach((item) => {
    // Apenas gera o card se houver um valor preenchido para o país
    if (item.valor > 0) {
      const percentual = (item.valor / item.salario) * 100;
      const corDinamica = definirCor(percentual);
      const valorFormatado = formatarMoeda(item.valor, item.local, item.moeda);

      resultado.innerHTML += `
        <div class="card">
          <div class="valor-moeda">${valorFormatado}</div>
          <h4>${item.label}</h4>
          <div class="porcentagem" style="color: ${corDinamica}">
            ${percentual.toFixed(2)}%
          </div>
          <p>do salário mínimo mensal</p>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${Math.min(
              percentual,
              100
            )}%; background-color: ${corDinamica};"></div>
          </div>
        </div>
      `;
    }
  });
});
