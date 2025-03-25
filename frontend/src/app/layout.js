 

import '@/assets/fonts/fonts.css'
import "./globals.css"; 
import NextTopLoader from 'nextjs-toploader';

 

export const metadata = {
  title: "Subh Vivah",
  description: "Shubh Vivah is a wedding planning service that aims to transform the wedding planning experience for Indian couples, offering a range of services including vendor management, event flow management, decor planning, guest management, and more, with a focus on creating memorable and personalized celebrations. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"     data-color-mode="light" suppressHydrationWarning >
      <body
        className={` font-pregular bg-whitesmoke`}
        suppressHydrationWarning > 
        <NextTopLoader color='#21004b' />
        {children} 
      </body>
    </html>
  );
}
