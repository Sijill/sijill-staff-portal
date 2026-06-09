import { PORTAL_TYPES } from '../../constants/portalSessionConfig';
import PortalSessionPage from './PortalSessionPage';

export default function LabSessionPage() {
  return <PortalSessionPage config={PORTAL_TYPES.LAB} />;
}
