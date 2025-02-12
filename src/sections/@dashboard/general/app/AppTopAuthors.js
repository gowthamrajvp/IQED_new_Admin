import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Stack, Card, Avatar, CardHeader, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

AppTopAuthors.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function AppTopAuthors({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {orderBy(list, ['favourite'], ['desc']).map((author, index) => (
          <AuthorItem key={author.id} author={author} index={index} />
        ))}
      </Stack>
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
  index: PropTypes.number,
};

function AuthorItem({ author, index }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
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
          color: '#FFD700',
          bgcolor: (theme) => alpha("#FFD700", 0.08),
          ...(index === 1 && {
            color: '#C0C0C0',
            bgcolor: (theme) => alpha("#C0C0C0", 0.08),
          }),
          ...(index === 2 && {
            color: '#CD7F32',
            bgcolor: (theme) => alpha("#CD7F32", 0.08),
          }),
        }}
      />
    </Stack>
  );
}
