import AppRouter from './routes/AppRouter'
import WindowControls from './components/WindowControls';
export default function App(): React.JSX.Element {
  return(
    <>
      <div className='window-drag-region'/>
        <WindowControls/>
        <AppRouter/>
    </>
  );
}


