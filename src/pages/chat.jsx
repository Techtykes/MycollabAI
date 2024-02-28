import React from 'react';
import { Helmet } from 'react-helmet-async';

import { ChatView } from 'src/sections/chat/view';
// ----------------------------------------------------------------------



export default function ChatPage() {

  return (
    <>
      <Helmet>
        <title>Bots | Minimal UI</title>
      </Helmet>

      <ChatView /> {/* Changed to PascalCase */}
    </>
  );
}
