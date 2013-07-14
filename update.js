// Generated by CoffeeScript 1.6.3
(function() {
  var checkUpdate, compareVersion, platformMap, util;

  util = require('util');

  platformMap = {
    'win32': 'win',
    'darwin': 'osx',
    'linux': 'linux'
  };

  compareVersion = function(l, r) {
    var i, lp, ls, rp, rs, _i, _ref;
    ls = l.split('.');
    rs = r.split('.');
    for (i = _i = 0, _ref = Math.min(ls.length, rs.length); 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      lp = ls[i];
      rp = rs[i];
      if (lp !== rp) {
        return lp - rp;
      }
    }
    return ls.length - rs.length;
  };

  checkUpdate = function(callback) {
    var $, arch, e, packageInfo, platform, re, version;
    if (callback != null) {
      try {
        packageInfo = require('./package.json');
      } catch (_error) {
        e = _error;
        util.log(e);
        return;
      }
      version = packageInfo.version;
      arch = process.arch;
      platform = platformMap[process.platform];
      $ = window.$;
      re = /^.*shadowsocks-gui-([\d\.]+)-(\w+)-(\w+)\..*$/;
      return $.get('https://sourceforge.net/api/file/index/project-id/1817190/path/dist/mtime/desc/limit/4/rss', function(data) {
        var r, results, _i, _len;
        results = [];
        $(data).find('content').each(function() {
          var g, url;
          url = $(this).attr('url');
          g = re.exec(url);
          if (g != null) {
            return results.push(g);
          }
        });
        results.sort(function(l, r) {
          return -compareVersion(l[1], r[1]);
        });
        for (_i = 0, _len = results.length; _i < _len; _i++) {
          r = results[_i];
          if ((r[2] === platform) && (r[3] === arch)) {
            if (compareVersion(r[1], version) > 0) {
              callback(r[0], r[1]);
              return;
            }
          }
        }
      }).fail(function() {
        return alert("error");
      });
    }
  };

  exports.checkUpdate = checkUpdate;

}).call(this);
