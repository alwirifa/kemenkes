import React, { useState, useMemo } from "react";
import Stepper from "./Stepper";
import QuestionerForm from "./KuesionerForm";
import Identitas from "./1-identitas";
import Kemenkes from "./2-kemenkes";

const Home = () => {
  const steps = useMemo(
    () => [
      {
        title: "DATA UMUM (WAJIB DIISI)",
        content: <Identitas />,
      },

      {
        title: "DATA IDENTITAS (WAJIB DIISI)",
        content: <Kemenkes />,
      },

      // Add more steps as needed
    ],
    []
  );

  const [currentStep, setCurrentStep] = useState(0);

  const handleSave = () => {
    // Tambahkan logika penyimpanan data di sini
    alert("Data saved!");
  };

  return (
    <div className="mx-auto max-w-7xl w-full">
      <div className="pb-16">
        <h1 className="text-4xl text-center font-semibold text-muted-foreground">Isi Kuesioner</h1>
      </div>
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onSave={handleSave}
      />
    </div>
  );
};

export default Home;
