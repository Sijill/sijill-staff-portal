import { PORTAL_TYPES } from '../../constants/portalSessionConfig';
import PortalResultSubmitted from './PortalResultSubmitted';

export default function LabResultSubmittedPage() {
  return <PortalResultSubmitted config={PORTAL_TYPES.LAB} />;
}
