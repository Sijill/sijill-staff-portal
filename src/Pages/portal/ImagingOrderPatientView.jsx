import { PORTAL_TYPES } from '../../constants/portalSessionConfig';
import PortalOrderPatientView from './PortalOrderPatientView';

export default function ImagingOrderPatientView() {
  return <PortalOrderPatientView config={PORTAL_TYPES.IMAGING_CENTER} />;
}
