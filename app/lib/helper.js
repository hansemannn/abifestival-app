
/**
 * Returns _TRUE_ is the current environment is in the Simulator, _FALSE_ otherwise.
 *
 * @return {Boolean} Whether or not the current environment is in the Simulator.
 */
exports.isSimulator = function() {
	return Ti.App.getDeployType() === 'development';
};
