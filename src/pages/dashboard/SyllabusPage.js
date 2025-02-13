import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
// @mui
import { Container, Stack } from '@mui/material';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBoard, persistColumn, persistCard } from '../../redux/slices/kanban';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import { hideScrollbarX } from '../../utils/cssStyles';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { SkeletonSyllabusColumn } from '../../components/skeleton';
// sections
import { SyllabusColumn, SyllabusColumnAdd } from '../../sections/@dashboard/syllabus';

// ----------------------------------------------------------------------

export default function SyllabusPage() {
  const dispatch = useDispatch();

  const { board } = useSelector((state) => state.kanban);
  console.log(board);

  useEffect(() => {
    dispatch(getBoard());
  }, [dispatch]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      console.log(newColumnOrder);
      dispatch(persistColumn(newColumnOrder));
      return;
    }

    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    if (start.id === finish.id) {
      const updatedCardIds = [...start.cardIds];
      
      updatedCardIds.splice(source.index, 1);
      
      updatedCardIds.splice(destination.index, 0, draggableId);
      
      const updatedColumn = {
        ...start,
        cardIds: updatedCardIds,
      };
      
      console.log(board.columns,updatedColumn);
      dispatch(
        persistCard({
          ...board.columns,
          [updatedColumn.id]: updatedColumn,
        })
      );
      return;
    }

    const startCardIds = [...start.cardIds];

    startCardIds.splice(source.index, 1);

    const updatedStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = [...finish.cardIds];

    finishCardIds.splice(destination.index, 0, draggableId);

    const updatedFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    dispatch(
      persistCard({
        ...board.columns,
        [updatedStart.id]: updatedStart,
        [updatedFinish.id]: updatedFinish,
      })
    );
  };

  return (
    <>
      <Helmet>
        <title> Kanban | Minimal UI</title>
      </Helmet>

      <Container maxWidth={false} sx={{ height: 1 }}>
        <CustomBreadcrumbs
          heading="Syllabus Creator"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Syllabus' },
          ]}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <Stack
                {...provided.droppableProps}
                ref={provided.innerRef}
                spacing={3}
                direction="row"
                alignItems="flex-start"
                sx={{
                  height: 1,
                  overflowY: 'hidden',
                  ...hideScrollbarX,
                }}
              >
                {!board?.columnOrder?.length ? (
                  <SkeletonSyllabusColumn />
                ) : (
                  board?.columnOrder.map((columnId, index) => (
                    <SyllabusColumn
                      index={index}
                      key={columnId}
                      column={board.columns[columnId]}
                      cards={board.cards}
                    />
                  ))
                )}

                {provided.placeholder}
                <SyllabusColumnAdd />
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </>
  );
}
