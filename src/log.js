// Command line output styling
const blackForeground = "\x1b[30m";
const brightYellowForeground = "\x1b[93m";
const brightCyanForeground = "\x1b[96m";
const redBackground = "\x1b[41m";
const brightGreenBackground = "\x1b[102m";
const bold = "\x1b[1m"
const underline = "\x1b[4m"
const resetStyling = "\x1b[0m";

const divider = "\n---------------------------------------------------\n";

let logLevel = 1;

const logLevels = {
    quiet: 0,
    standard: 1,
    verbose: 2
}

function getLogLevel() {
    return logLevel;
}

function setLogLevel(level) {
    if((level === '0') || (level === 'q') || (level === 'quiet')) logLevel = logLevels.quiet;
    else if((level === '1') || (level === 's') || (level === 'standard')) logLevel = logLevels.standard;
    else if((level === '2') || (level === 'v') || (level === 'verbose')) logLevel = logLevels.verbose;
    return;
}

function isQuiet() {
    return (logLevel === logLevels.quiet) ? true : false;
}

function isStandard() {
    return (logLevel === logLevels.standard) ? true : false;
}

function isVerbose() {
    return (logLevel === logLevels.verbose) ? true : false;
}

function standard(msg) {
    if (logLevel >= logLevels.standard) console.log(msg);
    return;
}

function verbose(msg) {
    if (logLevel >= logLevels.verbose) console.log(msg);
    return;
}

function logTitle() {
    verbose("");
    verbose("     )                             (    (      (                           ");
    verbose("  ( /(                      (      )\\ ) )\\ )   )\\ )                        ");
    verbose("  )\\())           (         )\\    (()/((()/(  (()/(      (    (  (     (   ");
    verbose(" ((_)\\   `  )    ))\\  (  ((((_)(   /(_))/(_))  /(_)) (   )(   )\\))(   ))\\  ");
    verbose("   ((_)  /(/(   /((_) )\\ ))\\ _ )\\ (_)) (_))   (_))_| )\\ (()\\ ((_))\\  /((_) ");
    verbose("  / _ \\ ((_)_\\ (_))  _(_/((_)_\\(_)| _ \\|_ _|  | |_  ((_) ((_) (()(_)(_))   ");
    verbose(" | (_) || '_ \\)/ -_)| ' \\))/ _ \\  |  _/ | |   | __|/ _ \\| '_|/ _` | / -_)  ");
    verbose("  \\___/ | .__/ \\___||_||_|/_/ \\_\\ |_|  |___|  |_|  \\___/|_|  \\__, | \\___|  ");
    verbose("        |_|                                                  |___/         ");
    verbose("");
    return;
}

function logInvalidSchema(errors) {
    standard(`${divider}`);
    standard(`            Schema validation ${redBackground}${blackForeground} FAILED ${resetStyling}`);
    standard(`${divider}`);
    const errorArray = Array.isArray(errors) ? errors : [errors];
    errorArray.forEach((error) => {
      let errorMessage = error.message;
      if(error.instancePath !== undefined) errorMessage +=  `at ${error.instancePath}`
      console.error(errorMessage);
    });
    standard(`${divider}`);
}

function logSuccessfulForge(numberOfDiscoveredModels, numberOfDiscoveredEndpoints) {
    standard(`${divider}`);
    standard(`            API generation ${brightGreenBackground}${blackForeground} SUCCESSFUL ${resetStyling}`);
    standard(`${divider}`);
    standard(" Your API has been forged from the fiery furnace:");
    standard(` ${brightCyanForeground}${numberOfDiscoveredModels}${resetStyling} models have been molded`);
    standard(` ${brightCyanForeground}${numberOfDiscoveredEndpoints}${resetStyling} endpoints have been cast`);
    standard(`${divider}`);
    return;
}

function logFailedForge(exception) {
    standard(`${divider}`);
    standard(`              API generation ${redBackground}${blackForeground} FAILED ${resetStyling}`);
    standard(`${divider}`);
    if(getLogLevel() === log.logLevels.standard) {
      standard(`${exception.message}`);
    } else {
      verbose(`${exception.stack}`);
    }
    standard(`${divider}`);
    return;
}

function logFailedTesting(language, exception) {
    log.standard(`${log.divider}`);
    log.standard(`              ${language} testing ${log.redBackground}${log.blackForeground} FAILED ${log.resetStyling}`);
    log.standard(`${log.divider}`);
    if(log.isStandard()) {
        log.standard(`${exception.message}`);
    } else {
        log.verbose(`${exception.stack}`);
    }
    log.standard(`${log.divider}`);
}

module.exports = {
    blackForeground,
    brightYellowForeground,
    brightCyanForeground,
    redBackground,
    brightGreenBackground,
    bold,
    underline,
    resetStyling,
    divider,
    logLevel,
    logLevels,
    getLogLevel,
    setLogLevel,
    isQuiet,
    isStandard,
    isVerbose,
    standard,
    verbose,
    logFailedTesting,
    logTitle,
    logInvalidSchema,
    logSuccessfulForge,
    logFailedForge,
    logFailedTesting
};