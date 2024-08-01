import React from 'react';

const doctors = [
  {
    name: 'Dr. Jamie Gioio',
    speciality: 'Dental care',
    availability: [
    {day: 'Monday', time: '09:00 - 12:00'},
    {day: 'Wednesday', time: '12:00 - 15:00'},
    {day: 'Friday', time: '09:00 - 12:00'},
    ],
  },
  {
    name: 'Dr. Kgothatso Mahuma',
    speciality: 'Paediatrics',
    availability: [
    {day: 'Tuesday', time: '12:00 - 15:00'},
    {day: 'Thursday', time: '09:00 - 13:00'},
    ],
  },
  {
    name: 'Dr. Kagiso Kubu',
    speciality: 'General Consultation',
    availability: [
    {day: 'Monday', time: '09:00 - 14:00'},
    {day: 'Tuesday', time: '09:00 - 14:00'},
    {day: 'Thursday', time: '09:00 - 12:00'},
    ],
  },
  {
    name: 'Dr. Tarryn Arendse',
    speciality: 'Paediatrics',
    availability: [
    {day: 'Tuesday', time: '13:00 - 16:00'},
    {day: 'Wednesday', time: '12:00 - 15:00'},
    ],
  },
];

function DoctorAvailability({ treatment, setSelectedDoctor }) {
  const availableDoctors = doctors.filter((doctor) => doctor.specialty === treatment);

  return (
    <div>
      <h2>Available Doctors for {treatment}</h2>
      <ul>
        {availableDoctors.map((doctor) => (
          <li key={doctor.name}>
            <button onClick={() => setSelectedDoctor(doctor)}>
              {doctor.name} - {doctor.availability.map(a => `${a.day} (${a.time})`).join(', ')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorAvailability;
