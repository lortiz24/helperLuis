function generarDatosJuego(cantidad) {
  // Opciones para generar datos aleatorios
  const opcionesRatio = [
    0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6,
    1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1,
    3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0,
  ];
  /*  const opcionesHabilidad = ["Bajo", "Medio", "Alto"]; */
  const opcionesTiempo = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170,
    180, 190, 200, 210, 220, 230, 240, 250, 270, 280, 290, 300, 310, 320, 330,
    340, 350, 360,
  ];
  //   const opcionesArma = ["Pistola", "Escopeta", "Rifle", "Granada", "Cuchillo"];
  const opcionesModo = [
    "Combate a muerte",
    "Capturar la bandera",
    "Zona de guerra",
    "Todos contra todos",
    "Team deatmatch",
  ];
  const opcionesConexion = [
    53.84776838174752, 62.3020193649968, 83.95001385205788, 76.95120235210784,
    72.77390239403296, 60.52451401142034, 73.68454509870318, 73.80052247157595,
    66.40770878744409, 90.30860520750433, 66.23211905812349, 77.797510503323,
    73.14272025714036, 72.38207755155695, 78.55909935441848, 87.44467483560496,
    67.01804295543262, 76.42254331266084, 74.93775687208992, 59.84051081552926,
    84.40558536807328, 69.181944790186, 62.6867057975567, 75.56820403836444,
    77.84802387211934, 72.24032596721891, 84.05673274204717, 80.84352038224885,
    79.9491404762831, 60.17242616720216, 69.46926440629935, 77.18393893621426,
    64.03137729120362, 77.06678274058122, 70.55493788396313, 76.75103578003683,
    78.27321679780342, 63.82263686271297, 69.43837852661198, 72.74477314185702,
    73.23798932332636, 73.50027982907713, 76.6191088372073, 73.1139543201205,
    68.59090157675244, 78.69146303954545, 73.400620368,
  ];
  const opcionesRegion = ["Norteamérica", "Europa", "Asia", "Sudamérica"];
  const opcionesDispositivo = ["PC", "Consola", "Móvil"];

  let datos = [];

  for (let i = 0; i < cantidad; i++) {
    let ratio = opcionesRatio[Math.floor(Math.random() * opcionesRatio.length)];
    let tiempo =
      opcionesTiempo[Math.floor(Math.random() * opcionesTiempo.length)];
    let modo = opcionesModo[Math.floor(Math.random() * opcionesModo.length)];
    let conexion = (Math.random() * (600 - 60) + 60).toFixed(2);
    let region =
      opcionesRegion[Math.floor(Math.random() * opcionesRegion.length)];
    let dispositivo =
      opcionesDispositivo[
        Math.floor(Math.random() * opcionesDispositivo.length)
      ];
    let partidas = Math.floor(Math.random() * 1000);
    let victorias = Math.floor(Math.random() * partidas);
    let derrotas = Math.floor(
      Math.random() * Math.random() * (partidas - victorias)
    );
    let abandono = partidas - victorias - derrotas;

    datos.push({
      ratioBajasMuertes: ratio,
      tiempoJuego: tiempo,
      modoJuego: modo,
      nivelConexion: conexion,
      regionGeografica: region,
      cantidadAbandono: abandono,
      dispositivoJuego: dispositivo,
      cantidadPartidas: partidas,
      cantidadVictorias: victorias,
      cantidadDerrotas: derrotas,
    });
  }
  return datos;
}

module.exports = {
  generarDatosJuego,
};
