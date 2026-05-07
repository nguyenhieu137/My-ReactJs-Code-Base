import { RouterProvider } from 'react-router-dom';
import { createAppRouter } from './routers/routes';

function App() {
  const router = createAppRouter();

  return (
    <div className="font-sans antialiased text-neutral-900">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
