/*global window,console,define */
define([
	'bean',
	'bonzo',
	'modules/$'
], function (
	bean,
	bonzo,
	$
) {
	'use strict';

	var modules = {
			setupGlobals: function () {
				// Function that loops through comments, hides replies and enables interactivity for comments
				window.commentsReplyFormatting = function () {
					var counter = 0;
					var stopPropagation = 0;

					$(".discussion__thread").each(function(el) {
						if (!$(this).hasClass("discussion__thread--checked")) {
							if (typeof $(this)[0].children[4] !== "undefined") {
								var blockID = "#" + $(this)[0].children[3].id;
								var numOfComments = $(this)[0].children.length - 4;
								if (numOfComments == 1) {
									$(this).addClass("discussion__thread--orphan");
								} else {
									$(blockID).append("<div class='discussion__view-more'><span class='icon'>&#xe050;</span> Show " + numOfComments + " more replies</div>");
								}
							}
						}
						$(this).addClass("discussion__thread--checked");
					});

					$(".discussion").each(function(el) {

						bean.on(el, 'click', 'a, .discussion__view-more, .discussion__reply, .discussion__recommend', function (event) {
							stopPropagation = 1;
						});

						bean.on(el, 'click', '.discussion__header, .discussion__body', function (event) {
							stopPropagation = 0;
						});

						bean.on(el, 'click', function () {
							if (stopPropagation == 0) {
								var block = $(el);
								// If comment is replyable allow buttons
								if (block.hasClass('visible')) {
									// Remove any previous animation classes
									$(".discussion__options").removeClass("animated fadeInRight");
									$(".discussion__timestamp").removeClass("animated scaleOut");
									if (block.hasClass("discussion--open")) {
										// Hide the buttons
										$(".discussion--open", el).removeClass("discussion--open");
									} else {
										// Hide previously opened block
										$(".discussion--open").removeClass("discussion--open");
										// Different animations for different block types
										if (block.hasClass("is-response")) {
											$(".discussion__timestamp", el).addClass("animated scaleOut");
											$('.discussion__options', el).addClass("animated fadeInRight");
										} else {
											// Calculate height to animate initial comments
											var originalHeight = block[0].clientHeight;
											el.style.minHeight = originalHeight + 46;
											setTimeout(function() {
												$('.discussion__options', el).addClass("animated fadeInRight");
												el.style.minHeight = originalHeight;
											}, 350);
										}
										block.addClass('discussion--open');
									}
								}
							}
						});

						bean.on(el, 'click', '.discussion__view-more', function () {
							$(this).hide();
							$(this).parent().parent().addClass("expand");
						});
						
					});
				};
				// Global functions to handle comments, called by native code
				window.articleCommentsInserter = function (html) {
					$('.discussion__loading').hide();
					if (!html) {
						$('.discussion__empty').show();
					} else {
						html = bonzo.create(html);
						$(html).appendTo($('#comments'));
					}
				};
				window.commentsInserter = function (html) {
					if (!html) {
						$('.discussion__empty').show();
						$('.discussion__loading').hide();
					} else {
						html = bonzo.create(html);
						$(html).appendTo($('#comments'));
					}
					$('.discussion__loading').appendTo('#comments');
				};
				window.articleCommentsFailed = function () {
					$('.discussion__failed').show();
					$('.discussion__loading').hide();
					$('#module-comments').addClass('comments-has-failed');
				};
				window.commentsFailed = function () {
					$('.discussion__loading').hide();
					$('.discussion__failed').show();
					$('#comments').addClass('comments-has-failed');
				};
				window.commentsEnd = function () {
					$('.discussion__loading').remove();
				};
				
				window.commentsClosed = function () {
					$(".module--comments, #discussion").addClass("comments--closed");
				};
				
				// Functions for feedback on recommend buttons
				window.commentsRecommendIncrease = function (id, number) {
					var target = '#' + id + ' .discussion__recommend';
					$(target).addClass('increase');
					$(target + ' .discussion__recommend__count').text(number);
				};
				window.commentsRecommendDecrease = function (id, number) {
					var target = '#' + id + ' .discussion__recommend';
					$(target).removeClass('increase');
					$(target + ' .discussion__recommend__count').text(number);
				};
				window.scrollToComments = function () {
					window.location.href = '#module-comments';
				};
				window.applyNativeFunctionCall('articleCommentsInserter');
				window.applyNativeFunctionCall('commentsFailed');
				window.applyNativeFunctionCall('commentsReplyFormatting');
				window.applyNativeFunctionCall('commentsClosed');
			}
		},

		ready = function () {
			if (!this.initialised) {
				this.initialised = true;
				modules.setupGlobals();
				commentsReplyFormatting();
				// console.info("Comments ready");
			}
		};

	return {
		init: ready
	};

});
