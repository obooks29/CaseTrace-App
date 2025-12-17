//  ui/src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import CreateCase from "./pages/CreateCase";
import CaseDetail from "./pages/CaseDetail";
import AdminUsers from "./pages/AdminUsers";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cases/new" element={<CreateCase />} />
          <Route path="/case/:id" element={<CaseDetail />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}