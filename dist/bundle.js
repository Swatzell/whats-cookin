/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-color: #006b95;\n  background: linear-gradient(to bottom, #006b95, white);\n  min-height: 100vh;\n  margin: 0;\n  font-family: Arial, Helvetica, sans-serif;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  align-items: center;\n}\n\nh1 {\n  text-align: center;\n  margin-top: 0;\n  font-family: cursive;\n  text-decoration: wavy;\n  font-size: 3.5rem;\n}\n\nh2.card-title {\n  margin: 10px;\n  font-size: 16px;\n  font-weight: bold;\n}\n\n.main-title {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n}\n\n.topnav {\n  overflow: hidden;\n  background-color: #ea9636;\n  display: flex;\n  justify-content: center;\n  align-items: baseline;\n  margin-top: 20px;\n  border-radius: 20px;\n}\n\n.topnav a {\n  float: left;\n  display: block;\n  color: black;\n  text-align: center;\n  padding: 14px 16px;\n  text-decoration: none;\n  font-size: 17px;\n  margin-left: 100px;\n}\n\n.topnav a:hover {\n  background-color: #ddd;\n  color: black;\n}\n\n.topnav a.active {\n  background-color: #2196f3;\n  color: white;\n}\n\n.topnav .search-container {\n  float: right;\n}\n\n.topnav input[type=text] {\n  padding: 6px;\n  margin-top: 8px;\n  font-size: 17px;\n  border: none;\n  margin-left: 40px;\n}\n\n.topnav > button {\n  margin-left: 10px;\n}\n\n.topnav .search-container button:hover {\n  background: #ccc;\n}\n\n@media screen and (max-width: 600px) {\n  .topnav .search-container {\n    float: none;\n  }\n  .topnav a,\n  .topnav input[type=text],\n  .topnav .search-container button {\n    float: none;\n    display: block;\n    text-align: left;\n    width: 100%;\n    margin: 0;\n    padding: 14px;\n  }\n  .topnav input[type=text] {\n    border: 1px solid #ccc;\n  }\n}\n.featured-recipes,\n.all-recipes-page {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n}\n\n.all-recipes-page {\n  font-family: Arial, Helvetica, sans-serif;\n}\n\n.main-page {\n  display: flex;\n  flex-direction: column;\n}\n\n.featured-recipes-header {\n  margin-top: 150px;\n  margin-bottom: 0px;\n  display: flex;\n  justify-content: center;\n}\n\n.featured-recipe-box {\n  display: flex;\n  margin-bottom: 20px;\n  flex-direction: column;\n  border-color: black;\n  border: solid 2px;\n  border-radius: 5px;\n  background-color: white;\n  height: 220px;\n  width: 220px;\n  margin-left: 70px;\n  margin-right: 70px;\n  margin-top: 70px;\n}\n\n.card.title {\n  margin: 10px;\n  font-size: 16px;\n  font-weight: bold;\n}\n\n.hidden {\n  display: none !important;\n}\n\n.dropbtn,\n.saved-dropbtn {\n  font-size: 17px;\n  border: none;\n  outline: none;\n  color: black;\n  padding: 14px 16px;\n  background-color: inherit;\n  margin-left: 40px;\n  cursor: pointer;\n  width: 100px;\n  color: black;\n}\n\n.dropbtn:hover {\n  background-color: #ddd;\n}\n\n.dropdown-content,\n.saved-dropdown-content {\n  display: none;\n  position: absolute;\n  background-color: #f9f9f9;\n  min-width: 100px;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n  column-count: 2;\n}\n\n.dropdown:hover .dropdown-content,\n.saved-dropdown:hover .saved-dropdown-content {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  margin-left: 40px;\n}\n\n.dropdown-content a,\n.saved-dropdown-content a {\n  padding: 2px 2px;\n  text-decoration: none;\n  color: black;\n  box-sizing: border-box;\n  flex: 0 0 33.33%;\n  margin-right: 40px;\n}\n\n.dropdown-content a:hover,\n.saved-dropdown-content a:hover {\n  background-color: grey;\n}\n\n.recipe-image {\n  display: flex;\n  width: auto;\n  max-width: 100%;\n  margin: 0 auto;\n  margin-top: 20px;\n  border-radius: 10px;\n}\n\n.featured-recipe-box:hover {\n  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.7);\n  cursor: pointer;\n}\n\n.save-button,\n.remove-button {\n  position: relative;\n  bottom: -20px;\n  left: 50%;\n  transform: translateX(-50%);\n  background-color: #ea9636;\n  color: black;\n  border: none;\n  padding: 10px 20px;\n  cursor: pointer;\n  border-radius: 5px;\n}\n\n.save-button:hover,\n.remove-button:hover {\n  background-color: #e8d9c8;\n  text-decoration: underline;\n}\n\nbutton.search-button,\nbutton.saved-search-button {\n  margin-right: 15px;\n  border-radius: 5px;\n  cursor: pointer;\n  color: white;\n  background-color: #006b95;\n}\n\n.save-button.saved {\n  background-color: #4caf50;\n}", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;EACE,yBAAA;EACA,sDAAA;EACA,iBAAA;EACA,SAAA;EACA,yCAAA;EACA,aAAA;EACA,mBAAA;EACA,sBAAA;EACA,mBAAA;AACF;;AAEA;EACE,kBAAA;EACA,aAAA;EACA,oBAAA;EACA,qBAAA;EACA,iBAAA;AACF;;AAEA;EACE,YAAA;EACA,eAAA;EACA,iBAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,eAAA;AACF;;AAEA;EACE,gBAAA;EACA,yBAAA;EACA,aAAA;EACA,uBAAA;EACA,qBAAA;EACA,gBAAA;EACA,mBAAA;AACF;;AAEA;EACE,WAAA;EACA,cAAA;EACA,YAAA;EACA,kBAAA;EACA,kBAAA;EACA,qBAAA;EACA,eAAA;EACA,kBAAA;AACF;;AAEA;EACE,sBAAA;EACA,YAAA;AACF;;AAEA;EACE,yBAAA;EACA,YAAA;AACF;;AAEA;EACE,YAAA;AACF;;AAEA;EACE,YAAA;EACA,eAAA;EACA,eAAA;EACA,YAAA;EACA,iBAAA;AACF;;AACA;EACE,iBAAA;AAEF;;AAAA;EACE,gBAAA;AAGF;;AAAA;EACE;IACE,WAAA;EAGF;EADA;;;IAGE,WAAA;IACA,cAAA;IACA,gBAAA;IACA,WAAA;IACA,SAAA;IACA,aAAA;EAGF;EADA;IACE,sBAAA;EAGF;AACF;AAAA;;EAEE,aAAA;EACA,eAAA;EACA,8BAAA;AAEF;;AACA;EACE,yCAAA;AAEF;;AACA;EACE,aAAA;EACA,sBAAA;AAEF;;AACA;EACE,iBAAA;EACA,kBAAA;EACA,aAAA;EACA,uBAAA;AAEF;;AACA;EACE,aAAA;EACA,mBAAA;EACA,sBAAA;EACA,mBAAA;EACA,iBAAA;EACA,kBAAA;EACA,uBAAA;EACA,aAAA;EACA,YAAA;EACA,iBAAA;EACA,kBAAA;EACA,gBAAA;AAEF;;AACA;EACE,YAAA;EACA,eAAA;EACA,iBAAA;AAEF;;AACA;EACE,wBAAA;AAEF;;AAGA;;EAEE,eAAA;EACA,YAAA;EACA,aAAA;EACA,YAAA;EACA,kBAAA;EACA,yBAAA;EACA,iBAAA;EACA,eAAA;EACA,YAAA;EACA,YAAA;AAAF;;AAGA;EACE,sBAAA;AAAF;;AAIA;;EAEE,aAAA;EACA,kBAAA;EACA,yBAAA;EACA,gBAAA;EACA,+CAAA;EACA,UAAA;EACA,eAAA;AADF;;AAKA;;EAEE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,iBAAA;AAFF;;AAKA;;EAEE,gBAAA;EACA,qBAAA;EACA,YAAA;EACA,sBAAA;EACA,gBAAA;EACA,kBAAA;AAFF;;AAKA;;EAEE,sBAAA;AAFF;;AAKA;EACE,aAAA;EACA,WAAA;EACA,eAAA;EACA,cAAA;EACA,gBAAA;EACA,mBAAA;AAFF;;AAKA;EACE,0CAAA;EACA,eAAA;AAFF;;AAKA;;EAEE,kBAAA;EACA,aAAA;EACA,SAAA;EACA,2BAAA;EACA,yBAAA;EACA,YAAA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;EACA,kBAAA;AAFF;;AAKA;;EAEE,yBAAA;EACA,0BAAA;AAFF;;AAKA;;EAEE,kBAAA;EACA,kBAAA;EACA,eAAA;EACA,YAAA;EACA,yBAAA;AAFF;;AAKA;EACE,yBAAA;AAFF","sourcesContent":["body {\n  background-color: #006b95;\n  background: linear-gradient(to bottom, #006b95, white);\n  min-height: 100vh;\n  margin: 0;\n  font-family: Arial, Helvetica, sans-serif;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  align-items: center;\n}\n\nh1 {\n  text-align: center;\n  margin-top: 0;\n  font-family: cursive;\n  text-decoration: wavy;\n  font-size: 3.5rem;\n}\n\nh2.card-title {\n  margin: 10px;\n  font-size: 16px;\n  font-weight: bold;\n}\n\n.main-title {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n}\n\n.topnav {\n  overflow: hidden;\n  background-color: #ea9636;\n  display: flex;\n  justify-content: center;\n  align-items: baseline;\n  margin-top: 20px;\n  border-radius: 20px;\n}\n\n.topnav a {\n  float: left;\n  display: block;\n  color: black;\n  text-align: center;\n  padding: 14px 16px;\n  text-decoration: none;\n  font-size: 17px;\n  margin-left: 100px;\n}\n\n.topnav a:hover {\n  background-color: #ddd;\n  color: black;\n}\n\n.topnav a.active {\n  background-color: #2196f3;\n  color: white;\n}\n\n.topnav .search-container {\n  float: right;\n}\n\n.topnav input[type=\"text\"] {\n  padding: 6px;\n  margin-top: 8px;\n  font-size: 17px;\n  border: none;\n  margin-left: 40px;\n}\n.topnav > button {\n  margin-left: 10px;\n}\n.topnav .search-container button:hover {\n  background: #ccc;\n}\n\n@media screen and (max-width: 600px) {\n  .topnav .search-container {\n    float: none;\n  }\n  .topnav a,\n  .topnav input[type=\"text\"],\n  .topnav .search-container button {\n    float: none;\n    display: block;\n    text-align: left;\n    width: 100%;\n    margin: 0;\n    padding: 14px;\n  }\n  .topnav input[type=\"text\"] {\n    border: 1px solid #ccc;\n  }\n}\n\n.featured-recipes,\n.all-recipes-page {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n}\n\n.all-recipes-page {\n  font-family: Arial, Helvetica, sans-serif;\n}\n\n.main-page {\n  display: flex;\n  flex-direction: column;\n}\n\n.featured-recipes-header {\n  margin-top: 150px;\n  margin-bottom: 0px;\n  display: flex;\n  justify-content: center;\n}\n\n.featured-recipe-box {\n  display: flex;\n  margin-bottom: 20px;\n  flex-direction: column;\n  border-color: black;\n  border: solid 2px;\n  border-radius: 5px;\n  background-color: white;\n  height: 220px;\n  width: 220px;\n  margin-left: 70px;\n  margin-right: 70px;\n  margin-top: 70px;\n}\n\n.card.title {\n  margin: 10px;\n  font-size: 16px;\n  font-weight: bold;\n}\n\n.hidden {\n  display: none !important;\n}\n\n\n\n.dropbtn,\n.saved-dropbtn {\n  font-size: 17px;\n  border: none;\n  outline: none;\n  color: black;\n  padding: 14px 16px;\n  background-color: inherit;\n  margin-left: 40px;\n  cursor: pointer;\n  width: 100px;\n  color: black;\n}\n\n.dropbtn:hover {\n  background-color: #ddd;\n}\n\n\n.dropdown-content,\n.saved-dropdown-content {\n  display: none;\n  position: absolute;\n  background-color: #f9f9f9;\n  min-width: 100px;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n  column-count: 2;\n}\n\n\n.dropdown:hover .dropdown-content,\n.saved-dropdown:hover .saved-dropdown-content {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  margin-left: 40px;\n}\n\n.dropdown-content a,\n.saved-dropdown-content a {\n  padding: 2px 2px;\n  text-decoration: none;\n  color: black;\n  box-sizing: border-box;\n  flex: 0 0 33.33%;\n  margin-right: 40px;\n}\n\n.dropdown-content a:hover,\n.saved-dropdown-content a:hover {\n  background-color: grey;\n}\n\n.recipe-image {\n  display: flex;\n  width: auto;\n  max-width: 100%;\n  margin: 0 auto;\n  margin-top: 20px;\n  border-radius: 10px;\n}\n\n.featured-recipe-box:hover {\n  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.7);\n  cursor: pointer;\n}\n\n.save-button,\n.remove-button {\n  position: relative;\n  bottom: -20px;\n  left: 50%;\n  transform: translateX(-50%);\n  background-color: #ea9636;\n  color: black;\n  border: none;\n  padding: 10px 20px;\n  cursor: pointer;\n  border-radius: 5px;\n}\n\n.save-button:hover,\n.remove-button:hover {\n  background-color: #e8d9c8;\n  text-decoration: underline;\n}\n\nbutton.search-button,\nbutton.saved-search-button {\n  margin-right: 15px;\n  border-radius: 5px;\n  cursor: pointer;\n  color: white;\n  background-color: #006b95;\n}\n\n.save-button.saved {\n  background-color: #4caf50;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchIngredients: () => (/* binding */ fetchIngredients),
/* harmony export */   fetchRecipes: () => (/* binding */ fetchRecipes),
/* harmony export */   fetchUsers: () => (/* binding */ fetchUsers),
/* harmony export */   saveRecipeToServer: () => (/* binding */ saveRecipeToServer)
/* harmony export */ });
// Your fetch requests will live here!

