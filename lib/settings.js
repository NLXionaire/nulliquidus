/**
* The Settings Module reads the settings out of settings.json and provides
* this information to the other modules
*/

var fs = require("fs");
var jsonminify = require("jsonminify");

//The app title, visible e.g. in the browser window
exports.title = "blockchain";

//The url it will be accessed from
exports.address = "explorer.example.com";

//logo
exports.logo = "/images/logo.png";

//The app favicon fully specified url, visible e.g. in the browser window
exports.favicon = "favicon.ico";

//What is displayed for the home button in the top-left corner (valid options are: title, coin, logo)
exports.homelink = "coin";

// home link logo height (value in px, only valid if using homelink = 'logo')
exports.logoheight = 50;

//Theme
exports.theme = "Slate";

//The Port ep-lite should listen to
exports.port = process.env.PORT || 3001;

//coin symbol, visible e.g. MAX, LTC, HVC
exports.symbol = "NLX";

//coin name, visible e.g. in the browser window
exports.coin = "NulleX";

//This setting is passed to MongoDB to set up the database
exports.dbsettings = {
  "user": "nulliquidus",
  "password": "eR5n+x*lhM49c6-c",
  "database": "blockchaindb",
  "address" : "localhost",
  "port" : 27017
};

//This setting is passed to the wallet
exports.wallet = { "host" : "127.0.0.1",
  "port" : 46201,
  "user" : "nullexrpc",
  "pass" : "password"
};

//Locale file
exports.locale = "locale/en.json",

//Menu and panel items to display
// set a number to pnl variables to change the panel display order. lowest # = far left panel, highest # = far right panel, 0 = do not show panel
exports.display = {
  "api": true,
  "market": true,
  "twitter": false,
  "facebook": false,
  "googleplus": false,
  "bitcointalk": false,
  "website": false,
  "slack": false,
  "github": false,
  "discord": false,
  "telegram": false,
  "reddit": false,
  "youtube": false,
  "search": true,
  "richlist": true,
  "movement": true,
  "network": true,
  "networkpnl": 1,
  "difficultypnl": 2,
  "masternodespnl": 3,
  "coinsupplypnl": 4,
  "pricepnl": 5
};

//API view
exports.api = {
  "blockindex": 6415,
  "blockhash": "000000eb7e703c4a73d22c78b42333ba91cc5cb6cec0e54ddb22964fcbddc263",
  "txhash": "5e412c52ab5595baa11c3bf9fbd3342a630016db5814e9ff30cd1514826a689c",
  "address": "AXx1ePiu3jPHJjZ8HZtorxjQLpChtqgVUm",
};

// markets
exports.markets = {
  "coin": "NLX",
  "exchange": "BTC",
  "enabled": ['cryptopia'],
  "cryptopia_id": "4552",
  "ccex_key" : "Get-Your-Own-Key",
  "coinexchange_id": "",
  "default": "cryptopia"
};

// richlist/top100 settings
exports.richlist = {
  "distribution": true,
  "received": true,
  "balance": true
};

exports.movement = {
  "min_amount": 100,
  "low_flag": 1000,
  "high_flag": 10000
},

//index
exports.index = {
  "show_hashrate": false,
  "difficulty": "POS",
  "last_txs": 100
};

// twitter, facebook, googleplus, bitcointalk, github, slack, discord, telegram, reddit, youtube, website
exports.twitter = "your-twitter-username";
exports.facebook = "your-facebook-username";
exports.googleplus = "your-google-plus-username";
exports.bitcointalk = "your-bitcointalk-topic-value";
exports.github = "your-github-username/your-github-repo";
exports.slack = "your-full-slack-invite-url";
exports.discord = "your-full-discord-invite-url";
exports.telegram = "your-telegram-group-or-channel-name";
exports.reddit = "your-subreddit-name";
exports.youtube = "your-full-youtube-url";
exports.website = "your-full-website-url";

exports.confirmations = 6;

//timeouts
exports.update_timeout = 125;
exports.check_timeout = 250;

//genesis
exports.genesis_tx = "3bcd33b7d38538c060ba28f02dc983e364bb7b84303b505c216c2c0fb935568e";
exports.genesis_block = "000006cacaa033d02e73700344ec669171a2fa30cf310861cf46f8d92641450a";

exports.heavy = false;
exports.txcount = 100;
exports.show_sent_received = true;
exports.supply = "TXOUTSET";
exports.nethash = "getnetworkhashps";
exports.nethash_units = "G";

// simple Cross-Origin Resource Sharing (CORS) support
// enabling this feature will add a new output header to all requests like this: Access-Control-Allow-Origin: <corsorigin>
// corsorigin "*" will allow any origin to access the requested resource while specifying any other value for corsorigin will allow cross-origin requests only when the request is made from a source that matches the corsorigin filter
exports.usecors = false;
exports.corsorigin = "*";

exports.labels = {};

exports.reloadSettings = function reloadSettings() {
  // Discover where the settings file lives
  var settingsFilename = "settings.json";
  settingsFilename = "./" + settingsFilename;

  var settingsStr;
  try{
    //read the settings sync
    settingsStr = fs.readFileSync(settingsFilename).toString();
  } catch(e){
    console.warn('No settings file found. Continuing using defaults!');
  }

  // try to parse the settings
  var settings;
  try {
    if(settingsStr) {
      settingsStr = jsonminify(settingsStr).replace(",]","]").replace(",}","}");
      settings = JSON.parse(settingsStr);
    }
  }catch(e){
    console.error('There was an error processing your settings.json file: '+e.message);
    process.exit(1);
  }

  //loop trough the settings
  for(var i in settings)
  {
    //test if the setting start with a low character
    if(i.charAt(0).search("[a-z]") !== 0)
    {
      console.warn("Settings should start with a low character: '" + i + "'");
    }

    //we know this setting, so we overwrite it
    if(exports[i] !== undefined)
    {
      exports[i] = settings[i];
    }
    //this setting is unkown, output a warning and throw it away
    else
    {
      console.warn("Unknown Setting: '" + i + "'. This setting doesn't exist or it was removed");
    }
  }
};

// initially load settings
exports.reloadSettings();