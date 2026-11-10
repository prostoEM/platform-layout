import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';

import { previewIcons } from '../../dev/previewIcons';
import '../../dev/theme.scss';
import { LayoutDemo } from './LayoutDemo';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LayoutDemo {...previewIcons} />
    </MemoryRouter>
  );
}
