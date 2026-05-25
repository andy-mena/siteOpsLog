// src/scripts/runImport.ts
import { connectDB } from '../config/database';
import { importSitesFromExcel } from './ImportSite';
import mongoose from 'mongoose';
import path from 'path';

const run = async () => {
  // 1. Conectar a la DB
  await connectDB();

  // 2. Ruta del archivo Excel
  const excelPath = path.join(__dirname, '../../dataframe_db.xlsx');

  console.log('🚀 Iniciando proceso de importación desde terminal...');
  
  // 3. Ejecutar importación
  await importSitesFromExcel(excelPath);

  // 4. Cerrar conexión y salir
  console.log('🔌 Cerrando conexión a MongoDB...');
  await mongoose.connection.close();
  process.exit(0);
};

run();