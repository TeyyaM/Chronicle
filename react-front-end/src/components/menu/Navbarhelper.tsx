
import { useState } from 'react';
import * as S from './styles';

import App from '../../App';

const Navbarhelper = () => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <S.StyledNavbar open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </S.StyledNavbar>
      <App open={open} />
    </>
  )
}
export default Navbarhelper