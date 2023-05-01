import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contract from "./pages/Contract";
import Account from "./pages/Account";
import Transaction from "./pages/Transaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contracts" element={<Contract />} />
        <Route path="/accounts" element={<Account />} />
        <Route path="/transactions" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
