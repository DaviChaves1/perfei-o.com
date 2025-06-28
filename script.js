const container = document.getElementById("love-container");
const timerEl = document.getElementById("timer");
const secretEl = document.getElementById("secret");
const lastVisitEl = document.getElementById("lastVisit");
const endScreen = document.getElementById("endScreen");
const resetButton = document.getElementById("resetButton");
const toggleRainbowBtn = document.getElementById("toggleRainbow");

let seconds = 0;
let frases = [];
let palavraCarinho = "Carinho";
let isDay = false;
let rainbowMode = false;
let config = {
  autor: "Anônimo",
  msgSecreta: "Você é especial!",
  apelidos: [],
  palavraCarinho: "Carinho",
};

// Carregar configurações salvas
window.onload = () => {
  const savedConfig = localStorage.getItem("carinhoConfig");
  if (savedConfig) {
    try {
      const parsed = JSON.parse(savedConfig);
      config = { ...config, ...parsed };
      // Preenche inputs com os dados salvos
      document.getElementById("autorInput").value = config.autor;
      document.getElementById("msgSecretaInput").value = config.msgSecreta;
      document.getElementById("apelidosInput").value = config.apelidos.join(", ");
      document.getElementById("palavraCarinhoInput").value = config.palavraCarinho || "Carinho";
    } catch {}
  }

  const now = new Date().toLocaleString();
  const lastVisit = localStorage.getItem("lastVisit");
  if (lastVisit) {
    lastVisitEl.textContent = "Último carinho: " + lastVisit;
    lastVisitEl.style.opacity = "1";
    lastVisitEl.style.visibility = "visible";
  }
  localStorage.setItem("lastVisit", now);
};

// Função iniciar: pega os dados e mostra a tela do carinho
function iniciar() {
  config.autor = document.getElementById("autorInput").value.trim() || "Anônimo";
  config.msgSecreta = document.getElementById("msgSecretaInput").value.trim() || "Você é especial!";
  const apelidosTexto = document.getElementById("apelidosInput").value;
  config.apelidos = apelidosTexto
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  config.palavraCarinho = document.getElementById("palavraCarinhoInput").value.trim() || "Carinho";

  frases = config.apelidos;
  palavraCarinho = config.palavraCarinho;

  // Salvar configurações no localStorage
  localStorage.setItem("carinhoConfig", JSON.stringify(config));

  document.querySelector(".final-message").textContent = `Com carinho, ${config.autor}`;
  endScreen.textContent = `Feito com carinho... por ${config.autor} 💗`;
  secretEl.textContent = config.msgSecreta;

  // Oculta config e mostra carinho
  document.getElementById("configScreen").style.display = "none";
  showElement(container);
  showElement(timerEl);
  showElement(lastVisitEl);
  showElement(document.querySelector(".final-message"));
  resetButton.style.display = "inline-block";

  iniciarAmor();

  // Remove elementos antigos
  container.innerHTML = "";
  seconds = 0;
  timerEl.textContent = `Você está recebendo ${palavraCarinho.toLowerCase()} há 0s`;
  secretEl.style.opacity = "0";
  endScreen.style.opacity = "0";
  isDay = false;
  document.body.classList.remove("day-mode");
  rainbowMode = false;
  toggleRainbowBtn.textContent = "Ativar modo arco-íris 🌈";
}

// Função para mostrar elemento com transição
function showElement(el) {
  el.style.opacity = "1";
  el.style.visibility = "visible";
}

// Função para esconder elemento com transição
function hideElement(el) {
  el.style.opacity = "0";
  el.style.visibility = "hidden";
}

// Função para criar textos animados "Carinho" ou palavra personalizada
function createLoveText() {
  if (container.childNodes.length > 500) {
    container.removeChild(container.firstChild);
  }

  const span = document.createElement("span");
  span.innerText = palavraCarinho;
  span.style.margin = "2px";
  span.style.opacity = Math.random();

  const fontSize = 12 + Math.random() * 20;
  span.style.fontSize = `${fontSize}px`;

  if (rainbowMode) {
    span.classList.add("rainbow");
  } else {
    span.classList.remove("rainbow");
  }

  if (Math.random() < 0.2) span.classList.add("wavy");

  container.appendChild(span);
}

