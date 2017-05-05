// mainly to populate the sidebar and have its content in one place

function displayTag(tag) {
    $('.tag-select').removeClass('active');
    $('.tag-select.' + tag).addClass('active');
    $('.post-meta').each(function () {
        var $container = $(this).closest('.post-header');
        if ($(this).find('.tag').children('.' + tag).length) {
            $container.removeClass('none');
        }
        else {
            $container.addClass('none');
        }
    });
};

function displayAll() {
    $('.tag-select').removeClass('active');
    $('.post-header').removeClass('none');
};

function parseURLParams(query) {
    // no standard for params, so only split
    var parts = query.split('&'),
        params = {};

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }

    return params;
};

$(document).ready(function () {
    var tags = [
        'menschmaschine', 'quality', 'emacs', 'cs', 'scheme' // --- TAGS --- //
    ];
    // var timestamps = [
    //     new Date('2014-08-04')
    // ];

    // add a cloud of "links" to the sidebar
    var $p = $('<p id="tag-cloud">'),
        first = true;
    $.each(tags, function (index, tag) {
        var $tag;
        $tag = $('<span class="tag-select">').
          addClass(tag).
          text(tag).
          on('click', function() {
              if ($(this).hasClass('active')) {
                  // then we're on index.html
                  displayAll();
                  history.pushState({foo: "bar"}, 'dummy', 'index.html');
              } else {
                  if (window.location.pathname.substr(-10) !== "index.html") {
                      window.location.href = 'index.html?tag=' + tag;
                  } else {
                      displayTag(tag);
                      history.pushState({foo: "bar"}, 'dummy', 'index.html?tag=' + tag);
                  };
              }
          });
        if (! first) { $p.append('&emsp;'); }
        first = false;
        $p.append($tag);
    });
    $p.appendTo($('#preamble header')); // the first one, added ourselves

    // get from URL
    var params = parseURLParams(window.location.search.substring(1));
    var tag = decodeURIComponent(params.tag || "");
    if (tag) {
        displayTag(tag);
    }
});