function fetchUsers() {
    return fetch("http://localhost:3001/api/v1/users")
      .then(response => response.json());
  }
  
  function fetchIngredients() {
    return fetch("http://localhost:3001/api/v1/ingredients")
      .then(response => response.json());
  }
  function fetchRecipes() {
    return fetch("http://localhost:3001/api/v1/recipes")
      .then(response => response.json());
  }

  
  function saveRecipeToServer(userId, recipeId) {
    const requestBody = {
      userID: userId,
      recipeID: recipeId,
    };
  
    console.log("Sending request:", requestBody); 
  
    return fetch("http://localhost:3001/api/v1/usersRecipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
    .then(response => {
      console.log("Received response:", response); 
      return response.json();
    })
    .then(data => {
      console.log("Received data:", data);
      return data;
    })
    .catch(error => {
      console.error("Error:", error);
      throw error;
    });
  }

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const ingredientsData = [
    {
      "id": 20081,
      "name": "wheat flour",
      "estimatedCostInCents": 142
    },
    {
      "id": 18372,
      "name": "bicarbonate of soda",
      "estimatedCostInCents": 582
    },
    {
      "id": 1123,
      "name": "eggs",
      "estimatedCostInCents": 472
    },
    {
      "id": 19335,
      "name": "sucrose",
      "estimatedCostInCents": 902
    },
    {
      "id": 19206,
      "name": "instant vanilla pudding",
      "estimatedCostInCents": 660
    },
    {
      "id": 19334,
      "name": "brown sugar",
      "estimatedCostInCents": 559
    },
    {
      "id": 2047,
      "name": "salt",
      "estimatedCostInCents": 280
    },
    {
      "id": 1012047,
      "name": "fine sea salt",
      "estimatedCostInCents": 528
    },
    {
      "id": 10019903,
      "name": "semi sweet chips",
      "estimatedCostInCents": 253
    },
    {
      "id": 1145,
      "name": "unsalted butter",
      "estimatedCostInCents": 617
    },
    {
      "id": 2050,
      "name": "vanilla",
      "estimatedCostInCents": 926
    },
    {
      "id": 1009016,
      "name": "apple cider",
      "estimatedCostInCents": 468
    },
    {
      "id": 9003,
      "name": "apple",
      "estimatedCostInCents": 207
    },
    {
      "id": 20027,
      "name": "corn starch",
      "estimatedCostInCents": 236
    },
    {
      "id": 1002046,
      "name": "dijon style mustard",
      "estimatedCostInCents": 619
    },
    {
      "id": 11215,
      "name": "whole garlic clove",
      "estimatedCostInCents": 220
    },
    {
      "id": 1012046,
      "name": "whole grain dijon mustard",
      "estimatedCostInCents": 867
    },
    {
      "id": 19911,
      "name": "maple",
      "estimatedCostInCents": 349
    },
    {
      "id": 16112,
      "name": "miso",
      "estimatedCostInCents": 978
    },
    {
      "id": 10010062,
      "name": "pork chop",
      "estimatedCostInCents": 834
    },
    {
      "id": 1102047,
      "name": "s&p",
      "estimatedCostInCents": 524
    },
    {
      "id": 16124,
      "name": "soy sauce",
      "estimatedCostInCents": 486
    },
    {
      "id": 1016168,
      "name": "sriracha sauce",
      "estimatedCostInCents": 576
    },
    {
      "id": 1002030,
      "name": "black pepper",
      "estimatedCostInCents": 441
    },
    {
      "id": 1001,
      "name": "butter",
      "estimatedCostInCents": 618
    },
    {
      "id": 4582,
      "name": "oil",
      "estimatedCostInCents": 807
    },
    {
      "id": 2031,
      "name": "red pepper powder",
      "estimatedCostInCents": 583
    },
    {
      "id": 5100,
      "name": "chicken wing",
      "estimatedCostInCents": 593
    },
    {
      "id": 2009,
      "name": "red chili powder",
      "estimatedCostInCents": 499
    },
    {
      "id": 1022020,
      "name": "garlic powder",
      "estimatedCostInCents": 344
    },
    {
      "id": 6168,
      "name": "tabasco sauce",
      "estimatedCostInCents": 859
    },
    {
      "id": 9176,
      "name": "mangoes",
      "estimatedCostInCents": 425
    },
    {
      "id": 2026,
      "name": "onion powder",
      "estimatedCostInCents": 597
    },
    {
      "id": 1042047,
      "name": "seasoned salt",
      "estimatedCostInCents": 334
    },
    {
      "id": 18371,
      "name": "baking powder",
      "estimatedCostInCents": 346
    },
    {
      "id": 9040,
      "name": "ripe banana",
      "estimatedCostInCents": 331
    },
    {
      "id": 20011,
      "name": "buck wheat flour",
      "estimatedCostInCents": 865
    },
    {
      "id": 1230,
      "name": "buttermilk",
      "estimatedCostInCents": 773
    },
    {
      "id": 19296,
      "name": "runny honey",
      "estimatedCostInCents": 742
    },
    {
      "id": 16098,
      "name": "peanut butter",
      "estimatedCostInCents": 490
    },
    {
      "id": 2048,
      "name": "apple cider vinegar",
      "estimatedCostInCents": 532
    },
    {
      "id": 20090,
      "name": "brown rice flour",
      "estimatedCostInCents": 667
    },
    {
      "id": 93784,
      "name": "brown rice syrup",
      "estimatedCostInCents": 126
    },
    {
      "id": 1124,
      "name": "egg albumen",
      "estimatedCostInCents": 304
    },
    {
      "id": 93625,
      "name": "evaporated cane juice",
      "estimatedCostInCents": 118
    },
    {
      "id": 12220,
      "name": "flax meal",
      "estimatedCostInCents": 296
    },
    {
      "id": 10118375,
      "name": "instant yeast",
      "estimatedCostInCents": 383
    },
    {
      "id": 19304,
      "name": "unsulfured molasses",
      "estimatedCostInCents": 925
    },
    {
      "id": 11413,
      "name": "Potato Starch Flour",
      "estimatedCostInCents": 895
    },
    {
      "id": 93696,
      "name": "tapioca starch",
      "estimatedCostInCents": 656
    },
    {
      "id": 93760,
      "name": "Whole Grain Teff Flour",
      "estimatedCostInCents": 539
    },
    {
      "id": 14412,
      "name": "ice water",
      "estimatedCostInCents": 625
    },
    {
      "id": 93626,
      "name": "xanthan gum",
      "estimatedCostInCents": 625
    },
    {
      "id": 19350,
      "name": "corn syrup",
      "estimatedCostInCents": 441
    },
    {
      "id": 9099,
      "name": "fruit cocktail",
      "estimatedCostInCents": 953
    },
    {
      "id": 12061,
      "name": "whole almonds",
      "estimatedCostInCents": 1029
    },
    {
      "id": 12104,
      "name": "coconut",
      "estimatedCostInCents": 918
    },
    {
      "id": 12115,
      "name": "coconut cream",
      "estimatedCostInCents": 304
    },
    {
      "id": 4047,
      "name": "coconut oil",
      "estimatedCostInCents": 152
    },
    {
      "id": 10019071,
      "name": "dark chocolate morsels",
      "estimatedCostInCents": 632
    },
    {
      "id": 8212,
      "name": "granola cereal",
      "estimatedCostInCents": 381
    },
    {
      "id": 8121,
      "name": "oatmeal",
      "estimatedCostInCents": 659
    },
    {
      "id": 12142,
      "name": "pecan",
      "estimatedCostInCents": 314
    },
    {
      "id": 93740,
      "name": "blanched almond flour",
      "estimatedCostInCents": 986
    },
    {
      "id": 1125,
      "name": "egg yolks",
      "estimatedCostInCents": 889
    },
    {
      "id": 12023,
      "name": "sesame seeds",
      "estimatedCostInCents": 886
    },
    {
      "id": 1015062,
      "name": "chicken tenders",
      "estimatedCostInCents": 657
    },
    {
      "id": 10011109,
      "name": "slaw mix",
      "estimatedCostInCents": 681
    },
    {
      "id": 10116098,
      "name": "creamy peanut butter",
      "estimatedCostInCents": 152
    },
    {
      "id": 2064,
      "name": "mint",
      "estimatedCostInCents": 575
    },
    {
      "id": 2021,
      "name": "powdered ginger",
      "estimatedCostInCents": 783
    },
    {
      "id": 9160,
      "name": "juice of lime",
      "estimatedCostInCents": 477
    },
    {
      "id": 9266,
      "name": "pineapple",
      "estimatedCostInCents": 834
    },
    {
      "id": 11135,
      "name": "cauliflower",
      "estimatedCostInCents": 486
    },
    {
      "id": 6172,
      "name": "chicken stock",
      "estimatedCostInCents": 454
    },
    {
      "id": 93632,
      "name": "ghee",
      "estimatedCostInCents": 370
    },
    {
      "id": 12120,
      "name": "hazelnut",
      "estimatedCostInCents": 812
    },
    {
      "id": 93690,
      "name": "nutritional yeast flakes",
      "estimatedCostInCents": 969
    },
    {
      "id": 11282,
      "name": "onions",
      "estimatedCostInCents": 439
    },
    {
      "id": 10010123,
      "name": "proscuitto",
      "estimatedCostInCents": 217
    },
    {
      "id": 11096,
      "name": "rapini",
      "estimatedCostInCents": 846
    },
    {
      "id": 6150,
      "name": "bar b que sauce",
      "estimatedCostInCents": 966
    },
    {
      "id": 6194,
      "name": "chicken broth",
      "estimatedCostInCents": 983
    },
    {
      "id": 93627,
      "name": "liquid smoke",
      "estimatedCostInCents": 412
    },
    {
      "id": 2028,
      "name": "paprika",
      "estimatedCostInCents": 302
    },
    {
      "id": 10072,
      "name": "pork shoulder",
      "estimatedCostInCents": 969
    },
    {
      "id": 6971,
      "name": "worcestershire",
      "estimatedCostInCents": 57
    },
    {
      "id": 93607,
      "name": "almondmilk",
      "estimatedCostInCents": 787
    },
    {
      "id": 18942,
      "name": "graham cracker crust",
      "estimatedCostInCents": 655
    },
    {
      "id": 1012010,
      "name": "ground cinnamon",
      "estimatedCostInCents": 742
    },
    {
      "id": 2025,
      "name": "nutmeg powder",
      "estimatedCostInCents": 480
    },
    {
      "id": 43274,
      "name": "low fat cream cheese",
      "estimatedCostInCents": 1048
    },
    {
      "id": 8120,
      "name": "whole grain rolled oats",
      "estimatedCostInCents": 98
    },
    {
      "id": 11424,
      "name": "canned pumpkin",
      "estimatedCostInCents": 852
    },
    {
      "id": 9016,
      "name": "apple juice",
      "estimatedCostInCents": 710
    },
    {
      "id": 18047,
      "name": "raisin bread",
      "estimatedCostInCents": 222
    },
    {
      "id": 1089003,
      "name": "grannysmith apple",
      "estimatedCostInCents": 459
    },
    {
      "id": 1077,
      "name": "full-fat milk",
      "estimatedCostInCents": 276
    },
    {
      "id": 11297,
      "name": "flat leaf parsley leaves",
      "estimatedCostInCents": 1030
    },
    {
      "id": 1032009,
      "name": "dried red chili",
      "estimatedCostInCents": 1015
    },
    {
      "id": 15152,
      "name": "jumbo shrimp",
      "estimatedCostInCents": 804
    },
    {
      "id": 11294,
      "name": "vidalia onion",
      "estimatedCostInCents": 595
    },
    {
      "id": 11007,
      "name": "artichokes",
      "estimatedCostInCents": 203
    },
    {
      "id": 9150,
      "name": "lemon",
      "estimatedCostInCents": 766
    },
    {
      "id": 9156,
      "name": "lemon peel",
      "estimatedCostInCents": 630
    },
    {
      "id": 18069,
      "name": "gluten-free white sandwich bread",
      "estimatedCostInCents": 863
    },
    {
      "id": 1033,
      "name": "parmesan cheese",
      "estimatedCostInCents": 398
    },
    {
      "id": 2027,
      "name": "oregano",
      "estimatedCostInCents": 835
    },
    {
      "id": 1034053,
      "name": "extra virgin olive oil",
      "estimatedCostInCents": 305
    },
    {
      "id": 2004,
      "name": "bay leaves",
      "estimatedCostInCents": 785
    },
    {
      "id": 19336,
      "name": "powdered sugar",
      "estimatedCostInCents": 603
    },
    {
      "id": 11143,
      "name": "celery",
      "estimatedCostInCents": 840
    },
    {
      "id": 1129,
      "name": "hardcooked eggs",
      "estimatedCostInCents": 882
    },
    {
      "id": 4641,
      "name": "reduced fat mayo",
      "estimatedCostInCents": 697
    },
    {
      "id": 1011256,
      "name": "skim greek yogurt",
      "estimatedCostInCents": 263
    },
    {
      "id": 11944,
      "name": "hotdog relish",
      "estimatedCostInCents": 391
    },
    {
      "id": 10011282,
      "name": "red onion",
      "estimatedCostInCents": 638
    },
    {
      "id": 11353,
      "name": "idaho potato",
      "estimatedCostInCents": 742
    },
    {
      "id": 10211821,
      "name": "bell pepper",
      "estimatedCostInCents": 741
    },
    {
      "id": 10020048,
      "name": "brown minute rice",
      "estimatedCostInCents": 386
    },
    {
      "id": 93651,
      "name": "italian cheese blend",
      "estimatedCostInCents": 233
    },
    {
      "id": 7927,
      "name": "sweet italian turkey sausage",
      "estimatedCostInCents": 216
    },
    {
      "id": 11549,
      "name": "canned tomato sauce",
      "estimatedCostInCents": 622
    },
    {
      "id": 10120129,
      "name": "bread flour",
      "estimatedCostInCents": 114
    },
    {
      "id": 1053,
      "name": "cream",
      "estimatedCostInCents": 645
    },
    {
      "id": 4053,
      "name": "pure olive oil",
      "estimatedCostInCents": 705
    },
    {
      "id": 19912,
      "name": "agave syrup",
      "estimatedCostInCents": 642
    },
    {
      "id": 10020080,
      "name": "pastry flour",
      "estimatedCostInCents": 497
    },
    {
      "id": 10019334,
      "name": "dark brown sugar",
      "estimatedCostInCents": 501
    },
    {
      "id": 93814,
      "name": "lightly sweetened whipped cream",
      "estimatedCostInCents": 88
    },
    {
      "id": 11206,
      "name": "cucumber",
      "estimatedCostInCents": 262
    },
    {
      "id": 20035,
      "name": "quinoa",
      "estimatedCostInCents": 514
    },
    {
      "id": 11529,
      "name": "heirloom tomatoes",
      "estimatedCostInCents": 321
    },
    {
      "id": 14242,
      "name": "cranberry juice cocktail",
      "estimatedCostInCents": 335
    },
    {
      "id": 14130,
      "name": "cream soda",
      "estimatedCostInCents": 585
    },
    {
      "id": 19177,
      "name": "gelatine",
      "estimatedCostInCents": 1011
    },
    {
      "id": 93645,
      "name": "halloween sprinkles",
      "estimatedCostInCents": 293
    },
    {
      "id": 14051,
      "name": "grey goose vodka",
      "estimatedCostInCents": 373
    },
    {
      "id": 1054,
      "name": "whipped cream",
      "estimatedCostInCents": 689
    },
    {
      "id": 93828,
      "name": "marinated artichoke hearts",
      "estimatedCostInCents": 982
    },
    {
      "id": 11266,
      "name": "crimini mushrooms",
      "estimatedCostInCents": 150
    },
    {
      "id": 1017,
      "name": "cream cheese",
      "estimatedCostInCents": 955
    },
    {
      "id": 1019,
      "name": "feta",
      "estimatedCostInCents": 1003
    },
    {
      "id": 1022027,
      "name": "mixed italian herbs",
      "estimatedCostInCents": 253
    },
    {
      "id": 1082047,
      "name": "kosher salt",
      "estimatedCostInCents": 972
    },
    {
      "id": 10011457,
      "name": "spinach",
      "estimatedCostInCents": 336
    },
    {
      "id": 2044,
      "name": "basil",
      "estimatedCostInCents": 203
    },
    {
      "id": 7036,
      "name": "italian sausage links",
      "estimatedCostInCents": 1010
    },
    {
      "id": 10111549,
      "name": "marinara sauce",
      "estimatedCostInCents": 171
    },
    {
      "id": 1038,
      "name": "pecorino romano cheese",
      "estimatedCostInCents": 50
    },
    {
      "id": 11304,
      "name": "peas",
      "estimatedCostInCents": 768
    },
    {
      "id": 11677,
      "name": "shallots",
      "estimatedCostInCents": 696
    },
    {
      "id": 11020420,
      "name": "pasta shells",
      "estimatedCostInCents": 862
    },
    {
      "id": 1001026,
      "name": "shredded mozzarella",
      "estimatedCostInCents": 184
    },
    {
      "id": 93630,
      "name": "skim milk ricotta cheese",
      "estimatedCostInCents": 395
    },
    {
      "id": 14106,
      "name": "white wine",
      "estimatedCostInCents": 675
    },
    {
      "id": 11463,
      "name": "frozen spinach",
      "estimatedCostInCents": 830
    },
    {
      "id": 1025,
      "name": "pepperjack",
      "estimatedCostInCents": 212
    },
    {
      "id": 10014623,
      "name": "blackberry juice",
      "estimatedCostInCents": 256
    },
    {
      "id": 9302,
      "name": "raspberry",
      "estimatedCostInCents": 247
    },
    {
      "id": 9354,
      "name": "pineapple with juice",
      "estimatedCostInCents": 926
    },
    {
      "id": 9070,
      "name": "sweet cherries",
      "estimatedCostInCents": 184
    },
    {
      "id": 14181,
      "name": "chocolate syrup",
      "estimatedCostInCents": 530
    },
    {
      "id": 10018617,
      "name": "graham cracker crumbs",
      "estimatedCostInCents": 205
    },
    {
      "id": 12135,
      "name": "nuts",
      "estimatedCostInCents": 978
    },
    {
      "id": 9037,
      "name": "haas avocados",
      "estimatedCostInCents": 275
    },
    {
      "id": 16057,
      "name": "garbanzos",
      "estimatedCostInCents": 85
    },
    {
      "id": 2045,
      "name": "dillweed",
      "estimatedCostInCents": 162
    },
    {
      "id": 1256,
      "name": "greek yogurt",
      "estimatedCostInCents": 231
    },
    {
      "id": 9152,
      "name": "lemon juice",
      "estimatedCostInCents": 274
    },
    {
      "id": 11291,
      "name": "spring onions",
      "estimatedCostInCents": 55
    },
    {
      "id": 9236,
      "name": "peaches",
      "estimatedCostInCents": 109
    },
    {
      "id": 19095,
      "name": "icecream",
      "estimatedCostInCents": 447
    },
    {
      "id": 10862,
      "name": "cooked bacon strips",
      "estimatedCostInCents": 868
    },
    {
      "id": 5114,
      "name": "roasted chicken",
      "estimatedCostInCents": 708
    },
    {
      "id": 11333,
      "name": "green peppers",
      "estimatedCostInCents": 303
    },
    {
      "id": 1026,
      "name": "fresh mozzarella",
      "estimatedCostInCents": 290
    },
    {
      "id": 10211529,
      "name": "italian tomato",
      "estimatedCostInCents": 978
    },
    {
      "id": 1011009,
      "name": "white cheddar",
      "estimatedCostInCents": 709
    },
    {
      "estimatedCostInCents": 205
    },
    {
      "id": 98998,
      "name": "balsamic glaze",
      "estimatedCostInCents": 759
    },
    {
      "id": 8030,
      "name": "fruit loops",
      "estimatedCostInCents": 191
    },
    {
      "id": 19116,
      "name": "marshmallow",
      "estimatedCostInCents": 425
    },
    {
      "id": 16158,
      "name": "hummus",
      "estimatedCostInCents": 491
    },
    {
      "id": 2046,
      "name": "prepared yellow mustard",
      "estimatedCostInCents": 300
    },
    {
      "id": 1214,
      "name": "evaporated milk",
      "estimatedCostInCents": 95
    },
    {
      "id": 9214,
      "name": "orange juice concentrate",
      "estimatedCostInCents": 379
    },
    {
      "id": 9216,
      "name": "orange peel",
      "estimatedCostInCents": 882
    },
    {
      "id": 10123,
      "name": "bacon slices",
      "estimatedCostInCents": 817
    },
    {
      "id": 11052,
      "name": "string beans",
      "estimatedCostInCents": 502
    },
    {
      "id": 11959,
      "name": "baby arugula leaves",
      "estimatedCostInCents": 207
    },
    {
      "id": 1004,
      "name": "blue cheese",
      "estimatedCostInCents": 646
    },
    {
      "id": 9252,
      "name": "pear",
      "estimatedCostInCents": 467
    },
    {
      "id": 43408,
      "name": "pear juice",
      "estimatedCostInCents": 163
    },
    {
      "id": 2049,
      "name": "fresh thyme leaves",
      "estimatedCostInCents": 681
    },
    {
      "id": 12155,
      "name": "walnut halves",
      "estimatedCostInCents": 895
    },
    {
      "id": 10011693,
      "name": "canned tomato",
      "estimatedCostInCents": 171
    },
    {
      "id": 11124,
      "name": "carrots",
      "estimatedCostInCents": 136
    },
    {
      "id": 2012,
      "name": "coriander",
      "estimatedCostInCents": 52
    },
    {
      "id": 1002014,
      "name": "comino",
      "estimatedCostInCents": 547
    },
    {
      "id": 11913,
      "name": "frozen corn",
      "estimatedCostInCents": 558
    },
    {
      "id": 11477,
      "name": "zucchini squash",
      "estimatedCostInCents": 742
    },
    {
      "id": 10220445,
      "name": "steamed rice",
      "estimatedCostInCents": 1040
    },
    {
      "id": 2003,
      "name": "ground basil",
      "estimatedCostInCents": 198
    },
    {
      "id": 16018,
      "name": "canned black beans",
      "estimatedCostInCents": 356
    },
    {
      "id": 99223,
      "name": "canned chipotle chilies in adobo",
      "estimatedCostInCents": 299
    },
    {
      "id": 11165,
      "name": "cilantro",
      "estimatedCostInCents": 159
    },
    {
      "id": 10218364,
      "name": "flour tortilla",
      "estimatedCostInCents": 653
    },
    {
      "id": 10611282,
      "name": "white onions",
      "estimatedCostInCents": 449
    },
    {
      "id": 11457,
      "name": "baby spinach leaves",
      "estimatedCostInCents": 668
    },
    {
      "id": 11268,
      "name": "dried shiitake mushroom",
      "estimatedCostInCents": 806
    },
    {
      "id": 10020005,
      "name": "farro",
      "estimatedCostInCents": 286
    },
    {
      "id": 10511282,
      "name": "yellow onion",
      "estimatedCostInCents": 241
    },
    {
      "id": 2069,
      "name": "balsamic vinegar",
      "estimatedCostInCents": 118
    },
    {
      "id": 11250,
      "name": "boston bibb lettuce",
      "estimatedCostInCents": 61
    },
    {
      "id": 11156,
      "name": "fresh chive",
      "estimatedCostInCents": 728
    },
    {
      "id": 4025,
      "name": "mayonnaise",
      "estimatedCostInCents": 630
    },
    {
      "id": 11119,
      "name": "napa cabbage",
      "estimatedCostInCents": 1009
    },
    {
      "id": 11112,
      "name": "red cabbage",
      "estimatedCostInCents": 659
    },
    {
      "id": 98962,
      "name": "sweet chili sauce",
      "estimatedCostInCents": 1001
    },
    {
      "id": 2042,
      "name": "dried thyme",
      "estimatedCostInCents": 307
    },
    {
      "id": 1002020,
      "name": "granulated garlic",
      "estimatedCostInCents": 228
    },
    {
      "id": 10023572,
      "name": "ground chuck",
      "estimatedCostInCents": 600
    },
    {
      "id": 10011250,
      "name": "butterhead lettuce leaves",
      "estimatedCostInCents": 341
    },
    {
      "id": 5064,
      "name": "baked chicken breast",
      "estimatedCostInCents": 1020
    },
    {
      "id": 2015,
      "name": "curry seasoning",
      "estimatedCostInCents": 312
    },
    {
      "id": 1009159,
      "name": "lime peel",
      "estimatedCostInCents": 435
    },
    {
      "id": 98991,
      "name": "mint chutney",
      "estimatedCostInCents": 927
    },
    {
      "id": 9316,
      "name": "strawberry",
      "estimatedCostInCents": 292
    },
    {
      "id": 11090,
      "name": "broccoli crowns",
      "estimatedCostInCents": 256
    },
    {
      "id": 10011821,
      "name": "sweet orange pepper",
      "estimatedCostInCents": 968
    },
    {
      "id": 10218,
      "name": "pork tenderloin",
      "estimatedCostInCents": 845
    },
    {
      "id": 19157,
      "name": "mini m&m",
      "estimatedCostInCents": 552
    },
    {
      "id": 98871,
      "name": "hawaiian sweet rolls",
      "estimatedCostInCents": 535
    },
    {
      "id": 1055062,
      "name": "boneless skinless chicken breasts",
      "estimatedCostInCents": 897
    },
    {
      "id": 10019151,
      "name": "reese pieces",
      "estimatedCostInCents": 721
    },
    {
      "id": 1041009,
      "name": "cheese",
      "estimatedCostInCents": 850
    },
    {
      "id": 10018413,
      "name": "flatbread",
      "estimatedCostInCents": 326
    },
    {
      "id": 10111529,
      "name": "grape tomato",
      "estimatedCostInCents": 168
    },
    {
      "id": 9019,
      "name": "unsweetened apple sauce",
      "estimatedCostInCents": 154
    },
    {
      "id": 18079,
      "name": "dry breadcrumbs",
      "estimatedCostInCents": 167
    },
    {
      "id": 16069,
      "name": "legumes",
      "estimatedCostInCents": 903
    },
    {
      "id": 9079,
      "name": "dried cranberries",
      "estimatedCostInCents": 921
    },
    {
      "id": 11935,
      "name": "catsup",
      "estimatedCostInCents": 666
    },
    {
      "id": 12151,
      "name": "pistachio",
      "estimatedCostInCents": 813
    },
    {
      "id": 11821,
      "name": "red sweet peppers",
      "estimatedCostInCents": 1027
    },
    {
      "id": 6615,
      "name": "vegetable stock",
      "estimatedCostInCents": 613
    }
  ];

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ingredientsData);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateRecipeCost: () => (/* binding */ calculateRecipeCost),
/* harmony export */   createRecipesNeeded: () => (/* binding */ createRecipesNeeded),
/* harmony export */   findRecipeTags: () => (/* binding */ findRecipeTags),
/* harmony export */   getRecipeInstructions: () => (/* binding */ getRecipeInstructions),
/* harmony export */   searchRecipeName: () => (/* binding */ searchRecipeName)
/* harmony export */ });
/* harmony import */ var _data_recipes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _data_ingredients__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
//Here is an example demonstrating logic separated that can be imported into the scripts and test files. Feel free to update this later!



