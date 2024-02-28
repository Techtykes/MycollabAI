import { Helmet } from 'react-helmet-async';

import { ImageTextView } from 'src/sections/image_to_text/view'; // Changed to PascalCase

// ----------------------------------------------------------------------

export default function ImageTextPage() { // Also consider changing function name to PascalCase for consistency
  return (
    <>
      <Helmet>
        <title>ImageText | Minimal UI</title>
      </Helmet>

      <ImageTextView /> {/* Changed to PascalCase */}
    </>
  );
}
