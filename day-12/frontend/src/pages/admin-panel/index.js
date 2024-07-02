import { Button } from "@mui/material";
import AdminForm from "./adminForm";
import { useState } from "react";
import AllUsers from "./users";
export default function AdminPage() {
  const [vis, setVis] = useState(false);
  return (
    <div>
      <AdminForm />
      <Button
        variant="outlined"
        color="primary"
        sx={{ marginTop: 4 }}
        onClick={() => {
          setVis((prev) => !prev);
        }}
      >
        view users
      </Button>
      {vis && <AllUsers />}{" "}
    </div>
  );
}