const findRecipeTags = (recipeData, tag) => {
  let recipeNamesTags = recipeData
    .filter((recipe) => recipe.tags.includes(tag.toLowerCase()))
  return recipeNamesTags;
};

const searchRecipeName = (recipeData, ingredient) => {
  let recipeInfo = recipeData
      .filter((recipe) => recipe.name.toLowerCase().includes(ingredient.trim().toLowerCase()));
      if (recipeInfo.length === 0){
        const returnMessage =  "No Results Found"
        return returnMessage
      } else 
    return recipeInfo;
};

const createRecipesNeeded = (recipeID, recipeData, ingredientsData) => {
  let foundRecipe = recipeData.find((recipe) => recipe.id === recipeID);

  let ingredientsIds = foundRecipe.ingredients.map(
    (ingredient) => ingredient.id
  );
  let ingredientsNamesArray = ingredientsData
    .filter((ingredient) => ingredientsIds.includes(ingredient.id))
    .map((ingredient) => ingredient.name);

  return ingredientsNamesArray;
};
console.log(createRecipesNeeded)

const calculateRecipeCost = (recipeID, recipeData, ingredientsData) => {
  const recipe = recipeData.find((recipe) => recipe.id === recipeID);

  const totalCost = recipe.ingredients.reduce((acc, ingredient) => {
    const ingredientData = ingredientsData.find(
      (data) => data.id === ingredient.id
    );

    if (ingredientData) {
      return (
        acc + ingredientData.estimatedCostInCents * ingredient.quantity.amount
      );
    }

    return acc;
  }, 0);

  return totalCost / 100;
};

