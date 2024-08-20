import {
    Container,
    createMuiTheme,
    CssBaseline,
    Paper,
    ThemeProvider,
  } from '@material-ui/core';
  import { useContext } from 'react';
  import { BrowserRouter, Route } from 'react-router-dom';
  import AdminScreen from './screens/AdminScreen';
  import DepartmentSelectionScreen from './screens/DepartmentSelectionScreen';
  import AppointmentCompletionScreen from './screens/AppointmentCompletionScreen';
  import HomeScreen from './screens/HomeScreen';
  import AppointmentScreen from './screens/AppointmentScreen';
  import PaymentScreen from './screens/PaymentScreen';
  import QueueScreen from './screens/QueueScreen';
  import ReviewScreen from './screens/ReviewScreen';
  import SelectPaymentScreen from './screens/SelectPaymentScreen';
  import { Store } from './Store';
  
  const theme = createMuiTheme({
    typography: {
      h1: { fontWeight: 'bold' },
      h2: {
        fontSize: '2rem',
        color: 'black',
      },
      h3: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: 'white',
      },
    },
    palette: {
      primary: { main: '#ff1744' },
      secondary: {
        main: '#118e16',
        contrastText: '#ffffff',
      },
    },
  });
  
  function features() {
    const { state } = useContext(Store);
  
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth={state.widthScreen ? 'lg' : 'sm'}>
            <Paper>
              <Route path="/" component={HomeScreen} exact={true}></Route>
              <Route path="/departments" component={DepartmentSelectionScreen} exact={true}></Route>
              <Route path="/appointment" component={AppointmentScreen} exact={true}></Route>
              <Route path="/review" component={ReviewScreen} exact></Route>
              <Route
                path="/select-payment"
                component={SelectPaymentScreen}
                exact
              ></Route>
              <Route path="/payment" component={PaymentScreen} exact></Route>
              <Route
                path="/complete"
                component={AppointmentCompletionScreen}
                exact
              ></Route>
              <Route path="/admin" component={AdminScreen} exact></Route>
              <Route path="/queue" component={QueueScreen} exact></Route>
            </Paper>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
  
  export default features;