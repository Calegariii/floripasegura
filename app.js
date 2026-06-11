// ==========================================
// 1. CONFIGURAÇÃO BASE DO MAPA
// ==========================================
const map = L.map('map', {
    zoomControl: true
}).setView([-27.5953, -48.5480], 12); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// ==========================================
// 2. BANCO DE DADOS ATUALIZADO (SEM BAIXA ILUMINAÇÃO)
// ==========================================
const dadosIniciaisReais = [
    // ------------------------------------------
    // REGIÃO CENTRO
    // ------------------------------------------
    { id: 1, lat: -27.5960, lng: -48.5530, count: 0.9, tipo: 'assalto', bairro: 'Centro (Entorno da Rodoviária)' },
    { id: 2, lat: -27.5950, lng: -48.5460, count: 0.9, tipo: 'assalto', bairro: 'Centro (Calçadão da Felipe Schmidt / Praça XV)' },
    { id: 3, lat: -27.5820, lng: -48.5410, count: 0.7, tipo: 'transito', bairro: 'Centro (Av. Beira-Mar Norte - Cruzamentos)' },
    { id: 4, lat: -27.5940, lng: -48.5630, count: 0.8, tipo: 'transito', bairro: 'Centro (Acesso às Pontes Pedro Ivo e Colombo Salles)' },
    { id: 5, lat: -27.6001, lng: -48.5455, count: 0.9, tipo: 'assalto', bairro: 'Centro (Acessos à Região do Mocotó)' },

    // ------------------------------------------
    // REGIÃO CONTINENTAL
    // ------------------------------------------
    { id: 6, lat: -27.5850, lng: -48.5820, count: 0.8, tipo: 'veiculo', bairro: 'Estreito (Furtos de Veículos em Ruas Residenciais)' },
    { id: 7, lat: -27.5910, lng: -48.5860, count: 0.9, tipo: 'assalto', bairro: 'Capoeiras (Assalto a Pedestres em Vias Comerciais)' },
    { id: 8, lat: -27.6105, lng: -48.5720, count: 0.8, tipo: 'veiculo', bairro: 'Abraão / Itaguaçu (Roubo de Carros)' },
    { id: 9, lat: -27.5900, lng: -48.5700, count: 0.8, tipo: 'transito', bairro: 'Via Expressa BR-282 (Gargalo Continental por Acidente)' },
    { id: 10, lat: -27.6040, lng: -48.5880, count: 0.9, tipo: 'assalto', bairro: 'Coloninha (Pontos Críticos)' },

    // ------------------------------------------
    // REGIÃO NORTE DA ILHA
    // ------------------------------------------
    { id: 11, lat: -27.4450, lng: -48.4020, count: 0.9, tipo: 'assalto', bairro: 'Ingleses (Assaltos no Centrinho Comercial)' },
    { id: 12, lat: -27.4356, lng: -48.4635, count: 0.8, tipo: 'veiculo', bairro: 'Canasvieiras (Furtos de Veículos Noturnos)' },
    { id: 13, lat: -27.4390, lng: -48.4910, count: 0.9, tipo: 'assalto', bairro: 'Jurerê Tradicional / Internacional (Furtos a Residências)' },
    { id: 14, lat: -27.4780, lng: -48.4830, count: 0.8, tipo: 'veiculo', bairro: 'Daniela (Roubo de Carga / Veículos)' },
    { id: 15, lat: -27.4610, lng: -48.5020, count: 0.7, tipo: 'transito', bairro: 'SC-401 Norte (Acidente Próximo ao Antigo Pedágio)' },
    { id: 16, lat: -27.5615, lng: -48.5082, count: 0.9, tipo: 'transito', bairro: 'Rodovia SC-401 (Colisão com Retenção no João Paulo)' },
    { id: 17, lat: -27.4520, lng: -48.4210, count: 0.9, tipo: 'assalto', bairro: 'Sítio de Baixo / Ingleses Sul' },

    // ------------------------------------------
    // REGIÃO LESTE DA ILHA
    // ------------------------------------------
    { id: 18, lat: -27.5840, lng: -48.5120, count: 0.9, tipo: 'assalto', bairro: 'Trindade (Assaltos a Mão Armada ao Redor da UFSC)' },
    { id: 19, lat: -27.5790, lng: -48.5010, count: 0.8, tipo: 'veiculo', bairro: 'Itacorubi (Furtos de Carros em Estacionamentos)' },
    { id: 20, lat: -27.6040, lng: -48.4620, count: 0.9, tipo: 'assalto', bairro: 'Lagoa da Conceição (Assaltos na Orla / Centrinho)' },
    { id: 21, lat: -27.6010, lng: -48.4350, count: 0.8, tipo: 'veiculo', bairro: 'Praia Mole / Barra da Lagoa (Arrombamento de Veículos)' },
    { id: 22, lat: -27.5930, lng: -48.4850, count: 0.8, tipo: 'transito', bairro: 'Morro da Lagoa (Acidente Travando a SC-404)' },
    { id: 23, lat: -27.5910, lng: -48.5210, count: 0.9, tipo: 'assalto', bairro: 'Carvoeira / Serrinha (Roubos a Transeuntes)' },

    // ------------------------------------------
    // REGIÃO SUL DA ILHA
    // ------------------------------------------
    { id: 24, lat: -27.6850, lng: -48.4820, count: 0.8, tipo: 'veiculo', bairro: 'Campeche (Furtos de Carros Próximo à Praia)' },
    { id: 25, lat: -27.6520, lng: -48.4950, count: 0.8, tipo: 'transito', bairro: 'Trevo do Rio Tavares (Trânsito Retido por Incidente)' },
    { id: 26, lat: -27.6980, lng: -48.5050, count: 0.9, tipo: 'assalto', bairro: 'Morro das Pedras (Assalto em Comércios Locais)' },
    { id: 27, lat: -27.7840, lng: -48.5080, count: 0.8, tipo: 'veiculo', bairro: 'Pântano do Sul (Roubo/Furto de Veículos)' },
    { id: 28, lat: -27.6740, lng: -48.5480, count: 0.7, tipo: 'transito', bairro: 'Tapera (Fluxo Lento no Acesso ao Aeroporto)' },
    { id: 29, lat: -27.6400, lng: -48.5120, count: 0.9, tipo: 'assalto', bairro: 'Saco dos Limões (Assalto Próximo ao Trevo)' }
];

