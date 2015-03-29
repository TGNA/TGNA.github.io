var gh_url = "https://github.com/TGNA.atom";
$.ajax({
  url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(gh_url),
  dataType: 'json',
  success: function (data) {
    if (data.responseData.feed && data.responseData.feed.entries) {
      $.each(data.responseData.feed.entries, function (i, e) {
        var remain = moment(e.publishedDate,'ddd, DD MMM YYYY HH:mm:SS Z').locale('ca').fromNow();
        var contingut = e.content;
        var split = contingut.split("\n");
        var data = moment(split[4]).locale('ca').format('ll');
        var commit = split.slice(7).join(' ');
        var title = $($.parseHTML(split.slice(7,9).join(' '))).html();
        var commitData = [];
        var html =  $.parseHTML(commit);
        $(html).find("li").each(function( index, element ) {
          var image = $(element).find("img").attr('src');
          var link = $(element).find("a").attr('href');
          var linkText = $(element).find("a").first().text();
          var blockquote = $(element).find("blockquote").html();
          if(image){ 
            commitData.push("<p><img src='"+image+"' class='img-circle'><code><a href='https://github.com/"+link+"'>"+linkText+"</a></code>"+blockquote+"</p>");
          } else {
            commitData.push("<p><a href='"+link+"'>"+linkText+"</a></p>");
          }
        });
        $("#gh-activity").append('<li><h5 style="text-transform: capitalize" class="text-muted">'+remain+' '+data+'</h5><p>'+title+'</p><p>'+commitData.join(" ")+'</p></li>');
      });
    } else{
      $("#gh-activity").html('<div class="alert alert-dismissible alert-danger"><strong>Oh!</strong>Algo ha anat malament, prova a refrescar la pagina.</div>');
    }
  },
  error: function(data){
    $("#gh-activity").html('<div class="alert alert-dismissible alert-danger"><strong>Oh!</strong>Algo ha anat malament, prova a refrescar la pàgina.</div>');
  }
});

