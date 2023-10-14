import { useState, useEffect, useCallback } from 'react';
import CourierSelection from './CourierSelection';
import SendingAddress from './SendingAddress';
import ReceivingAddress from './ReceivingAddress';
import SelectDay from './SelectDay';
import ReservationDetails from './ReservationDetails';

function CourierReservation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentComponent, setCurrentComponent] = useState();

  const handleNext = useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 1) {
      setCurrentComponent(<CourierSelection onNext={handleNext} />);
    } else if (currentStep === 2) {
      setCurrentComponent(<ReceivingAddress onNext={handleNext} />);
    } else if (currentStep === 3) {
      setCurrentComponent(<SendingAddress onNext={handleNext} />);
    } else if (currentStep === 4) {
      setCurrentComponent(<SelectDay onNext={handleNext} />);
    } else if (currentStep === 5) {
      setCurrentComponent(<ReservationDetails onNext={handleNext} />);
    }
  }, [currentStep]);

  return <div>{currentComponent}</div>;
}

export default CourierReservation;
