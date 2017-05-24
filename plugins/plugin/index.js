/*!
 * plugin
 */

 "use strict";

/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express');
var Stack = contentstack.Stack();

module.exports = function Plugin() {

   /*
    * Plugin.options provides the options provided in the configuration.
    */

   var options = Plugin.options;

   /*
    * @templateExtends
    * @Description: Allows to extend the template engine functionality such as adding filters, macros etc.
    * @Parameter: engine - template engine object
    * @Example: using Nunjucks
           Plugin.templateExtends = function(engine) {
               // engine loader, setting filters etc.
               engine.getEnvironment().addFilter("shorten", function(str, count) {
                   return str.slice(0, count || 5);
               });
           };
    * @Usage: template file
           A message for you: {{ message | shorten }}
    */
   Plugin.templateExtends = function(engine) {

   };

   /*
    * @serverExtends
    * @Description: Allows to extend the server capabilities by adding a new or modifing the existing routes/middlewares.
    * @Parameters: app, contentstack express instance.
    * @Example:
           Plugin.serverExtends = function(app) {
               app
                   .use(function(req, res, next){
                       // your code goes here
                       next();
                   });
 
               app
                   .extends()
                   .get('/test', function(req, res, next){
                       // your code goes here
                       next();
                   });
           };
    */
   Plugin.serverExtends = function(app) {
       app.get('/v1/ser', function (req, res, next) {
           console.log('inside services')
           var Query = Stack.ContentType('services').Query();
           Query
               .toJSON()
               .find()
               .then(function success(entry) {
                   res.send(entry);
               }, function error(err){
                    console.log('err', err)
               });
       });
   };
  
   /*
    * @beforePublish
    * @Description: This function is triggered when the publish event occurs.
    * @Parameters: data - contains un-published entry, it's content_type and language.
    * @Parameters: next - call this function to pass control to the next subsequent "beforePublish" hook.
    *              It is important to call the next() function, it will affect the publish process,
    *              the entry will get stuck to "in-prgoress" state.
    * @Example:
           Plugin.beforePublish = function(data, next) {
               *
               * var entry = data.entry;
               * var contentType = data.contentType;
               * var language = data.language;
               *
           };
    */
   Plugin.beforePublish = function (data, next) {
       next();
   };
  
   /*
    * @beforeUnpublish
    * @Description: This function is triggered when the unpublish or delete event occurs.
    * @Parameters: data - contains un-published entry, it's content_type and language.
    * @Parameters: next - call this function to pass control to the next subsequent "beforeUnpublish" hook.
    *              It is important to call the next() function, it will affect the unpublish process,
    *              the entry will get stuck to "in-prgoress" state.
    * @Example:
           Plugin.beforeUnpublish = function(data, next) {
               *
               * var entry = data.entry;
               * var contentType = data.contentType;
               * var language = data.language;
               *
           };
    */
   Plugin.beforeUnpublish = function (data, next) {
       next();
   };
};