import { formatPatientMeta } from '../../constants/medicalConstants';

export function hasClinicalSession(session) {
  return Boolean(session?.sessionId && session?.clinicalSessionToken);
}

export function canWriteClinicalSession(accessType) {
  return accessType === 'WRITE_ONLY' || accessType === 'READ_WRITE';
}

export function getProviderPatientSummary(session) {
  return {
    name: session?.patient?.fullName || 'Unknown Patient',
    meta: formatPatientMeta(session?.patient),
    imageUrl: resolvePatientImageUrl(session?.patient),
  };
}

export function resolvePatientImageUrl(source) {
  const candidate =
    source?.profilePictureUrl ??
    source?.profile_picture_url ??
    source?.profilePicture ??
    source?.profile_picture ??
    source?.avatarUrl ??
    source?.avatar_url ??
    source?.avatar ??
    source?.imageUrl ??
    source?.image_url ??
    source?.photoUrl ??
    source?.photo_url ??
    source?.photo ??
    source?.image;

  if (typeof candidate === 'string') {
    return candidate;
  }

  if (candidate && typeof candidate === 'object') {
    return candidate.url ?? candidate.imageUrl ?? candidate.src ?? '';
  }

  return '';
}
