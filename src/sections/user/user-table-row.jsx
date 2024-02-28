import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// UserTableRow component definition
export default function UserTableRow({
  id,
  selected,
  name,
  description,
  model,
  personality,
  handleClick,
}) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={() => handleClick(id)} />
      </TableCell>
      <TableCell component="th" scope="row">
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{model}</TableCell>
      <TableCell>{personality}</TableCell>
    </TableRow>
  );
}

// propTypes validation for UserTableRow
UserTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  model: PropTypes.string,
  personality: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
