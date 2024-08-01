import React from 'react';

function AppointmentBooking({ doctor }) {
  const handleBooking = () => {
    alert(`Appointment booked with Dr. ${doctor.name}`);
  };

  return (
    <div>
      <h2>Book an Appointment with Dr. {doctor.name}</h2>
      <button onClick={handleBooking}>Book Appointment</button>
    </div>
  );
}

export default AppointmentBooking;
