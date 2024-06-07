import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  let navigate = useNavigate();

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Button onClick={() => navigate("/")} variant="contained">
        Tilbake til forsiden
      </Button>
    </div>
  );
};

export default PageNotFound;