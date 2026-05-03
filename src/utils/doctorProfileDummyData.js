export const doctorProfileStatus = {
  basicInfo: true,
  clinicInfo: false,
  documents: {
    medicalLicense: false,
    degreeCertificate: true,
    governmentId: false,
  },
  availability: false,
};

export const calculateDoctorProfileCompletion = () => {
  let score = 0;

  if (doctorProfileStatus.basicInfo) score += 30;
  if (doctorProfileStatus.clinicInfo) score += 30;

  const docsCompleted =
    doctorProfileStatus.documents.medicalLicense &&
    doctorProfileStatus.documents.degreeCertificate &&
    doctorProfileStatus.documents.governmentId;

  if (docsCompleted) score += 30;
  if (doctorProfileStatus.availability) score += 10;

  return score;
};
