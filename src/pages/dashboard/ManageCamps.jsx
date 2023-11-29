import { Box, Button, Typography } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import moment from "moment/moment";
import Swal from "sweetalert2";
import UpdateCampsData from "./dashboardComponent/UpdateCampsData";
import { Helmet } from "react-helmet";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#0077B6',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Mursalin', 'I want to be reachon day', 'Nasim', 'Rahat', 'Rakib'),

  ];
const ManageCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = React.useState(false);
  const [updateId, setUpdateId] = React.useState('');
  const handleOpen = (updateId) => {
    setOpen(true);
    setUpdateId(updateId);
  }
  const handleClose = () => setOpen(false);
  const {data: myCamps=[], refetch} = useQuery({
    queryKey: ['myCollectionCamps'],
    queryFn: async () => {
      const result = await axiosSecure.get(`/organizers-camps?email=${user?.email}`);
      return result.data;
    }
  })

  const handleDelete = (deleteId) => {
    console.log('delete id is', deleteId);
    Swal.fire({
      title: "Are you sure?",
      text: "Your want to delete this camps.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/organizers-camps/${deleteId}`)
        .then(res => {
          if(res.data.acknowledged){
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your capm has been deleted successfully.",
              icon: "success"
            });
          }
        })

      }
    });
  }

    return (
        <div>
          <Helmet>
        <title>Wellnex | Dashboard | manage camps</title>
           </Helmet>
            <Box>
                <Typography fontSize={'28px'} fontWeight={'600'} textAlign={'center'} mt={'20px'}>Manage Camps</Typography>
            </Box>
    <TableContainer sx={{mt: '15px'}} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead sx={{background: 'red'}}>
          <TableRow>
            <StyledTableCell align="center">Camp Name</StyledTableCell>
            <StyledTableCell align="center">Schedule</StyledTableCell>
            <StyledTableCell align="center">Location</StyledTableCell>
            <StyledTableCell align="center">Services</StyledTableCell>
            <StyledTableCell align="center">Professionals</StyledTableCell>
            <StyledTableCell align="center">Audience</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myCamps.map((row) => (
            <StyledTableRow key={row?._id}>
              <StyledTableCell align="center">{row?.camp_name}</StyledTableCell>
              <StyledTableCell align="center">{moment(row?.scheduled_date_time).format('LLL')}</StyledTableCell>
              <StyledTableCell align="center">{row?.venue_location}</StyledTableCell>
              <StyledTableCell align="center">{row?.specialized_services[0]}</StyledTableCell>
              <StyledTableCell align="center">{row?.healthcare_professionals}</StyledTableCell>
              <StyledTableCell align="center">{row?.target_audience}</StyledTableCell>
              <StyledTableCell align="center">{row?.description.length > 30 ? row?.description.slice(0, 30) + '...' : row?.description}</StyledTableCell>
              <StyledTableCell sx={{display: 'flex', flexDirection: 'column', gap: '10px'}} align="center"><Button onClick={() => handleOpen(row?._id)} variant="outlined">Update</Button><Button onClick={() => handleDelete(row?._id)} variant="contained">Delete</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <UpdateCampsData refetch={refetch} updateId={updateId} open={open} handleClose={handleClose}></UpdateCampsData>
        </div>
    );
};

export default ManageCamps;