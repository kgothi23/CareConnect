import React from 'react';

const treatments = [
  { name: 'General Consultation' },
  { name: 'Dental Care' },
  { name: 'Paediatrics' },
];

function TreatmentSelection({ setSelectedTreatment }) {
  return (
    <div>
      <h2>Select a Treatment</h2>
      <ul>
        {treatments.map((treatment) => (
          <li key={treatment.name}>
            <button onClick={() => setSelectedTreatment(treatment.name)}>
              {treatment.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TreatmentSelection;
