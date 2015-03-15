/**
 * SettingsController
 *
 * @description :: Server-side logic for managing Settings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `SettingsController.get()`
   */
  get: function (req, res) {
    return res.json({
      passwordMinLength: process.env.PASS_MIN_LENGTH
    });
  }
};

