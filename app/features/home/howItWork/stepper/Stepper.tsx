import cx from 'classnames';
import { useState } from 'react';
import { TiTick } from 'react-icons/ti';

import Button from '@/components/Button';

type StepperProps = {
  setIsOpen: (isOpen: boolean) => void;
};

function Stepper({ setIsOpen }: StepperProps) {
  const steps = ['Paso 1', 'Paso 2', 'Paso 3'];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const handleStep = () => {
    if (currentStep === steps.length) {
      setIsOpen(false);
      setComplete(true);
    } else setCurrentStep((prev) => prev + 1);
  };

  return (
    <>
      <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={`step-item ${currentStep === i + 1 && 'active'} ${
              (i + 1 < currentStep || complete) && 'complete'
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
      <div className={cx(
        'p-4 block w-full text-center m-4',
      )}
      >
        {
        currentStep === 1
          ? (
            <div className="flex justify-center">
              <img src="/paso1.jpg" alt="paso1" className="md:h-[200px] h-[100px]" />
            </div>
          )
          : ''
      }

        {
        currentStep === 2
          ? (
            <div className="flex justify-center">
              <img src="/paso2.jpg" alt="paso1" className="md:h-[200px] h-[100px]" />
            </div>
          )
          : ''
      }

        {
        currentStep === 3
          ? (
            <div className="flex justify-center">
              <img src="/paso3.jpg" alt="paso1" className="md:h-[200px] h-[100px]" />
            </div>
          )
          : ''
      }

      </div>
      {!complete && (
        <div className="mt-10 mb-6 grid place-items-center">
          <Button
            onClick={handleStep}
            className="py-3 !px-6 rounded-3xl bg-green-h"
          >
            {currentStep === steps.length ? 'Cerrar' : 'Siguiente'}
          </Button>
        </div>
      )}
    </>
  );
}

export default Stepper;
