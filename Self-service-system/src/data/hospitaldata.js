const hospitalSystem = {
    treatments: [
      {
        name: 'General Consultation',
        description: 'Basic health checkup and consultation.',
        image: '/images/beverages.jpg',
      },
      {
        name: 'Dental Care',
        description: 'Teeth cleaning, cavity filling and other dental services.',
        image: '/images/breakfast.jpg',
      },
      {
        name: 'Paediatrics',
        description: 'Healthcare for babies and children.',
        image: '/images/burgers.jpg',
      },
    ],
    Doctors: [
      {
        name: 'Dr. Jamie Gioio',
        speciality: 'Dental care',
        availability: [
            {day: 'Monday', time: '09:00 - 12:00'},
            {day: 'Wednesday', time: '12:00 - 15:00'},
            {day: 'Friday', time: '09:00 - 12:00'},
        ],
        image: '/images/t-mcdonalds-Coca-Cola-Classic-Small.jpg',
      },
      {
        name: 'Dr. Kagiso Kubu',
        speciality: 'General Consultation',
        availability: [
            {day: 'Monday', time: '09:00 - 14:00'},
            {day: 'Tuesday', time: '09:00 - 14:00'},
            {day: 'Thursday', time: '09:00 - 12:00'},
        ],
        image: '/images/t-mcdonalds-Coca-Cola-Classic-Small.jpg',
      },
      {
        name: 'Dr. Tarryn Arendse',
        speciality: 'Paediatrics',
        availability: [
            {day: 'Tuesday', time: '13:00 - 16:00'},
            {day: 'Wednesday', time: '12:00 - 15:00'},
        ],
        image: '/images/t-mcdonalds-Coca-Cola-Classic-Small.jpg',
      },
      {
        name: 'Dr. Kgothatso Mahuma',
        speciality: 'Paediatrics',
        availability: [
            {day: 'Tuesday', time: '12:00 - 15:00'},
            {day: 'Thursday', time: '09:00 - 13:00'},
        ],
        image: '/images/t-mcdonalds-Coca-Cola-Classic-Small.jpg',
      },
    ],
    appointments: [
        //This is used to store user appointments with details like
        // {userID, treatment, doctor, date, time}
    ],
    findAvailableDoctors: function(treatmentName) {
        return this.Doctors.filter(doctor => doctor.speciality == treatmentName);
    },
    bookAppointment: function(userID, treatmentName, doctorName, date, time) {
        const doctor = this.Doctors.find(doc => doc.name == doctorName);
        if (doctor && doctor.availability.some(avail => avail.day == date && avail.time == time)) {
            this.appointments.push({userID, treatment: treatmentName, doctor: doctorName, date, time});
            console.log('Appointment booked successfully!');
        } else {
            console.log('Doctor is not available at the selected time.');
        }
    }
  };

  module.exports = hospitalSystem;