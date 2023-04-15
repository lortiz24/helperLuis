function generarDatosJuego(cantidad) {
  // Opciones para generar datos aleatorios
  const opcionesRatio = [0.2, 0.5, 0.8, 1.0, 1.2, 1.5, 1.8, 2.0];
  const opcionesHabilidad = ["Bajo", "Medio", "Alto"];
  const opcionesTiempo = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
//   const opcionesArma = ["Pistola", "Escopeta", "Rifle", "Granada", "Cuchillo"];
  const opcionesModo = [
    "Combate a muerte",
    "Capturar la bandera",
    "Zona de guerra",
  ];
  const opcionesConexion = ["Baja", "Media", "Alta"];
  const opcionesRegion = ["Norte", "Sur", "Este", "Oeste"];
  const opcionesAbandono = [0, 1, 2, 3, 4, 5];
  const opcionesDispositivo = ["PC", "Consola", "Móvil"];
  const opcionesPartidas = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const opcionesVictorias = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const opcionesDerrotas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  let datos = [];

  // Genera datos aleatorios para cada campo y los guarda en un objeto
  for (let i = 0; i < cantidad; i++) {
    let ratio = opcionesRatio[Math.floor(Math.random() * opcionesRatio.length)];
    let habilidad =
      opcionesHabilidad[Math.floor(Math.random() * opcionesHabilidad.length)];
    let tiempo =
      opcionesTiempo[Math.floor(Math.random() * opcionesTiempo.length)];
    // let arma = opcionesArma[Math.floor(Math.random() * opcionesArma.length)];
    let modo = opcionesModo[Math.floor(Math.random() * opcionesModo.length)];
    let conexion =
      opcionesConexion[Math.floor(Math.random() * opcionesConexion.length)];
    let region =
      opcionesRegion[Math.floor(Math.random() * opcionesRegion.length)];
    let abandono =
      opcionesAbandono[Math.floor(Math.random() * opcionesAbandono.length)];
    let dispositivo =
      opcionesDispositivo[
        Math.floor(Math.random() * opcionesDispositivo.length)
      ];
    let partidas =
      opcionesPartidas[Math.floor(Math.random() * opcionesPartidas.length)];
    let victorias =
      opcionesVictorias[Math.floor(Math.random() * opcionesVictorias.length)];
    let derrotas =
      opcionesDerrotas[Math.floor(Math.random() * opcionesDerrotas.length)];

    // Crea un objeto con los datos generados y lo agrega al arreglo de datos
    datos.push({
      ratioBajasMuertes: ratio,
      nivelHabilidad: habilidad,
      tiempoJuego: tiempo,
    //   nivelArmamento: arma,
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
  return datos
}

module.exports ={
    generarDatosJuego
}