// Atualização automática de cache com o sufixo final v4
function obterDadosDoBanco() {
    const dadosSalvos = localStorage.getItem('floripa_segura_dados_v4');
    if (dadosSalvos) {
        return JSON.parse(dadosSalvos);
    } else {
        localStorage.setItem('floripa_segura_dados_v4', JSON.stringify(dadosIniciaisReais));
        return dadosIniciaisReais;
    }
}

let baseOcorrencias = obterDadosDoBanco();

// ==========================================
// 3. CONFIGURAÇÃO DO HEATMAP
// ==========================================
const configHeatmap = {
    radius: 25,
    maxOpacity: 0.6,
    scaleRadius: false,
    useLocalExtrema: true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count',
    gradient: {
        '.3': '#3b82f6',   // Azul base
        '.6': '#a855f7',   // Roxo (Trânsito)
        '.85': '#f97316',  // Laranja (Veículos)
        '.98': '#ef4444'   // Vermelho (Assaltos)
    }
};

const heatmapLayer = new HeatmapOverlay(configHeatmap);
heatmapLayer.addTo(map);

let marcadoresPontuais = [];

// ==========================================
// 4. LÓGICA DE RENDERIZAÇÃO NA TELA
// ==========================================
function atualizarDashboard(dadosFiltrados) {
    const dadosHeatmap = { max: 1, data: dadosFiltrados };
    heatmapLayer.setData(dadosHeatmap);

    marcadoresPontuais.forEach(m => map.removeLayer(m));
    marcadoresPontuais = [];

    dadosFiltrados.forEach(ponto => {
        let corMarcador = '#ef4444'; 
        if (ponto.tipo === 'veiculo') corMarcador = '#f97316'; 
        if (ponto.tipo === 'transito') corMarcador = '#a855f7'; 

        const marcador = L.circleMarker([ponto.lat, ponto.lng], {
            radius: 8,
            fillColor: corMarcador,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
        }).addTo(map);

        const popupContent = `
            <div style="font-family: sans-serif; color: #1e293b; min-width: 180px; padding: 2px;">
                <strong style="text-transform: uppercase; color: #0f172a; font-size: 12px;">${ponto.bairro}</strong><br>
                <span style="color: #475569; font-size: 11px; display: inline-block; margin-top: 4px;">⚠️ Ocorrência: <b>${ponto.tipo.toUpperCase()}</b></span>
                <hr style="margin: 8px 0; border: 0; border-top: 1px solid #e2e8f0;">
                <button onclick="excluirOcorrencia(${ponto.id})" style="width: 100%; background: #dc2626; color: white; border: none; padding: 6px; font-size: 11px; font-weight: bold; border-radius: 4px; cursor: pointer;">
                    🗑️ Remover Alerta do Mapa
                </button>
            </div>
        `;

        marcador.bindPopup(popupContent);
        marcadoresPontuais.push(marcador);
    });

    atualizarContadores();
}

window.filtrarMapa = function(categoria) {
    if (categoria === 'todos') {
        atualizarDashboard(baseOcorrencias);
    } else {
        const filtrados = baseOcorrencias.filter(o => o.tipo === categoria);
        atualizarDashboard(filtrados);
    }
};

