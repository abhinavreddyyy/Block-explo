# Block Explorer
### 1. Create a unique Alchemy API key
If you have not already done so, create a unique Alchemy API Mainnet key for your project as described here.

### 2. Add your API key to as an environment variable for the project
Create an empty .env file in the base directory of this project.

Add the following line to the .env file replacing YOUR_ALCHEMY_API_KEY with your api key.

REACT_APP_ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
Do not remove the REACT_APP_ prefix. React uses that to import env variables.

### 3. Start the webserver
`npm start`

Running the command above will run the app in the development mode. Open http://localhost:3000 to view it in your browser.

The webpage will automatically reload when you make code changes.

What you'll see in the browser is Ethereum Mainnet's current block number.