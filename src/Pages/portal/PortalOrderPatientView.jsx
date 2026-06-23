import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MedicalInfoSection from '../../Components/provider/MedicalInfoSection';
import ProviderLoadingToast from '../../Components/provider/ProviderLoadingToast';
import ProviderSessionLayout from '../../Components/provider/ProviderSessionLayout';
import ProviderStatusMessage from '../../Components/provider/ProviderStatusMessage';
import { Ruler, Scale, ShieldPlus } from 'lucide-react';
import usePortalSession, { getPortalSessionToken } from './usePortalSession';
import {
  buildCompactMedicalSections,
  buildImagingOrderSection,
  buildLabOrderSection,
  buildPatientIdentitySection,
} from './portalSessionUtils';

export default function PortalOrderPatientView({ config }) {
  const navigate = useNavigate();
  const { portalSession, patient } = usePortalSession(config);
  const [identity, setIdentity] = useState(null);
  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!portalSession?.sessionId) {
      return;
    }

    const sessionToken = getPortalSessionToken(portalSession);
    const loadData = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await config.getOrderView(portalSession.sessionId, sessionToken);
        setIdentity(response.patientMedicalIdentity ?? null);
        setOrder(response[config.orderKey] ?? null);
      } catch (error) {
        setErrorMessage(error.message || 'Unable to load patient and order details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [config, portalSession?.sessionId, portalSession?.sessionToken, portalSession?.clinicalSessionToken]);

  const sections = useMemo(() => {
    const orderSection =
      config.uploadKind === 'lab' ? buildLabOrderSection(order) : buildImagingOrderSection(order);

    return [
      buildPatientIdentitySection(identity),
      ...buildCompactMedicalSections(identity),
      orderSection,
    ];
  }, [config.uploadKind, identity, order]);

  const stats = buildStats(identity?.basicInfo ?? identity ?? {});
  const patientWithImage = useMemo(
    () => ({
      ...patient,
      imageUrl:
        identity?.patient?.profilePictureUrl ??
        identity?.patient?.profile_picture_url ??
        identity?.patient?.avatarUrl ??
        identity?.patient?.imageUrl ??
        identity?.profilePictureUrl ??
        identity?.profile_picture_url ??
        identity?.avatarUrl ??
        identity?.imageUrl ??
        patient?.imageUrl ??
        '',
    }),
    [identity, patient]
  );

  return (
    <>
      <ProviderSessionLayout
        patient={patientWithImage}
        stats={stats}
        onBack={() => navigate(config.tokenEntryPath)}
      >
        {isLoading ? (
          <ProviderStatusMessage
            icon={LoaderCircle}
            message="Loading patient and order details..."
            tone="info"
            className="py-5"
          />
        ) : (
          <>
            <ProviderStatusMessage icon={AlertCircle} message={errorMessage} tone="danger" />
            {sections.map((section) => (
              <MedicalInfoSection key={section.title} {...section} />
            ))}

            {!errorMessage ? (
              <div className="d-flex justify-content-end pt-4">
                <button
                  type="button"
                  className="provider-session-start-button"
                  onClick={() =>
                    navigate(config.uploadPath, {
                      state: { portalSession },
                    })
                  }
                >
                  <ArrowRight size={18} />
                  <span>Continue to Upload Results</span>
                </button>
              </div>
            ) : null}
          </>
        )}
      </ProviderSessionLayout>

      <ProviderLoadingToast message="Loading order details..." show={isLoading} />
    </>
  );
}

function buildStats(basicInfo) {
  return [
    {
      label: 'Blood Type',
      value: basicInfo.bloodType || 'Not set',
      icon: ShieldPlus,
      iconBg: '#fff1f1',
      iconColor: '#d14949',
    },
    {
      label: 'Weight',
      value: basicInfo.weightKg ? `${basicInfo.weightKg} KG` : 'Not set',
      icon: Scale,
      iconBg: '#edf5f4',
      iconColor: '#285f62',
    },
    {
      label: 'Height',
      value: basicInfo.heightCm ? `${basicInfo.heightCm} CM` : 'Not set',
      icon: Ruler,
      iconBg: '#eefafb',
      iconColor: '#36c8d3',
    },
  ];
}
