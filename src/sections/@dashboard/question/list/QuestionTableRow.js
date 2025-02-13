import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Checkbox,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Box,
  InputAdornment,
  TextField,
  Stack,
  MenuItem,
  Divider,
  Button,
} from '@mui/material';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';

QuestionTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function QuestionTableRow({ row, selected, onSelectRow, onEditRow, onDeleteRow }) {
  const { _id, topics, question, options, correctAnswer } = row;
  console.log(row)
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);
  const handleOpenPopover = (event) => setOpenPopover(event.currentTarget);
  const handleClosePopover = () => setOpenPopover(null);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell align="left">
          <Typography variant="subtitle2" noWrap sx={{ textTransform: 'capitalize' }}>
            {topics[0]?.name || 'No Topic'}
          </Typography>
        </TableCell>
        <TableCell >
          <Stack direction="column" spacing={2}>
            <Typography variant="h6" noWrap>
              Q) {question}
            </Typography>
            <Stack direction="column" spacing={1}>
              <Stack direction="row" spacing={2} >
                {options.slice(0, 2).map((option, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    border={1}
                    px="5px"
                    borderRadius="10px"
                    
                  >
                    <TextField
                      variant="standard"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ px: '5px' }}>
                            {index + 1}.
                          </InputAdornment>
                        ),
                        endAdornment:
                          (
                            <InputAdornment position="end">
                              <Iconify 
                              icon={correctAnswer.content === option.content ? "typcn:tick" : "iconamoon:close-bold"} 
                              sx={{ width: 20, height: 20, 
                              color: correctAnswer.content === option.content ? "green":"red"
                              }} />
                            </InputAdornment>
                          ),
                        disableUnderline: true,
                      }}
                      value={option.content}
                      inputProps={{ style: { fontSize: '1rem', fontWeight: 'bold' } }}
                    />
                  </Box>
                ))}
              </Stack>
              <Stack direction="row" spacing={2} >
                {options.slice(2, 4).map((option, index) => (
                  <Box
                    key={index + 2}
                    display="flex"
                    alignItems="center"
                    border={1}
                    px="5px"
                    borderRadius="10px"
                  
                  >
                    <TextField
                      variant="standard"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ px: '5px' }}>
                            {index + 3}.
                          </InputAdornment>
                        ),
                        endAdornment:
                          (
                            <InputAdornment position="end">
                              <Iconify 
                              icon={correctAnswer.content === option.content ? "typcn:tick" : "iconamoon:close-bold"} 
                              sx={{ width: 20, height: 20, 
                              color: correctAnswer.content === option.content ? "green":"red"
                              }} />
                            </InputAdornment>
                          ),
                        disableUnderline: true,
                      }}
                      value={option.content}
                      inputProps={{ style: { fontSize: '1rem', fontWeight: 'bold' } }}
                    />
                  </Box>
                ))}
              </Stack>
            </Stack>
            <Typography variant="subtitle2" noWrap sx={{ textTransform: 'capitalize' }}>
            {correctAnswer.explanation}
          </Typography>
          </Stack>
        </TableCell>
        
        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{ width: 160 }}>
        {/* <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" /> Edit
        </MenuItem> */}
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" /> Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure you want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
