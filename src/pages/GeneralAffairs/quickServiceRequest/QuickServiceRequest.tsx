import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import QuickStepOne from './step/QuickStepOne';
import QuickStepTwo from './step/QuickStepTwo';
import QuickStepThree from './step/QuickStepThree';
import QuickStepFour from './step/QuickStepFour';

type QuickServiceRequestProps = {
  onClose: () => void;
};

const QuickServiceRequest: React.FC<QuickServiceRequestProps> = ({
  onClose,
}) => {
  const [step, setStep] = useState(1);

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <QuickStepOne onClose={onClose} handleNextStep={handleNextStep} />
        );
      case 2:
        return (
          <QuickStepTwo onClose={onClose} handleNextStep={handleNextStep} />
        );
      case 3:
        return (
          <QuickStepThree onClose={onClose} handleNextStep={handleNextStep} />
        );
      case 4:
        return (
          <QuickStepFour onClose={onClose} handleNextStep={handleNextStep} />
        );
      default:
        return null;
    }
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return <>{renderContent()}</>;
};

export default QuickServiceRequest;
