// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   Alert,
//   Box,
//   Button,
//   CircularProgress,
//   FormControl,
//   Grid2 as Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField
// } from '@mui/material';
// import { PlayerType } from '../../../types/PlayerType';
// import axios from 'axios';
// import PlayerTableRow from './PlayerTableRow';
// import AddIcon from '@mui/icons-material/Add';
// import ModalStyled from '../../../components/ModalStyled';

// type ModalNewPlayerProps = {
//   showModaleCreaPlayer: boolean;
//   handleCloseModaleCrePlayer: (refresh?: boolean) => void;
// };

// const ModalNewPlayer: React.FC<ModalNewPlayerProps> = ({
//   showModaleCreaPlayer,
//   handleCloseModaleCrePlayer
// }) => {
//   return (
//     <ModalStyled
//       title='Add new player'
//       show={showModaleCreaPlayer}
//       onClose={handleCloseModaleCrePlayer}
//     >
//       <div>
//         <Box
//           component='form'
//           sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
//           noValidate
//           autoComplete='off'
//         >
//           {error.show && (
//             <Alert sx={{ mb: 3 }} severity='error'>
//               {error.Message}
//             </Alert>
//           )}
//           <FormControl defaultValue='' required>
//             <TextField
//               id='name'
//               label='Name'
//               required
//               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//                 setName(event.target.value);
//               }}
//               error={name === ''}
//               helperText={name === '' && 'Required'}
//             />
//           </FormControl>
//         </Box>
//         <Box
//           sx={{
//             mt: 1,
//             display: 'flex',
//             gap: 1,
//             flexDirection: { xs: 'column', sm: 'row-reverse' }
//           }}
//         >
//           <Button
//             variant='contained'
//             onClick={() => aggiungiPlayer()}
//             disabled={!name}
//           >
//             Add
//           </Button>
//           {/* <Button color='secondary' onClick={handleCloseModaleCrePlayer}>
//               Cancel
//             </Button> */}
//         </Box>
//       </div>
//     </ModalStyled>
//   );
// };

// export default ModalNewPlayer;
