import mongoose, {Schema, Document } from "mongoose";

export interface ISite extends Document {
    siteId: string;
    name: string;
    latitude: number;
    longitude: number;
    wazeLink?: string;
    createdAt: Date;
    updatedAt: Date;
}

const SitesSchema: Schema = new Schema({
    siteId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    latitude: {
        type: Number,
        required: true
    },

    longitude: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }

});

SitesSchema.virtual('wazeLink').get(function(this: ISite) {
    return `https://www.waze.com/ul?ll=${this.latitude}%2C${this.longitude}&navigate=yes`;
})


const Sites = mongoose.model<ISite>('Sites', SitesSchema);
export default Sites;