import { PORTAL_TYPES } from '../../constants/portalSessionConfig';
import LabUploadResults from './LabUploadResults';

export default function LabUploadResultsPage() {
  return <LabUploadResults config={PORTAL_TYPES.LAB} />;
}
