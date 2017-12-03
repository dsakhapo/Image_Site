$('#upload-btn').click(function(){
  $('#image-search').click();
});

$('#image-search').change(function(){
  var file = $(this).get(0).files;

  if(file.length > 0){
    //Create new form data to send via ajax
    var image = new FormData();
    image.append('file', file[0]);

    $.ajax({
      url: 'http://localhost:4000/upload',
      type: 'POST',
      dataType: 'json',
      data: image,
      processData: false,
      contentType: false,
      success: function(data, status, xhr){
        document.getElementById('upload-err').innerHTML = "";
        document.getElementById('image-list').innerHTML =
        "<div class=\"image\">" + "<li>" + "<a href=\"http://localhost:4000/image/" + data.name + "\" target=\"_self\">"
        + "<img src=\""+ data.name + "\" />" + "</a>" + "<\/li>" + "</div>" +
        document.getElementById('image-list').innerHTML;
      },
      error: function(xhr, status, error){
        document.getElementById('upload-err').innerHTML += JSON.parse(xhr.responseText).error;
      }
    });
  }
});
