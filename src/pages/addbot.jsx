import { Helmet } from 'react-helmet-async';

import { AddBotView  } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function AddBotPage() {
  return (
    <>
      <Helmet>
        <title> Add Bot | Minimal UI </title>
      </Helmet>

      <AddBotView />
    </>
  );
}
