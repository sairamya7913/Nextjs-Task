import Navbar from '../components/Navbar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={styles.iconBoxs}>
      <body style={styles.iconBoxs}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

// styles
const styles: { [key: string]: any } = {
  iconBoxs: {
    backgroundColor: 'blue',
    backgroundImage: 'url("/robot.jpg")', 
    backgroundSize: 'cover',             
    backgroundRepeat: 'no-repeat',     
    minHeight: '100vh', 
  }
}
