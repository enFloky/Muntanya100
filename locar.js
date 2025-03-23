/**
 * locaR.js - Biblioteca para Realidad Aumentada basada en ubicación
 * Versión simplificada para Muntanya100
 */

;((global) => {
    // Objeto principal
    const locar = {
      // Configuración
      config: {
        position: null,
        scale: 1,
        worldScale: 100, // Factor de escala para convertir coordenadas GPS a mundo 3D
      },
  
      // Inicializar la biblioteca
      init: function (options) {
        // Fusionar opciones con la configuración predeterminada
        if (options) {
          if (options.position) this.config.position = options.position
          if (options.scale) this.config.scale = options.scale
          if (options.worldScale) this.config.worldScale = options.worldScale
        }
  
        // Verificar que tenemos una posición inicial
        if (!this.config.position) {
          throw new Error("Se requiere una posición inicial para inicializar locaR.js")
        }
  
        console.log("locaR.js inicializado con posición:", this.config.position)
  
        return this
      },
  
      // Actualizar la posición del usuario
      updatePosition: function (position) {
        this.config.position = position
        return this
      },
  
      // Convertir coordenadas GPS a coordenadas del mundo 3D
      latLonToWorld: function (latitude, longitude) {
        if (!this.config.position) {
          throw new Error("No hay posición de usuario configurada")
        }
  
        // Calcular diferencia en grados
        const latDiff = latitude - this.config.position.latitude
        const lonDiff = longitude - this.config.position.longitude
  
        // Convertir a radianes
        const latRad = (this.config.position.latitude * Math.PI) / 180
  
        // Calcular distancia en metros (aproximada)
        // 1 grado de latitud ≈ 111.32 km
        // 1 grado de longitud ≈ 111.32 * cos(latitud) km
        const latDistance = latDiff * 111320
        const lonDistance = lonDiff * 111320 * Math.cos(latRad)
  
        // Convertir a coordenadas del mundo 3D
        // Escalar según el factor de escala mundial
        // Invertir el eje Z para que los valores positivos estén hacia el norte
        const x = lonDistance / this.config.worldScale
        const z = -latDistance / this.config.worldScale
  
        return { x, z }
      },
  
      // Calcular distancia entre dos puntos GPS en kilómetros
      calculateDistance: (lat1, lon1, lat2, lon2) => {
        const R = 6371 // Radio de la Tierra en km
        const dLat = ((lat2 - lat1) * Math.PI) / 180
        const dLon = ((lon2 - lon1) * Math.PI) / 180
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
      },
  
      // Calcular rumbo entre dos puntos GPS en grados
      calculateBearing: (lat1, lon1, lat2, lon2) => {
        const dLon = ((lon2 - lon1) * Math.PI) / 180
        const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180)
        const x =
          Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
          Math.sin((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.cos(dLon)
        const bearing = (Math.atan2(y, x) * 180) / Math.PI
        return (bearing + 360) % 360
      },
    }
  
    // Exponer la biblioteca al ámbito global
    global.locar = locar
  })(typeof window !== "undefined" ? window : this)
  
  