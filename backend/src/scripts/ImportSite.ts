import xlsx from 'xlsx';
import Sites from '../models/SitesSchema';

export const importSitesFromExcel = async (filePath: string) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data: any[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log(`📊 Iniciando importación de ${data.length} sitios...`);

    const operations = data.map(item => {
      return {
        updateOne: {
          filter: { siteId: item.CELL.toString().trim() }, // Columna CELL -> siteId
          update: {
            $set: {
              siteId: item.CELL.toString().trim(),
              name: item.NOMBRE.trim(),                 // Columna NOMBRE -> name
              latitude: Number(item.LATITUD),           // Columna LATITUD -> latitude
              longitude: Number(item.LONGITUD)          // Columna LONGITUD -> longitude
            }
          },
          upsert: true // Si no existe el ID, lo crea; si existe, lo actualiza
        }
      };
    });

    // Ejecutamos todo en un solo movimiento para que sea ultra rápido
    await Sites.bulkWrite(operations);

    console.log('✅ Base de datos de sitios actualizada exitosamente');
  } catch (error) {
    console.error('❌ Error procesando el Excel:', error);
  }
};