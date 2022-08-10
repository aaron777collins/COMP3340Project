import { createTheme } from "@mui/material";

export const THEME_KEY = "funstuff-themeKey"; 

const blueTheme = createTheme({
    palette: {
      background: {
        paper: '#93b3db',
      },
      primary: {
        main: '#2d7fe3',
        contrastText: '#000000',
      },
      secondary: {
        main: '#0e2745'
      }
    },
    typography: {
      fontFamily: [
        '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
      ].join(","),
    },
  });
  
  const greenTheme = createTheme({
    palette: {
      background: {
        default: "#ffffff",
        paper: '#bcebc5',
      },
      primary: {
        main: '#3ae05a',
      },
      secondary: {
        main: '#0f3b18'
      }
    },
    typography: {
      fontFamily: [
        '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
      ].join(","),
    },
  
  });
  
  const whiteTheme = createTheme({
    palette: {
      background: {
        default: '#ffffff',
        paper: '#ffffff',
      },
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#0c223b'
      }
    },
    typography: {
      fontFamily: [
        '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
      ].join(","),
    },
  
    });

export function setNewTheme(setCurrentTheme: Function){

    const themeArray: string[] = ["green", "white", "blue"];

    const theme = localStorage.getItem(THEME_KEY) ?? 'error';
    if (theme==='error'){
        console.log("cant get theme from storage");
        return
    }

    const currentThemeIndex = themeArray.indexOf(theme)

    //set new next theme and then return refresh app to see theme
    localStorage.setItem(THEME_KEY, themeArray[(currentThemeIndex+1)%3]);

    const nextThemeToSelect: string = themeArray[(currentThemeIndex+1)%3]

    if (nextThemeToSelect === 'green'){
        setCurrentTheme(greenTheme);
    }
    else if (nextThemeToSelect === 'blue'){
        setCurrentTheme(blueTheme);
    }
    else if (nextThemeToSelect === 'white'){
        setCurrentTheme(whiteTheme);
    }
}