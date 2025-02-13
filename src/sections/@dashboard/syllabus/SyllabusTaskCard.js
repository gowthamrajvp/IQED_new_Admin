import PropTypes from 'prop-types';
import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
// @mui
import {
  Paper,
  Typography,
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
// components
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
//
import KanbanDetails from './details/SyllabusDetails';

// ----------------------------------------------------------------------

SyllabusTaskCard.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  onDeleteTask: PropTypes.func,
};

export default function SyllabusTaskCard({ card, onDeleteTask, index }) {
  console.log(card)
  const { name } = card;

  const [completed, setCompleted] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleChangeComplete = (event) => {
    setCompleted(event.target.checked);
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <Paper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            sx={{
              width: 1,
              borderRadius: 1,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: (theme) => theme.customShadows.z1,
              '&:hover': {
                boxShadow: (theme) => theme.customShadows.z20,
              },
            }}
          >
            <Box onClick={handleOpenDetails} sx={{ cursor: 'pointer', margin: 1 }}>
              <Box sx={{ display: 'flex' }}>
                <Typography
                  noWrap
                  variant="subtitle2"
                  sx={{
                    pr: 1,
                    pl: 1,
                    height: 40,
                    lineHeight: '40px',
                    transition: (theme) =>
                      theme.transitions.create('opacity', {
                        duration: theme.transitions.duration.shortest,
                      }),
                    ...(completed && {
                      color:'darkgreen',
                      opacity: 0.48,
                    }),
                  }}
                >
                Lession {index}: {name}
                </Typography>
              </Box>
              {/* <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Numdd" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
                <Chip label="Small" size="small" sx={{ margin: 0.5 }} />
              </Box> */}
            </Box>
          </Paper>
        )}
      </Draggable>

      {/* <KanbanDetails
        task={card}
        openDetails={openDetails}
        onCloseDetails={handleCloseDetails}
        onDeleteTask={() => onDeleteTask(card.id)}
      /> */}
    </>
  );
}
