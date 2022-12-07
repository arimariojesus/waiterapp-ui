import { ThemeProvider } from 'styled-components';

import { Header } from '@/components/Header';
import { Orders } from '@/components/Orders';
import { OrdersProvider } from '@/contexts';
import { GlobalStyles } from '@/styles/GlobalStyles';
import theme from '@/styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <OrdersProvider>
        <Header />
        <Orders />
        <GlobalStyles />
      </OrdersProvider>
    </ThemeProvider>
  );
}

export default App;
