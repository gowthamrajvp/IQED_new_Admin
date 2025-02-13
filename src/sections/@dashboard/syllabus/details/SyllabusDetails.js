import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Stack, Drawer, Avatar, Tooltip, Divider, TextField, Box, IconButton } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import DateRangePicker, { useDateRangePicker } from '../../../../components/date-range-picker';
//
import KanbanInputName from '../SyllabusInputName';
import KanbanDetailsToolbar from './SyllabusDetailsToolbar';
import KanbanContactsDialog from '../SyllabusContactsDialog';


import { _appAuthors } from '../../../../_mock/arrays';
import SyllabusDetailsTopicBox from './SyllabusDetailsTopicBox';
// ----------------------------------------------------------------------

const StyledLabel = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  width: 120,
  flexShrink: 0,
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

SyllabusDetails.propTypes = {
  task: PropTypes.object,
  openDetails: PropTypes.bool,
  onDeleteTask: PropTypes.func,
  onCloseDetails: PropTypes.func,
};

export default function SyllabusDetails({ task, openDetails, onCloseDetails, onDeleteTask }) {
  const fileInputRef = useRef(null);

  const [liked, setLiked] = useState(false);

  const [prioritize, setPrioritize] = useState('low');

  const [taskName, setTaskName] = useState(task?.name);

  const [openContacts, setOpenContacts] = useState(false);

  const [completed, setCompleted] = useState(task?.completed);

  const [taskDescription, setTaskDescription] = useState(task?.description);

  const {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    open: openPicker,
    onOpen: onOpenPicker,
    onClose: onClosePicker,
    isSelected: isSelectedValuePicker,
    isError,
    shortLabel,
  } = useDateRangePicker(task.due[0], task.due[1]);

  const handleLiked = () => {
    setLiked(!liked);
  };

  const handleCompleted = () => {
    setCompleted(!completed);
  };

  const handleOpenContacts = () => {
    setOpenContacts(true);
  };

  const handleCloseContacts = () => {
    setOpenContacts(false);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleChangeTaskName = (event) => {
    setTaskName(event.target.value);
  };

  const handleChangeTaskDescription = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleChangePrioritize = (event) => {
    setPrioritize(event.target.value);
  };

  return (
    <Drawer
      open={openDetails}
      onClose={onCloseDetails}
      anchor="right"
      PaperProps={{
        sx: {
          width: {
            xs: 1,
            sm: 480,
          },
        },
      }}
    >
      <KanbanDetailsToolbar
        taskName={task.name}
        fileInputRef={fileInputRef}
        liked={liked}
        completed={completed}
        onLike={handleLiked}
        onAttach={handleClickAttach}
        onDelete={onDeleteTask}
        onCompleted={handleCompleted}
        onCloseDetails={onCloseDetails}
      />

      <Divider />

      <Scrollbar>
        <Stack spacing={3} sx={{ px: 2.5, pt: 3, pb: 5 }}>
          <KanbanInputName
            placeholder="Lession name"
            value={taskName}
            onChange={handleChangeTaskName}
          />
          <SyllabusDetailsTopicBox title="Topic List" list={_appAuthors} />
          <Stack direction="row" alignItems="center">
            <StyledLabel>Last Update</StyledLabel>
            <>
              <Box
                onClick={onOpenPicker}
                sx={{
                  typography: 'body2',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.72 },
                }}
              >
                {shortLabel}
              </Box>
            </>
          </Stack>
        </Stack>
      </Scrollbar>
      <Divider />
    </Drawer>
  );
}
