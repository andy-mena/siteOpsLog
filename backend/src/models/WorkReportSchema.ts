import mongoose, { Document, Schema, Types } from "mongoose";

export interface IWorkReport extends Document {
    site: Types.ObjectId;       // Referencia al ID de MongoDB del Sitio
    siteId: string;             // Mantenemos el código (410006) para búsquedas rápidas
    reportedBy: Types.ObjectId; // Referencia al Usuario
    incChg: string;
    teamType: string;
    workDone: string;
    workSummary: string;
    createdAt: Date;
    updatedAt: Date;
}

const WorkReportSchema: Schema = new Schema({
    site: {
        type: Schema.Types.ObjectId,
        ref: 'Sites', // Debe coincidir con el nombre que usaste en mongoose.model('Sites', ...)
        required: true
    },
    siteId: {
        type: String,
        required: true,
        index: true 
    },
    reportedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    incChg: {
        type: String,
        required: true,
        trim: true
    },
    teamType: {
        type: String,
        default: "Emergencia"
    },
    workDone: {
        type: String,
        required: true,
        trim: true
    },
    workSummary: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const WorkReport = mongoose.model<IWorkReport>('WorkReport', WorkReportSchema);
export default WorkReport;