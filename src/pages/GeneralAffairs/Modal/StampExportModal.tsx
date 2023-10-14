import React, { useState } from 'react';
import StampExportModalOne from './\bStampModalStep/StampExportModalOne';
import StampExportModalTwo from './\bStampModalStep/StampExportModalTwo';
import StampExportModalThree from './\bStampModalStep/StampExportModalThree';

type StampImportModalProps = {
  onClose: () => void;
  onModalClose: () => void;
};

const StampExportModal: React.FC<StampImportModalProps> = ({
  onClose, onModalClose
}) => {

  const [step, setStep] = useState(0);

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <StampExportModalOne onClose={onClose} nextStep={setStep} />
        );
      case 1:
        return (
          <StampExportModalTwo onClose={onClose} nextStep={setStep} />
        );
      case 2:
        return (
          <StampExportModalThree onClose={onClose} nextStep={setStep} onModalClose={onModalClose}/>
        );
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default StampExportModal;