const getRecipeInstructions = (recipeID, recipeData) => {
  const recipe = recipeData.find((recipe) => recipe.id === recipeID);
  return recipe.instructions.map((instruction) => `${instruction.number}: ${instruction.instruction}`);
};

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const recipeData = [
    {
      "id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [
        {
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "id": 19206,
          "quantity": {
            "amount": 3,
            "unit": "Tbsp"
          }
        },
        {
          "id": 19334,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 1012047,
          "quantity": {
            "amount": 24,
            "unit": "servings"
          }
        },
        {
          "id": 10019903,
          "quantity": {
            "amount": 2,
            "unit": "c"
          }
        },
        {
          "id": 1145,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "id": 2050,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
          "number": 1
        },
        {
          "instruction": "Add egg and vanilla and mix until combined.",
          "number": 2
        },
        {
          "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
          "number": 3
        },
        {
          "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
          "number": 4
        },
        {
          "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
          "number": 5
        },
        {
          "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
          "number": 6
        }
      ],
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    },
    {
      "id": 678353,
      "image": "https://spoonacular.com/recipeImages/678353-556x370.jpg",
      "ingredients": [
        {
          "id": 1009016,
          "quantity": {
            "amount": 1.5,
            "unit": "cups"
          }
        },
        {
          "id": 9003,
          "quantity": {
            "amount": 2,
            "unit": ""
          }
        },
        {
          "id": 20027,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 1002046,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 1,
            "unit": "clove"
          }
        },
        {
          "id": 1012046,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 19911,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 16112,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 10010062,
          "quantity": {
            "amount": 24,
            "unit": "ounce"
          }
        },
        {
          "id": 1102047,
          "quantity": {
            "amount": 4,
            "unit": "servings"
          }
        },
        {
          "id": 16124,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 1016168,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!",
          "number": 1
        }
      ],
      "name": "Maple Dijon Apple Cider Grilled Pork Chops",
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    },
    {
      "id": 412309,
      "image": "https://spoonacular.com/recipeImages/412309-556x370.jpeg",
      "ingredients": [
        {
          "id": 1002030,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 19334,
          "quantity": {
            "amount": 8,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1001,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 4582,
          "quantity": {
            "amount": 4,
            "unit": "servings"
          }
        },
        {
          "id": 2031,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 5100,
          "quantity": {
            "amount": 1,
            "unit": "pound"
          }
        },
        {
          "id": 2009,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 1022020,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 6168,
          "quantity": {
            "amount": 8,
            "unit": "cups"
          }
        },
        {
          "id": 9176,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 2026,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        },
        {
          "id": 1042047,
          "quantity": {
            "amount": 1.5,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1042047,
          "quantity": {
            "amount": 4,
            "unit": "teaspoons"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.",
          "number": 1
        }
      ],
      "name": "Dirty Steve's Original Wing Sauce",
      "tags": [
        "sauce"
      ]
    },
    {
      "id": 741603,
      "image": "https://spoonacular.com/recipeImages/741603-556x370.jpeg",
      "ingredients": [
        {
          "id": 20081,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 18371,
          "quantity": {
            "amount": 2,
            "unit": "teaspoons"
          }
        },
        {
          "id": 9040,
          "quantity": {
            "amount": 12,
            "unit": "servings"
          }
        },
        {
          "id": 20011,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 1001,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1001,
          "quantity": {
            "amount": 6,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1230,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 2,
            "unit": ""
          }
        },
        {
          "id": 19296,
          "quantity": {
            "amount": 12,
            "unit": "servings"
          }
        },
        {
          "id": 16098,
          "quantity": {
            "amount": 12,
            "unit": "servings"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 2,
            "unit": "teaspoons"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Watch how to make this recipe.",
          "number": 1
        },
        {
          "instruction": "In a large bowl, whisk together buttermilk, eggs, baking powder, sugar, salt and butter.",
          "number": 2
        },
        {
          "instruction": "In another large bowl mix together all-purpose flour and buckwheat flour.",
          "number": 3
        },
        {
          "instruction": "Slowly add flour into the wet ingredients mixing with a whisk.",
          "number": 4
        },
        {
          "instruction": "Mix until there are no lumps and the batter is smooth and velvety.",
          "number": 5
        },
        {
          "instruction": "In a large cast iron skillet or flat grill pan over medium-high heat, melt a tablespoon of butter. Ladle pancake batter onto skillet to desired size. Using the ladle, form pancake into circular shape. Cook on each side for 2 to 3 minutes or until golden brown. Set pancakes aside and keep warm. Repeat with remaining ingredients.",
          "number": 6
        },
        {
          "instruction": "Once completed, spread peanut butter on a pancake, layer it with sliced bananas and drizzle it with honey. Top the pancake with another pancake to form a sandwich. Repeat with remaining pancakes and serve with extra honey.",
          "number": 7
        }
      ],
      "name": "Elvis Pancakes",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 562334,
      "image": "https://spoonacular.com/recipeImages/562334-556x370.jpg",
      "ingredients": [
        {
          "id": 2048,
          "quantity": {
            "amount": 2,
            "unit": "teaspoons"
          }
        },
        {
          "id": 18371,
          "quantity": {
            "amount": 0.3333333333333333,
            "unit": "teaspoon"
          }
        },
        {
          "id": 20090,
          "quantity": {
            "amount": 1.125,
            "unit": "cup"
          }
        },
        {
          "id": 93784,
          "quantity": {
            "amount": 2,
            "unit": "teaspoons"
          }
        },
        {
          "id": 4582,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 1124,
          "quantity": {
            "amount": 3,
            "unit": "large"
          }
        },
        {
          "id": 93625,
          "quantity": {
            "amount": 2,
            "unit": "teaspoons"
          }
        },
        {
          "id": 12220,
          "quantity": {
            "amount": 2,
            "unit": "Tablespoons"
          }
        },
        {
          "id": 10118375,
          "quantity": {
            "amount": 2,
            "unit": "teaspoons"
          }
        },
        {
          "id": 19304,
          "quantity": {
            "amount": 2,
            "unit": "teaspoons"
          }
        },
        {
          "id": 11413,
          "quantity": {
            "amount": 0.75,
            "unit": "cup"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 0.75,
            "unit": "teaspoon"
          }
        },
        {
          "id": 93696,
          "quantity": {
            "amount": 0.75,
            "unit": "cup"
          }
        },
        {
          "id": 93760,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 14412,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 93626,
          "quantity": {
            "amount": 2,
            "unit": "teaspoons"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Grease or spray oil a 9×5 inch loaf pan.Preheat oven to 170 – 200°F (lowest possible).",
          "number": 1
        },
        {
          "instruction": "Mix warm water with brown rice syrup, molasses, and yeast in a cup larger than 8 oz., as it may bubble over; set aside until foamy on the top, no more than 5 minutes.In the bowl of your mixer, beat the eggs at high speed in a large mixing bowl until large bubbles form, about 20 seconds.",
          "number": 2
        },
        {
          "instruction": "Whisk together the dry ingredients; set aside.",
          "number": 3
        },
        {
          "instruction": "Add the oil, vinegar and yeast mixture to the egg whites and blend on low for a few seconds.",
          "number": 4
        },
        {
          "instruction": "Add dry ingredients all at once and mix on low speed until all dry ingredients are moistened. Then beat on high for 1 minute.",
          "number": 5
        },
        {
          "instruction": "Add dough batter to prepared pan and distribute and smooth the top using a rubber spatula. You'll want to meet all sides of the pan. If you miss the corners that will still be okay. It will fill in upon rising. To even out top, drop a few drops of filtered water on top, and spread evenly with a rubber spatula, or dip spatula in water several times.",
          "number": 6
        },
        {
          "instruction": "Place the bread pan in the oven. Turn oven off. Allow the dough to rise until the center is about 1/2” over the top of the pan, about 22 minutes. It will rise more while the oven is heating and during baking.",
          "number": 7
        },
        {
          "instruction": "Remove pan from oven and preheat oven to 375°F.",
          "number": 8
        },
        {
          "instruction": "Place the pan on the center of the rack in the center of the oven and bake for about 45 minutes or more.",
          "number": 9
        },
        {
          "instruction": "Remove the loaf from the oven and immediately remove it from the pan (careful it will be hot), and set the loaf on a cooling rack to cool. If you do not remove it right away the steam will make the crust soggy.Slice off the two ends to allow the steam to escape, or it will begin to sink in on the sides and bottom.Once cooled, it will shrink a little bit. Slice it with an electric slicer, electric knife or serrated knife. You'll get about 13-16, depending upon how thick you slice it.",
          "number": 10
        }
      ],
      "name": "Mock Udi’s Gluten Free Whole Grain Bread",
      "tags": []
    },
    {
      "id": 507921,
      "image": "https://spoonacular.com/recipeImages/507921-556x370.jpg",
      "ingredients": [
        {
          "id": 18371,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 19350,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 1124,
          "quantity": {
            "amount": 2,
            "unit": "large"
          }
        },
        {
          "id": 20081,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 9099,
          "quantity": {
            "amount": 15,
            "unit": "oz"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 1,
            "unit": "pinch"
          }
        },
        {
          "id": 2050,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 14412,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "To make the Cupcakes: Preheat oven to 350 degrees. Line 12 cupcake tins with paper holders.",
          "number": 1
        },
        {
          "instruction": "Whisk together dry Fruit Cocktail Cupcakes ingredients.",
          "number": 2
        },
        {
          "instruction": "Add in wet Fruit Cocktail Cupcakes ingredients and stir with a rubber spatula until thoroughly combined. Fill cupcake tins evenly, and bake for 20 minutes or until thin knife inserted in center comes out clean.",
          "number": 3
        }
      ],
      "name": "Ambrosia Cupcakes",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 721146,
      "image": "https://spoonacular.com/recipeImages/721146-556x370.jpg",
      "ingredients": [
        {
          "id": 12061,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 19334,
          "quantity": {
            "amount": 6,
            "unit": "tablespoons"
          }
        },
        {
          "id": 12104,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 12115,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 4047,
          "quantity": {
            "amount": 6,
            "unit": "tablespoons"
          }
        },
        {
          "id": 10019071,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 8212,
          "quantity": {
            "amount": 1,
            "unit": "Handful"
          }
        },
        {
          "id": 19911,
          "quantity": {
            "amount": 5,
            "unit": "tablespoons"
          }
        },
        {
          "id": 8121,
          "quantity": {
            "amount": 3,
            "unit": "cups"
          }
        },
        {
          "id": 12142,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 2050,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Preheat the oven to 325 degrees F.Coarsely chop the almonds and pecans.",
          "number": 1
        },
        {
          "instruction": "Combine the oats, almonds, pecans, and salt in a bowl. Toss to combine.In a medium-sized bowl, combine the coconut oil (measure exactly when it's melted and not in the hardened state), and 1/2 cup chocolate chips.Microwave in bursts of 15 seconds stirring in between each burst for 15 seconds until completely melted.Stir in the brown sugar (measured lightly packed), honey or maple syrup, and vanilla extract.",
          "number": 2
        },
        {
          "instruction": "Pour the chocolate wet mixture into the oat and nut mixture and stir until well combined.",
          "number": 3
        },
        {
          "instruction": "Spread the granola evenly onto a parchment lined baking sheet.",
          "number": 4
        },
        {
          "instruction": "Bake for 20-30 minutes (depending on the heat of your oven) making sure to flip and stir the granola around every 6-8 minutes.",
          "number": 5
        },
        {
          "instruction": "Remove and allow the granola to harden and set up. (It may be soft and not very \"granola-like\", but it hardens as it dries out so be careful to not over-cook it). Mine generally takes about 21 minutes to be fully baked.Allow the granola to sit at room temperature for a few hours to harden and set up.Once the granola is hardened, stir in the remaining 1/2 cup chocolate chips and the toasted flaked coconut.To make a yogurt bowl: fill a bowl with the coconut cream yogurt, add a swirl of nut butter, add some fruit such as a banana, add the granola, and finish with chia seeds. Enjoy immediately.",
          "number": 6
        }
      ],
      "name": "Creamy Coconut Yogurt Bowl with Chocolate Granola (Video)",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 541288,
      "image": "https://spoonacular.com/recipeImages/541288-556x370.jpg",
      "ingredients": [
        {
          "id": 20081,
          "quantity": {
            "amount": 160,
            "unit": "g"
          }
        },
        {
          "id": 93740,
          "quantity": {
            "amount": 40,
            "unit": "g"
          }
        },
        {
          "id": 1125,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 1,
            "unit": "pinch"
          }
        },
        {
          "id": 12023,
          "quantity": {
            "amount": 40,
            "unit": "g"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 80,
            "unit": "g"
          }
        },
        {
          "id": 1145,
          "quantity": {
            "amount": 1,
            "unit": "stick"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Cut the butter into small cubes and keep them refrigerated until ready to use (I cut on parchment paper and wrap up the butter for easy transfer.).In the food processor, combine the flour, almond meal, sugar, and salt. If you don’t have a food processor, you can simply use a bowl to mix all the ingredients.If you want your sesame seeds to be fine texture, add them now. If you prefer to keep the original shape of sesame seeds, add them with egg yolk later on.Take out the butter from the refrigerator and mix together. If you use a regular bowl to mix, use a dough/pastry blender to combine the butter into the dry ingredients.Lastly add egg yolk.If the food processor is small (like mine) and it doesn’t look like it’s mixed completely, take it out and mix well with a silicone spatula.Form the dough into a ball and cut in half.",
          "number": 1
        },
        {
          "instruction": "Roll it to a log approximately 2” across. For me it’s easier to work when the dough is wrapped in plastic wrap. While rolling, unwrap some parts of plastic wrap then roll again. Form a nice shape. I wasn't paying attention so my log is flat on one side (see step 11)!Wrap the logs tightly in plastic wrap and refrigerate until firm, about 1 hour.Preheat the oven to 350° F (175° C).",
          "number": 2
        },
        {
          "instruction": "Remove the dough from plastic wrap and cut into discs about ¼ inch thick (if you prefer thicker cookies, cut into discs about ½ inch and you get 20 cookies total).",
          "number": 3
        },
        {
          "instruction": "Place them on two baking sheets lined with parchment paper.",
          "number": 4
        },
        {
          "instruction": "Bake for about 15 minutes, or until lightly browned around the edges.",
          "number": 5
        },
        {
          "instruction": "Remove from the oven and allow to cool on the baking sheet for about 10 minutes. Then transfer to a wire rack to cool completely. Store cookies in an airtight container. Cookies will last for a day or two.",
          "number": 6
        }
      ],
      "name": "Sesame Cookies",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    },
    {
      "id": 779583,
      "image": "https://spoonacular.com/recipeImages/779583-556x370.jpg",
      "ingredients": [
        {
          "id": 19334,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 19334,
          "quantity": {
            "amount": 3,
            "unit": "tablespoons"
          }
        },
        {
          "id": 4582,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 4582,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1015062,
          "quantity": {
            "amount": 1,
            "unit": "pound"
          }
        },
        {
          "id": 10011109,
          "quantity": {
            "amount": 4,
            "unit": "cups"
          }
        },
        {
          "id": 10116098,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 2064,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 2021,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 9160,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 9266,
          "quantity": {
            "amount": 1.25,
            "unit": "cups"
          }
        },
        {
          "id": 16124,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 1016168,
          "quantity": {
            "amount": 0.5,
            "unit": "tablespoon"
          }
        },
        {
          "id": 1016168,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Prepare the chicken: In a large bowl, whisk together the brown sugar, ginger, oil, soy sauce, Sriracha and peanut butter.",
          "number": 1
        },
        {
          "instruction": "Add the chicken and toss to coat.",
          "number": 2
        },
        {
          "instruction": "Let marinate at room temperature for 15 minutes or cover and refrigerate for up to 6 hours. Preheat the oven broiler with a rack set 4-inches from the heat source. Line an 18x13-inch rimmed sheet pan with foil and spray with nonstick spray.",
          "number": 3
        },
        {
          "instruction": "Remove the chicken from the marinade, discarding excess marinade, and place on prepared pan, covering two-thirds of the pan and spacing evenly. Broil for 6 minutes.",
          "number": 4
        },
        {
          "instruction": "Remove the pan from the oven and spread pineapple on the remaining space on the pan. Sprinkle the pineapple with 1 tablespoon brown sugar. Broil for 3 to 5 minutes or until chicken is browned and no longer pink inside.",
          "number": 5
        },
        {
          "instruction": "Transfer the chicken to serving plates.",
          "number": 6
        },
        {
          "instruction": "Place the coleslaw mix in a medium bowl.",
          "number": 7
        },
        {
          "instruction": "Add the broiled pineapple, lime juice, oil, soy sauce and Sriracha; toss to coat. Divide among the plates with the chicken and sprinkle the slaw with mint or basil.",
          "number": 8
        }
      ],
      "name": "Thai Chicken Tenders with Broiled Pineapple Slaw",
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    },
    {
      "id": 550940,
      "image": "https://spoonacular.com/recipeImages/550940-556x370.jpg",
      "ingredients": [
        {
          "id": 11135,
          "quantity": {
            "amount": 1,
            "unit": "large head"
          }
        },
        {
          "id": 6172,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 1002046,
          "quantity": {
            "amount": 1,
            "unit": "tbsp"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 8,
            "unit": ""
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 2,
            "unit": "cloves"
          }
        },
        {
          "id": 93632,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 12120,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 93690,
          "quantity": {
            "amount": 2,
            "unit": "tbsp"
          }
        },
        {
          "id": 11282,
          "quantity": {
            "amount": 1,
            "unit": "small"
          }
        },
        {
          "id": 1002030,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 10010123,
          "quantity": {
            "amount": 5,
            "unit": "slices"
          }
        },
        {
          "id": 11096,
          "quantity": {
            "amount": 200,
            "unit": "g"
          }
        },
        {
          "id": 1012047,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Preheat the oven to 375FCook and peel the hard boiled eggs according to your favourite method.",
          "number": 1
        },
        {
          "instruction": "Add onion, garlic, salt and pepper to a medium saucepan. Cook over medium heat for one or two minutes, until fragrant and slightly softened.Throw the cauliflower florets in and continue cooking for a minute or two.",
          "number": 2
        },
        {
          "instruction": "Add chicken stock, cover and bring to the boil; lower heat and continue cooking until the cauliflower is tender, about 5-7 minutes.Ladle the cauliflower mixture into your blender; add ghee, Dijon mustard and nutritional yeast and process on high speed until super smooth and silky in consistency. Set aside. Steam the rapini for 30 seconds to a minute, until slightly softened and bright green. In a small skillet, dry roast the hazelnuts over medium heat until they become fragrant and take a nice golden coloration. Slice the hard boiled eggs and add them to a large mixing bowl, followed by “Bechamel” sauce, rapini and three quarters of the hazelnuts.",
          "number": 3
        },
        {
          "instruction": "Mix very delicately until well combined and transfer to an oven safe dish. Tear the prosciutto into smaller pieces and arrange them on top of the dish. Sprinkle with the rest of the hazelnuts. Cover with foil and place in the oven for 20 minutes; after that time, remove the foil and set the oven to broil for a 2-3 minutes or until the prosciutto becomes nice and crispy and takes a nice golden coloration. You could also make this ahead of time and place it in the fridge after you have covered it with foil (although you might want to let it cool a bit beforehand). In this case, you’ll want to increase oven time to about 45 minutes, at 375F. This also reheats extremely well in the microwave and will easily keep for 4-5 days in the refrigerator.",
          "number": 4
        }
      ],
      "name": "Egg and Rapini Casserole",
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    },
    {
      "id": 583502,
      "image": "https://spoonacular.com/recipeImages/583502-556x370.jpg",
      "ingredients": [
        {
          "id": 6150,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 19334,
          "quantity": {
            "amount": 2,
            "unit": "tbsp"
          }
        },
        {
          "id": 6194,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 3,
            "unit": "large"
          }
        },
        {
          "id": 93627,
          "quantity": {
            "amount": 3,
            "unit": "tbsp"
          }
        },
        {
          "id": 11282,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
        {
          "id": 2028,
          "quantity": {
            "amount": 8,
            "unit": "servings"
          }
        },
        {
          "id": 10072,
          "quantity": {
            "amount": 6,
            "unit": "lbs"
          }
        },
        {
          "id": 1102047,
          "quantity": {
            "amount": 8,
            "unit": "servings"
          }
        },
        {
          "id": 6971,
          "quantity": {
            "amount": 2,
            "unit": "tbsp"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Combine 1 cup chicken broth, 1 cup BBQ sauce, 3 tbsp liquid smoke, 2 tbsp Worcestershire sauce, 3 pressed garlic cloves, 2 tbsp brown sugar and stir to combine.Generously sprinkle the pork roast with salt, pepper and paprika.Rub the seasoning into the pork shoulder.Chop 1 large onion and place it into the bottom of the slow cooker.",
          "number": 1
        },
        {
          "instruction": "Place the pork roast over the onion and pour the marinade over the pork.Cover and set on low for 8 hours.",
          "number": 2
        },
        {
          "instruction": "Let it cool down so you don't burn your fingers while shredding.",
          "number": 3
        },
        {
          "instruction": "Remove the meat to a large bowl and shred. This meat is fall-apart tender! The marinade enhances the natural flavors of the pork. When you're done shredding the pork, pour as much of the remaining sauce over the pork as you like.",
          "number": 4
        },
        {
          "instruction": "Serve with more Baby Rays BBQ Sauce... and pickles",
          "number": 5
        }
      ],
      "name": "Pulled Pork",
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    },
    {
      "id": 543687,
      "image": "https://spoonacular.com/recipeImages/543687-556x370.jpg",
      "ingredients": [
        {
          "id": 93607,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 9040,
          "quantity": {
            "amount": 1,
            "unit": "small"
          }
        },
        {
          "id": 18942,
          "quantity": {
            "amount": 1,
            "unit": "Tbsp"
          }
        },
        {
          "id": 1012010,
          "quantity": {
            "amount": 0.25,
            "unit": "tsp"
          }
        },
        {
          "id": 2021,
          "quantity": {
            "amount": 1,
            "unit": "pinch"
          }
        },
        {
          "id": 2025,
          "quantity": {
            "amount": 1,
            "unit": "pinch"
          }
        },
        {
          "id": 43274,
          "quantity": {
            "amount": 1,
            "unit": "oz"
          }
        },
        {
          "id": 8120,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 11424,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Add all ingredients to a blender (except graham crackers if using). Cover and blend until well pureed then serve topped with crushed graham crackers if desired.*The banana is mostly what gives this smoothie it's sweetness, so I recommend using one that is speckled (not mushy though).Recipe Source: Cooking Classy",
          "number": 1
        }
      ],
      "name": "Pumpkin Cheesecake Breakfast Smoothie",
      "tags": [
        "morning meal",
        "brunch",
        "breakfast"
      ]
    },
    {
      "id": 516904,
      "image": "https://spoonacular.com/recipeImages/516904-556x370.jpg",
      "ingredients": [
        {
          "id": 9016,
          "quantity": {
            "amount": 3,
            "unit": "Tablespoons"
          }
        },
        {
          "id": 19334,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 1001,
          "quantity": {
            "amount": 1,
            "unit": "Tablespoon"
          }
        },
        {
          "id": 1001,
          "quantity": {
            "amount": 2,
            "unit": "Tablespoons"
          }
        },
        {
          "id": 18047,
          "quantity": {
            "amount": 16,
            "unit": "ounce"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 10,
            "unit": "large"
          }
        },
        {
          "id": 1089003,
          "quantity": {
            "amount": 5,
            "unit": "medium"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 2,
            "unit": "Tablespoons"
          }
        },
        {
          "id": 1012010,
          "quantity": {
            "amount": 0.5,
            "unit": "teaspoon"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 0.5,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1077,
          "quantity": {
            "amount": 3,
            "unit": "cups"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Prepare apple filling: Melt butter over medium heat in 12- inch skillet.",
          "number": 1
        },
        {
          "instruction": "Add apples and sugar; cook 20 minutes, stirring occasionally. Stir in apple juice; cook 1 more minute.",
          "number": 2
        },
        {
          "instruction": "Grease 13 x 9-inch baking dish. Arrange 1/2 of bread slices, overlapping slightly.",
          "number": 3
        },
        {
          "instruction": "In a medium bowl, whisk milk, salt, cinnamon and eggs.",
          "number": 4
        },
        {
          "instruction": "Pour 1/2 of egg mixture over bread. Set aside 1/4 of apple filling; cover and refrigerate to spoon on after baking.",
          "number": 5
        },
        {
          "instruction": "Spread remaining apple filling over bread in an even layer. Arrange remaining bread slices over apple layer.",
          "number": 6
        },
        {
          "instruction": "Pour remaining egg mixture over top bread layer. Press bread down with spatula so it absorbs the maximum amount of egg mixture. Dot bread with butter and sprinkle with sugar. Cover and refrigerate overnight.",
          "number": 7
        },
        {
          "instruction": "To bake: Preheat oven to 325°F. Uncover dish and bake 50 to 55 minutes or until knife inserted in center comes out clean. Reheat remaining apple mixture in microwave. Spoon over top to serve.",
          "number": 8
        }
      ],
      "name": "Cinnamon Raisin Overnight French Toast w/ Apple Filling",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 988243,
      "image": "https://spoonacular.com/recipeImages/988243-556x370.jpg",
      "ingredients": [
        {
          "id": 1002030,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1001,
          "quantity": {
            "amount": 4,
            "unit": "tablespoons"
          }
        },
        {
          "id": 11297,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 6,
            "unit": "cloves"
          }
        },
        {
          "id": 1032009,
          "quantity": {
            "amount": 1,
            "unit": "pinch"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 0.5,
            "unit": "teaspoon"
          }
        },
        {
          "id": 15152,
          "quantity": {
            "amount": 2,
            "unit": "pounds"
          }
        },
        {
          "id": 11294,
          "quantity": {
            "amount": 0.25,
            "unit": "medium"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Melt butter to a large skillet over medium heat. As the butter melts, it will begin to foam as it transitions from a bright, lemon-yellow color to golden and then finally to a nutty-brown color. As the butter just begins to turn nutty-brown from golden, reduce your heat to medium-low and carefully toss in your garlic and onion. Cook until the onion just begins to become tender and then add in your shrimp. Stirring frequently, cook until the shrimp turn pink and lose their translucence.",
          "number": 1
        },
        {
          "instruction": "Stir in salt, black pepper, red pepper flakes and fresh parsley. Toss shrimp to make sure all are well-coated.",
          "number": 2
        },
        {
          "instruction": "Remove from heat and serve.",
          "number": 3
        }
      ],
      "name": "Brown Butter Garlic Shrimp",
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    },
    {
      "id": 724018,
      "image": "https://spoonacular.com/recipeImages/724018-556x370.jpg",
      "ingredients": [
        {
          "id": 11007,
          "quantity": {
            "amount": 2,
            "unit": "large"
          }
        },
        {
          "id": 9150,
          "quantity": {
            "amount": 4,
            "unit": "slices"
          }
        },
        {
          "id": 9156,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 18069,
          "quantity": {
            "amount": 6,
            "unit": "slices"
          }
        },
        {
          "id": 1033,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 11297,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 6,
            "unit": "cloves"
          }
        },
        {
          "id": 2027,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1034053,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 1002030,
          "quantity": {
            "amount": 0.125,
            "unit": "teaspoon"
          }
        },
        {
          "id": 2004,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 9150,
          "quantity": {
            "amount": 2,
            "unit": "slices"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 2,
            "unit": "cloves"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Cut off the crust from 6 slices of bread. Chop the centers and put into a food processor. Pulse until you have coarse breadcrumbs. You should have about 3 cups.",
          "number": 1
        },
        {
          "instruction": "Make the stuffing: In a large bowl, stir together the breadcrumbs, lemon zest, Parmesan cheese, minced garlic, chopped parsley, minced oregano, 1/2 cup olive oil, and black pepper. Set aside.",
          "number": 2
        }
      ],
      "name": "Baked Stuffed Artichokes",
      "tags": [
        "side dish",
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    },
    {
      "id": 623855,
      "image": "https://spoonacular.com/recipeImages/623855-556x370.jpg",
      "ingredients": [
        {
          "id": 18372,
          "quantity": {
            "amount": 1,
            "unit": "tsp"
          }
        },
        {
          "id": 1001,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 1001,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 10116098,
          "quantity": {
            "amount": 0.3333333333333333,
            "unit": "cup"
          }
        },
        {
          "id": 10116098,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 20081,
          "quantity": {
            "amount": 1.25,
            "unit": "cup"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 19334,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 19336,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 1,
            "unit": "tsp"
          }
        },
        {
          "id": 10019903,
          "quantity": {
            "amount": 1.5,
            "unit": "cups"
          }
        },
        {
          "id": 2050,
          "quantity": {
            "amount": 1,
            "unit": "Tbsp"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Preheat oven to 350FLine a baking sheet with parchment, set aside.In bowl of stand mixer cream butter and peanut butter together until smooth.",
          "number": 1
        },
        {
          "instruction": "Add both sugars and beat for 2 minutes.",
          "number": 2
        },
        {
          "instruction": "Add in egg, vanilla, baking soda and salt.",
          "number": 3
        },
        {
          "instruction": "Mix until combined.Turn mixer to low and add in flour.Portion out dough by in tablespoon amounts.",
          "number": 4
        },
        {
          "instruction": "Roll into a ball and then flatten to approximately  inch thick.",
          "number": 5
        },
        {
          "instruction": "Place on baking sheet about 2 inches apart.",
          "number": 6
        },
        {
          "instruction": "Bake for 8-9 minutes until golden at he edges.",
          "number": 7
        },
        {
          "instruction": "Remove from oven and transfer cookies to a wire rack to cool completely.In microwave safe bowl combine chocolate chips, peanut butter and butter.",
          "number": 8
        },
        {
          "instruction": "Heat on high for 1 minute and then stir until smooth.",
          "number": 9
        },
        {
          "instruction": "Place powdered sugar in bowl.Dip each cookie in chocolate and using a fork remove cookie, tapping off excess chocolate. You don't need a lot of chocolate coating on the cookies.Immediately dip the cookie into the powdered sugar and toss to coat completely.",
          "number": 10
        },
        {
          "instruction": "Place back on cooling rack to until chocolate is set. Repeat for all cookies.",
          "number": 11
        }
      ],
      "name": "Puppy Chow Cookies",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 793584,
      "image": "https://spoonacular.com/recipeImages/793584-556x370.jpg",
      "ingredients": [
        {
          "id": 11143,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 1002046,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1129,
          "quantity": {
            "amount": 2,
            "unit": ""
          }
        },
        {
          "id": 4641,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1011256,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 2026,
          "quantity": {
            "amount": 0.5,
            "unit": "teaspoon"
          }
        },
        {
          "id": 11297,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1002030,
          "quantity": {
            "amount": 0.5,
            "unit": "teaspoon"
          }
        },
        {
          "id": 11944,
          "quantity": {
            "amount": 3,
            "unit": "tablespoons"
          }
        },
        {
          "id": 10011282,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 11353,
          "quantity": {
            "amount": 2,
            "unit": "pounds"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 0.75,
            "unit": "teaspoons"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Place potatoes in a large saucepan and add water to cover by 1 inch. Bring to boil over medium-high heat.",
          "number": 1
        },
        {
          "instruction": "Add 1-tablespoon salt, reduce heat to medium, and simmer. Stir a few times, until potatoes re-fork tender, about 8 minutes.",
          "number": 2
        },
        {
          "instruction": "Drain potatoes and transfer to a large bowl.In a medium sized bowl whisk together yogurt, mayonnaise, mustard, salt, pepper and onion powder.",
          "number": 3
        },
        {
          "instruction": "Add to potatoes and gently stir to combine.",
          "number": 4
        },
        {
          "instruction": "Add celery, pickles, red onions, parsley and chopped eggs to potato mixture, stir to combine.",
          "number": 5
        },
        {
          "instruction": "Add more salt and pepper to taste.Cover and refrigerate until chilled, about 1 hour before serving. Potato salad can be made up to one day ahead.",
          "number": 6
        }
      ],
      "name": "Easy Creamy Potato Salad with Yogurt",
      "tags": [
        "salad"
      ]
    },
    {
      "id": 607805,
      "image": "https://spoonacular.com/recipeImages/607805-556x370.jpg",
      "ingredients": [
        {
          "id": 10211821,
          "quantity": {
            "amount": 3,
            "unit": "large"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 2,
            "unit": "cloves"
          }
        },
        {
          "id": 10020048,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 93651,
          "quantity": {
            "amount": 1,
            "unit": "cups"
          }
        },
        {
          "id": 7927,
          "quantity": {
            "amount": 0.5,
            "unit": "lb"
          }
        },
        {
          "id": 11282,
          "quantity": {
            "amount": 1,
            "unit": "small"
          }
        },
        {
          "id": 2027,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 1033,
          "quantity": {
            "amount": 2,
            "unit": "Tbsp"
          }
        },
        {
          "id": 11549,
          "quantity": {
            "amount": 14,
            "unit": "oz"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Cut tops off peppers; remove and discard seeds.",
          "number": 1
        },
        {
          "instruction": "Chop tops; place in medium bowl.",
          "number": 2
        },
        {
          "instruction": "Add sausage, onions, rice, Parmesan, garlic, oregano, 1-1/2 cups pizza sauce and 1-1/4 cups shredded cheese; mix lightly.  Spoon into pepper shells.",
          "number": 3
        },
        {
          "instruction": "Stand peppers in slow cooker; top with remaining sauce and shredded cheese.  Cover with lid.",
          "number": 4
        },
        {
          "instruction": "Cook on LOW 6 to 8 hours (or on HIGH 2-1/2 to 3-1/2 hours).",
          "number": 5
        }
      ],
      "name": "Slow-Cooker Italian-Stuffed Peppers",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 763858,
      "image": "https://spoonacular.com/recipeImages/763858-556x370.jpg",
      "ingredients": [
        {
          "id": 10120129,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 1001,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 20081,
          "quantity": {
            "amount": 3.5,
            "unit": "cups"
          }
        },
        {
          "id": 1053,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 19296,
          "quantity": {
            "amount": 0.3333333333333333,
            "unit": "cup"
          }
        },
        {
          "id": 10118375,
          "quantity": {
            "amount": 0.5,
            "unit": "teaspoon"
          }
        },
        {
          "id": 10118375,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1077,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 4053,
          "quantity": {
            "amount": 16,
            "unit": "servings"
          }
        },
        {
          "id": 8120,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 8120,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1012047,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 14412,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Whisk flours together with  teaspoon instant yeast in a large mixing bowl with a tight-fitting lid (like this one), and then stir in the oats. Stir the water and milk together, then pour the liquids into the dry ingredients, stirring to create a loose, shaggy dough. Cover the mixing bowl tightly, and allow the dough to rest at room temperature at least eight and up to twelve hours.Dump the dough into the basin of a stand mixer (like this one), and then beat in the butter, honey, salt, and the remaining 2 tablespoons yeast. Continue beating all the ingredients together until they form a smooth dough, and then turn it out on a well-floured surface. Knead by hand for ten to fifteen minutes, incorporating about 1 cups additional flour, until the dough becomes smooth and elastic.Oil a large mixing bowl, and transfer the dough to the bowl. Cover tightly, and allow the dough to rise until doubled in volume.",
          "number": 1
        },
        {
          "instruction": "Transfer the dough to a well-floured surface, and split into two portions of approximately equal weight. Butter and flour two 4-inch by 8-inch loaf pans.Working one at a time, roll each lump of dough out into a large rectangle, about 8 by 16 inches. Working from the short end, roll the dough into a loaf, pinching the seam at the bottom of the loaf tightly to seal it.",
          "number": 2
        },
        {
          "instruction": "Place the dough, seam-side down, in a prepared loaf pan. Cover lightly with a kitchen towel, and allow it to rise until doubled in size, about two hours.While the dough rises, heat the oven to 400 F.Using a pastry brush, gently brush the top of the dough with cream, and then scatter one tablespoon rolled oats over each loaf.",
          "number": 3
        },
        {
          "instruction": "Transfer the loaves to the oven, and bake 5 minutes at 400 F. Then reduce the temperature to 350 F and continue baking until the crust is a dark brown and the bread reaches an internal temperature of 200 F about 45 minutes.",
          "number": 4
        },
        {
          "instruction": "Remove from the oven and allow the loaves to cool in their pans for five minutes, then turn out onto a wire rack, allowing the bread to cool completely before slicing.",
          "number": 5
        }
      ],
      "name": "Whole Wheat Milk and Honey Sandwich Bread",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    },
    {
      "id": 618332,
      "image": "https://spoonacular.com/recipeImages/618332-556x370.jpg",
      "ingredients": [
        {
          "id": 19912,
          "quantity": {
            "amount": 168,
            "unit": "g"
          }
        },
        {
          "id": 18371,
          "quantity": {
            "amount": 2,
            "unit": "g"
          }
        },
        {
          "id": 20027,
          "quantity": {
            "amount": 1,
            "unit": "g"
          }
        },
        {
          "id": 10019071,
          "quantity": {
            "amount": 42,
            "unit": "g"
          }
        },
        {
          "id": 1012010,
          "quantity": {
            "amount": 3,
            "unit": "g"
          }
        },
        {
          "id": 11424,
          "quantity": {
            "amount": 183,
            "unit": "g"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 1,
            "unit": "g"
          }
        },
        {
          "id": 1145,
          "quantity": {
            "amount": 28,
            "unit": "g"
          }
        },
        {
          "id": 2050,
          "quantity": {
            "amount": 5,
            "unit": "mL"
          }
        },
        {
          "id": 10020080,
          "quantity": {
            "amount": 120,
            "unit": "g"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "In a medium bowl, whisk together the flour, baking powder, cornstarch, cinnamon, and salt. In a separate bowl, whisk together the butter, pumpkin, and vanilla. Stir in the agave.",
          "number": 1
        },
        {
          "instruction": "Add the flour mixture, stirring just until incorporated. Fold in 2 tablespoons of chocolate chips. Chill the cookie dough for at least 30 minutes. (If chilling longer than 1 hour, cover the top of the bowl with foil.)Preheat the oven to 325F, and line a baking sheet with parchment paper or a silicone baking mat. Drop the cookie dough into 12 rounded scoops onto the prepared baking sheet. Flatten slightly, and press the remaining chocolate chips into the tops of the cookie dough.",
          "number": 2
        },
        {
          "instruction": "Bake at 325F for 15-17 minutes. Cool on the baking sheet for at least 10 minutes before turning out onto a wire rack.",
          "number": 3
        }
      ],
      "name": "The Ultimate Healthy Soft & Chewy Pumpkin Chocolate Chip Cookies",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 231951,
      "image": "https://spoonacular.com/recipeImages/231951-556x370.jpg",
      "ingredients": [
        {
          "id": 20027,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 10019334,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 1053,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 93814,
          "quantity": {
            "amount": 4,
            "unit": "servings"
          }
        },
        {
          "id": 1145,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 2050,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1077,
          "quantity": {
            "amount": 1.5,
            "unit": "cups"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Whisk together brown sugar, cornstarch, and 1/4 teaspoon salt in a heavy medium saucepan, then whisk in milk and cream. Bring to a boil over medium heat, whisking frequently, then boil, whisking, 1 minute.",
          "number": 1
        },
        {
          "instruction": "Remove from heat and whisk in butter and vanilla.",
          "number": 2
        },
        {
          "instruction": "Pour into a bowl, then cover surface with buttered wax paper and chill until cold, at least 1 1/2 hours.",
          "number": 3
        }
      ],
      "name": "Butterscotch Pudding",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 880108,
      "image": "https://spoonacular.com/recipeImages/880108-556x370.jpg",
      "ingredients": [
        {
          "id": 11206,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
        {
          "id": 11297,
          "quantity": {
            "amount": 1,
            "unit": "bunch"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 4,
            "unit": "cloves"
          }
        },
        {
          "id": 9150,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
        {
          "id": 4053,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 20035,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 1,
            "unit": "tsp"
          }
        },
        {
          "id": 11529,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Rinse the quinoa under cool running water.",
          "number": 1
        },
        {
          "instruction": "Place the rinsed quinoa in a pot with 1.75 cups of water. Put a lid on top, bring it to a boil, then reduce the heat to low and let simmer for 15 minutes. After 15 minutes, turn off the heat. Allow the quinoa to cool before making the salad or else the heat will wilt the parsley and vegetables. To cool it faster, spread it out on a baking sheet and place in the refrigerator for 30 minutes.While the quinoa is cooling, prepare the rest of the salad.",
          "number": 2
        },
        {
          "instruction": "Cut the tomato and cucumber into a small dice. Rinse the parsley well to remove sand and grit, then chop well.",
          "number": 3
        },
        {
          "instruction": "Add the cucumber, tomato, and parsley to a bowl.To make the dressing, squeeze the juice from the lemon into a bowl (about  cup). Mince the garlic and add to the lemon juice along with the olive oil and salt.Once the quinoa is cooled, combine it with the chopped vegetables and the lemon dressing. Stir well and then serve!",
          "number": 4
        }
      ],
      "name": "quinoa tabbouleh",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 602311,
      "image": "https://spoonacular.com/recipeImages/602311-556x370.jpg",
      "ingredients": [
        {
          "id": 14242,
          "quantity": {
            "amount": 0.6666666666666666,
            "unit": "cup"
          }
        },
        {
          "id": 14130,
          "quantity": {
            "amount": 0.6666666666666666,
            "unit": "cup"
          }
        },
        {
          "id": 19177,
          "quantity": {
            "amount": 2,
            "unit": "envelopes"
          }
        },
        {
          "id": 1053,
          "quantity": {
            "amount": 1,
            "unit": "tbsp"
          }
        },
        {
          "id": 93645,
          "quantity": {
            "amount": 30,
            "unit": "servings"
          }
        },
        {
          "id": 14051,
          "quantity": {
            "amount": 0.6666666666666666,
            "unit": "cup"
          }
        },
        {
          "id": 1054,
          "quantity": {
            "amount": 30,
            "unit": "servings"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Lightly spray the mold with non-stick spray and wipe excess off with a paper towel. Don’t overdo it or the residue will affect the taste of the jello.",
          "number": 1
        },
        {
          "instruction": "Pour the soda, juice, and cream into a medium saucepan and sprinkle the gelatin on top. Allow the gelatin to soak for 2-3 minutes, then begin to heat on low, stirring constantly until gelatin is fully dissolved (about 5 minutes).",
          "number": 2
        },
        {
          "instruction": "Remove saucepan from heat and add vodka and food coloring.",
          "number": 3
        },
        {
          "instruction": "Pour into molds and chill for several hours, or until set.",
          "number": 4
        },
        {
          "instruction": "Remove from mold, top with whipped cream, and enjoy responsibly!*The original recipe suggests 2-3 envelopes, depending on how long your jello shots will be left out (more gelatin for more time). I opted for 3 because we were traveling an hour to get to the party, but I found them to be a little too firm , so I suggest you stick with 2 and plan accordingly for the best results!",
          "number": 5
        }
      ],
      "name": "Birthday Cake Jello Shots",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    },
    {
      "id": 670408,
      "image": "https://spoonacular.com/recipeImages/670408-556x370.jpg",
      "ingredients": [
        {
          "id": 93828,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 11266,
          "quantity": {
            "amount": 16,
            "unit": "ounces"
          }
        },
        {
          "id": 1017,
          "quantity": {
            "amount": 4,
            "unit": "ounces"
          }
        },
        {
          "id": 1019,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 1022020,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1022027,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1082047,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1082047,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 4053,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1033,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 1032009,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 10011457,
          "quantity": {
            "amount": 8,
            "unit": "ounces"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Preheat oven to 350 degrees F. First, remove the mushroom stems by pushing each one toward you, then away from you. It will pop right out. (Save them to add to another recipe.) Swish and rub the mushroom tops in a large bowl of cold water to get them clean. Then, lay them open side down on a kitchen towel to dry.While the mushrooms dry, mix together the cream cheese, spinach, artichoke hearts, parmesan, garlic powder, 1/2 tsp. kosher salt, and red pepper flakes.In a small bowl, stir together olive oil, 1/4 tsp. salt, and Italian seasoning. Use a basting brush or your fingers to lightly rub the outside of the mushrooms with the oil mixture.",
          "number": 1
        },
        {
          "instruction": "Place the mushrooms open side up on a baking sheet. Use a small disher or spoon to place a heaping scoop of dip mixture into each mushroom, pressing it down to make sure it fills the opening. Press a small amount of feta cheese on top of each stuffed mushroom.",
          "number": 2
        },
        {
          "instruction": "Bake in preheated oven for 20-25 minutes until filling is hot and bubbly and feta is starting to brown. Mushrooms will drain some brown liquid during cooking, so drain on paper towels before serving if you don't want that liquid on your serving plate. These taste just as good even after they have cooled down!",
          "number": 3
        }
      ],
      "name": "Artichoke Spinach Dip Stuffed Mushrooms",
      "tags": [
        "condiment",
        "dip",
        "spread"
      ]
    },
    {
      "id": 325208,
      "image": "https://spoonacular.com/recipeImages/325208-556x370.jpeg",
      "ingredients": [
        {
          "id": 1002030,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 2044,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 2,
            "unit": "cloves"
          }
        },
        {
          "id": 1053,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 7036,
          "quantity": {
            "amount": 1,
            "unit": "pound"
          }
        },
        {
          "id": 1082047,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 10111549,
          "quantity": {
            "amount": 26,
            "unit": "ounce"
          }
        },
        {
          "id": 1077,
          "quantity": {
            "amount": 0.75,
            "unit": "cup"
          }
        },
        {
          "id": 4053,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1038,
          "quantity": {
            "amount": 3,
            "unit": "cups"
          }
        },
        {
          "id": 11304,
          "quantity": {
            "amount": 4,
            "unit": "ounces"
          }
        },
        {
          "id": 11677,
          "quantity": {
            "amount": 2,
            "unit": "small"
          }
        },
        {
          "id": 11020420,
          "quantity": {
            "amount": 12,
            "unit": ""
          }
        },
        {
          "id": 1001026,
          "quantity": {
            "amount": 8,
            "unit": "ounces"
          }
        },
        {
          "id": 93630,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 14106,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Watch how to make this recipe.",
          "number": 1
        },
        {
          "instruction": "Place an oven rack in the center of the oven. Preheat the oven to 350 degrees F. Spray a 9-by-13-by-2-inch glass baking dish with vegetable oil cooking spray. Set aside.",
          "number": 2
        },
        {
          "instruction": "For the fonduta sauce: In a medium heavy-bottomed saucepan, bring the milk and cream to a simmer over medium heat. Reduce the heat to low.",
          "number": 3
        },
        {
          "instruction": "Add the Pecorino Romano and whisk until the cheese is melted and the sauce is smooth.",
          "number": 4
        },
        {
          "instruction": "Remove the pan from the heat and stir in the basil. Set aside.",
          "number": 5
        },
        {
          "instruction": "In a large skillet, heat 2 tablespoons of olive oil over medium-high heat.",
          "number": 6
        },
        {
          "instruction": "Add the sausage, shallots, garlic, 1/4 teaspoon salt, and 1/4 teaspoon pepper. Cook until the sausage is cooked through and the vegetables have softened, 8 to 10 minutes. Using a wooden spoon, break the sausage into 1/2-inch pieces. Increase the heat to high.",
          "number": 7
        },
        {
          "instruction": "Add the wine and scrape up the brown bits that cling to the bottom of the pan with a wooden spoon. Cook until the wine has evaporated, about 2 minutes.",
          "number": 8
        },
        {
          "instruction": "Remove the pan from the heat and set aside to cool slightly.",
          "number": 9
        },
        {
          "instruction": "Add the peas, ricotta, and 1 cup of the fonduta sauce. Season with remaining 1/2 teaspoon kosher salt and 1/4 teaspoon pepper.",
          "number": 10
        },
        {
          "instruction": "Bring a large pot of salted water to a boil over high heat.",
          "number": 11
        },
        {
          "instruction": "Add the pasta and cook until just tender, 7 to 8 minutes.",
          "number": 12
        },
        {
          "instruction": "Drain and set aside.",
          "number": 13
        },
        {
          "instruction": "Spread half of the marinara sauce over the bottom of the prepared baking dish. Using a small spoon, fill the manicotti shells with the sausage filling and arrange in a single layer in the baking dish.",
          "number": 14
        },
        {
          "instruction": "Pour the remaining marinara sauce on top of the filled shells. Spoon the remaining fonduta sauce on top and sprinkle with the mozzarella.",
          "number": 15
        },
        {
          "instruction": "Drizzle with olive oil and bake until bubbly and golden brown, 30 to 35 minutes.",
          "number": 16
        }
      ],
      "name": "Baked Manicotti with Sausage and Peas",
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    },
    {
      "id": 542778,
      "image": "https://spoonacular.com/recipeImages/542778-556x370.jpg",
      "ingredients": [
        {
          "id": 1123,
          "quantity": {
            "amount": 2,
            "unit": "medium size"
          }
        },
        {
          "id": 11463,
          "quantity": {
            "amount": 10,
            "unit": "ounces"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 3,
            "unit": ""
          }
        },
        {
          "id": 93651,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 93828,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 1011256,
          "quantity": {
            "amount": 6,
            "unit": "ounces"
          }
        },
        {
          "id": 4053,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1025,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 20035,
          "quantity": {
            "amount": 3,
            "unit": "cups"
          }
        },
        {
          "id": 1102047,
          "quantity": {
            "amount": 5,
            "unit": "servings"
          }
        },
        {
          "id": 11677,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Preheat the oven to 375°F then prepare a large casserole dish (I used a 1 quart dish) by greasing with Earth Balance, butter or non-stick cooking spray.Warm the olive oil over medium heat in a sauté pan and cook the shallot and garlic for a few minutes, until fragrant.Using a strainer and a paper towel, press the excess water out from the defrosted spinach then add it to the pan.",
          "number": 1
        },
        {
          "instruction": "Add the chopped artichoke hearts (I discarded any tough parts) and a pinch of salt & pepper to the pan and cook for five minutes.Meanwhile, combine the eggs, yogurt and cheese in a large bowl and whisk together until well-combined.",
          "number": 2
        },
        {
          "instruction": "Remove the spinach artichoke mixture from the heat and allow to cool for a few minutes before adding to the bowl with the eggs and cheese.Lastly, add the cooked quinoa and stir until everything is mixed together well.",
          "number": 3
        },
        {
          "instruction": "Place the mixture into the casserole dish, smoothing the top with the back of a spoon. Sprinkle a few tablespoons of cheese on top and cook for 30-35 minutes, until top is light golden brown.",
          "number": 4
        },
        {
          "instruction": "Serve warm and enjoy!",
          "number": 5
        }
      ],
      "name": "Spinach Artichoke Quinoa Casserole",
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    },
    {
      "id": 698701,
      "image": "https://spoonacular.com/recipeImages/698701-556x370.jpg",
      "ingredients": [
        {
          "id": 10014623,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 10014623,
          "quantity": {
            "amount": 6,
            "unit": "teaspoons"
          }
        },
        {
          "id": 1124,
          "quantity": {
            "amount": 4,
            "unit": "large"
          }
        },
        {
          "id": 9302,
          "quantity": {
            "amount": 3,
            "unit": "cups"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 1,
            "unit": "pinch"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 0.3333333333333333,
            "unit": "cup"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 6,
            "unit": "teaspoons"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "To prepare berry layer: Preheat oven to 375F. Coat six 8-ounce souffl cups with cooking spray.",
          "number": 1
        },
        {
          "instruction": "Add 1 teaspoon sugar to each cup and swirl to coat the inside. Distribute raspberries in the bottom of the cups and sprinkle each with 1 teaspoon crme de cassis (or eau-de-vie, juice or nectar).To prepare souffls: Stir raspberries in a saucepan over low heat until they are juicy (for fresh) or thawed (for frozen).",
          "number": 2
        },
        {
          "instruction": "Transfer to a fine sieve set over a bowl. With a spoon, press the berries through the sieve, being careful to extract all the pulp. Discard the seeds.Return the puree to the saucepan. Bring to a simmer and stir over medium heat until very thick and reduced to 1/4 cup, about 10 minutes. (Reduce the heat as the mixture thickens.) Stir in 1 tablespoon crme de cassis (or eau-de-vie, juice or nectar) and set aside to cool slightly.Beat egg whites and salt in a mixing bowl with an electric mixer on high speed until soft peaks form. Continuing to beat, gradually add sugar and beat until stiff peaks form. With a rubber spatula, fold about a fourth of the beaten whites into the reserved raspberry puree to lighten its texture, then pour the mixture over the remaining whites. Gently fold the puree and whites together until evenly blended. Spoon the souffl mixture into the cups, spreading to the edges of the cups.Set the cups on a baking sheet and bake for 10 minutes, or until lightly browned on the top. Dust with confectioners sugar and serve immediately.",
          "number": 3
        }
      ],
      "name": "Double Raspberry Soufflés",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 515021,
      "image": "https://spoonacular.com/recipeImages/515021-556x370.jpg",
      "ingredients": [
        {
          "id": 9040,
          "quantity": {
            "amount": 4,
            "unit": ""
          }
        },
        {
          "id": 1001,
          "quantity": {
            "amount": 1.25,
            "unit": "sticks"
          }
        },
        {
          "id": 9354,
          "quantity": {
            "amount": 1,
            "unit": "large can"
          }
        },
        {
          "id": 9070,
          "quantity": {
            "amount": 15,
            "unit": "servings"
          }
        },
        {
          "id": 14181,
          "quantity": {
            "amount": 15,
            "unit": "servings"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 2,
            "unit": ""
          }
        },
        {
          "id": 10018617,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 1053,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 12135,
          "quantity": {
            "amount": 15,
            "unit": "servings"
          }
        },
        {
          "id": 19336,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 2050,
          "quantity": {
            "amount": 1,
            "unit": "tsp"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Grease a 9×13 pan.",
          "number": 1
        },
        {
          "instruction": "Mix together graham cracker crust and 1¼ sticks of butter. Press out in pan.In mixer, mix together powdered sugar, 2 sticks of butter, vanilla, and eggs.",
          "number": 2
        },
        {
          "instruction": "Pour on top of graham cracker crust.",
          "number": 3
        },
        {
          "instruction": "Spread out crushed pineapple on top of sugar mixture, then add sliced bananas. I added cherries next for fun.In mixer, add heavy cream and mix on medium high until soft peak. When almost completed, add ½ cup sugar.",
          "number": 4
        },
        {
          "instruction": "Spread whipped cream over top of bananas. Refrigerate for at least 2 hours, (I waited 1 hours and it was fine.)Enjoy!",
          "number": 5
        }
      ],
      "name": "A Cake To Warm Any Heart – Banana Split Cake",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    },
    {
      "id": 999044,
      "image": "https://spoonacular.com/recipeImages/999044-556x370.jpg",
      "ingredients": [
        {
          "id": 9037,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 16057,
          "quantity": {
            "amount": 1.5,
            "unit": "cups"
          }
        },
        {
          "id": 11297,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 2045,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1256,
          "quantity": {
            "amount": 3,
            "unit": "tablespoons"
          }
        },
        {
          "id": 9152,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 4053,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 1102047,
          "quantity": {
            "amount": 4,
            "unit": "servings"
          }
        },
        {
          "id": 11291,
          "quantity": {
            "amount": 2,
            "unit": ""
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Working in a couple of batches, roughly chop the chickpeas and place in a bowl.",
          "number": 1
        },
        {
          "instruction": "Add the minced herbs and scallions to the chickpeas and give a quick toss.",
          "number": 2
        },
        {
          "instruction": "In a separate bowl, whisk together the mayo, lemon juice, and olive oil.",
          "number": 3
        },
        {
          "instruction": "Cut the avocado in half, remove the pit, and cut each half into  cubes (see note).",
          "number": 4
        },
        {
          "instruction": "Place in the bowl and pour the mayo mixture over the chickpeas and avocado. Toss until well combine. Taste and add salt/pepper to your preferred taste.",
          "number": 5
        },
        {
          "instruction": "Serve on a sandwich or with crackers.",
          "number": 6
        }
      ],
      "name": "Avocado Chickpea Salad",
      "tags": [
        "salad"
      ]
    },
    {
      "id": 798070,
      "image": "https://spoonacular.com/recipeImages/798070-556x370.jpg",
      "ingredients": [
        {
          "id": 18371,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 20081,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 1077,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 9236,
          "quantity": {
            "amount": 20,
            "unit": "ounces"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 1,
            "unit": "pinch"
          }
        },
        {
          "id": 1145,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 19095,
          "quantity": {
            "amount": 8,
            "unit": "servings"
          }
        },
        {
          "id": 1054,
          "quantity": {
            "amount": 8,
            "unit": "servings"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Melt butter and brush some of the butter around the slow cooker.Using a stand mixer, combine flour, 1-cup sugar, baking powder, and salt. Then, add milk and remaining melted cooled butter, mixing just until dry ingredients are moistened.",
          "number": 1
        },
        {
          "instruction": "Pour the batter in the slow cooker and place the frozen peaches on top.Cook on high for 3 hours with lid on top. Once the cobbler is done, divide and serve cobbler warm with ice cream and whipped cream on top.",
          "number": 2
        }
      ],
      "name": "Slow Cooker Peach Cobbler",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 574317,
      "image": "https://spoonacular.com/recipeImages/574317-556x370.jpg",
      "ingredients": [
        {
          "id": 20081,
          "quantity": {
            "amount": 2.5,
            "unit": "cups"
          }
        },
        {
          "id": 1001,
          "quantity": {
            "amount": 2,
            "unit": "T"
          }
        },
        {
          "id": 10862,
          "quantity": {
            "amount": 3,
            "unit": "strips"
          }
        },
        {
          "id": 5114,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 1019,
          "quantity": {
            "amount": 0.75,
            "unit": "cup"
          }
        },
        {
          "id": 1022020,
          "quantity": {
            "amount": 2,
            "unit": "t"
          }
        },
        {
          "id": 11333,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 1026,
          "quantity": {
            "amount": 0.75,
            "unit": "cup"
          }
        },
        {
          "id": 1033,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 10011282,
          "quantity": {
            "amount": 0.5,
            "unit": "medium"
          }
        },
        {
          "id": 10211529,
          "quantity": {
            "amount": 2,
            "unit": ""
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 0.5,
            "unit": "t"
          }
        },
        {
          "id": 11424,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 1,
            "unit": "t"
          }
        },
        {
          "id": 14412,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 1011009,
          "quantity": {
            "amount": 0.75,
            "unit": "cup"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "In a large mixing bowl, add 1 cup warm water, 1 pack rapid or quick yeast, 1 t sugar 1/2 t salt and 1 T olive oil.",
          "number": 1
        },
        {
          "instruction": "Mix well.",
          "number": 2
        },
        {
          "instruction": "Add 2 1/2 cups flour and mix.",
          "number": 3
        },
        {
          "instruction": "Add  a little more flour if too sticky but you are making a light dough not a heavy brick.",
          "number": 4
        },
        {
          "instruction": "Cover and let rise until double in size. About 30-40 minutes.",
          "number": 5
        },
        {
          "instruction": "While dough is rising, prep any toppings.",
          "number": 6
        },
        {
          "instruction": "Preheat oven 375 convection.",
          "number": 7
        },
        {
          "instruction": "Spread the dough on a well oiled large pizza pan or cookie sheet. Melt 2 T butter in a microwave for 15-20 seconds.",
          "number": 8
        },
        {
          "instruction": "Mix 2 t garlic powder in the butter and spread thinly over the dough.",
          "number": 9
        },
        {
          "instruction": "Top with cheeses and other toppings of choice.",
          "number": 10
        },
        {
          "instruction": "Bake in oven for 20 to 25 minutes.",
          "number": 11
        }
      ],
      "name": "4 Cheese White Pizza",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    },
    {
      "id": 673337,
      "image": "https://spoonacular.com/recipeImages/673337-556x370.jpg",
      "ingredients": [
        {
          "id": 98998,
          "quantity": {
            "amount": 12,
            "unit": "servings"
          }
        },
        {
          "id": 1001,
          "quantity": {
            "amount": 2,
            "unit": "tablespoon"
          }
        },
        {
          "id": 8030,
          "quantity": {
            "amount": 6.5,
            "unit": "oz"
          }
        },
        {
          "id": 19116,
          "quantity": {
            "amount": 9,
            "unit": "oz"
          }
        },
        {
          "id": 1077,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 19336,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Pour mixture into prepared pan, using your hands press to flatten. Set aside for 1-2 hours to set.In a separate bowl, combine powdered sugar with milk and stir to combine. Using a spoon, drizzle glaze on top of cereal bars and dust with colored sugar or sprinkles.",
          "number": 1
        }
      ],
      "name": "Cereal Marshmallow Bars",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 764184,
      "image": "https://spoonacular.com/recipeImages/764184-556x370.jpg",
      "ingredients": [
        {
          "id": 1123,
          "quantity": {
            "amount": 6,
            "unit": "large"
          }
        },
        {
          "id": 6150,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 16158,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 2028,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1002030,
          "quantity": {
            "amount": 1,
            "unit": "pinch"
          }
        },
        {
          "id": 2046,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "To hard-boil the eggs, place the raw eggs at the bottom of a large pot.",
          "number": 1
        },
        {
          "instruction": "Pour water in the pot until the water is 1-2 inches over the top of the eggs.",
          "number": 2
        },
        {
          "instruction": "Place the pot on the stove top uncovered and turn the burner to high heat. Bring the water in the pot to a boil. When the water comes to a full boil, cover the pot with a lid and turn off the heat to the burner. Leave the pot on the burner, covered, for 12 minutes.While the eggs sit in the covered pot, fill a mixing bowl  way with ice water. When the time is up on the eggs, use a slotted spoon to remove them from the pot and transfer them to the bowl of ice water to stop them from cooking. Leave them in the bowl of ice water for a few minutes until fully cold.Peel the eggs under cold running water (Ive found its much easier). Slice the eggs in half lengthwise and removethe yolks into a mixing bowl. Use a fork to mash the yolks as much as you can. I usually add a little splash of water to the mashed egg yolks and mash again.",
          "number": 3
        },
        {
          "instruction": "Add the black pepper, hummus, hot sauce and mustard and stir together until well combined and mostly smooth. Spoon or pipe this filling back into the hollows of the egg whites. Sprinkle paprika over the tops of the eggs and serve.",
          "number": 4
        }
      ],
      "name": "Hummus Deviled Eggs",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 206402,
      "image": "https://spoonacular.com/recipeImages/206402-556x370.jpg",
      "ingredients": [
        {
          "id": 1017,
          "quantity": {
            "amount": 16,
            "unit": "ounces"
          }
        },
        {
          "id": 1214,
          "quantity": {
            "amount": 12,
            "unit": "ounces"
          }
        },
        {
          "id": 1053,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 19206,
          "quantity": {
            "amount": 6.8,
            "unit": "ounces"
          }
        },
        {
          "id": 9214,
          "quantity": {
            "amount": 12,
            "unit": "ounces"
          }
        },
        {
          "id": 9216,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 9216,
          "quantity": {
            "amount": 8,
            "unit": "servings"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 2050,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Whisk together evaporated milk, pudding mix, and zest in a bowl for 2 minutes or until mixture is thickened.",
          "number": 1
        },
        {
          "instruction": "Beat cream cheese and vanilla at medium speed with an electric mixer until fluffy.",
          "number": 2
        },
        {
          "instruction": "Add orange juice concentrate, beating until smooth; add evaporated milk mixture, and beat until blended.",
          "number": 3
        },
        {
          "instruction": "Pour into crust. Cover and chill 8 hours or until firm.",
          "number": 4
        },
        {
          "instruction": "Combine cream and confectioner's sugar in a bowl and whip with a whisk until it holds soft peaks. Dollop or pipe each slice with whipped cream, and garnish with candied zest or candy if desired.",
          "number": 5
        }
      ],
      "name": "Creamsicle Pie",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 446577,
      "image": "https://spoonacular.com/recipeImages/446577-556x370.jpg",
      "ingredients": [
        {
          "id": 10123,
          "quantity": {
            "amount": 6,
            "unit": "slices"
          }
        },
        {
          "id": 11052,
          "quantity": {
            "amount": 1,
            "unit": "pound"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1002030,
          "quantity": {
            "amount": 1,
            "unit": "pinch"
          }
        },
        {
          "id": 11282,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 0.125,
            "unit": "teaspoon"
          }
        },
        {
          "id": 14412,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Place bacon in a large, deep skillet. Cook over medium high heat until the fat begins to render. Stir in onions and garlic; let cook for 1 minute. Stir in beans and water.",
          "number": 1
        },
        {
          "instruction": "Let the beans cook until the water has evaporated and the beans are tender. If the beans are not tender once the water has evaporated, add a small amount more water and let them cook until tender. Season with salt and pepper (to taste) and serve.",
          "number": 2
        }
      ],
      "name": "Smothered Green Beans",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 576906,
      "image": "https://spoonacular.com/recipeImages/576906-556x370.jpg",
      "ingredients": [
        {
          "id": 11959,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 1004,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1012047,
          "quantity": {
            "amount": 2,
            "unit": "servings"
          }
        },
        {
          "id": 1002030,
          "quantity": {
            "amount": 0.125,
            "unit": "teaspoon"
          }
        },
        {
          "id": 4053,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 9252,
          "quantity": {
            "amount": 0.5,
            "unit": ""
          }
        },
        {
          "id": 9252,
          "quantity": {
            "amount": 1,
            "unit": "tablespoons"
          }
        },
        {
          "id": 43408,
          "quantity": {
            "amount": 3,
            "unit": "tablespoons"
          }
        },
        {
          "id": 11677,
          "quantity": {
            "amount": 1,
            "unit": "medium"
          }
        },
        {
          "id": 2049,
          "quantity": {
            "amount": 2,
            "unit": "sprigs"
          }
        },
        {
          "id": 12155,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "In a medium bowl add the pear juice and vinegar. While whisking, slowly stream in the olive oil. Scrape the leaves off of two sprigs of thyme and add in the black pepper.",
          "number": 1
        },
        {
          "instruction": "Whisk to combine",
          "number": 2
        },
        {
          "instruction": "Assemble romaine leaves and top with sliced pear, shallot, toasted walnuts, blue cheese and season with sea salt to taste.",
          "number": 3
        },
        {
          "instruction": "Drizzle with desired amount of the pear vinaigrette and enjoy!",
          "number": 4
        }
      ],
      "name": "Pear & Walnut Salad with a Pear Vinaigrette",
      "tags": [
        "salad"
      ]
    },
    {
      "id": 504218,
      "image": "https://spoonacular.com/recipeImages/504218-556x370.jpg",
      "ingredients": [
        {
          "id": 10011693,
          "quantity": {
            "amount": 2,
            "unit": "cans"
          }
        },
        {
          "id": 11124,
          "quantity": {
            "amount": 4,
            "unit": ""
          }
        },
        {
          "id": 2012,
          "quantity": {
            "amount": 1,
            "unit": "tsp"
          }
        },
        {
          "id": 1002014,
          "quantity": {
            "amount": 1,
            "unit": "tsp"
          }
        },
        {
          "id": 11913,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 2,
            "unit": "cloves"
          }
        },
        {
          "id": 11333,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 11282,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 4,
            "unit": "servings"
          }
        },
        {
          "id": 11477,
          "quantity": {
            "amount": 2,
            "unit": ""
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Chop all the veggies.",
          "number": 1
        },
        {
          "instruction": "Saute the onion and garlic in a large skillet.",
          "number": 2
        },
        {
          "instruction": "Add in the carrots and saute for a few minutes, covering to cook for about 5 minutes.",
          "number": 3
        },
        {
          "instruction": "Add in the other veggies and seasonings and let it cook until the veggies are tender.",
          "number": 4
        },
        {
          "instruction": "Serve hot over cornbread with shredded cheese and sour cream.",
          "number": 5
        }
      ],
      "name": "Mexican Vegetables on Cornbread",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 445196,
      "image": "https://spoonacular.com/recipeImages/445196-556x370.jpg",
      "ingredients": [
        {
          "id": 6150,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 10220445,
          "quantity": {
            "amount": 2,
            "unit": "servings"
          }
        },
        {
          "id": 2003,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1022020,
          "quantity": {
            "amount": 0.125,
            "unit": "teaspoon"
          }
        },
        {
          "id": 11333,
          "quantity": {
            "amount": 1,
            "unit": "medium"
          }
        },
        {
          "id": 19296,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 11282,
          "quantity": {
            "amount": 1,
            "unit": "medium"
          }
        },
        {
          "id": 1002030,
          "quantity": {
            "amount": 0.125,
            "unit": "teaspoon"
          }
        },
        {
          "id": 15152,
          "quantity": {
            "amount": 0.75,
            "unit": "pound"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "In a nonstick skillet coated with cooking spray, saute onion and green pepper for 3-4 minutes or until crisp-tender.",
          "number": 1
        },
        {
          "instruction": "Combine the barbecue sauce, honey, basil, garlic powder and pepper; pour over vegetables. Bring to a boil over medium-high heat, stirring constantly.",
          "number": 2
        },
        {
          "instruction": "Add shrimp; cook and stir for 3-5 minutes or until shrimp turn pink.",
          "number": 3
        },
        {
          "instruction": "Serve with rice.",
          "number": 4
        }
      ],
      "name": "Barbecue Shrimp Stir-Fry",
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    },
    {
      "id": 759534,
      "image": "https://spoonacular.com/recipeImages/759534-556x370.jpg",
      "ingredients": [
        {
          "id": 19334,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 16018,
          "quantity": {
            "amount": 15,
            "unit": "oz"
          }
        },
        {
          "id": 4582,
          "quantity": {
            "amount": 1,
            "unit": "Tbs"
          }
        },
        {
          "id": 99223,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 11165,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 10218364,
          "quantity": {
            "amount": 4,
            "unit": "8-inch"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 1,
            "unit": "tsp"
          }
        },
        {
          "id": 1002014,
          "quantity": {
            "amount": 1,
            "unit": "tsp"
          }
        },
        {
          "id": 9160,
          "quantity": {
            "amount": 2,
            "unit": "Tbs"
          }
        },
        {
          "id": 10011109,
          "quantity": {
            "amount": 8,
            "unit": "oz"
          }
        },
        {
          "id": 10611282,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Preheat oven to 450°F.",
          "number": 1
        },
        {
          "instruction": "Heat oil in saucepan over medium-high heat.",
          "number": 2
        },
        {
          "instruction": "Add onion, and cook 5 minutes, or until translucent.",
          "number": 3
        },
        {
          "instruction": "Add garlic and cumin, and cook 1 minute more.",
          "number": 4
        },
        {
          "instruction": "Place onion mixture in blender with beans, chipotle chile, brown sugar, and 3 Tbs. water. Blend until smooth. Season with salt and pepper.",
          "number": 5
        },
        {
          "instruction": "Place 2 tortillas each on 2 baking sheets.",
          "number": 6
        },
        {
          "instruction": "Spread bean mixture on tortillas, and bake 5 to 7 minutes, or until edges become golden.",
          "number": 7
        },
        {
          "instruction": "Toss slaw in bowl with cilantro and lime juice. Season with salt and pepper. Top each clayuda with slaw, and cut into triangles.",
          "number": 8
        }
      ],
      "name": "Clayudas",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 588893,
      "image": "https://spoonacular.com/recipeImages/588893-556x370.jpg",
      "ingredients": [
        {
          "id": 11457,
          "quantity": {
            "amount": 2,
            "unit": "handfuls"
          }
        },
        {
          "id": 11268,
          "quantity": {
            "amount": 0.5,
            "unit": "oz"
          }
        },
        {
          "id": 10020005,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 2,
            "unit": "large cloves"
          }
        },
        {
          "id": 4053,
          "quantity": {
            "amount": 2,
            "unit": "tablespoon"
          }
        },
        {
          "id": 1033,
          "quantity": {
            "amount": 4,
            "unit": "servings"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 2,
            "unit": "teaspoons"
          }
        },
        {
          "id": 1102047,
          "quantity": {
            "amount": 4,
            "unit": "servings"
          }
        },
        {
          "id": 14412,
          "quantity": {
            "amount": 5,
            "unit": "cups"
          }
        },
        {
          "id": 10511282,
          "quantity": {
            "amount": 0.5,
            "unit": "medium"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "In a medium sized pot combine the farro with the 5 cups of water and 2 teaspoons salt. Bring to a boil, then lower to a simmer and cook for about 25 minutes for semi-pearled farro and 50 minutes for whole farro. The farro is done when the grains are tender and all the water has been absorbed. Set aside.While the farro is cooking, combine the shiitake mushrooms with 1 cup of boiling water.",
          "number": 1
        },
        {
          "instruction": "Let sit for 15 minutes or however long the package instructions say is needed to reconstitute the mushrooms. When done, remove the mushrooms from the water and chop, reserving the liquid.About 2o minutes before the farro is done warm the olive oil in a large skillet. Cook the onion, stirring frequently, for about 5 minutes or until translucent and beginning to get some color.",
          "number": 2
        },
        {
          "instruction": "Add the garlic and crushed red pepper flakes (if using), cook 1 minute longer, until fragrant.",
          "number": 3
        },
        {
          "instruction": "Add the chopped mushrooms, mushroom broth and a few big handfuls of baby spinach. Cook, stirring frequently, until the spinach has wilted and most of the liquid has evaporated. Season with salt and pepper to taste.Stir in the farro, mixing with a large spoon to combine well.",
          "number": 4
        },
        {
          "instruction": "Serve topped with shredded Parmesan cheese.",
          "number": 5
        }
      ],
      "name": "Farro with Shiitake Mushrooms and Baby Spinach",
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    },
    {
      "id": 615581,
      "image": "https://spoonacular.com/recipeImages/615581-556x370.jpg",
      "ingredients": [
        {
          "id": 2069,
          "quantity": {
            "amount": 0.5,
            "unit": "tablespoon"
          }
        },
        {
          "id": 11250,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 4582,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 20027,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 11156,
          "quantity": {
            "amount": 3,
            "unit": "tablespoons"
          }
        },
        {
          "id": 11165,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 19296,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 4025,
          "quantity": {
            "amount": 5,
            "unit": "tablespoons"
          }
        },
        {
          "id": 11119,
          "quantity": {
            "amount": 1,
            "unit": "head"
          }
        },
        {
          "id": 4053,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 15152,
          "quantity": {
            "amount": 1,
            "unit": "pound"
          }
        },
        {
          "id": 11112,
          "quantity": {
            "amount": 0.25,
            "unit": "head"
          }
        },
        {
          "id": 1016168,
          "quantity": {
            "amount": 2,
            "unit": "teaspoons"
          }
        },
        {
          "id": 98962,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "In a bowl, whisk together the mayo, chili sauce and sriracha, then set it aside until ready to use.Toss the shrimp with the cornstarch until evenly coated.",
          "number": 1
        },
        {
          "instruction": "Heat the canola oil in a large skillet over high heat.",
          "number": 2
        },
        {
          "instruction": "Add the shrimp and cook until it just turns pink and opaque, about 3 minutes.",
          "number": 3
        },
        {
          "instruction": "Transfer the shrimp to a large bowl and toss with the mayo mixture.In a separate bowl, add the cabbage and lettuce. Toss with the olive oil, vinegar and honey until well coated. Toss the cilantro in. To serve the shrimp, mix with the slaw and garnish the entire thing with chives. Enjoy!",
          "number": 4
        }
      ],
      "name": "Bang Bang Shrimp with Napa Cabbage Slaw",
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    },
    {
      "id": 764810,
      "image": "https://spoonacular.com/recipeImages/764810-556x370.jpg",
      "ingredients": [
        {
          "id": 1002030,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 2003,
          "quantity": {
            "amount": 1.5,
            "unit": "teaspoons"
          }
        },
        {
          "id": 2042,
          "quantity": {
            "amount": 0.5,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 4,
            "unit": ""
          }
        },
        {
          "id": 1002020,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 10023572,
          "quantity": {
            "amount": 2.75,
            "unit": "pounds"
          }
        },
        {
          "id": 2027,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 1033,
          "quantity": {
            "amount": 1.5,
            "unit": "cups"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 1.5,
            "unit": "teaspoons"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Preheat the oven to 350F.Spray baking sheets with cooking spray or spread a thin layer of olive oil over them.",
          "number": 1
        },
        {
          "instruction": "Mix all of the ingredients together very well -- you'll need to use your hands.",
          "number": 2
        },
        {
          "instruction": "Roll into balls the size of a golf ball, molding them firmly together without packing them.",
          "number": 3
        },
        {
          "instruction": "Place the balls on baking sheets.",
          "number": 4
        },
        {
          "instruction": "Bake for 30 to 40 minutes, or until the center registers 160F on a meat thermometer.",
          "number": 5
        },
        {
          "instruction": "Remove from oven and use as needed.",
          "number": 6
        }
      ],
      "name": "Homemade Italian Meatballs",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    },
    {
      "id": 799732,
      "image": "https://spoonacular.com/recipeImages/799732-556x370.jpg",
      "ingredients": [
        {
          "id": 10011250,
          "quantity": {
            "amount": 4,
            "unit": ""
          }
        },
        {
          "id": 11143,
          "quantity": {
            "amount": 2,
            "unit": "rib"
          }
        },
        {
          "id": 5064,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 2015,
          "quantity": {
            "amount": 0.75,
            "unit": "teaspoon"
          }
        },
        {
          "id": 9160,
          "quantity": {
            "amount": 2,
            "unit": "teaspoons"
          }
        },
        {
          "id": 1009159,
          "quantity": {
            "amount": 0.75,
            "unit": "teaspoon"
          }
        },
        {
          "id": 4641,
          "quantity": {
            "amount": 0.3333333333333333,
            "unit": "cup"
          }
        },
        {
          "id": 98991,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 10011282,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 0.5,
            "unit": "teaspoon"
          }
        },
        {
          "id": 9316,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "In a large bowl, mix the first six ingredients. Stir in  chicken, celery and onion. Refrigerate, covered, at least 1 hour.",
          "number": 1
        },
        {
          "instruction": "To serve, stir strawberries into chicken mixture.",
          "number": 2
        },
        {
          "instruction": "Serve over lettuce.",
          "number": 3
        }
      ],
      "name": "Curried Strawberry Chicken Salad",
      "tags": [
        "salad"
      ]
    },
    {
      "id": 621213,
      "image": "https://spoonacular.com/recipeImages/621213-556x370.jpg",
      "ingredients": [
        {
          "id": 10123,
          "quantity": {
            "amount": 14,
            "unit": "slices"
          }
        },
        {
          "id": 11090,
          "quantity": {
            "amount": 4,
            "unit": "oz"
          }
        },
        {
          "id": 1017,
          "quantity": {
            "amount": 3,
            "unit": "oz"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 2,
            "unit": "tsp"
          }
        },
        {
          "id": 1022020,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 4053,
          "quantity": {
            "amount": 1,
            "unit": "tbsp"
          }
        },
        {
          "id": 11282,
          "quantity": {
            "amount": 0.5,
            "unit": "small"
          }
        },
        {
          "id": 2026,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 10011821,
          "quantity": {
            "amount": 0.5,
            "unit": ""
          }
        },
        {
          "id": 10218,
          "quantity": {
            "amount": 16,
            "unit": "oz"
          }
        },
        {
          "id": 1102047,
          "quantity": {
            "amount": 4,
            "unit": "servings"
          }
        },
        {
          "id": 10011457,
          "quantity": {
            "amount": 2,
            "unit": "oz"
          }
        },
        {
          "id": 11529,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Saute onion in 1 tbsp. Olive Oil for a few minutes until soft.",
          "number": 1
        },
        {
          "instruction": "Add garlic and cook for 45-60 seconds, then add spinach. Put all the spices in there except for 1/4 tsp. of the liquid smoke, thyme, and rosemary.",
          "number": 2
        },
        {
          "instruction": "Let wilt and then add cream cheese. Set aside.Preheat oven to 350F.Lay pork tenderloin on cutting board and cover with saran wrap, then pound with meat hammer until flat - cut the uneven sides so it goes square. Season with salt and pepper, then 1/4 tsp. liquid smoke.Make a bacon weave the same size as the pork tenderloin square.",
          "number": 3
        },
        {
          "instruction": "Spread spinach and cream cheese all over the pork tenderloin, then lay tenderloin on top of bacon. Slice the pieces of bacon that poke out.",
          "number": 4
        },
        {
          "instruction": "Roll it up. Season with salt and pepper and the remaining 1/4 tsp. of thyme and rosemary.",
          "number": 5
        },
        {
          "instruction": "Add toothpicks where the bacon ends are so that it doesn't fall apart.",
          "number": 6
        },
        {
          "instruction": "Bake for 75 minutes or until thermometer reads 140F.",
          "number": 7
        },
        {
          "instruction": "Saute broccoli, peppers, and tomatoes in the remaining fat in the bottom of the pan of the pork tenderloin while it rests.",
          "number": 8
        }
      ],
      "name": "Bacon Wrapped Stuffed Pork Tenderloin",
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    },
    {
      "id": 611858,
      "image": "https://spoonacular.com/recipeImages/611858-556x370.jpg",
      "ingredients": [
        {
          "id": 18371,
          "quantity": {
            "amount": 0.5,
            "unit": "teaspoon"
          }
        },
        {
          "id": 18372,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
        {
          "id": 20081,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 19334,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 19157,
          "quantity": {
            "amount": 16,
            "unit": ""
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 0.5,
            "unit": "teaspoon"
          }
        },
        {
          "id": 10019903,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 1145,
          "quantity": {
            "amount": 0.3333333333333333,
            "unit": "cup"
          }
        },
        {
          "id": 2050,
          "quantity": {
            "amount": 2,
            "unit": "teaspoons"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Preheat oven to 350F. Line a 8x8-inch baking pan with foil and spray with non-stick cooking spray.In a medium bowl, whisk together the flour, baking powder, baking soda, and salt.In the bowl of a stand mixer fitted with the paddle attachment or in a large bowl with an electric mixer, combine the melted butter and brown sugar.",
          "number": 1
        },
        {
          "instruction": "Add egg and vanilla, mixing until well combined. Gradually add in dry ingredients and mix until just combined. Stir in chocolate chips.",
          "number": 2
        },
        {
          "instruction": "Spread half the dough into the prepared pan.",
          "number": 3
        },
        {
          "instruction": "Place the Rolos evenly onto the cookie dough. Using a small cookie scoop, evenly distribute the rest of the cookie dough on top of the Rolos. There is need to spread evenly over the Rolos, this will happen naturally during the baking process.",
          "number": 4
        },
        {
          "instruction": "Bake in the preheated oven until a toothpick inserted in the center comes out clean, about 20 to 25 minutes.",
          "number": 5
        },
        {
          "instruction": "Remove pan to wire rack and cool completely.If desired, drizzle with melted chocolate or caramel before serving.",
          "number": 6
        }
      ],
      "name": "Rolo Cookie Bars",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 991136,
      "image": "https://spoonacular.com/recipeImages/991136-556x370.jpg",
      "ingredients": [
        {
          "id": 1001,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 98871,
          "quantity": {
            "amount": 12,
            "unit": ""
          }
        },
        {
          "id": 19296,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 6168,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 1002030,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1055062,
          "quantity": {
            "amount": 1,
            "unit": "pound"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Place chicken in a 3-qt. slow cooker. Toss with 2 tablespoons hot sauce and pepper; cook, covered, on low until tender, 3-4 hours.",
          "number": 1
        },
        {
          "instruction": "Remove chicken; discard cooking juices. In a small saucepan, combine butter, honey and remaining hot sauce; cook and stir over medium heat until blended. Shred chicken with two forks; stir into sauce and heat through.",
          "number": 2
        },
        {
          "instruction": "Serve on rolls with optional ingredients as desired. Freeze option: Freeze cooled chicken mixture in freezer containers. To use, partially thaw in refrigerator overnight. Microwave, covered, on high in a microwave-safe dish until heated through, stirring occasionally and adding a little water or broth if necessary.",
          "number": 3
        }
      ],
      "name": "Buffalo Chicken Sliders",
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    },
    {
      "id": 583738,
      "image": "https://spoonacular.com/recipeImages/583738-556x370.jpg",
      "ingredients": [
        {
          "id": 18372,
          "quantity": {
            "amount": 0.75,
            "unit": "teaspoon"
          }
        },
        {
          "id": 19334,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 20081,
          "quantity": {
            "amount": 1.75,
            "unit": "cups"
          }
        },
        {
          "id": 16098,
          "quantity": {
            "amount": 0.75,
            "unit": "cup"
          }
        },
        {
          "id": 10019151,
          "quantity": {
            "amount": 8,
            "unit": "oz"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 0.5,
            "unit": "teaspoon"
          }
        },
        {
          "id": 1145,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 2050,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Preheat oven to 350°F. Line two baking sheets with parchment paper.",
          "number": 1
        },
        {
          "instruction": "Combine the flour, baking soda and salt in a medium bowl. Set aside.In the bowl of a stand mixer, beat the butter, peanut butter and sugars, until light and fluffy.",
          "number": 2
        },
        {
          "instruction": "Add in the egg and vanilla.Gradually add in the flour mixture on low speed. Stir until dough forms. Then stir in Reese's Pieces by hand.Using a cookie dough scoop or your hands, form balls of dough with 1 heaping tablespoon of dough. Gently flatten cookie dough (to form a disk shape) and place on prepared baking sheets.",
          "number": 3
        },
        {
          "instruction": "Bake for 9 minutes and remove from oven.",
          "number": 4
        },
        {
          "instruction": "Let cool for 5 minutes before transferring cookies to a wire rack to cool completely.Note: Cookies will not spread much at all and will look like they are not done baking. But I promise they are! Once they finish cooling, the cookie and chocolate will become firm and you will have a magically soft and crumbly cookie!",
          "number": 5
        }
      ],
      "name": "Reese's Pieces Peanut Butter Cookies",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    },
    {
      "id": 601216,
      "image": "https://spoonacular.com/recipeImages/601216-556x370.jpg",
      "ingredients": [
        {
          "id": 1041009,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 10018413,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 2044,
          "quantity": {
            "amount": 3,
            "unit": "leaves"
          }
        },
        {
          "id": 10111529,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 4053,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 11477,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Saute the zucchini in the olive oil on high heat. Season generously with salt and pepper. Stir and leave alone for a little while, so you get a little bit of texture from the browning on the zucchini.While you’re sauteing, toast the flatbread in the oven at 400 degrees.When the zucchini is soft and just slightly browned, remove from the heat. Take the flatbread out of the oven and spread the zucchini on the flatbread.Top with the fresh tomatoes, cheese, and fresh basil.",
          "number": 1
        },
        {
          "instruction": "Cut, serve, and enjoy!",
          "number": 2
        }
      ],
      "name": "Farmer’s Market Flatbread Pizza",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 226562,
      "image": "https://spoonacular.com/recipeImages/226562-556x370.jpg",
      "ingredients": [
        {
          "id": 9019,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 18079,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 16069,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 19334,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 11124,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 2009,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 9079,
          "quantity": {
            "amount": 0.3333333333333333,
            "unit": "cup"
          }
        },
        {
          "id": 11165,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 3,
            "unit": ""
          }
        },
        {
          "id": 1002014,
          "quantity": {
            "amount": 0.5,
            "unit": "teaspoon"
          }
        },
        {
          "id": 2042,
          "quantity": {
            "amount": 0.5,
            "unit": "teaspoon"
          }
        },
        {
          "id": 11935,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 4053,
          "quantity": {
            "amount": 2,
            "unit": "tablespoon"
          }
        },
        {
          "id": 11282,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 12151,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 11821,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 1102047,
          "quantity": {
            "amount": 8,
            "unit": "servings"
          }
        },
        {
          "id": 6615,
          "quantity": {
            "amount": 3,
            "unit": "cups"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Wash the lentils and place into a pot along with the vegetable broth. Bring to a boil, then reduce heat to medium-low and simmer, for about 40 minutes.",
          "number": 1
        },
        {
          "instruction": "Add more broth or water if necessary",
          "number": 2
        },
        {
          "instruction": "Meanwhile, warm the oil in a pan.",
          "number": 3
        },
        {
          "instruction": "Add the onions and cook for about 4 minutes or until soft.",
          "number": 4
        },
        {
          "instruction": "Add the carrots, bell pepper and garlic. Cook for about 3 minutes more. Set aside.When the lentils are ready mash them slightly with a potato masher or a fork.Preheat the oven to 350º F.In a large bowl, mix the onion mixture, mashed lentils, apple sauce, cranberries, pistachios, bread crumbs, cilantro, chili powder, cumin, thyme, salt and pepper.Line a loaf pan with parchment paper.",
          "number": 5
        },
        {
          "instruction": "Transfer the mixture to the loaf pan and press mixture into the pan with a spoon.",
          "number": 6
        },
        {
          "instruction": "Mix the glaze ingredients in a small bowl and spread evenly over the top.",
          "number": 7
        },
        {
          "instruction": "Bake for about 45 minutes.",
          "number": 8
        },
        {
          "instruction": "Transfer the pan to a wire rack and let the loaf cool a bit. Run a table knife around the edge of the pan and turn the loaf out onto a serving plate.",
          "number": 9
        }
      ],
      "name": "Vegan Lentil Loaf",
      "tags": [
        "side dish"
      ]
    },
    {
      "id": 605132,
      "image": "https://spoonacular.com/recipeImages/605132-556x370.jpg",
      "ingredients": [
        {
          "id": 1001,
          "quantity": {
            "amount": 2,
            "unit": "tablespoons"
          }
        },
        {
          "id": 20027,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 1125,
          "quantity": {
            "amount": 2,
            "unit": ""
          }
        },
        {
          "id": 1077,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "id": 2050,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        },
        {
          "id": 19335,
          "quantity": {
            "amount": 0.3333333333333333,
            "unit": "cup"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "In a heavy saucepan, stir together the milk and 1/4 cup of sugar. Bring to a boil over medium heat.",
          "number": 1
        },
        {
          "instruction": "In a medium bowl, whisk together the egg yolks and egg. Stir together the remaining sugar and cornstarch; then stir them into the egg until smooth. When the milk comes to a boil, drizzle it into the bowl in a thin stream while mixing so that you do not cook the eggs. Return the mixture to the saucepan, and slowly bring to a boil, stirring constantly so the eggs don' t curdle or scorch on the bottom.",
          "number": 2
        },
        {
          "instruction": "When the mixture comes to a boil and thickens, remove from the heat. Stir in the butter and vanilla, mixing until the butter is completely blended in.",
          "number": 3
        },
        {
          "instruction": "Pour into a heat-proof container and place a piece of plastic wrap directly on the surface to prevent a skin from forming. Refrigerate until chilled before using.",
          "number": 4
        }
      ],
      "name": "Pastry Cream",
      "tags": [
        "side dish"
      ]
    }
  ]


  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (recipeData);

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _recipes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _apiCalls_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);




const homeSection = document.querySelector(".main-page");
const recipePage = document.querySelector(".recipe-page");
const featuredRecipesSection = document.querySelector(".featured-recipes");
const allRecipesSection = document.querySelector(".all-recipes-page");
const homeButton = document.querySelector(".home-button");
const recipeButton = document.querySelector(".recipe-button");
const recipeHeader = document.querySelector(".featured-recipes-header");
const dropdownTags = document.querySelector(".dropdown");
const savedDropdownTags = document.querySelector(".saved-dropdown");
const viewRecipesToCookSection = document.querySelector(".saved-recipe-button");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const savedSearchButton = document.querySelector(".saved-search-button");
const savedRecipePage = document.querySelector(".saved-recipes-page");
const tagContainer = document.querySelector("#tagContainer");
const savedTagContainer = document.querySelector("#savedTagContainer");

let currentUser;
let users = [];
let ingredients = [];
let recipes = [];

function initialize() {
  Promise.all([(0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_2__.fetchUsers)(), (0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_2__.fetchIngredients)(), (0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_2__.fetchRecipes)()])

    .then(([fetchedUsers, fetchedIngredients, fetchedRecipes]) => {
      users = fetchedUsers.users;
      ingredients = fetchedIngredients.ingredients;
      recipes = fetchedRecipes.recipes;
      currentUser = getRandomUser(users);
      populateAllRecipesPage(recipes);
      generateRecipeCards(recipes);
      displayIngredients(recipes[0], ingredients);
      displayUserRecipes(users);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
console.log("testing if global variable: ", users);
addEventListener("load", function () {
  setTimeout(() => {
    initialize();
  }, 1500);
});

viewRecipesToCookSection.addEventListener("click", showSavedRecipesPage);

allRecipesSection.addEventListener("click", (e) => {
  findRecipeById(e);
  navigateToRecipePage();
});

homeSection.addEventListener("click", (e) => {
  findRecipeById(e);
  navigateToRecipePage();
});

recipeButton.addEventListener("click", function (event) {
  event.preventDefault();
  showAllRecipesPage();
});

homeButton.addEventListener("click", function () {
  showHomePage();
});

recipePage.addEventListener("click", (event) => {
  if (event.target.classList.contains("save-button")) {
    const recipeId = parseInt(event.target.closest(".full-recipe-view").id);
    const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);
    console.log("Selected Recipe:", selectedRecipe);
    if (selectedRecipe) {
      console.log("Adding recipe to cook list...");
      addRecipeToCook(currentUser.id, selectedRecipe.id);
      console.log("Adding recipe to user's cook list...");
      (0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_2__.saveRecipeToServer)(currentUser.id, selectedRecipe.id)
        .then((data) => {
          console.log("Recipe added to user's cook list:", data);
          event.target.classList.add("saved");
          event.target.innerText = "RECIPE SAVED";
        })
        .catch((error) => {
          console.error("Error adding recipe to user's cook list:", error);
        });
    }
  }
});

savedRecipePage.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-button")) {
    const closestBox = event.target.closest(".remove-recipe");

    if (closestBox) {
      const recipeId = parseInt(closestBox.previousElementSibling.id, 10);

      if (isNaN(recipeId)) {
        console.error(
          "Invalid recipe ID:",
          closestBox.previousElementSibling.id
        );
        return;
      }

      removeRecipeFromCook(currentUser.id, recipeId);
      displayUserRecipes(currentUser.name);
    }
  }
});

function removeRecipeFromCook(userId, recipeId) {
  const user = users.find((user) => user.id === userId);

  if (user) {
    user.recipesToCook = user.recipesToCook.filter(
      (recipe) => recipe.id !== recipeId
    );

    const recipeCard = document.querySelector(
      `.featured-recipe-box[id="${recipeId}"]`
    );
    if (recipeCard) {
      recipeCard.remove();
    } else {
      console.error(`Recipe card with ID ${recipeId} not found.`);
    }
  }
}

savedRecipePage.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".featured-recipe-box");

  if (clickedCard) {
    const recipeId = parseInt(clickedCard.id, 10);
    const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);

    if (selectedRecipe) {
      showFullRecipe(selectedRecipe);
      navigateToRecipePage();
    }
  }
});

searchButton.addEventListener("click", searchByName);
savedSearchButton.addEventListener("click", searchByName);

function searchByName(e) {
  const searchName = searchInput.value;
  let searchResult;
  let headerText;
  if (e.target === searchButton) {
    searchResult = (0,_recipes__WEBPACK_IMPORTED_MODULE_0__.searchRecipeName)(recipes, searchName);
    headerText = `Search Results by: "${searchInput.value}"`;
  } else if (e.target === savedSearchButton) {
    searchResult = (0,_recipes__WEBPACK_IMPORTED_MODULE_0__.searchRecipeName)(currentUser.recipesToCook, searchName);
    headerText = `Saved Recipe Search Results by: "${searchInput.value}"`;
  }

  filteredRecipeCards(searchResult);
  recipeHeader.innerHTML = headerText;
  searchInput.value = "";
}

tagContainer.addEventListener("click", function (e) {
  console.log(e.target.closest("a"));
  if (e.target.closest("a")) {
    const clickedTag = e.target.textContent;
    const searchResult = (0,_recipes__WEBPACK_IMPORTED_MODULE_0__.findRecipeTags)(recipes, clickedTag);
    filteredRecipeCards(searchResult);
    recipeHeader.innerHTML = `Recipes By Tag: "${clickedTag}"`;
  }
});

savedTagContainer.addEventListener("click", function (e) {
  console.log(e.target.closest("a"));
  if (e.target.closest("a")) {
    const clickedTag = e.target.textContent;
    const searchResult = (0,_recipes__WEBPACK_IMPORTED_MODULE_0__.findRecipeTags)(currentUser.recipesToCook, clickedTag);
    filteredRecipeCards(searchResult);
    recipeHeader.innerHTML = `Saved Recipes By Tag: "${clickedTag}"`;
  }
});

function navigateToRecipePage() {
  homeSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");
  recipePage.classList.remove("hidden");
  savedRecipePage.classList.add("hidden");
}

function showSavedRecipesPage() {
  console.log("SAVED RECIPES PAGE FUNCTION INITITATED");
  homeSection.classList.add("hidden");
  allRecipesSection.classList.add("hidden");
  recipePage.classList.add("hidden");
  savedRecipePage.classList.remove("hidden");
  searchButton.classList.add("hidden");
  savedSearchButton.classList.remove("hidden");
  dropdownTags.classList.add("hidden");
  savedDropdownTags.classList.remove("hidden");
  displayUserRecipes(currentUser.name);
}

function resetFilteredResultsPage() {
  homeSection.classList.remove("hidden");
  allRecipesSection.classList.add("hidden");
  recipePage.classList.add("hidden");
  savedRecipePage.classList.add("hidden");
  featuredRecipesSection.innerHTML = "";
}

function showAllRecipesPage() {
  console.log("SHOW ALL RECIPES PAGE INITIATED");
  homeSection.classList.add("hidden");
  allRecipesSection.classList.remove("hidden");
  recipePage.classList.add("hidden");
  savedRecipePage.classList.add("hidden");
  searchButton.classList.remove("hidden");
  savedSearchButton.classList.add("hidden");
  dropdownTags.classList.remove("hidden");
  savedDropdownTags.classList.add("hidden");
}

function showHomePage() {
  console.log("SHOW HOME PAGE INITIATED");
  allRecipesSection.innerHTML = "";
  homeSection.classList.remove("hidden");
  allRecipesSection.classList.add("hidden");
  recipePage.classList.add("hidden");
  savedRecipePage.classList.add("hidden");
  searchButton.classList.remove("hidden");
  savedSearchButton.classList.add("hidden");
  recipeHeader.innerText = "This week's featured recipes:";
  dropdownTags.classList.remove("hidden");
  savedDropdownTags.classList.add("hidden");
  generateRecipeCards(recipes);
  populateAllRecipesPage(recipes);
}

function populateAllRecipesPage(data) {
  let recipes;

  if (Array.isArray(data.recipes)) {
    recipes = data.recipes;
  } else if (Array.isArray(data)) {
    recipes = data;
  } else {
    console.error("Invalid recipes data:", data);
    return;
  }

  allRecipesSection.innerHTML = "";

  recipes.forEach((recipe) => {
    const cardHTML = `
      <div class="featured-recipe-box" id="${recipe.id}">
        <img class="card-image" src="${recipe.image}" alt="${recipe.name}">
        <h2 class="card-title">${recipe.name}</h2>
      </div>
    `;
    allRecipesSection.innerHTML += cardHTML;
  });
}

function displayIngredients(selectedRecipe, ingredients) {
  console.log("DISPLAY INGREDIENTS FUNCTION INITIATED");
  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.className = "section-title";
  ingredientsTitle.textContent = "Ingredients";

  const ingredientsList = document.createElement("ul");
  ingredientsList.className = "recipe-ingredients";

  selectedRecipe.ingredients.forEach((ingredientItem) => {
    const ingredient = ingredients.find(
      (data) => data.id === ingredientItem.id
    );

    const listItem = document.createElement("li");
    listItem.textContent = `${ingredient.name}: ${ingredientItem.quantity.amount} ${ingredientItem.quantity.unit}`;
    ingredientsList.appendChild(listItem);
  });
  return { ingredientsTitle, ingredientsList };
}

function calculateRecipeCost(selectedRecipe, ingredients) {
  let totalCost = 0;

  selectedRecipe.ingredients.forEach((ingredientItem) => {
    const ingredientData = ingredients.find(
      (data) => data.id === ingredientItem.id
    );

    if (ingredientData) {
      totalCost +=
        ingredientData.estimatedCostInCents * ingredientItem.quantity.amount;
    }
  });

  return totalCost / 100;
}

function showFullRecipe(selectedRecipe) {
  console.log(selectedRecipe);
  recipePage.innerHTML = `
    <div class="full-recipe-view" id=${selectedRecipe.id}>
      <img class="recipe-image" src="${selectedRecipe.image}" alt="${
    selectedRecipe.name
  }">
      <h2 class="card-title">${selectedRecipe.name}</h2>
      <button class="save-button">SAVE FOR LATER</button>
      <h3 class="instructions-title">Instructions</h3>
      <ul class="recipe-instructions">
        ${selectedRecipe.instructions
          .map((instruction) => `<li>${instruction.instruction}</li>`)
          .join("")}
      </ul>
      ${
        displayIngredients(selectedRecipe, ingredients).ingredientsTitle
          .outerHTML
      }
      ${
        displayIngredients(selectedRecipe, ingredients).ingredientsList
          .outerHTML
      }
      <p class="recipe-total-cost">Total Cost: $${calculateRecipeCost(
        selectedRecipe,
        ingredients
      ).toFixed(2)}</p>
      <h3 class="tags-title">Tags</h3>
      <ul class="recipe-tags">
        ${selectedRecipe.tags.map((tag) => `<li>${tag}</li>`).join("")}
      </ul>
    </div>
  `;
}

function findRecipeById(event) {
  console.log("FIND RECIPE BY ID INITIATED");
  const recipeId = +event.target.closest(".featured-recipe-box").id;
  const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);

  if (selectedRecipe) {
    console.log("selected recipe: ", selectedRecipe);
    showFullRecipe(selectedRecipe);
  }
}

function generateRecipeCards(recipes) {
  featuredRecipesSection.innerHTML = "";

  for (let i = 0; i < 3 && i < recipes.length; i++) {
    const recipe = recipes[i];

    const cardHTML = `
      <div class="featured-recipe-box" id="${recipe.id}">
        <img class="card-image" src="${recipe.image}" alt="${recipe.name}">
        <h2 class="card-title">${recipe.name}</h2>
      </div>
    `;
    featuredRecipesSection.innerHTML += cardHTML;
  }
}

function addRecipeToCook(userId, recipeId) {
  const user = users.find((user) => user.id === userId);
  const recipe = recipes.find((recipe) => recipe.id === recipeId);

  if (user && recipe) {
    if (!user.recipesToCook.some((r) => r.id === recipeId)) {
      user.recipesToCook.push(recipe);
      console.log(user);
    }
  }
}

function filteredRecipeCards(recipeInput) {
  console.log("FILTERED RECIPE CARDS INITIATED");
  resetFilteredResultsPage();
  if (recipeInput === "No Results Found") {
    featuredRecipesSection.innerHTML = `${recipeInput}`;
  } else
    for (let i = 0; i < recipeInput.length; i++) {
      const recipe = recipeInput[i];

      const card = document.createElement("div");
      card.className = "featured-recipe-box";
      card.id = recipe.id;

      const image = document.createElement("img");
      image.className = "card-image";
      image.src = recipe.image;
      image.alt = recipe.name;

      const title = document.createElement("h2");
      title.className = "card-title";
      title.textContent = recipe.name;

      card.appendChild(image);
      card.appendChild(title);

      featuredRecipesSection.appendChild(card);
    }
}

function getRandomUser(users) {
  const index = (0,_random__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(users.length);
  const randomUser = users[index];
  return randomUser;
}

function displayUserRecipes(userName) {
  const user = users.find((user) => user.name === userName);
  if (user) {
    savedRecipePage.innerHTML = "";

    user.recipesToCook.forEach((recipe) => {
      const cardHTML = `
            <div class="featured-recipe-box" id="${recipe.id}">
              <img class="card-image" src="${recipe.image}" alt="${recipe.name}">
              <h2 class="card-title">${recipe.name}</h2>
              </div>
              <div class=remove-recipe>
              <button class="remove-button">REMOVE</button>
            </div>
          `;
      savedRecipePage.innerHTML += cardHTML;
    });
  }
}


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRandomInt: () => (/* binding */ getRandomInt)
/* harmony export */ });
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _data_ingredients__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _recipes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
//NOTE: Data model and non-dom manipulating logic will live in this file.



// An example of how you tell webpack to use an image (also need to link to it in the index.html)


// Below are examples of how you can import functions from either the recipes or domUpdates files.




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map