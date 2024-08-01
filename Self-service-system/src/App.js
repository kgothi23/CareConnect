import React, { useState } from 'react';
import TreatmentSelection from './components/TreatmentSelection';
import DoctorAvailability from './components/DoctorAvailability';
import AppointmentBooking from './components/AppointmentBooking';
import './App.css';

function App() {
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="App">
      <h1>Care Connect</h1>
      <TreatmentSelection setSelectedTreatment={setSelectedTreatment} />
      {selectedTreatment && (
        <DoctorAvailability
          treatment={selectedTreatment}
          setSelectedDoctor={setSelectedDoctor}
        />
      )}
      {selectedDoctor && <AppointmentBooking doctor={selectedDoctor} />}
    </div>
  );
}

export default App;
