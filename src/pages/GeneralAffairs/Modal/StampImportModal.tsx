import React, { useState } from 'react';
import StampImportModalOne from './\bStampModalStep/StampImportModalOne';
import StampImportModalTwo from './\bStampModalStep/StampImportModalTwo';
import StampImportModalThree from './\bStampModalStep/StampImportModalThree';
import StampImportModalFour from './\bStampModalStep/StampImportModalFour';
import StampImportConfirmModal from './StampImportConfirmModal';

type StampImportModalProps = {
  onClose: () => void;
  onModalClose: () => void;
};

const StampImportModal: React.FC<StampImportModalProps> = ({
  onClose, onModalClose
}) => {

  const [step, setStep] = useState(0);

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <StampImportModalOne onClose={onClose} nextStep={setStep} />
        );
      case 1:
        return (
          <StampImportModalTwo onClose={onClose} nextStep={setStep} />
        );
      case 2:
        return (
          <StampImportModalThree onClose={onClose} nextStep={setStep} />
        );
      case 3:
        return (
          <StampImportModalFour onClose={onClose} nextStep={setStep} />
        );
      case 4:
        return (
          <StampImportConfirmModal onClose={onClose} onModalClose={onModalClose} />
        );
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default StampImportModal;