// Função que cria explosão de apelidos no clique
function createNameExplosion(x, y) {
  if (frases.length === 0) return;
  const name = document.createElement("div");
  name.innerText = frases[Math.floor(Math.random() * frases.length)];
  Object.assign(name.style, {
    position: "absolute",
    left: `${x - 50}px`,
    top: `${y - 20}px`,
    fontSize: "30px",
    color: "#ff69b4",
    fontWeight: "bold",
    opacity: "1",
    transition: "all 1s ease-out",
    pointerEvents: "none",
    zIndex: 9999,
  });
  document.body.appendChild(name);
  setTimeout(() => {
    name.style.transform = "scale(2)";
    name.style.opacity = "0";
  }, 50);
  setTimeout(() => name.remove(), 1050);
}

// Função anima beijo
function createKissAnimation(x, y) {
  const kiss = document.createElement("div");
  kiss.innerText = "💋";
  Object.assign(kiss.style, {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    fontSize: "40px",
    transition: "all 1s ease-out",
    opacity: "1",
    pointerEvents: "none",
    zIndex: 9999,
  });
  document.body.appendChild(kiss);
  setTimeout(() => {
    kiss.style.transform = "translateY(-50px) scale(1.5)";
    kiss.style.opacity = "0";
  }, 50);
  setTimeout(() => kiss.remove(), 1000);
}

// Função cria coração animado
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${6 + Math.random() * 4}s`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}

// Função cria pétala animada
function createPetal() {
  const petal = document.createElement("div");
  petal.className = "petal";
  petal.innerText = "🌺";
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.fontSize = "30px";
  petal.style.animationDuration = `${7 + Math.random() * 3}s`;
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), 10000);
}

let loveTextInterval, timerInterval, heartInterval, petalInterval;

// Função inicia as animações do carinho
function iniciarAmor() {
  // Limpa intervalos caso já existam (para recomeçar)
  clearInterval(loveTextInterval);
  clearInterval(timerInterval);
  clearInterval(heartInterval);
  clearInterval(petalInterval);

  loveTextInterval = setInterval(createLoveText, 150);
  timerInterval = setInterval(() => {
    seconds++;
    timerEl.textContent = `Você está recebendo ${palavraCarinho.toLowerCase()} há ${seconds}s`;

    if (seconds === 30) {
      secretEl.style.opacity = "1";
      secretEl.style.visibility = "visible";
    }
    if (seconds === 60) {
      endScreen.style.opacity = "1";
      endScreen.style.visibility = "visible";
    }
  }, 1000);

  heartInterval = setInterval(createHeart, 800);
  petalInterval = setInterval(createPetal, 500);
}

// Evento click para criar explosão de nomes e beijo, alternar modo dia/noite, vibrar no mobile
document.addEventListener("click", (e) => {
  if (document.getElementById("configScreen").style.display === "none") {
    createNameExplosion(e.clientX, e.clientY);
    createKissAnimation(e.clientX, e.clientY);

    // Alterna modo dia/noite
    isDay = !isDay;
    document.body.classList.toggle("day-mode", isDay);

    // Vibração no mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }
});

// Botão recomeçar carinho
resetButton.addEventListener("click", () => {
  // Limpa tela de carinho e volta pra config
  container.innerHTML = "";
  document.getElementById("configScreen").style.display = "block";

  hideElement(container);
  hideElement(timerEl);
  hideElement(lastVisitEl);
  hideElement(document.querySelector(".final-message"));
  hideElement(secretEl);
  hideElement(endScreen);

  resetButton.style.display = "none";
  seconds = 0;
  rainbowMode = false;
  toggleRainbowBtn.textContent = "Ativar modo arco-íris 🌈";
  document.body.classList.remove("day-mode");
});

// Botão ativar/desativar modo arco-íris
toggleRainbowBtn.addEventListener("click", () => {
  rainbowMode = !rainbowMode;
  toggleRainbowBtn.textContent = rainbowMode ? "Desativar modo arco-íris 🌈" : "Ativar modo arco-íris
