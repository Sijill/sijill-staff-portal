import { getLabOrderView, startLabSession, submitLabResult } from '../api/labApi';
import {
  getImagingOrderView,
  startImagingSession,
  submitImagingResult,
} from '../api/imagingApi';

export const PORTAL_TYPES = {
  LAB: {
    role: 'LAB',
    label: 'Laboratory',
    tokenEntryPath: '/lab-session',
    orderViewPath: '/lab-session/order',
    uploadPath: '/lab-session/upload-results',
    successPath: '/lab-session/result-submitted',
    activeSessionKey: 'activeLabSession',
    recentSessionsKey: 'recentLabSessions',
    startSession: startLabSession,
    getOrderView: getLabOrderView,
    orderKey: 'labOrder',
    submitResult: submitLabResult,
    tokenTitle: "Enter Patient's Lab Token",
    tokenDescription:
      'Enter the 6-digit patient token to open the lab order and upload results.',
    submitButtonLabel: 'Redeem Token',
    submittingLabel: 'Redeeming Token...',
    uploadKind: 'lab',
    successTitle: 'Lab Results Submitted Successfully!',
    successDescription: (patientName, recordedAt) =>
      `The lab results for ${patientName} have been submitted and the order is marked as completed. Session ended at ${recordedAt}.`,
  },
  IMAGING_CENTER: {
    role: 'IMAGING_CENTER',
    label: 'Imaging Center',
    tokenEntryPath: '/imaging-session',
    orderViewPath: '/imaging-session/order',
    uploadPath: '/imaging-session/upload-results',
    successPath: '/imaging-session/result-submitted',
    activeSessionKey: 'activeImagingSession',
    recentSessionsKey: 'recentImagingSessions',
    startSession: startImagingSession,
    getOrderView: getImagingOrderView,
    orderKey: 'imagingOrder',
    submitResult: submitImagingResult,
    tokenTitle: "Enter Patient's Imaging Token",
    tokenDescription:
      'Enter the 6-digit patient token to open the imaging order and upload study results.',
    submitButtonLabel: 'Redeem Token',
    submittingLabel: 'Redeeming Token...',
    uploadKind: 'imaging',
    successTitle: 'Imaging Results Submitted Successfully!',
    successDescription: (patientName, recordedAt) =>
      `The imaging study for ${patientName} has been submitted and the order is marked as completed. Session ended at ${recordedAt}.`,
  },
};

export function getPortalConfigByRole(role) {
  return Object.values(PORTAL_TYPES).find((config) => config.role === role) ?? null;
}

export function getPortalConfigByPath(pathname) {
  return Object.values(PORTAL_TYPES).find(
    (config) =>
      pathname === config.tokenEntryPath ||
      pathname.startsWith(`${config.tokenEntryPath}/`)
  );
}
