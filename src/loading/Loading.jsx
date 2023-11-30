import { CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height:'100vh'}}>
            <CircularProgress />
        </div>
    );
};

export default Loading;