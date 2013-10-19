/******************************************
 *  TiCucumber                              *
 *  Copyright (c) 2013 by Codex Labs, LLC.  *
 *  See LICENSE for license.                *
 *******************************************/

var program = require('commander'),
	os = require('os'),
	colors = require("colors"),
	_ = require("../lib/ticucumber/underscore")._,
	pkginfo = require('pkginfo')(module, 'version'),
	path = require('path'),
	fs = require('fs');

////////////////////////////////////
////////// MAIN EXECUTION //////////
////////////////////////////////////
// Process command line input
program.version(module.exports.version, '-v, --version').description('TiCucumber command line').usage('COMMAND [ARGS] [OPTIONS]').option('-r, --run', 'Run cucumber (defaults to ios) ').option('-c, --console', 'starts an interactive console to interact with your app via TiCucumber (iOS only right now)').option('-g, --generate', 'Setup TiCucumber for any valid Alloy app.').option('-u, --upgrade', 'Upgrade TiCucumber for a specific APK or IPA');

program.command('run'.cyan + ''.white).description('   run cucumber (defaults to iOS)'.green);

program.command('console'.cyan + '  <dir> <target>'.white).description('    starts an interactive console to interact with your app via TiCucumber (iOS only right now)'.green);

program.command('generate'.cyan + '  <dir> <target>'.white).description('    setup TiCucumber for any valid Alloy app. This will generate a features folder if non exists. Classic Titanium might come if there is demand'.green);

program.command('upgrade'.cyan + ' <dir> <target>'.white).description('   Upgrade TiCucumber for a specific APK or IPA'.green);

program.parse(process.argv);

if (program.run) {
	var spawn = require('child_process').spawn;

	cucumber = spawn('cucumber', [], {
		stdio: 'inherit',
		cwd: 'build/iphone'
	});
	cucumber.on('close', function(code) {
		program.generate //this is farked up
	});
}

if (program.generate) {
	// titanium clean
	// rm -fR Resources/*
	// rm -fR build/*
	// titanium build --platform ios   --build-only
	// cd build/iphone && calabash-ios setup
	var spawn = require('child_process').spawn;
	clean = spawn('titanium', ['clean'], {
		stdio: 'inherit'
	});



	var util = require('util'),
		exec = require('child_process').exec,
		child;

	child = exec('titanium build --platform ios --sdk 3.1.2.GA --build-only', // command line argument directly in string
			function(error, stdout, stderr) { // one easy function to capture data/errors
						setup = spawn('calabash-ios', ['setup'], {
						stdio: 'inherit',
						cwd: 'build/iphone'
					});
					
					require("fs").symlink("../../features", "build/iphone/features",['dir'], function (e){
					  console.log(e);
					 console.log('this will be cleaned up. ');
					});
					
		});
	
	


//	require("fs").symlink();
	//exec("ln -s features ");
	

}
	
	
if (program.upgrade) console.log('coming soon');
if (program.console) console.log('soon');
//      
//      
//      // Setup up logging output
//      Error.stackTraceLimit = Infinity;
//      //logger.stripColors = program['colors'] === false;
//      //logger.logLevel = program['logLevel'] || logger.TRACE;
//      
//      if (!program.noBanner && program.args[0] !== 'info') {
//      	banner();
//      }
//      
//      if (program.args.length === 0)
//      {
//      	var help = program.helpInformation();
//      	help = help.replace('Usage: TiCucumber COMMAND [ARGS] [OPTIONS]','Usage: '+'ticucumber'.blue+' COMMAND'.white+' [ARGS] [OPTIONS]'.grey);
//      //	help = logger.stripColors ? colors.stripColors(help) : help;
//      	console.log(help);
//      	console.log(program.args);
//      	process.exit(0);
//      }
//      
//      //if (program.platform && !_.contains(CONST.PLATFORM_FOLDERS_ALLOY, program.platform)) {
//      //	U.die('Invalid platform "' + program.platform + '" specified, must be [' + CONST.PLATFORM_FOLDERS_TICUCUMBER.join(',') + ']');
//      //}
//      
//      // Validate the given command
//      var command = program.args[0];
//      if (!_.contains(getCommands(), command)) {
//      	console.log('Unknown command: ' + command.red);
//      }
//      
//      // Launch command with given arguments and options
//      (require('./commands/' + command + '/index'))(program.args.slice(1), program);
//      
//      ///////////////////////////////
//      ////////// FUNCTIONS //////////
//      ///////////////////////////////
//      function banner() {
//      
//      	var str ="TiCucumber \n by Codex Labs, LLC \n http://CodexLabs.com \n t: @codexlabs".green;
//      	
//      
//      	if (!program.dump) {
//      		console.log( str.cyan );
//      	
//      	}
//      }
//      
//      function getCommands() {
//      	try {
//      		var commandsPath = path.join(__dirname,'commands');
//      		return _.filter(fs.readdirSync(commandsPath), function(file) {
//      			return path.existsSync(path.join(commandsPath,file,'index.js'));
//      		});
//      	} catch (e) {
//      		console.log('Error getting command list');
//      	}
//      }
