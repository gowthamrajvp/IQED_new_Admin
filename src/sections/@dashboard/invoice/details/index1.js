import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Scrollbar from '../../../../components/scrollbar';
//
import FeedbackToolbar from './FeedbackToolbar';
import FeedbackDetailsCarousel from './FeedbackDetailsCarousel';

// ----------------------------------------------------------------------

const StyledRowResult = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

FeedbackDetails.propTypes = {
  feedbackdata: PropTypes.object,
};

export default function FeedbackDetails({ feedbackdata }) {
  if (!feedbackdata) {
    return null;
  }

  const { _id, userId, type, imageList, createAt, feedback, suggestQuestions } = feedbackdata;

  return (
    <>
      {/* <FeedbackToolbar feedbackraw={feedbackdata} /> */}

      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Image disabledEffect alt="logo" src="/logo/logo_full.png" sx={{ maxWidth: 120 }} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                variant="soft"
                color={
                  (type === 'general' && 'success') ||
                  (type === 'suggestQuestions' && 'warning') ||
                  (type === 'bug' && 'error') ||
                  'default'
                }
              >
                {type}
              </Label>
              <Typography variant="h6">{`${_id}`}</Typography>
              <Typography variant="h6">{`${fDate(createAt)}`}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              User
            </Typography>

            {userId && (
              <>
                <Typography variant="body2">{userId?.name}</Typography>

                <Typography variant="body2">ID: {userId?._id}</Typography>
              </>
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <Grid xs={6} md={6} lg={12}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                {type}
              </Typography>
              <Typography variant="body2">{feedback}</Typography>
              {type === 'bug' && (
                <>
                  <FeedbackDetailsCarousel Images={imageList} />
                </>
              )}
              <Typography variant="body2">Topic : {suggestQuestions?.topic}</Typography>
              <Typography variant="body2">Question : {suggestQuestions?.question}</Typography>
              <Typography variant="body2">Option 1 : {JSON.parse(suggestQuestions?.options)[0].text}</Typography>
              <Typography variant="body2">Option 2 : {JSON.parse(suggestQuestions?.options)[1].text}</Typography>
              <Typography variant="body2">Option 3 : {JSON.parse(suggestQuestions?.options)[2].text}</Typography>
              <Typography variant="body2">Option 4 : {JSON.parse(suggestQuestions?.options)[3].text}</Typography>
              <Typography variant="body2">Correct Option : {suggestQuestions?.correctOption}</Typography>
              <Typography variant="body2">Explanation : {suggestQuestions?.explanation}</Typography>

            </Grid>
          </Grid>

          {/* <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              date create
            </Typography>

            <Typography variant="body2">{fDate(createDate)}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Due date
            </Typography>

            <Typography variant="body2">{fDate(dueDate)}</Typography>
          </Grid> */}
        </Grid>
        {/* 
        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 960 }}>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>

                  <TableCell align="left">Description</TableCell>

                  <TableCell align="left">Qty</TableCell>

                  <TableCell align="right">Unit price</TableCell>

                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>

                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">{row.title}</Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.description}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="left">{row.quantity}</TableCell>

                    <TableCell align="right">{fCurrency(row.price)}</TableCell>

                    <TableCell align="right">{fCurrency(row.price * row.quantity)}</TableCell>
                  </TableRow>
                ))}

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 2 }} />
                    Subtotal
                  </TableCell>

                  <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 2 }} />
                    {fCurrency(subTotalPrice)}
                  </TableCell>
                </StyledRowResult>

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    Discount
                  </TableCell>

                  <TableCell
                    align="right"
                    width={120}
                    sx={{ color: 'error.main', typography: 'body1' }}
                  >
                    {discount && fCurrency(-discount)}
                  </TableCell>
                </StyledRowResult>

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    Taxes
                  </TableCell>

                  <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                    {taxes && fCurrency(taxes)}
                  </TableCell>
                </StyledRowResult>

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'h6' }}>
                    Total
                  </TableCell>

                  <TableCell align="right" width={140} sx={{ typography: 'h6' }}>
                    {fCurrency(totalPrice)}
                  </TableCell>
                </StyledRowResult>
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer> */}

        <Divider sx={{ mt: 5 }} />
        {/* 
        <Grid container>
          <Grid item xs={12} md={9} sx={{ py: 3 }}>
            <Typography variant="subtitle2">NOTES</Typography>

            <Typography variant="body2">
              We appreciate your business. Should you need us to add VAT or extra notes let us know!
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
            <Typography variant="subtitle2">Have a Question?</Typography>

            <Typography variant="body2">support@minimals.cc</Typography>
          </Grid>
        </Grid> */}
      </Card>
    </>
  );
}
