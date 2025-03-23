// Este script se puede ejecutar antes del despliegue para asegurar que los archivos JSON se copien correctamente
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

// Obtener el directorio actual en módulos ES
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Asegurarse de que la carpeta dist existe
if (!fs.existsSync(path.join(__dirname, "..", "dist"))) {
  fs.mkdirSync(path.join(__dirname, "..", "dist"))
}

// Copiar el archivo cims.json a la carpeta dist
fs.copyFileSync(path.join(__dirname, "cims.json"), path.join(__dirname, "..", "dist", "cims.json"))

console.log("Archivo cims.json copiado a la carpeta dist")

