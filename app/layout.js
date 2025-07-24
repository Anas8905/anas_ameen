// app/layout.js
import { Poppins, Open_Sans, Roboto_Mono } from 'next/font/google';
import './styles/globals.css';
import './styles/GlowingLines.css'
import './styles/MobileNavigation.css'
import './styles/TypeWriter.css'
import { ThemeProvider } from './providers/theme-provider';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap', // Optimize font loading to prevent layout shift
});

const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Muhammad Umair - Senior Web Developer',
    template: '%s | Muhammad Umair',
  },
  description: 'Portfolio of Muhammad Umair, Senior Web Developer',
  openGraph: {
    title: 'Muhammad Umair - Senior Web Developer',
    description: 'Portfolio of Muhammad Umair, Senior Web Developer',
    type: 'website',
    locale: 'en_US',  
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${openSans.variable} ${robotoMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange // Prevent flash of unstyled content
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}