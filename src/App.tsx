import { Header } from '@/components/Header';
import { Orders } from '@/components/Orders';
import { OrdersProvider, AppThemeProvider } from '@/contexts';

function App() {
  return (
    <AppThemeProvider>
      <OrdersProvider>
        <Header />
        <Orders />
      </OrdersProvider>
    </AppThemeProvider>
  );
}

export default App;
