import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const ErrorPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h4 style={{ fontSize: "48px", margin: "0" }}>Oppps....</h4>
      <p style={{ fontSize: "24px", fontWeight: "600" }}>
        Your serching page not found!
      </p>
      <Link to={'/'}>
        <Button variant="contained" startIcon={<ArrowBackIcon />}>
          Back Home
        </Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
