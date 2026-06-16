// Configuração dos salários mínimos (abril 2026)
const salarioMinimo = {
  br: 1621,
  pt: 920,
  usa: 1256,
};

// Elementos da interface
const botaoTema = document.getElementById("theme-toggle");
const campos = [
  {
    id: "produto-br",
    label: "Valor em Reais (R$)",
    salario: salarioMinimo.br,
    local: "pt-BR",
    moeda: "BRL",
    percentId: "percent-br",
    fillId: "fill-br",
    cardId: "card-br",
  },
  {
    id: "produto-pt",
    label: "Valor em Euros (€)",
    salario: salarioMinimo.pt,
    local: "pt-PT",
    moeda: "EUR",
    percentId: "percent-pt",
    fillId: "fill-pt",
    cardId: "card-pt",
  },
  {
    id: "produto-usa",
    label: "Valor em Dólares (US$)",
    salario: salarioMinimo.usa,
    local: "en-US",
    moeda: "USD",
    percentId: "percent-usa",
    fillId: "fill-usa",
    cardId: "card-usa",
  },
];

const definirTema = (tema) => {
  const escuro = tema === "dark";
  document.body.classList.toggle("dark-theme", escuro);
  botaoTema.textContent = escuro ? "Tema claro" : "Tema escuro";
  localStorage.setItem("tema", tema);
};

const iniciarTema = () => {
  const temaSalvo = localStorage.getItem("tema");
  const temaInicial =
    temaSalvo ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  definirTema(temaInicial);
};

botaoTema.addEventListener("click", () => {
  definirTema(
    document.body.classList.contains("dark-theme") ? "light" : "dark",
  );
});

iniciarTema();

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
  "BRL",
);
document.getElementById("salarioMinimo-pt").textContent = formatarMoeda(
  salarioMinimo.pt,
  "pt-PT",
  "EUR",
);
document.getElementById("salarioMinimo-usa").textContent = formatarMoeda(
  salarioMinimo.usa,
  "en-US",
  "USD",
);

// Define a cor baseada no peso no bolso
const definirCor = (p) => {
  if (p <= 50) return "#1e8e3e"; // Verde
  if (p <= 75) return "#fbbc04"; // Amarelo
  if (p <= 100) return "#d93025"; // Vermelho
  return "#9c27b0"; // Roxo (Crítico)
};

const formatNumero = (valor, local) => {
  return new Intl.NumberFormat(local, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
};

const atualizarCartoes = () => {
  campos.forEach((item) => {
    const input = document.getElementById(item.id);
    const card = document.getElementById(item.cardId);
    const percentEl = document.getElementById(item.percentId);
    const fillEl = document.getElementById(item.fillId);
    const pais = item.cardId.split("-")[1];
    const equivalentEl = document.getElementById(`equivalent-${pais}`);
    const converterEl = document.getElementById(`converter-link-${pais}`);
    const valor = Number(input.value);

    if (valor > 0) {
      const percentual = (valor / item.salario) * 100;
      const cor = definirCor(percentual);
      card.classList.remove("card--empty");
      card.style.borderColor = cor;
      percentEl.textContent = `${percentual.toFixed(2)}%`;
      percentEl.style.color = cor;
      fillEl.style.backgroundColor = cor;
      fillEl.style.width = `${Math.min(percentual, 100)}%`;

      // Mostrar equivalentes e link de conversão
      if (equivalentEl) equivalentEl.style.display = "block";
      if (converterEl) converterEl.style.display = "flex";

      campos.forEach((outroItem) => {
        if (outroItem.id !== item.id) {
          const paisOutro = outroItem.cardId.split("-")[1];
          const equivalente = (percentual / 100) * outroItem.salario;
          const elementoId = `equiv-${pais}-${paisOutro}`;
          const elemento = document.getElementById(elementoId);
          if (elemento) {
            elemento.textContent = formatNumero(equivalente, outroItem.local);
          }
        }
      });
    } else {
      card.classList.add("card--empty");
      card.style.borderColor = "rgba(255,255,255,0.1)";
      percentEl.textContent = "--";
      percentEl.style.color = "var(--muted)";
      fillEl.style.width = "0";
      if (equivalentEl) equivalentEl.style.display = "none";
      if (converterEl) converterEl.style.display = "none";
    }
  });
};

campos.forEach((item) => {
  const input = document.getElementById(item.id);
  input.addEventListener("input", atualizarCartoes);
});

atualizarCartoes();
