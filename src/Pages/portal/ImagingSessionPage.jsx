import { PORTAL_TYPES } from '../../constants/portalSessionConfig';
import PortalSessionPage from './PortalSessionPage';

export default function ImagingSessionPage() {
  return <PortalSessionPage config={PORTAL_TYPES.IMAGING_CENTER} />;
}
