import { Inter } from 'next/font/google';
import StoreProvider from './StoreProvider';

import './globals.css';
import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Quiz Engine',
  description: 'Quiz Engine application for tests.'
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className={styles.main}>
            <div className={styles.mainContainer}>{children}</div>
          </main>
        </body>
      </html>
    </StoreProvider>
  );
}
