import { Header } from "@/components/Header";
import { Orders } from "@/components/Orders";
import { OrdersProvider } from "@/contexts";

function App() {
  return (
    <OrdersProvider>
      <Header />
      <Orders />
    </OrdersProvider>
  );
}

export default App;
