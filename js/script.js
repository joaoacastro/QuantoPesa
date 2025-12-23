const salarioMinimo = {
  br: 1518,
  pt: 870,
};

const inputSalarioMinimoBR = document.getElementById("salarioMinimo-br");
const inputSalarioMinimoPT = document.getElementById("salarioMinimo-pt");

inputSalarioMinimoBR.innerText = salarioMinimo.br;
inputSalarioMinimoPT.innerText = salarioMinimo.pt;

const produtoBR = document.getElementById("produto-br");
const produtoPT = document.getElementById("produto-pt");
const botaoCalcular = document.getElementById("calculate");
const resultado = document.getElementById("resultado");

const salarioFormatadoBR = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
}).format(salarioMinimo.br);

const salarioFormatadoPT = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
}).format(salarioMinimo.pt);

inputSalarioMinimoBR.textContent = `${salarioFormatadoBR}`;
inputSalarioMinimoPT.textContent = `${salarioFormatadoPT}`;


botaoCalcular.addEventListener("click", function () {
  const valorProdutoBR = produtoBR.value;
  const valorProdutoPT = produtoPT.value;

  if (valorProdutoBR === "" && valorProdutoPT === "") {
    alert("Preencha os valores dos produtos");
    return;
  }

  resultado.innerHTML = "";

  if (valorProdutoBR !== "") {
    const percentualBR =
      (Number(valorProdutoBR) / salarioMinimo.br) * 100;

    resultado.innerHTML += `
      <p>No Brasil, esse produto consome ${percentualBR.toFixed(
        2
      )}% do salário mínimo mensal.</p>
    `;
  }

  if (valorProdutoPT !== "") {
    const percentualPT =
      (Number(valorProdutoPT) / salarioMinimo.pt) * 100;

    resultado.innerHTML += `
      <p>Em Portugal, esse produto consome ${percentualPT.toFixed(
        2
      )}% do salário mínimo mensal.</p>
    `;
  }
});

