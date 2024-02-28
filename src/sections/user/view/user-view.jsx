  import { useState , useEffect  } from 'react';
  import { useNavigate } from 'react-router-dom';

  import Card from '@mui/material/Card';
  import Stack from '@mui/material/Stack';
  import Table from '@mui/material/Table';
  import Button from '@mui/material/Button';
  import Container from '@mui/material/Container';
  import TableBody from '@mui/material/TableBody';
  import Typography from '@mui/material/Typography';
  import TableContainer from '@mui/material/TableContainer';
  import TablePagination from '@mui/material/TablePagination';

  // eslint-disable-next-line import/named
 // import { users } from 'src/_mock/user';

  import Iconify from 'src/components/iconify';
  import Scrollbar from 'src/components/scrollbar'; // Import useNavigate
  import TableNoData from '../table-no-data';
  import UserTableRow from '../user-table-row';
  import UserTableHead from '../user-table-head';
  import TableEmptyRows from '../table-empty-rows';
  import UserTableToolbar from '../user-table-toolbar';
  import { emptyRows, applyFilter, getComparator } from '../utils';

// ---------------------------------------------------------------// 

const fetchBots = async () => {
  try {
       const response = await fetch('http://localhost:4000/s/api/bots', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
     
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const bots = await response.json();
    return bots; // Assuming your API returns an array of bots
  } catch (error) {
    console.error("Failed to fetch bots:", error);
    return []; // Return an empty array in case of error
  }
};

  // ----------------------------------------------------------------------

  export default function UserView() {
    const [page, setPage] = useState(0);
    const navigate = useNavigate(); // Hook for navigation

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);
  // new const 
  const [bots, setBots] = useState([]);

useEffect(() => {
  fetchBots().then(data => {
          console.log("Fetched bots:", data); // Add this line to log fetched bots

    if (data && Array.isArray(data.bots)) {
      setBots(data.bots);
    } else {
      console.error('Data fetched is not properly formatted:', data);
      setBots(data); // Fallback to an empty array if data is not as expected
    }
  });
}, []);


    const handleSort = (event, id) => {
      const isAsc = orderBy === id && order === 'asc';
      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    };
  const handleNewBotClick = () => {
      navigate('../../../pages/addbot.jsx'); // This will navigate to your add bot view
    };
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = bots.map((n) => n.id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

const handleClick = (_event, id) => {
  const selectedIndex = selected.indexOf(id);
  const newSelected = selectedIndex === -1 ? [id] : [];
  setSelected(newSelected);
  console.log("Bot clicked with ID:", id); // This will log the bot ID when a row is clicked
};



// delete 
const deleteBot = async (botId) => {
  try {
    console.log("Attempting to delete bot with ID:", botId);
    // Check if the botId is not undefined
    if (!botId) {
      console.error("Bot ID is undefined, cannot proceed with deletion.");
      alert("Bot ID is undefined, cannot proceed with deletion.");
      return;
    }
        console.log("Attempting to delete bot with ID:", botId); // Confirm the ID being sent

    const response = await fetch(`http://localhost:4000/s/api/bot/${botId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to delete the bot:', errorData.message);
      alert(`Failed to delete the bot: ${errorData.message}`);
    } else {
      setBots(bots.filter(bot => bot.id !== botId));
      console.log("Bot deleted successfully");
    }
  } catch (error) {
    console.error("Error in deleteBot:", error);
    alert(`Error in deleteBot: ${  error.message}`);
  }
};



    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setPage(0);
      setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
      setPage(0);
      setFilterName(event.target.value);
    };

    const dataFiltered = applyFilter({
       inputData: Array.isArray(bots) ? bots : [],
      comparator: getComparator(order, orderBy),
      filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;
 
    return (
      <Container>
            {selected.length > 0 && (
      <Button
        variant="contained"
        color="primary"
       onClick={() => deleteBot(selected[0])} // Ensure `selected[0]` is a valid ID
      >
        Delete Bot
      </Button>
    )}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Users</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleNewBotClick} // Set the onClick handler
          >
            New Bot
          </Button>
        </Stack>

        <Card>
          <UserTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={bots.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'name', label: 'Name' },
                    { id: 'description', label: 'Description' },
                    { id: 'model', label: 'Model' },
                    { id: 'Personality', label: 'personality' },
                    
              
                    { id: '' },
                  ]}
                />
                <TableBody>
                 {Array.isArray(bots) && bots.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  
  .map((bot, index) => (
    
    <UserTableRow
      key={bot._id}
      id={bot.id}
      name={bot.name}
      description={bot.description}
      model={bot.model}
      personality={bot.personality}
selected={selected.indexOf(bot.id) !== -1} // Ensure this uses bot.id
      handleClick={() => handleClick(bot.id)} // Pass bot.id correctly
    />
))}


                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, bots.length)}
                  />
 {bots.length === 0 && <TableNoData />}
                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={bots.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    );
    
  }
