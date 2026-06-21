import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {
  getAuthenticatedRole,
  getRoleHomePath,
  isAuthenticatedUser,
} from '../../utils/authSession';
import { getPortalSession, isValidPortalSession } from '../../utils/portalSession';
import { getClinicalSession } from '../../utils/clinicalSession';
import { hasClinicalSession } from '../../Pages/provider/providerSessionUtils';

export default function ProtectedRoute({
  allowedRoles = [],
  sessionType = null,
  portalConfig = null,
  fallbackPath = '',
  children,
}) {
  const location = useLocation();
  const role = getAuthenticatedRole();

  if (!isAuthenticatedUser()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to={fallbackPath || getRoleHomePath(role)} replace />;
  }

  if (sessionType === 'clinical' && !hasClinicalSession(getClinicalSession())) {
    return <Navigate to={fallbackPath || '/provider-session'} replace />;
  }

  if (sessionType === 'portal') {
    const portalSession = getPortalSession(portalConfig);

    if (!isValidPortalSession(portalSession)) {
      return (
        <Navigate
          to={fallbackPath || portalConfig?.tokenEntryPath || '/'}
          replace
        />
      );
    }
  }

  return children ?? <Outlet />;
}
