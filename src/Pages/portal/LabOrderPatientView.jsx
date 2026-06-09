import { PORTAL_TYPES } from '../../constants/portalSessionConfig';
import PortalOrderPatientView from './PortalOrderPatientView';

export default function LabOrderPatientView() {
  return <PortalOrderPatientView config={PORTAL_TYPES.LAB} />;
}
