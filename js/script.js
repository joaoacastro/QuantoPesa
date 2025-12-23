// Salários mínimos
const salarioMinimo = {
  br: 1518,
  pt: 870,
};

// Elementos do salário mínimo (divs)
const inputSalarioMinimoBR = document.getElementById("salarioMinimo-br");
const inputSalarioMinimoPT = document.getElementById("salarioMinimo-pt");

// Formatação de moeda
const salarioFormatadoBR = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
}).format(salarioMinimo.br);

const salarioFormatadoPT = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
}).format(salarioMinimo.pt);

// Exibe os salários
inputSalarioMinimoBR.textContent = salarioFormatadoBR;
inputSalarioMinimoPT.textContent = salarioFormatadoPT;

// Inputs de produto
const produtoBR = document.getElementById("produto-br");
const produtoPT = document.getElementById("produto-pt");

// Botão e resultado
const botaoCalcular = document.getElementById("calculate");
const resultado = document.getElementById("resultado");

// Evento do botão
botaoCalcular.addEventListener("click", function () {
  // Converte valores para número
  const valorProdutoBR = Number(produtoBR.value);
  const valorProdutoPT = Number(produtoPT.value);

  // Se ambos forem inválidos (vazio ou zero)
  if (valorProdutoBR <= 0 && valorProdutoPT <= 0) {
    alert("Preencha os valores dos produtos");
    return;
  }

  // Limpa resultado anterior
  resultado.innerHTML = "";

  // Brasil
  if (valorProdutoBR > 0) {
    const percentualBR = (valorProdutoBR / salarioMinimo.br) * 100;

    resultado.innerHTML += `
      <p>
        No Brasil, esse produto consome 
        ${percentualBR.toFixed(2)}% do salário mínimo mensal.
      </p>
    `;
  }

  // Portugal
  if (valorProdutoPT > 0) {
    const percentualPT = (valorProdutoPT / salarioMinimo.pt) * 100;

    resultado.innerHTML += `
      <p>
        Em Portugal, esse produto consome 
        ${percentualPT.toFixed(2)}% do salário mínimo mensal.
      </p>
    `;
  }
});
