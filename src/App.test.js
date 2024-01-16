import { render } from '@testing-library/react';
import Navbar from './components/Navbar';
import App from './App';

test('renders App component with router', () => {
  render(<App />);
});

test('renders Navbar with search bar and profile info', () => {
  render(<Navbar />);
});

// Vous pouvez ajouter des assertions ici pour vérifier si certains éléments sont présents
// Par exemple, vérifiez si un élément spécifique de votre routeur est rendu
// const navbarElement = screen.getByText(/texte spécifique dans le Navbar/);
// expect(navbarElement).toBeInTheDocument();
