$(document).ready(function() {
    resizeElementsWithResizeBar('.drag', '.top', '.bottom');
    resizeElementsWithResizeBar('.dragtop', '.left', '.right', 'with');

    function resizeElementsWithResizeBar (resizeBar, firstElement, secondElement, dimention = "vertical") {
      var dragBar = $(resizeBar);
      var firstElement = $(firstElement);
      var secondElement = $(secondElement);
      var containerElement = firstElement.parent();
      var firstPercentage;
      var dimCSS;
      var isMouseDown = false;

      if (dimention == "vertical") {
        dimCSS = 'height';
        dragBar.css('cursor', 'row-resize');
      }
      else {
        dimCSS = 'width';
        dragBar.css('cursor', 'col-resize');
      }

      $(document).on('mousedown', resizeBar, function() {
        isMouseDown = true;
      })
      $(document).on('mouseup', function() {
        isMouseDown = false;
      })
      $(document).on('mousemove', function(event) {
        event.preventDefault();
        if (isMouseDown) {
          var offset = containerElement.offset();
          if (dimention == "vertical") {
            firstPercentage = ((event.pageY - offset.top) / heightToNumber(containerElement.css('height'))) * 100;
          }
          else {
            firstPercentage = ((event.pageX - offset.left) / heightToNumber(containerElement.css('width'))) * 100;
          }
          
          firstElement.css(dimCSS, firstPercentage + '%');
          secondElement.css(dimCSS, (100 - firstPercentage) + "%");
        }      
      })
      function heightToNumber(height) {
        height = height.replace("px", "");
        return +height;
      }
    }
});