import { Button } from "@mui/material";
import AdminForm from "./adminForm";
import { useState } from "react";
import AllUsers from "./users";
import ViewOrders from "./viewOrders";
export default function AdminPage() {
  const [vis, setVis] = useState(false);
  const [orderVis, setOrderVis] = useState(false);
  return (
    <div>
      <AdminForm />
      <Button
        variant="outlined"
        color="primary"
        sx={{ marginTop: 4 }}
        onClick={() => {
          setVis((prev) => !prev);
          setOrderVis((prev) => false);
        }}
      >
        view users
      </Button>{" "}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 4 }}
        onClick={() => {
          setOrderVis((prev) => !prev);
          setVis((prev) => false);
        }}
      >
        view orders
      </Button>
      {vis && <AllUsers />}
      {orderVis && <ViewOrders />}
    </div>
  );
}
