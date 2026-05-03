const providerSessionStepRoutes = [
  {
    label: 'Medical Identity',
    path: '/provider-session/patient-medical-identity',
    previousPath: '/provider-session',
  },
  {
    label: 'Medical History',
    path: '/provider-session/patient-medical-history',
    previousPath: '/provider-session/patient-medical-identity',
  },
  {
    label: 'Document Session',
    path: '/provider-session/patient-document-session',
    previousPath: '/provider-session/patient-medical-history',
  },
];

export const buildProviderSessionSteps = (pathname, clinicalSession) =>
  providerSessionStepRoutes.map((step) => ({
    ...step,
    active: step.path === pathname,
    state: { clinicalSession },
  }));

export const getProviderSessionBackPath = (pathname) =>
  providerSessionStepRoutes.find((step) => step.path === pathname)?.previousPath ?? null;

export const isProviderSessionStepPath = (pathname) =>
  providerSessionStepRoutes.some((step) => step.path === pathname);
