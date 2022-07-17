import { createTheme, ThemeProvider } from '@mui/material/styles'

import { AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

const theme = createTheme()

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <ThemeProvider theme={theme}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <AuthProvider type="dbAuth">
          <RedwoodApolloProvider>
            <Routes />
          </RedwoodApolloProvider>
        </AuthProvider>
      </RedwoodProvider>
    </ThemeProvider>
  </FatalErrorBoundary>
)

export default App
