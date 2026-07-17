// Per project mission: Delta Health only links out to these vetted sources.
// Do not add new domains here without updating docs/MISSION.md first.

export const APPROVED_SOURCES = {
  va: {
    patientBillOfRights: "https://www.va.gov/health/rights/",
    missionAct: "https://www.va.gov/COMMUNITYCARE/programs/veterans/",
    facilityLocator: "https://www.va.gov/find-locations/",
    pactAct: "https://www.va.gov/pact-act/",
  },
  medical: {
    medlinePlus: "https://medlineplus.gov/",
    mayoClinic: "https://www.mayoclinic.org/",
    clevelandClinic: "https://my.clevelandclinic.org/health",
    cdc: "https://www.cdc.gov/",
    cancerOrg: "https://www.cancer.org/",
  },
  nih: {
    homeopathyFactSheet: "https://www.nccih.nih.gov/health/homeopathy",
  },
} as const;
