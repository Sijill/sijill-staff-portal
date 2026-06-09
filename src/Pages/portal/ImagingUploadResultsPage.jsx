import { PORTAL_TYPES } from '../../constants/portalSessionConfig';
import ImagingUploadResults from './ImagingUploadResults';

export default function ImagingUploadResultsPage() {
  return <ImagingUploadResults config={PORTAL_TYPES.IMAGING_CENTER} />;
}
