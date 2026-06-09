import { PORTAL_TYPES } from '../../constants/portalSessionConfig';
import PortalResultSubmitted from './PortalResultSubmitted';

export default function ImagingResultSubmittedPage() {
  return <PortalResultSubmitted config={PORTAL_TYPES.IMAGING_CENTER} />;
}
