import { createRoot } from 'react-dom/client';

import { LayoutDemo } from './LayoutDemo';
import '../../dev/theme.scss';

const root = document.getElementById('root');
if (root) createRoot(root).render(<LayoutDemo withRightPanel />);
