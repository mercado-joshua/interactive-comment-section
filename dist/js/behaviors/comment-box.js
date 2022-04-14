"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var commentBox = function commentBox() {
  var commentForm = document.querySelector('[data-js-comment-form]');
  var currentUserImage = commentForm.querySelector('[data-js-current-user-image]');
  var comment = commentForm.querySelector('[data-js-textarea]');
  var comments = [];

  var addComment = function addComment() {
    commentForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var value = comment.value.trim();
    });
  }; // displays all comments from the .json data


  var getComments = function getComments(data) {
    var commentList = document.querySelector('[ data-js-comment-list]');
    var commentTemplate = document.querySelector('[data-js-comment-template]');
    var userComments = data.comments;
    comments = userComments.map(function (comment) {
      var card = commentTemplate.content.cloneNode(true).children[0];
      var commenterImage = card.querySelector('[data-js-user-image]');
      var commenterName = card.querySelector('[data-js-name]');
      var commentedTime = card.querySelector('[data-js-time]');
      var commenterComment = card.querySelector('[data-js-comment]');
      var commentScore = card.querySelector('[data-js-number]');
      var replies = comment.replies;
      var replyList = card.querySelector('[data-js-reply-list]');
      commenterImage.src = comment.user.image.png;
      commenterName.textContent = comment.user.username;
      commentedTime.textContent = comment.createdAt;
      commenterComment.textContent = comment.content;
      commentScore.textContent = comment.score; // if the comment contains replies, display it

      if (replies.length > 0) {
        replies.map(function (reply) {
          var card = commentTemplate.content.cloneNode(true).children[1];
          var commenterImage = card.querySelector('[data-js-user-image]');
          var commenterName = card.querySelector('[data-js-name]');
          var commentedTime = card.querySelector('[data-js-time]');
          var commenterComment = card.querySelector('[data-js-comment]');
          var commentScore = card.querySelector('[data-js-number]');
          commenterImage.src = reply.user.image.png;
          commenterName.textContent = reply.user.username;
          commentedTime.textContent = reply.createdAt;
          commenterComment.textContent = reply.content;
          commentScore.textContent = reply.score;
          replyList.append(card);
        });
      } else {
        replyList.classList.add('-hide');
      }

      commentList.append(card);
    });
  };

  var getCurrentUser = function getCurrentUser(data) {
    var username = data.username;
    var png = data.image.png;
    commentForm.dataset.jsUsername = username;
    currentUserImage.src = png;
  };

  var fetchData = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var response, data, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch('https://mercado-joshua.github.io/data/data.json');

            case 2:
              response = _context.sent;
              _context.next = 5;
              return response.json();

            case 5:
              data = _context.sent;
              user = data.currentUser;
              getComments(data);
              getCurrentUser(user);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function fetchData() {
      return _ref.apply(this, arguments);
    };
  }();

  fetchData();
};

document.addEventListener('readystatechange', function (event) {
  if (event.target.readyState === 'complete') commentBox();
});
