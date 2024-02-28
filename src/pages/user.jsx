import { Helmet } from 'react-helmet-async';

import { UserView ,AddBotView  } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Bot | Minimal UI </title>
      </Helmet>
<AddBotView/>
      <UserView />
    </>
  );
}
