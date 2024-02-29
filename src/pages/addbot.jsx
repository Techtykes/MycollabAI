import { Helmet } from 'react-helmet-async';

import { AddBotView  } from 'src/sections/chat/view';

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
