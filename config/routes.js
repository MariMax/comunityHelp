/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': {
  //   view: 'homepage'
  // }

  'get /auth/logout': {controller:'AuthController', action:'logout', cors:true},//logout
  'post /auth/local/login': {controller:'AuthController', action:'callback', cors:true},//login
  'post /auth/local/:action': {controller:'AuthController', action:'callback', cors:true},//register
  'post /auth/local/reset': {controller:'AuthController', action:'reset', cors:true},//register
  'get /auth/checkAuth': {controller:'AuthController', action:'checkAuth', cors:true},

  'get /settings': {controller:'SettingsController', action:'get', cors:true},

  'post /file/upload':{controller:'FileController', action:'s3upload', cors:true},

  'post /event/save':{controller:'EventController', action:'save', cors:true},
  'get /event/getList':{controller:'EventController', action:'getList', cors:true},
  'get /event/count':{controller:'EventController', action:'count', cors:true},
  'get /event/subscribe':{controller:'EventController', action:'subscribe', cors:true},
  'post /event/get':{controller:'EventController', action:'get', cors:true},
  'post /event/delete':{controller:'EventController', action:'remove', cors:true},

  'post /user/get':{controller:'UserController', action:'get', cors:true},
  'post /user/update':{controller:'UserController', action:'update', cors:true},
  'post /user/getByEmail':{controller:'UserController', action:'getByEmail', cors:true},

  'post /chatrooms/getList': {controller:'ChatroomController', action:'getList', cors:true},
  'post /chatrooms/get': {controller:'ChatroomController', action:'get', cors:true},
  'post /chatrooms/invite': {controller:'ChatroomController', action:'invite', cors:true},
  'post /chatrooms/leave': {controller:'ChatroomController', action:'leave', cors:true},
  'post /chatrooms/new': {controller:'ChatroomController', action:'newChatRoom', cors:true},
  'post /chatrooms/getFull': {controller:'ChatroomController', action:'getFull', cors:true},
  'post /chatrooms/addMessage': {controller:'ChatroomController', action:'addMessage', cors:true},
  'post /chatrooms/getMessage': {controller:'ChatroomController', action:'getMessage', cors:true}

  // 'get /auth/:provider': 'AuthController.provider',
  // 'get /auth/:provider/callback': 'AuthController.callback',
  // 'get /auth/:provider/:action': 'AuthController.callback',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
