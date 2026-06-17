import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('rendert ohne Fehler', () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });

  it('zeigt die Überschrift "Get started"', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /get started/i })).toBeInTheDocument();
  });

  it('Counter startet bei 0', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /count is 0/i })).toBeInTheDocument();
  });

  it('Counter erhöht sich beim Klick', async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole('button', { name: /count is 0/i });
    await user.click(button);
    expect(screen.getByRole('button', { name: /count is 2/i })).toBeInTheDocument();
  });

  it('Counter erhöht sich bei mehreren Klicks', async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole('button', { name: /count is 0/i });
    await user.click(button);
    await user.click(button);
    await user.click(button);
    expect(screen.getByRole('button', { name: /count is 6/i })).toBeInTheDocument();
  });

  it('zeigt die Überschrift "Documentation"', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /documentation/i })).toBeInTheDocument();
  });

  it('zeigt den Vite-Link', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /explore vite/i })).toHaveAttribute(
      'href',
      'https://vite.dev/'
    );
  });

  it('zeigt den React-Link', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /learn more/i })).toHaveAttribute(
      'href',
      'https://react.dev/'
    );
  });

  it('zeigt die Überschrift "Connect with us"', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /connect with us/i })).toBeInTheDocument();
  });

  it('Social-Links öffnen in neuem Tab', () => {
    render(<App />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('target', '_blank');
  });
});
