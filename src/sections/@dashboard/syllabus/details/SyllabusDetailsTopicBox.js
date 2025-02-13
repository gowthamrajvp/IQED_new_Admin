import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Stack, Card, Avatar, CardHeader, Typography } from '@mui/material';
// utils
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------
function getTrophyStyle(index) {
  const styles = {
    0: { color: '#FFD700', bgcolor: alpha('#FFD700', 0.08) }, // Gold
    1: { color: '#C0C0C0', bgcolor: alpha('#C0C0C0', 0.08) }, // Silver
    2: { color: '#CD7F32', bgcolor: alpha('#CD7F32', 0.08) }, // Bronze
  };

  return styles[index] || { color: 'inherit', bgcolor: 'transparent' }; // Default for other ranks
}
SyllabusDetailsTopicBox.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function SyllabusDetailsTopicBox({ title, subheader, list, ...other }) {
  const [items, setItems] = useState(orderBy(list, ['favourite'], ['desc']));

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedList = Array.from(items);
    const [movedItem] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, movedItem);

    setItems(reorderedList);
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="authors">
          {(provided) => (
            <Stack spacing={3} sx={{ p: 3 }} {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((author, index) => (
                <AuthorItem key={author.id} Uid={author.id} author={author} index={index} />
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </Card>
  );
}

// ----------------------------------------------------------------------

AuthorItem.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    favourite: PropTypes.number,
  }),
  Uid: PropTypes.string,
  index: PropTypes.number,
};

function AuthorItem({ Uid, author, index }) {
  return (
    <Draggable draggableId={Uid} index={index}>
      {(provided) => (
        <Stack
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <Avatar alt={author.name} src={author.avatar} />

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">{author.name}</Typography>

            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.secondary',
              }}
            >
              XP: {fShortenNumber(author.favourite)}
            </Typography>
          </Box>

          <Iconify
            icon="ant-design:trophy-filled"
            sx={{
              p: 1,
              width: 40,
              height: 40,
              borderRadius: '50%',
              ...getTrophyStyle(index),
            }}
          />
        </Stack>
      )}
    </Draggable>
  );
}