// ==========================================
// 5. REGISTRO DE NOVOS PERIGOS PELO USUÁRIO
// ==========================================
map.on('click', function(e) {
    const lat = e.latlng.lat.toFixed(5);
    const lng = e.latlng.lng.toFixed(5);

    // Menu suspenso (select) limpo definitivamente
    const formPopupHtml = `
        <div style="font-family: sans-serif; color: #1e293b; width: 220px; padding: 5px;">
            <h4 style="margin-top: 0; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">🚨 Emitir Novo Alerta</h4>
            
            <label style="font-size: 11px; font-weight: bold; display: block; margin-bottom: 3px;">Local / Ponto de Referência:</label>
            <input type="text" id="novo-bairro" placeholder="Ex: Centro, SC-401, Trindade..." style="width: 100%; padding: 6px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">

            <label style="font-size: 11px; font-weight: bold; display: block; margin-bottom: 3px;">Tipo de Ocorrência:</label>
            <select id="novo-tipo" style="width: 100%; padding: 6px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                <option value="assalto">Assalto / Roubo a Mão Armada</option>
                <option value="veiculo">Roubo ou Furto de Veículo</option>
                <option value="transito">Acidente com Retenção de Trânsito</option>
            </select>

            <button onclick="salvarNovaOcorrencia(${lat}, ${lng})" style="width: 100%; background: #ef4444; color: white; border: none; padding: 8px; font-weight: bold; border-radius: 4px; cursor: pointer;">
                Publicar Alerta no Mapa
            </button>
        </div>
    `;

    L.popup()
        .setLatLng(e.latlng)
        .setContent(formPopupHtml)
        .openOn(map);
});

window.salvarNovaOcorrencia = function(lat, lng) {
    const bairroInput = document.getElementById('novo-bairro').value.trim();
    const tipoSelect = document.getElementById('novo-tipo').value;

    if (!bairroInput) {
        alert("Por favor, informe a localização da ocorrência.");
        return;
    }

    const novaOcorrencia = {
        id: Date.now(),
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        count: 0.9,
        tipo: tipoSelect,
        bairro: bairroInput
    };

    baseOcorrencias.push(novaOcorrencia);
    localStorage.setItem('floripa_segura_dados_v4', JSON.stringify(baseOcorrencias));
    
    atualizarDashboard(baseOcorrencias);
    map.closePopup();
    adicionarAlertaFeed(bairroInput, tipoSelect);
};

// ==========================================
// 6. EXCLUSÃO DE REGISTRO
// ==========================================
window.excluirOcorrencia = function(id) {
    if (confirm("Deseja deletar este aviso do mapa? A informação sairá do ar definitivamente.")) {
        baseOcorrencias = baseOcorrencias.filter(ponto => ponto.id !== id);
        localStorage.setItem('floripa_segura_dados_v4', JSON.stringify(baseOcorrencias));
        atualizarDashboard(baseOcorrencias);
        map.closePopup();
    }
};

// ==========================================
// 7. CONTADORES, RELÓGIO E AUXILIARES
// ==========================================
function atualizarContadores() {
    const assaltos = baseOcorrencias.filter(o => o.tipo === 'assalto').length;
    const veiculos = baseOcorrencias.filter(o => o.tipo === 'veiculo').length;
    const transito = baseOcorrencias.filter(o => o.tipo === 'transito').length;

    const elAssalto = document.getElementById('count-assalto');
    const elVeiculo = document.getElementById('count-veiculo');
    const elTransito = document.getElementById('count-transito');

    if(elAssalto) elAssalto.innerText = assaltos;
    if(elVeiculo) elVeiculo.innerText = veiculos;
    if(elTransito) elTransito.innerText = transito;
}

function adicionarAlertaFeed(bairro, tipo) {
    const feed = document.querySelector('.alert-feed');
    if (feed) {
        let textoTipo = `Ocorrência de ${tipo}`;
        if (tipo === 'transito') textoTipo = 'Acidente com trânsito parado';
        if (tipo === 'assalto') textoTipo = 'Assalto à mão armada';
        if (tipo === 'veiculo') textoTipo = 'Roubo/Furto de veículo';

        const novoAlerta = document.createElement('p');
        novoAlerta.innerHTML = `📢 <strong>Novo Alerta:</strong> ${textoTipo} em ${bairro}.`;
        feed.insertBefore(novoAlerta, feed.firstChild);
    }
}

function iniciarRelogio() {
    const elementoRelogio = document.getElementById('live-clock');
    setInterval(() => {
        const agora = new Date();
        const horas = String(agora.getHours()).padStart(2, '0');
        const minutos = String(agora.getMinutes()).padStart(2, '0');
        if(elementoRelogio) elementoRelogio.innerText = `${horas}:${minutos}`;
    }, 1000);
}

iniciarRelogio();
atualizarDashboard(baseOcorrencias);