export interface ReportFormData {
  siteId: string;
  siteName: string;
  incChg: string;
  workDone: string;
  workSummary: string;
}

export interface ReportSubmitData extends ReportFormData {
  technicianName: string;
  technicianRole: string;
  createdAt?: Date;
}

export interface TechnicianInfo {
  name: string;
  role: string;
  photoUrl: string;
}

export interface Sites {
  _id: string,
  siteId: string;
  name: string;
  latitude: number;
  longitude: number;
  wazeLink?: string;
  id: string
}

export interface SiteAutoFill  {
  siteId: string,
  name: string
}

export type SiteReport = {
  _id: string;
  site: {
    _id: string;
    siteId: string;
    name: string;
    wazeLink: string;
    id: string;
  };
  reportedBy: {
    name: string;
    lastname: string;
  };
  incChg: string;
  teamType: string;
  workDone: string;
  workSummary: string;
  createdAt: string;
  updatedAt: string;
};