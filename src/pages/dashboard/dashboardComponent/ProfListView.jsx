import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { Tune } from '@mui/icons-material';
import toast from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const ProfListView = ({refetch, profCampId, openProf, handleCloseProfList}) => {
  const [filtering, setFiltering] = React.useState('');
const [sorting, setSorting] = React.useState([]);
const {user} = useAuth();
const axiosSecure = useAxiosSecure();
const {data=[]} = useQuery({
    queryKey: ['professionalsViewUnderCamp'],
    enabled: !!user,
    queryFn: async () => {
       const result = await axiosSecure.get(`/upcomming-camps-under-professionals/${profCampId}`);
        return result.data;
    }
})
console.log('prof obj',data);
const handleConfirmation = (acptId) => {
    axiosSecure.patch(`/professional-acceptions/${acptId}`)
    .then(res => {
    if(res.data.operatonStatus === 'success'){
    refetch()
      toast.success("Professiona accepted successfully!")
     }
    })
    
}

const columns = [
  {
      header: 'Name',
      accessorKey: 'name',
  },
  {
      header: 'Specialization',
      accessorKey: 'specialization',
  },
  {
      header: 'Contact Information,',
      accessorKey: 'contactInformation',
  },
  {
    header: 'View Profile',
    accessorKey: 'professionalEmail',
  },
  {
      header: 'Action',
      accessorKey: '_id',
      cell: ({value, row}) => (
         <Button disabled={row.original.status === "Confirmed" ? true : false} onClick={() => handleConfirmation(row?.original._id)} variant='contained'>{row.original.status === "Confirmed" ? "Confirmed" : "Accept Professional"}</Button>
      )
      
  },


]
const table = useReactTable({
    data, 
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
        globalFilter: filtering,
        sorting: sorting,
    }, 
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting
})
    return (
        <div>
        <Modal
          open={openProf}
          onClose={handleCloseProfList}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography pb={'30px'} fontSize={'28px'} textAlign={'center'} fontWeight={600}>Reviews Professionals</Typography>
          <TextField 
                 sx={{width: '40%', margin: '0 auto'}}
                label={'search...'}
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
            ></TextField>
            <Table component={'table'}>
                <TableHead component={'thead'}>
                {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup?.id} component={'tr'}>
                        {headerGroup.headers.map(header => (
                            <TableCell sx={{fontWeight:'600'}} key={header?.id} component={'th'}>
                                {header.isPlaceholder ? null : (
                                    <Box>
                                        {flexRender(
                                            header.column.columnDef.header, header.getContext()
                                        )}
                                    </Box>
                                )}
                            </TableCell>
                        ))}
                </TableRow>
                    ) )}
                    
                </TableHead>
                <TableBody component={'tbody'}>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row?.id} component={'tr'}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell?.id} component={'td'}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    
                </TableBody>
            </Table>
            <Box display={'flex'} mt={'20px'} mb={'20px'} gap={'20px'}>
            <Button variant="outlined"
            disabled={!table.getCanPreviousPage}
            onClick={() => table.previousPage()}
            >Previous Page</Button>
            <Button variant="outlined"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            >Next Page</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    );
};

export default ProfListView;



