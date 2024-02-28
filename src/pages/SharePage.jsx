import { Helmet } from 'react-helmet-async';

import { SharePage  } from 'src/sections/chat/view/SharePage';

// ----------------------------------------------------------------------

export default function SharePages() {
  return (
    <>
      <Helmet>
        <title> SharePage Bot | Minimal UI </title>
      </Helmet>

      <SharePage />
    </>
  );
}
