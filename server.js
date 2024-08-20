const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const data = require('./data');

dotenv.config();

console.log('MONGODB_URL:', process.env.MONGODB_URL);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Service = mongoose.model(
  'Service',
  new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    calorie: Number,
    department: String,
  })
);

app.get('/api/Service/seed', async (req, res) => {
  await Service.remove({});
  const Service = await Service.insertMany(data.Service);
  res.send({ Service });
});

app.get('/api/Service', async (req, res) => {
  const { department } = req.query;
  const Service = await Service.find(department ? { department } : {});
  res.send(Service);
});

app.post('/api/Service', async (req, res) => {
  const newService = new Service(req.body);
  const savedService = await newService.save();
  res.send(savedService);
});

app.get('/api/departments', (req, res) => {
  res.send(data.departments);
});

const Appointment = mongoose.model(
  'Appointment',
  new mongoose.Schema(
    {
      number: { type: Number, default: 0 },
      appointmentType: String,
      paymentType: String,
      isPaid: { type: Boolean, default: false },
      isReady: { type: Boolean, default: false },
      inProgress: { type: Boolean, default: true },
      isCanceled: { type: Boolean, default: false },
      isCompleted: { type: Boolean, default: false },
      itemsPrice: Number,
      taxPrice: Number,
      totalPrice: Number,
      appointmentItems: [
        {
          name: String,
          price: Number,
          quantity: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app.get('/api/appointments', async (req, res) => {
  const appointments = await Appointment.find({ isCompleted: false, isCanceled: false });
  res.send(appointments);
});

app.put('/api/appointments/:id', async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    if (req.body.action === 'ready') {
      appointment.isReady = true;
      appointment.inProgress = false;
    } else if (req.body.action === 'complete') {
      appointment.isCompleted = true;
    } else if (req.body.action === 'cancel') {
      appointment.isCanceled = true;
    }
    await appointment.save();

    res.send({ message: 'Done' });
  } else {
    req.status(404).message({ message: 'Appointment not found' });
  }
});
app.post('/api/appointments', async (req, res) => {
  const lastAppointment = await Appointment.find().sort({ number: -1 }).limit(1);
  const lastNumber = lastAppointment.length === 0 ? 0 : lastAppointment[0].number;
  if (
    !req.body.appointmentType ||
    !req.body.paymentType ||
    !req.body.appointmentItems ||
    req.body.appointmentItems.length === 0
  ) {
    return res.send({ message: 'Data is required.' });
  }
  const appointment = await Appointment({ ...req.body, number: lastNumber + 1 }).save();
  res.send(appointment);
});

app.get('/api/appointments/queue', async (req, res) => {
  const inProgressappointments = await Appointment.find(
    { inProgress: true, isCanceled: false },
    'number'
  );
  const completedAppointments = await Appointment.find(
    { isReady: true, isCompleted: false },
    'number'
  );

  res.send({ inProgressappointments, completedAppointments });
});

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`serve running at http://localhost:${port}`);
});