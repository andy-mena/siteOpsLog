export const WORK_OPTIONS = [
  { value: 'Cambio de SFP INDOOR', label: 'Cambio de SFP INDOOR' },
  { value: 'CAMBIO DE SFP OUTDOOR', label: 'CAMBIO DE SFP OUTDOOR' },
  { value: 'CAMBIO DE FIBRA 50', label: 'CAMBIO DE FIBRA 50' },
  { value: 'CAMBIO DE FIBRA 70', label: 'CAMBIO DE FIBRA 70' },
  { value: 'CAMBIO DE FIBRA 100', label: 'CAMBIO DE FIBRA 100' },
  { value: 'CAMBIO DE PATCHCORD', label: 'CAMBIO DE PATCHCORD' },
  { value: 'CAMBIO DE RADIO 4499', label: 'CAMBIO DE RADIO 4499' },
  { value: 'CAMBIO DE RADIO 4415', label: 'CAMBIO DE RADIO 4415' },
  { value: 'CAMBIO DE RADIO 2219 B5', label: 'CAMBIO DE RADIO 2219 B5' },
  { value: 'CAMBIO DE RADIO 2219 B28', label: 'CAMBIO DE RADIO 2219 B28' },
  { value: 'otro', label: 'Otro' },
] as const;

export type WorkOptionValue = typeof WORK_OPTIONS[number]['value'];