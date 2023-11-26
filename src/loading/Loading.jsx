import { CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
            <CircularProgress />
        </div>
    );
};

export default Loading;